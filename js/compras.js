const itemStore = document.getElementById("itemStore")
const itemsParaVender = [
    {
        item:"botiquin", //nombre del item
        displayName:"Botiquín inferior", //titulo del item
        descripcion:"Un pequeño botiquín. Sana 10% de tu salud", //descripcion del item   
        precio:3, //precio base del item
        imagen: "/../assets/tienda/Botiquin.png", //URL de la imagen
        escalado:2, //cuánto escala el precio
    },
    {
        item:"balas",
        displayName:"x5 balas globales",
        descripcion:"5 geniales balas. Sirven para cualquier arma",
        precio:5,
        imagen: "/../assets/tienda/Bala_pistola.png",
        escalado:2,
    },
    {
        item:"metralleta", //nombre del item
        displayName:"Arma : Metralleta",
        descripcion:"Una increíble arma. Viene con sus propias balas. Dispara de a ráfagas de 4  balas por vez. Posee 15 balas. 500ms de recarga. ", //descripcion del item   
        precio:30, //precio base del item
        imagen: "/../assets/tienda/Metralleta.png", //URL de la imagen
        escalado:false, //cuánto escala el precio
    },
    {
        item:"daño",
        displayName:"Letalidad extra",
        descripcion:"Aumentas el daño de tus balas en 1. Actualmente: " + player.dañoPorTiro,  
        precio:20,
        imagen: "",
        escalado:2,
    },
    {
        item:"velocidadRecarga",
        displayName:"Recarga acelerada",
        descripcion:"Tus armas se recargan un 10% más rápido. Actualmente: " + player.velocidadRecarga + "%",  
        precio:10,
        imagen: "",
        escalado:3,
    },
    {
        item:"mejoraBalas",
        displayName:"Cartuchos de ensueño",
        descripcion:"Aumenta la posibilidad de recargar sin consumir balas. Solo funciona en recargas completas. Actualmente: " + player.mejoraBalas + "%",  
        precio:80,
        imagen: "",
        escalado:5,
    }
]

for(let i = 0;i<itemsParaVender.length;i++){
    const item = itemsParaVender[i]
    const elemento = document.createElement("div")
    elemento.innerHTML =
    `<div class="tiendaItemContenedor">
      <div>
        <div class="displayNameItemTienda">${item.displayName}</div>
        <button id="comprar${item.item}">
          <img src="${item.imagen}" alt="${item.item}">
        </button>
      </div>
      <div id="valor${item.item}" class="valor">valor X ${item.precio}</div>
    </div>`
    itemStore.appendChild(elemento)
    let buttonComprarTienda = document.getElementById("comprar"+item.item)
    let descripcionItemHud = document.getElementById("descripcionItem")
    buttonComprarTienda.addEventListener("mouseenter",function(){
        descripcionItemHud.classList.remove("none")
        descripcionItemHud.textContent = item.descripcion
    })
    buttonComprarTienda.addEventListener("mouseleave",function(){
        descripcionItemHud.classList.add("none")
    })
    document.getElementById("comprar"+item.item).addEventListener("click",function(){realizarCompra(item.item,item.precio,item.escalado,i)})
    
}

function realizarCompra(item,precio,escalado,index){
    if (!item){
        return
    }
    if (precio<=player.monedas){
        player.monedas = player.monedas - precio
        player.monedasGastadas = player.monedasGastadas + precio
        switch(item){
            case "botiquin":
                player.botiquinesDisponibles++
                break
            case "balas":
                player.balasDisponibles += 5
                break
            case "daño":
                player.dañoPorTiro++
                break
            case "velocidadRecarga":
                player.velocidadRecarga = player.velocidadRecarga + 10
                break
            case "mejoraBalas":
                player.mejoraBalas = player.mejoraBalas + 5
                break
            case "metralleta":
                let metralleta = armas.find(a=>a.nombre === "pistola")
                player.armas.push(metralleta)
                break
        }
        let itemModificar = itemsParaVender[index]
        itemModificar.precio = itemModificar.precio * escalado
        if (itemModificar.precio === 0){
            itemModificar.precio = "Sin stock!"
        }
        document.getElementById("valor"+itemModificar.item).textContent = "valor X " + itemModificar.precio
        if (itemModificar.precio === 0){
            itemsParaVender[index].item = false
        }
        actualizarValoresPantalla()
    }
}

/*let precios = {
    botiquin:3,
    balas:5,
    arma:30,
    daño:20,
    velocidadRecarga:10,
    mejoraBalas:80
}

const comprarBotiquin = document.getElementById("comprarBotiquin")
comprarBotiquin.textContent = "comprar botiquin (x1) por " + precios.botiquin + " monedas"
const comprarBalas = document.getElementById("comprarBalas")
comprarBalas.textContent = "comprar balas (x5) por " + precios.balas + " monedas"
const comprarArma = document.getElementById("comprarArma")
comprarArma.textContent = "comprar el arma " + armas[1].nombre + " por " + precios.arma + " monedas"
const comprarDaño = document.getElementById("comprarDaño")
comprarDaño.textContent = "comprar mejora permanente de daño por " + precios.daño + " monedas"
const comprarRecarga = document.getElementById("comprarRecarga")
comprarRecarga.textContent = "Aumento de velocidad de recarga (10%) por " + precios.velocidadRecarga + " monedas"
const mejoraBalas = document.getElementById("mejoraBalas")
mejoraBalas.textContent = "Probabilidad de no gastar balas al recargar (+5%) por " + precios.mejoraBalas + " monedas"


comprarBotiquin.addEventListener("click",function(){realizarCompra(precios.botiquin)})
comprarBalas.addEventListener("click",function(){realizarCompra(precios.balas)})
comprarArma.addEventListener("click",function(){realizarCompra(precios.arma)})
comprarDaño.addEventListener("click",function(){realizarCompra(precios.daño)})
comprarRecarga.addEventListener("click",function(){realizarCompra(precios.velocidadRecarga)})
mejoraBalas.addEventListener("click",function(){realizarCompra(precios.mejoraBalas)})


function realizarCompra(item){
    if (item<=player.monedas){
        player.monedas = player.monedas - item
        player.monedasGastadas = player.monedasGastadas + item
        switch(item){
            case precios.botiquin:
                player.botiquinesDisponibles++
                precios.botiquin = precios.botiquin*2
                comprarBotiquin.textContent = "comprar botiquin (x1) por " + precios.botiquin + " monedas"
                break

            case precios.balas:
                player.balasDisponibles += 5
                precios.balas = precios.balas * 2
                comprarBalas.textContent = "comprar balas (x5) por " + precios.balas + " monedas"
                break

            case precios.arma:
                player.armas.push(armas[player.armas.length])
                if (armas[player.armas.length] === undefined){
                    comprarArma.remove()
                }
                else{
                    precios.arma = precios.arma*2
                    comprarArma.textContent = "comprar el arma " + armas[player.armas.length] + " por " + precios.arma + " monedas"
                }
                break

            case precios.daño:
                player.dañoPorTiro++
                precios.daño = precios.daño*2
                comprarDaño.textContent = "comprar mejora permanente de daño por " + precios.daño + " monedas"
                break

            case precios.velocidadRecarga:
                player.velocidadRecarga = player.velocidadRecarga + 10
                precios.recarga = precios.recarga*5
                comprarRecarga.textContent = "Aumento de velocidad de recarga (10%) por " + precios.velocidadRecarga + " monedas"
                break

            case precios.mejoraBalas:
                player.mejoraBalas = player.mejoraBalas + 5
                precios.mejoraBalas = precios.mejoraBalas * 10
                mejoraBalas.textContent = "Probabilidad de no gastar balas al recargar (+5%) por " + precios.mejoraBalas + " monedas"
                break
        }
        actualizarValoresPantalla()
    }
    else{
        console.log("incomprable")
    }
}*/