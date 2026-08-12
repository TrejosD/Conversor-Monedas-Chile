const chart = document.querySelector('#chart');
const input = document.querySelector('#input');
const result = document.querySelector('#result');
const select = document.querySelector('#monedaSelect');
const btn = document.querySelector('#button');
let grafico = null;

// metodo obtiene informacion del endpoint mindicator
async function getCurrencyValue() {
    try {
      const res = await fetch('https://mindicador.cl/api');
      const data = await res.json();
      return data;
    } catch (error) {
      showUiError()
    }
  }
  // metodo muestra al usuario un problema
  function showUiError(){
    const container = document.querySelector('.container');
    container.style.border = '2px red solid';
    btn.textContent = 'Servicio no disponible'
    
  }
  // metodo actualiza el select de acuerdo a la respuesta del endpoint
  async function renderSelectUI() {
    try {
      const currencies = await getCurrencyValue();
      const dollar = currencies.dolar;
      const dolarInter = currencies.dolar_intercambio;
      const euro = currencies.euro;
      let html = `
      <option value="${dollar.valor}">${dollar.codigo}</option>
      <option value="${euro.valor}">${euro.codigo}</option>
      <option value="${dolarInter.valor}">${dolarInter.codigo}</option>`;
      select.innerHTML = html;
    } catch (error) {
      showUiError()
      
    }
}
// este metodo retorna el historico de una modena en particular
async function getCurrencyHistory(currency){
  try {
    const res = await fetch(`https://mindicador.cl/api/${currency}`)
    const data = await res.json()
    const arrayByDate = data.serie;
    // aca filtramos para obtener solamente los ultimos 10 fechas para el grafico
    const filterArray = arrayByDate.slice(arrayByDate.length - 10)
    return filterArray;
  } catch (error) {
    showChartError()
  }
}

renderSelectUI();
// al hacer click en el boton, eliminamos el grafico para reconstruirlo, modificamos el dom con la conversion de divisas y construccion del grafico.
btn.addEventListener('click', async ()=>{
  try {
    if(grafico != null) grafico.destroy();
    let value = input.value;
    input.value = '';
    let selectValue = select.value;
    let currencyChange = value/selectValue;
    result.innerHTML = currencyChange.toFixed(2);
    const selectedItem = select.selectedOptions[0];
let data = await getCurrencyHistory(selectedItem.text);
let config = await createChartData(data, selectedItem.text);
grafico = new Chart(chart, config);
  } catch (error) {
    showChartError()
  }
})

function showChartError(){
  let config = {
    type: 'bar',
    data: {
      labels: ['unknow'],
      datasets:[
        {
          label: 'No fue posible mostrar la información',
          backgroundColor: 'red',
          data: [100],
        }
      ]
    }
  }
  grafico = new Chart(chart, config)
}

// metodo crea la configuracion necesario para crear el grafico
function createChartData(data, text) {
        const type = "line";
        const capitalizeText = (string) => string.charAt(0).toUpperCase() + string.slice(1);
        const fecha = data.map((item) => item.fecha);
        const titulo = `${capitalizeText(text)} History`;
        const color = "red";
        const valores = data.map((valor) => valor.valor);
        const config = {
          type: type,
          data: {
            labels: fecha,
            datasets: [
              {
                label: titulo,
                backgroundColor: color,
                data: valores,
              },
            ],
          },
        };
        return config;
      }
