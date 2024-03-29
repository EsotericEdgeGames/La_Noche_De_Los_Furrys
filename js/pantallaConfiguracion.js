const botonReasignarTeclaRecargar = document.getElementById("reasignarTeclaRecargar")
const botonReasignarTeclaUsarBotiquin = document.getElementById("reasignarTeclaBotiquin")
const botonReasignarTeclaUsarBomba = document.getElementById("reasignarTeclaBomba")
const bloqueoPantallaDeConfiguracion = document.getElementById("replace")
const textoBloqueoPantallaDeConfiguracion = document.getElementById("textoReplace")
const switchSonido = document.getElementById("switchSonido")

let teclas = {
    recargar:"R",
    usarBotiquin:"C",
    usarBomba:"Y",
    arma1:"1",
    arma2:"2",
    arma3:"3"
}
const storedConfig = localStorage.getItem("controlesPrevios");
if (storedConfig) {
  try {
    const parsedConfig = JSON.parse(storedConfig);
    if (typeof parsedConfig === "object" && parsedConfig !== null) {
      teclas = parsedConfig;
    }
  } catch (error) {
    console.error("ocurrio el error:" + error);
  }
}
function textContentTeclasPantallaConfiguracion(){
    botonReasignarTeclaRecargar.textContent = "recargar/" + teclas.recargar
    botonReasignarTeclaUsarBotiquin.textContent = "curarse/" + teclas.usarBotiquin
    botonReasignarTeclaUsarBomba.textContent = "bomba/" + teclas.usarBomba
}

document.addEventListener("keydown",function(e){
    for(let a in teclas){
        if (e.key.toUpperCase() === teclas[a]){
            switch(a){
                case "recargar":recargar();break
                case "usarBotiquin":usarBotiquin();break
                case "usarBomba":usarBomba();break
                case "arma1":cambiarArmasConNumeros(1);break
                case "arma2":cambiarArmasConNumeros(2);break
                case "arma3":cambiarArmasConNumeros(3);break
            }
        }
    }
})
function reasignarTeclas(elemento,tipo){
    elemento.addEventListener("click",function(){
        textoBloqueoPantallaDeConfiguracion.textContent = "Elige una tecla para reemplazar: " + tipo
        transicionar(bloqueoPantallaDeConfiguracion,"aparecer")
        document.addEventListener("keydown",function handleKeyDown(e){
            for (let a in teclas){
                if (e.key.toUpperCase() === teclas[a]){
                    textoBloqueoPantallaDeConfiguracion.textContent = "Esa tecla ya esta en uso, elige otra"
                    elemento.textContent = tipo + "/" + teclas[tipo]
                    return
                }
            }
            teclas[tipo] = e.key.toUpperCase()
            document.removeEventListener("keydown", handleKeyDown);
            textContentTeclasPantallaConfiguracion()
            transicionar(bloqueoPantallaDeConfiguracion,"desaparecer")
        })
    })
}
textContentTeclasPantallaConfiguracion()
reasignarTeclas(botonReasignarTeclaRecargar,"recargar")
reasignarTeclas(botonReasignarTeclaUsarBotiquin,"usarBotiquin")
reasignarTeclas(botonReasignarTeclaUsarBomba,"usarBomba")

switchSonido.addEventListener("click",function(e){
    crearSonidos("botoncito")
    if (reproducenSonidos){
        reproducenSonidos = false
        switchSonido.textContent = "sonido/OFF"
        return
    }
    reproducenSonidos = true
    switchSonido.textContent = "sonido/ON"
})

document.getElementById("volverAInicio").addEventListener("click",function(e){
    crearSonidos("botoncito")
    localStorage.setItem("controlesPrevios", JSON.stringify(teclas));
    transicionar(pantallaDeConfiguracion,"desaparecer")
    transicionar(pantallaDeInicio,"aparecer")
})
