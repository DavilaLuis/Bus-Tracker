
//get token at https://account.mapbox.com
mapboxgl.accessToken = 'pk.eyJ1IjoibHVpc2RhdmlsYSIsImEiOiJja3V5d2ZieDkyaXltMnVvZHRmNHo5ZHlqIn0.UkHbbu2kkg0OOo07lUrODg';

const map = new mapboxgl.Map({
    container : 'map',
    style :  'mapbox://styles/mapbox/streets-v11',
    center : [-71.091542,42.358862],
    zoom : 12
});

var marker = new mapboxgl.Marker()
.setLngLat([-71.092761 , 42.357575])
.addTo(map);

var listBuses = document.getElementById("Buses");
let indice = 0;

async function run(){
// get bus data    
const locations = await getBusLocations();
console.log(new Date());


console.log(indice);
marker.setLngLat([locations[indice].attributes.longitude , locations[indice].attributes.latitude]).addTo(map);


// timer
setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations(){
const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
const response = await fetch(url);
const json     = await response.json();
const estado = await showList(json.data,listBuses,indice);
return json.data;
}

// Orderina and showing select list
function showList(locations, select, index){
var length = select.options.length;
// clearing old options
for (i = length-1; i >= 0; i--) {
select.options[i] = null;
}

// adding options depending on data
for (let i=0; i<locations.length; i++)
{
var opcion = document.createElement("option");
opcion.text = locations[i].attributes.label;
opcion.value = locations[i].attributes.label;
select.appendChild(opcion);
}
select.selectedIndex = index;
}

function test(){
indice = document.getElementById('Buses').selectedIndex;
console.log('change');

}

run();

