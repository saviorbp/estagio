# Doar Computadores

> Processo de seleção para estágio JavaScript da [App Masters](https://appmasters.io)

Este repositório contem informações sobre o processo de seleção, e será atualizado a cada etapa, seguindo as datas combinadas.

# O Projeto

🎯 O objetivo deste projeto é ajudar pessoas que desejam doar computadores usados, e que estes sejam destinados às pessoas que estejam precisando, ao invés de irem para reciclagem.

Para isso precisamos criar um site/plataforma/sistema por onde o interessado em doar poderá
incluir sua doação, sabendo que se fará bom uso aquele equipamento.

👉 Ao final do processo de seleção, um projeto será publicado em [doarcomputador.com.br](doarcomputador.com.br), e será divulgado para utilização real.

É importante pra nós que todos se divirtam 😄 e aprendam 📚 enquanto estejam no processo conosco. 

# O Processo

O processo acontecerá em 3 ou 4 etapas, com dificuldade crescente, para encontrarmos aqueles estudantes mais animados, interessados e corajosos.

Ao final de cada etapa atualizaremos aqui o repositório com os nicknames dos candidatos que avançaram. A previsão é que o processo todo aconteça em cerca de 12 dias.

Os participantes deverão optar pelo projeto frontend ou backend nas primeiras etapas. Se você se sente fullstack, por agora, terá que optar por um dos lados.

Aqueles que passarem da segunda etapa (para a terceira), estarão concorrendo 🤩 a prêmios como fone de ouvido e um cafeteira Nespresso.

# 1ª Etapa - Bootstraping

Nesta etapa queremos criar o projeto básico, o mínimo necessário para sairmos do zero.

**Início: 22/07/2022 - envio dos projetos: até 25/07/2022 - resultado: 27/07/2022**   

Tarefas da etapa:   
- Criar projeto backend/frontend seguindo as instruções abaixo (frontend ou backend)
- Criar repositório para seu projeto no github
- Deixar no readme apenas a informação que se trata de um projeto de seleção nosso, com link para nosso site
- Nos enviar a url do seu repositório por [este link](https://programador.emjuizdefora.com/responder/256/) para que possamos avaliar o que foi feito


## Frontend

- Criar projeto usando Next.js
- Na rota inicial, exibir com `<H1>` com "Doação de computadores usados"
- Instalar pacote AXIOS no projeto
- Ao renderizar a interface (apenas uma vez) fazer uma chamada get para [doar-computador-api.herokuapp.com](https://doar-computador-api.herokuapp.com/) e obter a resposta, que será algo como `{alive:true}`
- Se `alive` for `true`, exibir em um `<P>` "API online", se `false` exibir "API offline"

# 2ª Etapa - Formulário e envio dos dados

Nesta etapa queremos criar o formulário para enviar a doação. O doador irá informar quantos equipamentos serão doados, e deverá dar os detalhes de cada um dos equipamentos.

Quem for frontend irá desenvolver a interface de envio, e o back irá lidar com o recebimento dos dados. 

É necessário fazer apenas um deles, não é preciso fazer os dois, ou seja, dê sequencia no seu projeto.

**Início: 27/07/2022 - envio dos projetos: até 31/07/2022 - resultado: 02/08/2022**   

Estrutura dos dados a serem enviados/recebidos.

```
{
    name,
    email,
    phone,
    zip,
    city,
    state,
    streetAddress,
    number,
    complement,
    neighborhood,
    deviceCount,
    devices: [
        {type, condition},
        {type, condition},
        ...
    ]
}
```

Todos campos são obrigatórios (inclusive em `devices`), exceto o endereço de email e complement.

Tarefas da etapa:   
- Implementar sua parte do projeto de seleção
- Ao final das atividades, seguir pelo formulário [neste link](https://programador.emjuizdefora.com/responder/256/) para confirmar suas atividades.

## Frontend

- Criar formulário com duas sessões
- O formulário deve ficar na primeira página, para facilitar a doação
- Manter o projeto usando o Next, ou seja, não implementar o react-router

### Primeira parte, dados pessoais
- A primeira parte recebe os dados pessoais do doador
- Campos de dados pessoais: Nome, e-mail, telefone
- Do endereço, o primeiro campo deverá ser o CEP
- Ao digitar o CEP, exibir um loading enquanto se obtem o endereço
- Caso consiga obter o endereço, preencher os campos e levar o foco para o campo number
- Após estes campos a pessoa irá informar "Quantos equipamentos serão doados"
- Ao informar "1", será exibido abaixo um formulário único formulário de detalhes do equipamento, se "2" então dois formulários, e assim por diante

### Segunda parte, equipamentos
- A segunda parte recebe dados dos equipamentos a serem doados
- Campos dos equipamento para doação: Tipo de equipamento, Estado
- Tipos de equipamento: Notebook, Desktop, Netbook, Monitor, Impressora, Scanner
```
- Notebook - value: notebook
- Desktop - value: desktop
- Netbook - value: netbook
- Monitor - value: screen
- Impressora - value: printer
- Scanner - value: scanner
```
- Estado de conservação (o usuário deverá escolher um deles): 
```
- Tem todas as partes, liga e funciona normalmente - value: working
- Tem todas as partes, mas não liga mais - value: notWorking
- Faltam peças, funciona só as vezes ou está quebrado - value: broken
```

### Envio dos dados
- Enviar os dados (como apresentados acima) via POST para [doar-computador-api.herokuapp.com/donation](https://doar-computador-api.herokuapp.com/donation)
- A API irá falhar com alguma frequência (pra dificultar sua vida), retornando status diferente de `200`. Lide com isso dando feedback ao usuário que o servidor falhar, dizendo algo como "O servidor falhou em responder. Tente mais tarde."
- Ao enviar dados inválidos ou faltando, será retornado o status `400` com detalhes do erro. Lide com isso e dê também o feedback correto ao usuário.

Observação: nossa API só terá esse endpoint no final do dia 27
