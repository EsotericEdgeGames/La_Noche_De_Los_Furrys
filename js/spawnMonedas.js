const setSpawnCoins = document.getElementById("moneySpawn")
function crearMoneda(cantidad){ //Queda pendiente esparcirlas. Toy podrido. Maten al que inventó el clientRect
    const limites = setSpawnCoins.getBoundingClientRect();
    var minX = 0
    var minY = 0
    var maxX = limites.right - 140;
    var maxY = limites.bottom - 140;
    var coordenadaX = RNG(maxX - minX) + minX
    var coordenadaY = RNG(maxY - minY) + minY
    let monedas = document.createElement("div")
    monedas.style.top = coordenadaY + "px";
    monedas.style.left = coordenadaX + "px";
    setSpawnCoins.appendChild(monedas)
}