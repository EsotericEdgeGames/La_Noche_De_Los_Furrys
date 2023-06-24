let precios = {
    botiquin:3,
    balas:5,
    arma:30
}

const comprarBotiquin = document.getElementById("comprarBotiquin")
comprarBotiquin.textContent = "comprar botiquin (x1) por " + precios.botiquin
const comprarBalas = document.getElementById("comprarBalas")
comprarBalas.textContent = "comprar balas (x5) por " + precios.balas
const comprarArma = document.getElementById("comprarArma")
comprarArma.textContent = "comprar el arma " + armas[1].nombre + " por " + precios.arma

comprarBotiquin.addEventListener("click",function(){realizarCompra(precios.botiquin)})
comprarBalas.addEventListener("click",function(){realizarCompra(precios.balas)})
comprarArma.addEventListener("click",function(){realizarCompra(precios.arma)})


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
        }
        actualizarValoresPantalla()
    }
    else{
        console.log("incomprable")
    }
}