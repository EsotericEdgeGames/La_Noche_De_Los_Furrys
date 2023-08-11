const pantallaMuerte = document.getElementById("dead")
const puntuacionTotalDisplay = document.getElementById("puntuacion")
let puntos
function finDelJuego(){
    noPuedeDisparar()
    transicionar(pantallaMuerte,"aparecer")
    transicionar(pantallaDeJuego,"desaparecer")
    detenerGeneracionAutomatica()
    for(let i = 0;i<enemigosVivos.length;i++){
        enemigosVivos[i].indiceBorrar.remove()
    }
    enemigosVivos = []
    jugadorPierde = true
    player.salud = 9999
    puntos = (player.monedas*2) + player.monedasGastadas
    puntuacionTotalDisplay.textContent = "Tu puntuacion: " + puntos
}