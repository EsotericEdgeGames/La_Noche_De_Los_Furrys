function RNG(maximo){
  //* CUALQUIER TIPO DE RNG
 let aleatoriedad = Math.round(Math.random()*maximo);
 return aleatoriedad;
}
function calcularPorcentaje(porcentaje){
  let maximo = 100/porcentaje
  let aleatoriedad = RNG(maximo)
  return aleatoriedad === 0
}


let player
let fase
let jugadorPierde = false
const armas = [{ //Armas adquiridas
    nombre:"pistola",
    balas:10,
    balasMaximas:10,
    recarga:"full",
    tiempoRecarga:1000,
    especial:false
  },
  {
    nombre:"metralleta",
    balas:15,
    balasMaximas:15,
    recarga:"full",
    tiempoRecarga:500,
    especial:"rafaga",
    balasPorTiro:4
  }]
function iniciarGameplay(){
    player = { //Stats del jugador
        armas: [],
        salud:100,
        equipada:0, //Index del arma equipada
        balasDisponibles:10, //Cantidad de balas disponibles para recargar
        botiquinesDisponibles:2, //Cantidad de botiquines disponibles
        monedas:0,
        monedasGastadas:0,
        dañoPorTiro:1, //Daño que el jugador hace en cada disparo
        velocidadRecarga:0, //Tiempo que el jugador demora en recargar
        mejoraBalas:0 //% de chance de no consumir balas
      }
    if (player.armas.length === 0){
        let armaPrincipal = armas.find(a=>a.nombre === "pistola")
        player.armas.push(armaPrincipal)
    }
    actualizarValoresPantalla()
    iniciarGeneracionAutomatica()
}

const divMunicionRestante = document.getElementById("municionRestante")
document.addEventListener("mousemove", function(event) {
  var offsetX = 40; // Valor para alejar el div a la derecha del cursor
  var offsetY = -50; // Valor para alejar el div hacia abajo del cursor

  var mouseX = event.clientX + offsetX;
  var mouseY = event.clientY + offsetY;

  divMunicionRestante.style.left = mouseX + "px";
  divMunicionRestante.style.top = mouseY + "px";
});


function actualizarValoresPantalla(){
    divMunicionRestante.textContent = player.armas[player.equipada].balas+"/"+player.armas[player.equipada].balasMaximas
    botiquinesRestantes.textContent = "botiquines restantes: " + player.botiquinesDisponibles
    saludRestantePlayer.style.width = player.salud + "%"
    saludRestantePlayer.textContent = player.salud + "%"
    balasDisponiblesParaRecargar.textContent = "balas disponibles: " + player.balasDisponibles
    monedasRestantes.textContent = "monedas: " + player.monedas

    if (player.salud <= 0){
      finDelJuego()
    }
}