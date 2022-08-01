import axios from 'axios';

export async function fetchCep(zip) {
  
  var state;
  var city;
  var streetAddress;
  var neighborhood;
  
  const { data } = await axios.get(`https://viacep.com.br/ws/${zip}/json/`);
  
  state = data.uf;
  city = data.localidade;
  streetAddress = data.logradouro;
  neighborhood = data.bairro;
  
  return { state, city, streetAddress, neighborhood };
}
