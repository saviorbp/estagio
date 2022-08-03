import styles from '../styles/Home.module.css';
import React from 'react';
import InputMask from './input';
import Select from './select';

export function FormPersonal({
  setAddress,
  handleCreateDevice,
  isLoading,
  handleDeleteDevice,
}) {
  return (
    <div className={styles.form}>
      <h2 className={styles.title.h2}>Formulário de Doação</h2>
      <div>
        <InputMask className={styles.card} id="name" name="name" placeholder="nome" />
        <InputMask className={styles.card} id="email" type="email" name="email" placeholder="email" />
        <InputMask className={styles.card} id="phone" name="phone" placeholder="telefone" mask="99 999999999" />
        <InputMask
          className={styles.card}
          id="zip"
          name="zip"
          placeholder="cep"
          mask="99999999"
          onChange={({ target }) => {
            const length = target.value.replaceAll('_', '').length;
            if (length === 8) setAddress(target.value);
          }}
        />
        {isLoading && <span>Carregando</span>}
        <InputMask className={styles.card} id="city" name="city" placeholder="cidade" />
        <InputMask className={styles.card} id="state" name="state" placeholder="estado" />
        <InputMask className={styles.card} id="neighborhood" name="neighborhood" placeholder="Bairro" />
        <InputMask className={styles.card} id="streetAddress" name="streetAddress" placeholder="rua" />
        <InputMask className={styles.card} id="number" name="number" placeholder="número" />
        <InputMask className={styles.card} id="complement" name="complement" placeholder="complemento" />
      </div>

      <div className={styles.form}>
        <h2>Equipamentos que serão doados</h2>
        <label>Quantidade de equipamentos :
        <InputMask className={styles.box} min="1" type="number" name="deviceCount"
          onChange={({ target }) => {
            handleCreateDevice(target.value);
            handleDeleteDevice(target.value);
          }}
          />
          </label>
      </div>
    </div>
  );
}

export function FormDevices({ devices, devicesError }) {
  return (
    <div>
      {devices.map((device, index) => {
        return (
          <div key={index}>
            <h4>{`Equipamento ${index + 1
              }:`}</h4>

            {devicesError && (
              <p>
                {'*Os campos tipo e estado de conservação são obrigatórios'}
              </p>
            )}

            <div>
              <Select
                className={styles.select}
                name={`devices.${index}.type`}
                placeholder="Tipo de equipamento"
                instanceId={`selectType${index}`}
                options={[
                  { value: 'notebook', label: 'Notebook' },
                  { value: 'desktop', label: 'Desktop' },
                  { value: 'netbook', label: 'Netbook ' },
                  { value: 'screen', label: 'Monitor ' },
                  { value: 'printer', label: 'Impressora' },
                  { value: 'scanner', label: 'Scanner ' },
                ]}
                devicesError={devicesError}
              />
              <Select
                className={styles.select}
                name={`devices.${index}.condition`}
                placeholder="Estado de conservação"
                instanceId={`selectCondition${index}`}
                options={[
                  {
                    value: 'working',
                    label: 'Tem todas as partes, liga e funciona normalmente',
                  },
                  {
                    value: 'notWorking',
                    label: 'Tem todas as partes, mas não liga mais',
                  },
                  {
                    value: 'broken',
                    label: 'Faltam peças, funciona só as vezes ou está quebrado',
                  },
                ]}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
