let precios = {
    botiquin:3,
    balas:5,
    arma:30,
    daño:20,
    velocidadRecarga:10
}

const comprarBotiquin = document.getElementById("comprarBotiquin")
comprarBotiquin.textContent = "comprar botiquin (x1) por " + precios.botiquin
const comprarBalas = document.getElementById("comprarBalas")
comprarBalas.textContent = "comprar balas (x5) por " + precios.balas
const comprarArma = document.getElementById("comprarArma")
comprarArma.textContent = "comprar el arma " + armas[1].nombre + " por " + precios.arma
const comprarDaño = document.getElementById("comprarDaño")
comprarDaño.textContent = "comprar mejora permanente de daño por " + precios.daño
const comprarRecarga = document.getElementById("comprarRecarga")
comprarRecarga.textContent = "Aumento de velocidad de recarga (10%) por " + precios.velocidadRecarga


comprarBotiquin.addEventListener("click",function(){realizarCompra(precios.botiquin)})
comprarBalas.addEventListener("click",function(){realizarCompra(precios.balas)})
comprarArma.addEventListener("click",function(){realizarCompra(precios.arma)})
comprarDaño.addEventListener("click",function(){realizarCompra(precios.daño)})
comprarRecarga.addEventListener("click",function(){realizarCompra(precios.reducirRecarga)})


function realizarCompra(item){
    if (item<=player.monedas){
        player.monedas = player.monedas - item
        player.monedasGastadas = player.monedasGastadas + item
        switch(item){
            case precios.botiquin:
                player.botiquinesDisponibles++
                precios.botiquin = precios.botiquin*2
                comprarBotiquin.textContent = "comprar botiquin (x1) por " + precios.botiquin
                break
            case precios.balas:
                player.balasDisponibles += 5
                precios.balas = precios.balas * 2
                comprarBalas.textContent = "comprar balas (x5) por " + precios.balas
                break
            case precios.arma:
                player.armas.push(armas[player.armas.length])
                if (armas[player.armas.length] === undefined){
                    comprarArma.remove()
                }
                else{
                    precios.arma = precios.arma*2
                    comprarArma.textContent = "comprar el arma " + armas[player.armas.length] + " por " + precios.arma
                }
                break
            case precios.daño:
                player.dañoPorTiro++
                precios.daño = precios.daño*2
                break
            case precios.velocidadRecarga:
                player.velocidadRecarga = player.velocidadRecarga + 10
                precios.recarga = precios.recarga*3
        }
        actualizarValoresPantalla()
    }
    else{
        console.log("incomprable")
    }
}