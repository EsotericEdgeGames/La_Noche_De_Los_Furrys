let enemigosVivos = []
const spriteEnemigos = ["foxy","pato"]

var foxy = {
    vida:3,
    monedas:2,
    daño:10,
    balasMaxDrop:5,
    balasMinDrop:2
}
var pato = {
    vida:2,
    monedas:10,
    daño:20,
    balasMaxDrop:0,
    balasMinDrop:0
}


var indiceEnemigo = -1;

var generadorEnemigos;

var terminarFase

var multiplicador

function generarEnemigo() {
    indiceEnemigo++;
    crearEnemigo(indiceEnemigo);
}


function iniciarGeneracionAutomatica(buffMonedas) {
  setTimeout(() => {
    bloqueoDeTiro = false
  }, 5);
  setTimeout(() => {
    let enemigosGenerados = 1
    var intervalo = 1000 - (rondaActual*10);
    generadorEnemigos = setInterval(function () {
      generarEnemigo();
      enemigosGenerados++
      intervalo -= 50;
      console.log(enemigosGenerados)
      if ((enemigosGenerados>rondaActual) && (!jugadorPierde)) {
        rondaActual++
        contadorRondas++;
        if (contadorRondas % 5 === 0) {
          incrementoSprite++;
        }
        console.log("acabada la ronda " + (rondaActual-1))
        terminarFase = true
        detenerGeneracionAutomatica()
        intervalo = 1000 - (rondaActual*10)
        
        //ELIMINADO BUFF MONEDAS.
      }
      }, intervalo);
    }, 2000);
  }
  
  function detenerGeneracionAutomatica() {
    clearInterval(generadorEnemigos);
  }


  var contadorRondas = 0;
  var incrementoSprite = 0;
  function crearEnemigo(index) {
    let indiceSprite = 0;
    let indiceActualizado = indiceSprite + incrementoSprite;
    let spriteEnemigoActual = spriteEnemigos[RNG(indiceActualizado % spriteEnemigos.length)];
    var nuevoEnemigo = document.createElement("div");//Crear al enemigo
    nuevoEnemigo.id = "enemy";
    switch(spriteEnemigoActual){
      case "foxy":spawnFoxy(nuevoEnemigo,index);break
      case "pato":spawnPato(nuevoEnemigo,index);break
    }
    
    
    
    nuevoEnemigo.addEventListener("animationend", function (event) {
      damage(event, index, nuevoEnemigo,spriteEnemigoActual);
    });
    nuevoEnemigo.addEventListener("click", function (event) {
      enemigoRecibeDaño(event, index, nuevoEnemigo,spriteEnemigoActual);
    });
  }

function spawnFoxy(elementoEnemigo,index){
  let animacion
    switch(RNG(1)){ //Definir como se movera el enemigo
      case 0:
        animacion = "moveOne"
        break
      case 1:
        animacion = "moveTwo"
        break      
    }
  elementoEnemigo.classList.add(animacion,"foxy") //Agregar las clases
  var spawnPoints = document.getElementById("spawnPoints");
  spawnPoints.appendChild(elementoEnemigo);
  enemigosVivos.push({
    index: index,
    vida: foxy.vida * rondaActual,
    indiceBorrar: elementoEnemigo,
    imagen: "foxy",
    monedas: foxy.monedas + rondaActual,
    balasMaxDrop: foxy.balasMaxDrop * rondaActual,
    balasMinDrop: foxy.balasMinDrop * rondaActual
   });
}

function spawnPato(elementoEnemigo,index){
  let animacion
  switch(RNG(2)){
    case 0:
      animacion = "moveThree"
      break
    case 1:
      animacion = "moveFour"
      break
    case 2:
      animacion = "moveFive"
      break
  }
  elementoEnemigo.classList.add(animacion,"pato")
  var spawnPoints = document.getElementById("spawnPoints");
  spawnPoints.appendChild(elementoEnemigo);
  enemigosVivos.push({
    index: index,
    vida: pato.vida * rondaActual,
    indiceBorrar: elementoEnemigo,
    imagen: "pato",
    monedas: pato.monedas + rondaActual,
    balasMaxDrop: pato.balasMaxDrop * rondaActual,
    balasMinDrop: pato.balasMinDrop * rondaActual
   });
}