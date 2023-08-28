const geo = {
    lat: -23.53091,
    long: -47.44925
};


let mapa = L.map('map').setView([geo.lat, geo.long], 15)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'OpenStreetMap'
}).addTo(mapa)

/*Adicionar círculo*/

let circle = L.circle([geo.lat, geo.long], {
    color: '#EF3340',
    fillColor: '#800A12',
    fillOpacity: 0.7,
    radius: 50
}).addTo(mapa)

circle.bindTooltip('Fatec Votorantim')
circle.bindPopup('<b>Fatec Votorantim </b> <br> Criada em 2023... <br> <img src="https://bkpsitecpsnew.blob.core.windows.net/uploadsitecps/sites/1/2023/02/52561425436_bb81cae2ab_o.jpg" width="200" /> ').openPopup()

var greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});


let marker = L.marker([-23.53234, - 47.44976], { icon: greenIcon }).addTo(mapa);
marker.bindTooltip("Splice");

let restauranteA = L.marker([-23.534657, -47.448504]).bindPopup('Restaurante A'),
 restauranteB = L.marker([-23.535267, -47.439983]).bindPopup('Restaurante B'),
 restauranteC = L.marker([-23.539716, -47.441958]).bindPopup('Restaurante C')

 let restaurantes = L.layerGroup([restauranteA, restauranteB, restauranteC])

 restaurantes.eachLayer(function (layer){
    layer.setIcon(greenIcon)
 })

 let overlayRestaurantes = {"Restaurantes": restaurantes}
 layerControl = L.control.layers(null, overlayRestaurantes).addTo(mapa)

let popup = L.popup();
let criaMarcador = true;


 function onMapClick(e){
    if (criaMarcador){
        popup
        .setLatLng(e.latlng)
        .setContent("Você clicou no mapa em " + e.latlng.toString()).openOn(mapa)

        let autoMarker = L.marker(e.latlng).addTo(mapa)
    }
}

mapa.on('click', onMapClick)

/*Criando um botão personalizado no mapa */
let limpa = L.Control.extend({
    onAdd: function(map){
        let container = L.DomUtil.create('div', 'leaftlet-bar leaflet-control')
        container.innerHTML = "<button onclick = 'limparMarcadores()' class='limpa-mapa'> Limpar </button>"
        return container
    }
})

mapa.addControl(new limpa())

/*Função para limpar os marcadores */

function limparMarcadores(){
    criaMarcador = false;
    mapa.eachLayer(function (layer){
        if (layer instanceof L.marker){
            mapa.removeLayer(layer)
        }
    })
}

/*Obter a geolocalização */

if (navigator.geolocation){
    //Exibe msg inificial
    document.getElementById('mensagem').textContent = 'Obtendo a localização, aguarde...'
    navigator.geolocation.getCurrentPosition(function (position){
        document.getElementById('mensagem').textContent='✔Localização obtida com sucesso!'
        geo.lat = position.coords.latitude
        geo.long = position.coords.longitude
        mapa.setView([geo.lat, geo.long], 16)
    }, function (error){
        document.getElementById('mensagem').textContent = '❌Usuário não autorizou a busca da localização'
        console.log(error)
    })
} else{
    document.getElementById('mensagem').textContent = "❌ Geocalização não suportada pelo navegador"
}