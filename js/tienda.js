const botonAbrirTienda = document.getElementById("tiendaB")
const tiendaHud = document.getElementById("tienda")
const salirTienda = document.getElementById("salirTienda")


botonAbrirTienda.addEventListener("click",function(e){
    transicionar(finDeRonda,"desaparecer")
    transicionar(tiendaHud,"aparecer")
    setTimeout(() => {
        crearSonidos("abrirTienda")
    }, 400);
})

salirTienda.addEventListener("click",function(e){
    transicionar(tiendaHud,"desaparecer")
    setTimeout(() => {
        puedeDisparar()
    }, 900);
    iniciarGeneracionAutomatica()
})