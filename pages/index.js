import React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import api from './api/api';
import Image from 'next/image';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { useCallback, useRef, useState } from 'react';
import { FormDevices } from '../form/form';
import { FormPersonal } from '../form/form';
import { Insti } from './instituicoes';
import { fetchCep } from '../util/fetchcep';
import { testeDevice } from '../util/testedevice';

export default function Home({ dados }) {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [devices, setDevices] = useState([{ value: '', label: '' }]);
  const [devicesError, setDevicesError] = useState(false);

  const setAddress = useCallback((value) => {
    setLoading(true);

    fetchCep(value).then((response) => {
      if (response.city !== undefined) {
        formRef.current.setFieldValue('state', response.state);
        document.getElementById('state').value = response.state;
        formRef.current.setFieldValue('city', response.city);
        document.getElementById('city').value = response.city;
        formRef.current.setFieldValue('streetAddress', response.streetAddress);
        document.getElementById('streetAddress').value = response.streetAddress;
        formRef.current.setFieldValue('neighborhood', response.neighborhood);
        document.getElementById('neighborhood').value = response.neighborhood;
        document.getElementById('number').focus();
      }
      setLoading(false);
    });
  }, []);

  async function handleOnChange(name, value) {
    formRef.current.setFieldValue(name, value);
  }

  async function handleCreateDevice(deviceCount) {
    var newDevice = { value: '', label: '' };
    for (var i = devices.length; i < deviceCount; i++) {
      setDevices((prevState) => [...prevState, newDevice]);
    }
    formRef.current.setFieldValue('devices', devices);
  }

  async function handleDeleteDevice(deviceCount) {
    for (var i = devices.length; i >= deviceCount; i--) {
      setDevices((prevState) => prevState.filter((_, index) => index !== i));
    }
    formRef.current.setFieldValue('devices', devices);
  }

  async function handleFormSubmit(form) {
    form.deviceCount = parseInt(form.deviceCount);
    { console.log(form) }
    const data = JSON.stringify(form);

    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('*Campo nome é obrigatório'),
        email: Yup.string().required('*Campo email é obrigatório'),
        phone: Yup.string()
          .transform((value) => value.replaceAll('_', ''))
          .min(11, 'Telefone inválido')
          .required('*Campo telefone é obrigatório'),
        zip: Yup.string().required('*Campo cep é obrigatório'),
        city: Yup.string().required('*Campo cidade é obrigatório'),
        state: Yup.string().required('*Campo estado é obrigatório'),
        streetAddress: Yup.string().required('*Campo rua é obrigatório'),
        number: Yup.string().required('*Campo número é obrigatório'),
        complement: Yup.string().required(
          '*O campo ponto de referência é muito importante para que cheguemos a doação'),
        neighborhood: Yup.string().required(
          '*O campo bairro e obrigatório'
        ),
        deviceCount: Yup.number()
          .required()
          .integer()
          .moreThan(0, 'O número de equipamentos é obrigatório'),
      });

      form.devices.forEach((device) => {
        if (device.type == undefined || device.condition == undefined) {
          setDevicesError(true);
        } else setDevicesError(false);
      });

      await schema.validate(form, {
        abortEarly: false,
      });

      const devicesPassed = await testeDevice(form);

      if (devicesPassed.value == true) {
        api
          .post('/donation', data)
          .then((response) => {
            alert('Enviado' + response.status);
            window.location.reload(false);
          })
          .catch((error) => {
            alert(
              'Tente novamente mais tarde.(servidor offline) \nStatus ' +
              error.response.status
            );
          });
      } else
        alert(
          ' dados faltando precisamos de todos os dados para a doação \nStatus ' +
          error.response.status
        );
    } catch (err) {
      var validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
      }
      formRef.current.setErrors(validationErrors);

      alert(
        'Dados faltantes ou errados. Corrigir antes de enviar novamente. \nStatus 400'
      );
    }
  }

  return (
    <div>
      <Head>
        <title>PC4All</title>
        <meta name="description" content="Doação de computadores usados" />
        <link rel="icon" href="./favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.headercontainer}>
          <Image
            className={styles.headerimg}
            src="/appmasters.svg"
            alt="Pc4All"
          />
        </div>
      </header>

      <section className={styles.hero}>
      <div className={styles.container}>
          <div>
            <h2>
              Doação de computadores usados
            </h2>
            {getApi(dados)}
            <h2>Instituições parceiras</h2>
          </div>
        </div>
      </section>

      <section>
        <Insti/>
      </section>

      <section className={styles.form}>
        <Form
          initialData={{ deviceCount: 1 }}
          ref={formRef}
          onSubmit={handleFormSubmit}
        >
          <section>
            <FormPersonal
              setAddress={setAddress}
              isLoading={loading}
              handleCreateDevice={handleCreateDevice}
              handleDeleteDevice={handleDeleteDevice}
              handleOnChange={handleOnChange}
            />

            <FormDevices devices={devices} devicesError={devicesError} />

            <button type="submit" className={styles.button}>Enviar</button>
          </section>
        </Form>
      </section>

      <footer className={styles.footer}>
        <a
          href="https://www.appmasters.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by saviorbp for {' '}
          <span className={styles.logo}>
            <Image src="/appm.svg" alt="App Masters Logo" width={50} height={50} />
          </span>
        </a>
      </footer>
    </div>
  );
}

function getApi(x) {
  if (x == true) {
    return <p className={styles.on}>API online</p>;
  } else if (x == false) {
    return <p className={styles.off}>API offline</p>;
  }
}

Home.getInitialProps = async () => {
  const response = await api.get(
    "https://api-doacao-pc-app-master.herokuapp.com"
  );

  return { dados: response.data.alive };
};