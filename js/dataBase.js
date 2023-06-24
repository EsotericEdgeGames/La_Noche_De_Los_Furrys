let existeNombre = localStorage.getItem("nombre")
if (existeNombre){
    document.getElementById("input1").value = localStorage.getItem("nombre")
}
function enviarFormulario(){
    var nombre = document.getElementById("input1").value;
    var datosJugador = {
        nombre: nombre,
        puntuacion: puntos
    };
    console.log(jugadoresRef)
    jugadoresRef.add(datosJugador)
    .then(function(docRef) {
        localStorage.setItem("nombre",nombre)
        puntuacionTotalDisplay.textContent = "Subido exitosamente!"
        recargarPuntajes()
    })
    .catch(function(error) {
      puntuacionTotalDisplay.textContent = "Ha ocurrido un error :("
    });
    transicionar(document.getElementById("myForm"),"desaparecer")
}

// Inicializa Firebase con tus credenciales
//
const firebaseConfig = {
  apiKey: "AIzaSyAKQAn_i4PWbbefbimKCFZGZyVX-KCm8bo",
  authDomain: "la-noche-de-los-furrys.firebaseapp.com",
  projectId: "la-noche-de-los-furrys",
  storageBucket: "la-noche-de-los-furrys.appspot.com",
  messagingSenderId: "530941332596",
  appId: "1:530941332596:web:185fa7f7dc2eb7c1939521",
  measurementId: "G-4R108R9PQM"
};
  
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var jugadoresRef = db.collection("jugadores");
var jugadoresRefOrdenados = db.collection("jugadores").orderBy("puntuacion","desc");

recargarPuntajes()
function recargarPuntajes(){
    jugadoresRefOrdenados.get().then(function(e){
        let i = 0
        e.forEach(function(doc,index){
            i++
            var nombre = doc.data().nombre
            var puntuacion= doc.data().puntuacion
            var elemento = document.getElementById(i)
            if (i>10){
                return
            }
            elemento.textContent = nombre + " con " + puntuacion + " punto(s)"
        })
    })
}

