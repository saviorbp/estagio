import axios from "axios";

function getApi(x) {
  var a = "api online";
  var b = "api offline";

  if (x == true) {
    return <h1>{a}</h1>;
  } else if (x == false) {
    return <h1>{b}</h1>;
  }
}

const Index = ({ dados }) => (
  <div className="container">
      <center>
      <h1>Doação de computadores usados</h1>
      {getApi(dados)}
    </center>
  </div>
);

Index.getInitialProps = async () => {
  const response = await axios.get(
    "https://doar-computador-api.herokuapp.com/"
  );

  return { dados: response.data.alive };
};

export default Index;
