/** 
 * Obtém o CEP na API ViaCEP
 * @param {string} cep - o cep que será consultado
 * @param {function} callback - callback com o retorno 
 * 
 * */ 

function getCEP(cep, callback){
    let URL =`https://viacep.com.br/ws/${cep}/json`
    fetch(URL).then(response => response.json()).then(data => {
        //Verifica se o retorno possui propriedade cep
        if ('cep' in data){
            let result = data
            let logradouro = `${result.logradouro}, ${result.localidade}, ${result.uf}`
            callback(null, logradouro)
        }
        else{
            callback(`O CEP É INEXISTENTE`, null)
        }
    }).catch(error => {
        callback(error, null)
    })
}

function getLatLong(endereco, callback){
    let url =`https://nominatim.openstreetmap.org/search?format=json&q=${endereco}`
    fetch(url).then(response => response.json()).then(data => {
        //Verifica se o retorno possui propriedade cep
        console.log(data)
        if (data.length > 0){
            let result = data[0]
            let lat = parseFloat(result.lat)
            let lon = parseFloat(result.lon)
            callback(null, lat, lon)
        }
        else{
            callback(`Endereço não encontrado`, null, null)
        }
    }).catch(error => {
        callback(error, null, null )
    })
}