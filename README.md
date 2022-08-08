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

## 1ª Etapa - Bootstraping

Nesta etapa queremos criar o projeto básico, o mínimo necessário para sairmos do zero.

**Início: 22/07/2022 - envio dos projetos: até 25/07/2022 - resultado: 27/07/2022**   

Tarefas da etapa:   
- Criar projeto backend/frontend seguindo as instruções abaixo (frontend ou backend)
- Criar repositório para seu projeto no github
- Deixar no readme apenas a informação que se trata de um projeto de seleção nosso, com link para nosso site
- Nos enviar a url do seu repositório por [este link](https://programador.emjuizdefora.com/responder/256/) para que possamos avaliar o que foi feito


### Frontend

- Criar projeto usando Next.js
- Na rota inicial, exibir com `<H1>` com "Doação de computadores usados"
- Instalar pacote AXIOS no projeto
- Ao renderizar a interface (apenas uma vez) fazer uma chamada get para [doar-computador-api.herokuapp.com](https://doar-computador-api.herokuapp.com/) e obter a resposta, que será algo como `{alive:true}`
- Se `alive` for `true`, exibir em um `<P>` "API online", se `false` exibir "API offline"

### Backend

O backend será uma API do projeto de doação, que receberá os dados enviados pelos usuários no frontend, e também retornará informações (nas próximas etapas).

- Criar projeto usando Node puro (sem framework) e express
- Ter apenas uma rota GET, a raiz (`/`)
- Na raiz retornar status 200, um objeto json `{alive: true}` (sempre `true`)
- Criar um teste (com jest, superTest, ou [node:test](https://nodejs.org/docs/latest-v18.x/api/test.html)), que faça uma chamada em `/` e dê sucesso caso o resultado seja `{alive: true}`

# Dicas de ouro

- Fique atento a toda informação passada e siga o que foi pedido
- Fazer a menos não é bom, fazer a mais não é necessário nesta primeira etapa
- Estaremos atentos a sua facilidade em seguir as instruções dadas e sua comunicação
- O TypeScript pode ser usado no projeto, mas pode ser o JavaScript sem problema

# 3ª Etapa - Back e front juntos

Chegou a hora de trabalhar em equipe, e de ficar mais imerso no ambiente real de desenvolvimento de um projeto.

Nesta etapa back e front terão que conversar, ou seja, um projeto de front irá consumir um projeto de back, de candidatos do próprio processo. Com isso nosso back será desativado.

Entre os que estão nesta etapa, sortearemos 🎲 dois fones de ouvido 🎧 bluetooth. Os vencedores poderão escolher 🤩 entre três modelos diferentes. Mandaremos mais detalhes no grupo do whatsapp nesta semana.

**Início: 02/08/2022 - envio dos projetos: até meia noite de 07/08/2022 - resultado: 10/08/2022**   

O objetivo é validar se você consegue se comunicar bem com outro candidato para tentarem fazer o projeto dar certo, além de evoluir suas atividades individuais.

Quem for do front deverá melhorar seu projeto da forma que achar necessário, além de algumas tarefas extras.

Quem for do back precisará realizar o deploy do seu projeto (para que o front possa ir usando), mas também conectar a um banco de dados para persistir os dados.

Tarefas da etapa:   
- Nos informar quais dias e irá focar mais no projeto [neste link](https://programador.emjuizdefora.com/responder/256/), para encontrarmos um parceiro pra você ainda na terça-feira
- Implementar sua parte do projeto de seleção
- Ao final das atividades, seguir pelo formulário [neste link](https://programador.emjuizdefora.com/responder/256/) (que apresentará outra perguntas) para confirmar suas atividades.

Iremos avaliar as entregas de cada candidato de forma independente, não como um grupo. Mas a integração com a parte de seu parceiro será observada.

## Comunicação

Teremos nove duplas (back/front), onde cada dupla terá um canal exclusivo no nosso slack, com o Tiago Gouvêa, João Baraky, e também o João Bast (frontend) e Bruno Pinheiro (backend) pra te ajudarem e darem suporte.

Conforme formos recebendo as respostas dos dias e horários iremos criando as equipes, e então enviaremos o convite para o slack já para o canal certo. A meta é até o final da terça-feira já termos todos no slack.

Com isso o grupo do whatsapp não será mais necessário pra se comunicar conosco, apenas o slack.

A maioria das empresas de tecnologia utiliza o [Slack](https://slack.com/) para se comunicar internamente, então é bom você já ir se acostumando com ele.

## Daily

Pra gente acompanhar o andamento da sua parte do projeto (e pro outro dev da sua equipe também) você deverá enviar sua daily escrita no canal do slack assim que começar todos os dias (sem hora marcada), respondendo as perguntas:
- O que implementou ontem?
- O que não conseguiu implementar (agarrou) ontem?
- O que irá implementar hoje?
- O que será mais difícil fazer hoje?
- Tem algo te bloqueando de avançar? O que é?

## Frontend

- Ajustar a interface para ficar responsiva, testando como se fosse vista no computador, tablet e celular, em três dimensões no mínimo
- Criar uma lista de instituições que podem receber doações
- Enviar os dados do formulário para o backend do seu parceiro
- Fazer deploy do projeto para o vercel/heroku (ou outro que você prefira)

Quanto a lsita de instituições, crie um menu para ir para esta listagem ou outra forma de acesso para a lista, que deverá estar na rota `/instituicoes`, visto que a pagina inicial ainda é o formulário. Mostre o nome da instituição, cidade, bairro, apresentação breve da instituição, e links para site, instagram, facebook e whatsapp. Crie (no código mesmo) pelo ao menos cinco instituições fictícias (mock) só pra gente ver mesmo, sem nenhuma integração com API nenhuma.

Ao consumir o backend de seu parceiro, eventualmente será necessário fazer alguns ajustes nos retornos e confirmar que tudo continua funcionando. 

Não existirá mais os erros aleatórios forçados na API do seu parceiro, mas, quando der um erro será um problema de verdade, e precisará falar com ele para acharem o problema.

Não queremos que o candidato de back da sua equipe te prejudique, de forma alguma, então observe que nesta etapa você deverá apontar para a API do candidato, porém é uma parte pequena da sua atividade, uma vez que a API dele já deve estar bem parecida com a que você usou na segunda etapa.

Vá avançando nas outras tarefas, inclusive a de deploy, enquanto ele movimenta a parte dele. Se você estiver só dependendo dele, diga na sua daily.

Caso sinta que seu parceiro não está te respondendo a tempo, ou que não dará certo com ele, nos avise (pelo slack mesmo) para te direcionarmos para outro backend (de outro candidato).
