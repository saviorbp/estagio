import React from 'react';
import InputMask from './input';
import Select from './select';
import styles from '../styles/Home.module.css';

export function FormPersonal({
  setAddress,
  handleCreateDevice,
  isLoading,
  handleDeleteDevice,
  handleOnChange
}) {
  return (
    <div>
      <h3>Formulário de Doação</h3>
      <div>
        <div className={styles.formgroup}>
          <InputMask className={styles.inputcm} name="name" placeholder="nome" onChange={({ target }) => {
            handleOnChange('name', target.value);
          }} />
        </div>
        <div className={styles.formgroup}>
          <InputMask className={styles.inputcontrol} id="email" type="email" name="email" placeholder="email" onChange={({ target }) => {
            handleOnChange('email', target.value);
          }}/>
          <InputMask className={styles.inputcontrol} id="phone" name="phone" placeholder="telefone" mask="99999999999" 
          onChange={({ target }) => {
            const length = target.value.replaceAll(/[\s()-]/g, '').length;
            handleOnChange('phone', target.value);
          }}/>
        </div>
        <div className={styles.formgroup}>
          <InputMask
            className={styles.inputcontrol}
            id="zip"
            name="zip"
            placeholder="cep"
            mask="99999999"
            onChange={({ target }) => {
              const length = target.value.replaceAll('_', '').length;
              if (length === 8) setAddress(target.value);
              handleOnChange('zip', target.value);
            }}
          />
          {isLoading && <span>Carregando</span>}
          <InputMask className={styles.inputcontrol} id="city" name="city" placeholder="cidade" 
          onChange={({ target }) => {
            handleOnChange('city', target.value);
          }}/>
        </div>
        <div className={styles.formgroup}>
          <InputMask className={styles.inputcontrol} id="state" name="state" placeholder="estado"
          onChange={({ target }) => {
            handleOnChange('state', target.value);
          }} />
          <InputMask className={styles.inputcontrol} id="neighborhood" name="neighborhood" placeholder="Bairro" 
          onChange={({ target }) => {
            handleOnChange('neighborhood', target.value);
          }}/>
        </div>
        <div className={styles.formgroup}>
          <InputMask className={styles.inputcontrol} id="streetAddress" name="streetAddress" placeholder="rua" 
          onChange={({ target }) => {
            handleOnChange('streetAddress', target.value);
          }}/>
          <InputMask className={styles.inputcontrol} id="number" name="number" type="number" placeholder="número"
          onChange={({ target }) => {
            handleOnChange('number', target.value);
          }}/>
        </div>
        <div className={styles.formgroup}>
          <InputMask className={styles.inputcm} id="complement" name="complement" placeholder="complemento" 
          onChange={({ target }) => {
            handleOnChange('complement', target.value);
          }}/>
        </div>
      </div>

      <h3>Equipamentos que serão doados</h3>

      <div className={styles.InputMask}>
        <p>Quantidade de equipamentos :</p>
        <InputMask className={styles.button1} min="1" type="number" name="deviceCount"
          onChange={({ target }) => {
            handleCreateDevice(target.value);
            handleDeleteDevice(target.value);
          }}
        />
      </div>
    </div>
  );
}

export function FormDevices({ devices, devicesError }) {
  return (
    <section className={styles.selectgroup}>
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
                className={styles.selectbox}
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
                className={styles.selectbox}
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
    </section>
  );
}
