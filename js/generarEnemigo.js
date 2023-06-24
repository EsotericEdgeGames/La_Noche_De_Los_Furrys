let enemigosVivos = []
const spriteEnemigos = ["soyUnSpriteDeEnemigo"]

var enemigoGenerico = {
    vida:3,
    monedas:0
}

var indiceEnemigo = -1;

var generadorEnemigos;

var terminarFase

function generarEnemigo() {
    indiceEnemigo++;
    crearEnemigo(indiceEnemigo);
}


function iniciarGeneracionAutomatica(buffMonedas) {
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
        console.log("acabada la ronda " + (rondaActual-1))
        terminarFase = true
        detenerGeneracionAutomatica()
        intervalo = 1000 - (rondaActual*10)
        enemigoGenerico.vida = 3*rondaActual
        enemigoGenerico.monedas = rondaActual
        if (buffMonedas){
          enemigoGenerico.monedas = rondaActual*2
        }
      }
      }, intervalo);
    }, 2000);
  }
  
  function detenerGeneracionAutomatica() {
    clearInterval(generadorEnemigos);
  }



  function crearEnemigo(index) {
    let spriteEnemigoActual = spriteEnemigos[RNG(spriteEnemigos.length-1)] //Definir la imagen del enemigo
    var nuevoEnemigo = document.createElement("div");//Crear al enemigo
    nuevoEnemigo.id = "enemy";
    let animacion
    switch(RNG(4)){ //Definir como se movera el enemigo
      case 0:
        animacion = "moveOne"
        break
      case 1:
        animacion = "moveTwo"
        break
      case 2:
        animacion = "moveThree"
        break
      case 3:
        animacion = "moveFour"
        break
      case 4:
        animacion = "moveFive"
      break      
    }
    nuevoEnemigo.classList.add(animacion,spriteEnemigoActual) //Agregar las clases
    var spawnPoints = document.getElementById("spawnPoints");
    spawnPoints.appendChild(nuevoEnemigo);
    enemigosVivos.push({
       index: index,
       vida: enemigoGenerico.vida,
       indiceBorrar: nuevoEnemigo,
       imagen: spriteEnemigoActual,
       monedas: enemigoGenerico.monedas,
      });
    nuevoEnemigo.addEventListener("animationend", function (event) {
      damage(event, index, nuevoEnemigo);
    });
    nuevoEnemigo.addEventListener("click", function (event) {
      enemigoRecibeDaño(event, index, nuevoEnemigo);
    });
  }
  