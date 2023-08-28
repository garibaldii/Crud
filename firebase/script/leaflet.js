async function carregaMapa() {
    console.log("teste")
    const geo = {
        lat: -23.536692,//possível erro, n tô enxergando direito
        long: -47.443943

    }

    let map = L.map('map').setView([geo.lat, geo.long], 15)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: 'OpenStreetMap' }).addTo(map)

    //erro por conta da falta de async
    await firebase.database().ref('estabelecimentos').on('value', (snapshot) => {
        snapshot.forEach(item => {
            const dados = item.val()
            const marker = L.marker([dados.latitude, dados.longitude]).addTo(map)

            marker.bindToolTip(dados.razao)
            marker.bindPopup(`<b>${dados.razao}</b> <br> Incluido por ${dados.usuarioInclusao.nome}`)
        })
    })
}