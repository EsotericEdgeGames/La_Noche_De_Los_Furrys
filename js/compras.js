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
        item:"mejoraProgresivaBotiquin",
        descripcion: false,
        precio:10,
        imagen:"",
        mejoras:[
            {
                nombre:"Sanacion exquisita",
                descripcion:"Los botiquines curan un 20% de salud en lugar de 10"
            },
            {
                nombre:"Piel de hierro",
                descripcion:"Reduce el daño de los ataques en 5%"
            },
            {
                nombre:"Mejoras al máximo!",
                descripcion:"Mejorado al máximo!",
                final:true,
            }
        ],
        mejoraActual: 0
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
let descripcionItemHud = document.getElementById("descripcionItem")
for(let i = 0;i<itemsParaVender.length;i++){
    const item = itemsParaVender[i]
    const elemento = document.createElement("div")
    if (item.descripcion === false){
        item.displayName = item.mejoras[item.mejoraActual].nombre
    }
    elemento.innerHTML =
    `<div class="tiendaItemContenedor">
      <div>
        <div id = "nombreDe${item.item}" class="displayNameItemTienda">${item.displayName}</div>
        <button id="comprar${item.item}">
          <img src="${item.imagen}" alt="${item.item}">
        </button>
      </div>
      <div id="valor${item.item}" class="valor">valor X ${item.precio}</div>
    </div>`
    itemStore.appendChild(elemento)
    let buttonComprarTienda = document.getElementById("comprar"+item.item)
    buttonComprarTienda.addEventListener("mouseenter",function(){
        descripcionItemHud.classList.remove("none")
        if (item.descripcion === false){
            descripcionItemHud.textContent = item.mejoras[item.mejoraActual].descripcion
        }
        else{
            descripcionItemHud.textContent = item.descripcion
        }
    })
    buttonComprarTienda.addEventListener("mouseleave",function(){
        descripcionItemHud.classList.add("none")
    })
    document.getElementById("comprar"+item.item).addEventListener("click",function(){
        if(item.descripcion === false){
            realizarCompraMejoraProgresiva(item)
        }
        else{
            realizarCompra(item.item,item.precio,item.escalado,i)
        }
    })
}

function actualizarDescripciones(){
    for (let i = 0;i<itemsParaVender.length;i++){
        const item = itemsParaVender[i]
        switch(item.item){
            case "velocidadRecarga":
                item.descripcion = "Tus armas se recargan un 10% más rápido. Actualmente: " + player.velocidadRecarga + "%";
                break;
            case "mejoraBalas":         
                item.descripcion = "Aumenta la posibilidad de recargar sin consumir balas. Solo funciona en recargas completas. Actualmente: " + player.mejoraBalas + "%";
                break
            case "daño":
                item.descripcion = "Aumentas el daño de tus balas en 1. Actualmente: " + player.dañoPorTiro
                break
        }
    }
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
                let metralleta = armas.find(a=>a.nombre === "metralleta")
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
        actualizarDescripciones()
    }
}
function realizarCompraMejoraProgresiva(item) {
    if (player.monedas >= item.precio) {
        player.monedas -= item.precio;
        item.mejoraActual++;
        if (item.mejoras[item.mejoraActual].final) {
            item.mejoraActual = item.mejoras.length-1
            descripcionItemHud.textContent = "¡Mejorado al máximo!"
            item.precio = "Sin Stock!"
            document.getElementById("valor"+item.item).textContent = "valor X " + item.precio
        }
        else{
            const mejoraActual = item.mejoras[item.mejoraActual];
            let nombreMejora = mejoraActual.nombre
            document.getElementById("nombreDe"+item.item).textContent = nombreMejora
            descripcionItemHud.textContent = mejoraActual.descripcion;   
        }

        actualizarValoresPantalla();
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