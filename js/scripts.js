/* Hola! Vaig intentar fer el fetch sense proxy però vaig trobar un error de CORS.
Com que és configuració interna del servidor no hi tinc accés, així que amb una mica
d'stackoverflow vaig fer un workaround amb un proxy. Si l'executeu s'ha d'activar
a la pestanya de network de l'inspector del navegador. Activeu a: 
https://cors-anywhere.herokuapp.com/corsdemo*/

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const targetUrl = "https://demos.geprom.com/datos.php";
const url = proxyUrl + targetUrl;

const data = {
  respuesta1: 0,
  respuesta2: 0,
  respuesta3: 0,
  respuesta4: 0,
};

async function fetchData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const fetchedData = await response.json();

    // Update the data object with the fetched data
    data.respuesta1 = fetchedData.respuesta1;
    data.respuesta2 = fetchedData.respuesta2;
    data.respuesta3 = fetchedData.respuesta3;
    data.respuesta4 = fetchedData.respuesta4;

    // Call updateContent to update the UI
    updateContent();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

// Function to update the content of the HTML elements
function updateContent() {
  // Get each HTML element by its ID
  const answer1Element = document.getElementById("info-answer1");
  const answer2Element = document.getElementById("info-answer2");
  const answer3Element = document.getElementById("info-answer3");
  const answer4Element = document.getElementById("info-answer4");

  const filler1 = document.getElementById("bar1-filler");
  const filler2 = document.getElementById("bar2-filler");
  const filler3 = document.getElementById("bar3-filler");
  const filler4 = document.getElementById("bar4-filler");

  // Update the content of each element
  answer1Element.textContent = `${data.respuesta1} votos`;
  answer2Element.textContent = `${data.respuesta2} votos`;
  answer3Element.textContent = `${data.respuesta3} votos`;
  answer4Element.textContent = `${data.respuesta4} votos`;

  // Calculate the total votes
  var totalVotes =
    data.respuesta1 + data.respuesta2 + data.respuesta3 + data.respuesta4;
  // Calculate the percentage of votes for each answer
  var percentage1 = Math.round((data.respuesta1 / totalVotes) * 100);
  var percentage2 = Math.round((data.respuesta2 / totalVotes) * 100);
  var percentage3 = Math.round((data.respuesta3 / totalVotes) * 100);
  var percentage4 = Math.round((data.respuesta4 / totalVotes) * 100);

  filler1.style.width = percentage1 + "%";
  filler2.style.width = percentage2 + "%";
  filler3.style.width = percentage3 + "%";
  filler4.style.width = percentage4 + "%";
}

// Fetch data initially and then set an interval to update every 3s
fetchData();
setInterval(fetchData, 3000);
