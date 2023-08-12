document.getElementById("reverseButtonB").addEventListener("click",function(){resetGame()})
function resetGame(){
    detenerSonido("musicaPantallaMuerte")
    triggerDelay = false
    triggerTimeout = undefined
    bloqueoDeTiro = undefined
    for (let i = 0;i<itemsParaVender.length;i++){
        itemsParaVender[i].precio = itemsParaVender[i].precioBase
        document.getElementById("valor"+itemsParaVender[i].item).textContent = "valor X " + itemsParaVender[i].precio
    }
    puntos = undefined
    fase = undefined
    jugadorPierde = false
    recargando = false
    recolectarMonedas(true)
    monedasPorRecolectar = []
    contadorRondas = 0;
    incrementoSprite = 0;
    indiceEnemigo = -1;
    generadorEnemigos = undefined
    terminarFase = undefined
    transicionar(pantallaDeInicio,"aparecer")
    transicionar(pantallaMuerte,"desaparecer")
    actualizarValoresPantalla()
    detenerGeneracionAutomatica();
    triggerDelay = false;
    for(let i=0;i<armas.length;i++){
        armas[i].balas = armas[i].balasMaximas
    }
    armaEquipadaDisplay.textContent = "Arma equipada: " + armas[0].nombre
}