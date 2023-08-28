const firebaseConfig = {
  apiKey: "AIzaSyDdmPN2P406uvOqSuzGmCHqxfECbLSkR40",
  authDomain: "crud-firebase8.firebaseapp.com",
  databaseURL: "https://crud-firebase8-default-rtdb.firebaseio.com",
  projectId: "crud-firebase8",
  storageBucket: "crud-firebase8.appspot.com",
  messagingSenderId: "49784640914",
  appId: "1:49784640914:web:0135986179d17dc59d9d4b",
  measurementId: "G-BDZNFMZKZ7"
};

// Inicializando o Firebase //

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const urlApp = "http://127.0.0.1:5500/";

function loginGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithPopup(provider).then((result) => {
    window.location.href = `${urlApp}/home.html`
  }).catch((error) => {
    alert(`Erro ao efetuar o login ${error.message} `)
  });
}






function verificaLogado() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      //Salvamos o id do user localmente
      localStorage.setItem('usuarioId', user.uid)
      //Inserindo a imagem do usuário
      let imagem = document.getElementById('imagemUsuario')

      user.photoURL ? imagem.innerHTML += `<img src="${user.photoURL}" alt ="Foto do Usuário" title="${user.displayName}" class="img rounded-circle" width="48" />` : `<img src="images/logo-google.svg"  class="img rounded-circle" width="48" />`
    }
    else {
      console.error('Usuário não logado! ')
      window.location.href = `${urlApp}`
    }
  })
}














function logoutFirebase() {
  firebase.auth().signOut().then(function () {
    localStorage.removeItem('usuarioId')
    window.location.href = `${urlApp}/`
  }).catch(function () {
    alert(`Não foi possível fazer o logout: ${error.message}`)
  })



}

async function salvaEstabelecimento(estabelecimento) {
  let usuarioAtual = firebase.auth().currentUser

  return await firebase.database().ref('estabelecimentos').push({
    ...estabelecimento, usuarioInclusao: {
      uid: usuarioAtual.uid,
      nome: usuarioAtual.displayName
    }
  }).then(() => {
    alert('Registro incluído com sucesso!')
    //Limpa o form
    document.getElementById('formCadastro').reset()
  }).catch(error => {
    alert(`Erro ao salvar ${error.message}`)
  })
}