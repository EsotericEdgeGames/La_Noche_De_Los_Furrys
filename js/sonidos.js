const sonidos = {
    "moneda": new Audio("./sounds/moneda.mp3"),
    "monedaFinal": new Audio("./sounds/moneda.mp3"),
    "comprarItem": new Audio("./sounds/comprar.mp3"),
    "gameOver": new Audio("./sounds/muerte.mp3"),
    "balaPistola": new Audio("./sounds/disparo.mp3"),
    "botoncito": new Audio ("./sounds/entrar.mp3"),
    "abrirTienda": new Audio ("./sounds/open_tienda.mp3"),
    "musicaFondoGameplay": new Audio ("./sounds/fondo.mp3"),
    "musicaPantallaMuerte": new Audio("./sounds/pantalla-muerte.mp3")
}
const sonidosReproducidos = {};
Object.keys(sonidos).forEach(tipo => {
    sonidos[tipo].preload = "auto";
    sonidos[tipo].loop = false;
    sonidosReproducidos[tipo] = [];
});


function reproducirSonido(tipo, bucle) {
    if (!reproducenSonidos) { return; }
    if (!sonidos[tipo]) { return; } 
    
    const nuevoSonido = sonidos[tipo].cloneNode();
    nuevoSonido.loop = bucle || false;
    sonidosReproducidos[tipo].push(nuevoSonido);

    nuevoSonido.addEventListener("ended", function () {
        sonidosReproducidos[tipo] = sonidosReproducidos[tipo].filter(s => s !== nuevoSonido);
        nuevoSonido.removeEventListener("ended", this);
    });

    nuevoSonido.play();
}


let reproducenSonidos = true

function detenerSonido(tipo) {
    if (sonidosReproducidos[tipo]) {
        sonidosReproducidos[tipo].forEach(s => {
            s.pause();
            s.currentTime = 0;
            s.removeEventListener("ended", this);
        });
        sonidosReproducidos[tipo] = [];
    }
}
function crearSonidos(tipo){
    switch(tipo){
        case "moneda":
        case "monedaFinal":
        case "comprarItem":
        case "gameOver":
        case "balaPistola":
        case "botoncito":
        case "abrirTienda":
            reproducirSonido(tipo, false);
            break;
        case "musicaFondoGameplay":
        case "musicaPantallaMuerte":
            reproducirSonido(tipo,true)
    }
}
