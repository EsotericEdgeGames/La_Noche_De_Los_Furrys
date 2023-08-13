const monedasRestantes = document.getElementById("coinsH")

var monedasPorRecolectar = []
function crearMoneda(cantidad){
    const limites = spawnPoints.getBoundingClientRect();
    cantidad = RNG(2) + cantidad - 1
    if (cantidad === 0){return}
    var minX = 0
    var minY = 0
    var maxX = limites.right - 80;
    var maxY = limites.bottom - 80;
    var coordenadaX = RNG(maxX - minX) + minX
    var coordenadaY = RNG(maxY - minY) + minY
    let monedas = document.createElement("div")
    monedas.style.top = coordenadaY + "px";
    monedas.style.left = coordenadaX + "px";
    monedas.classList.add("coin")
    spawnPoints.appendChild(monedas)
    monedasPorRecolectar.push({div:monedas,cantidad:cantidad})
    monedas.addEventListener("mouseover",function(e){
        crearSonidos("moneda")
        monedas.classList.add("catchCoins")
        monedas.addEventListener("animationend",function(e){
            monedasPorRecolectar = monedasPorRecolectar.filter(e=>e.div!==monedas)
            player.monedas = player.monedas + (Math.round(cantidad*1.5))
            console.log("lukeando la moneda que suma " + cantidad)
            monedas.remove()
            actualizarValoresPantalla()
        })
    })
}