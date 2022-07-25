import axios from "axios";

//função para saber o statos da API.
function getApi(x) {
  if (x == true) {
    return <p>API online</p>;
  } else if (x == false) {
    return <p>API offline</p>;
  }
}

//imprimindo na tela a frase pedida e o resultado. 
const Index = ({ dados }) => (
  <div className="container">
    <center>
      <h1>Doação de computadores usados</h1>
      {getApi(dados)}
    </center>
  </div>
);

//consumindo a API com axios.
Index.getInitialProps = async () => {
  const response = await axios.get(
    "https://doar-computador-api.herokuapp.com/"
  );

  return { dados: response.data.alive };
};

export default Index;
