function recolectarMonedas(){
    for (let i=0;i<monedasPorRecolectar.length;i++){
        let monedaActual = monedasPorRecolectar[i]
        monedaActual.div.classList.add("catchCoins")
        monedaActual.div.addEventListener("animationend",function(e){
            if (monedaActual.cantidad<=1){
                player.monedas = player.monedas + monedaActual.cantidad
            }
            else{
                player.monedas = player.monedas + (Math.floor(monedaActual.cantidad/2))
            }
            monedaActual.div.remove()
            actualizarValoresPantalla()
        })
    }
    monedasPorRecolectar = []
}