const finDeRonda = document.getElementById("finalRonda")
const textoFinDeRonda = document.getElementById("textoFinalRonda")
let bloqueoDeTiro
document.getElementById("continuarB").addEventListener("click",function(e){
    setTimeout(() => {
        puedeDisparar()
    }, 900);
    transicionar(finDeRonda,"desaparecer")
    iniciarGeneracionAutomatica(true)
})
function cambioDeFase(){
    bloqueoDeTiro = true
    terminarFase = false
    transicionar(finDeRonda,"aparecer")
    textoFinDeRonda.textContent = "Completada la ronda " + (rondaActual-1)
    noPuedeDisparar()
}