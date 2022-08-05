import { Form } from '@unform/web';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import { FormDevices } from '../form/form';
import { FormPersonal } from '../form/form';
import api from './api/api';
import { fetchCep } from '../util/fetchcep';
import { testeDevice } from '../util/testedevice';
import Image from 'next/image';
import React from 'react';

export default function Home({ dados }) {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [devices, setDevices] = useState([{ value: '', label: '' }]);
  const [devicesError, setDevicesError] = useState(false);

  const setAddress = useCallback((value) => {
    setLoading(true);

    fetchCep(value).then((response) => {
      if (response.city !== undefined) {
        document.getElementById('state').value = response.state;
        document.getElementById('city').value = response.city;
        document.getElementById('streetAddress').value = response.streetAddress;
        document.getElementById('neighborhood').value = response.neighborhood;
        document.getElementById('number').focus();
      }
      setLoading(false);
    });
  }, []);

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

    const data = JSON.stringify(form);

    try {

      form.devices.forEach((device) => {
        if (device.type == undefined || device.condition == undefined) {
          setDevicesError(true);
        } else setDevicesError(false);
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
          ' dados inválidos ou faltando precisamos de todos os dados para a doação \nStatus 400'
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

      <header>
        <div class="container">
          <img
            src="/appmasters.svg"
            alt="Pc4All"
          />
        </div>
      </header>

      <section class="hero">
        <div class="container">
          <div>
            <h2>
              Doação de computadores usados
            </h2>
            {getApi(dados)}
          </div>
        </div>
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
    return <p class="on">API online</p>;
  } else if (x == false) {
    return <p class="off">API offline</p>;
  }
}

Home.getInitialProps = async () => {
  const response = await api.get(
    "https://doar-computador.herokuapp.com/"
  );

  return { dados: response.data.alive };
};