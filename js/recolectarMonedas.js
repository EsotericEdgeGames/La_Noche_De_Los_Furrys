function recolectarMonedas(finalPartida){
    if (!finalPartida){crearSonidos("monedaFinal")}
    for (let i=0;i<monedasPorRecolectar.length;i++){
        let monedaActual = monedasPorRecolectar[i]
        monedaActual.div.classList.add("catchCoins")
        if (finalPartida){
            monedaActual.div.remove()
        }
        else{
            monedaActual.div.addEventListener("animationend",function(e){
                monedaActual.cantidad = Math.floor(monedaActual.cantidad/2)
                player.monedas = player.monedas + monedaActual.cantidad
                console.log("sumando la moneda que da " + monedaActual.cantidad)
                monedaActual.div.remove()
                actualizarValoresPantalla()
            })
        }
    }
    monedasPorRecolectar = []
}