var recargando = false
const gameArea = document.getElementById("shootArea")

function puedeDisparar(){
  gameArea.addEventListener("click", triggerDisparo);
  gameArea.classList.remove("loader")
} 

function noPuedeDisparar(){
  gameArea.removeEventListener("click", triggerDisparo);
  gameArea.classList.add("loader")
}

function triggerDisparo(){
  if (bloqueoDeTiro){
    return
  }
  let armaEquipada = player.armas[player.equipada]
  if (!recargando){

    switch(armaEquipada.especial){
      case false:
        console.log("gastando")
        if (armaEquipada.balas>0){
          crearSonidos("balaPistola")
          armaEquipada.balas--
        }
        break
      case "rafaga":
        console.log("gastando balas a rafaga")
        if (armaEquipada.balas > 0){
          crearSonidos("balaPistola")
        }
        if ((armaEquipada.balas - armaEquipada.balasPorTiro)>0){
          console.log("gastando el maximo de balas")
          armaEquipada.balas = armaEquipada.balas - armaEquipada.balasPorTiro
        }
        else if (armaEquipada.balas>0){
          console.log("gastando el no maximo de balas")
          armaEquipada.balas = 0
        }
        break
    }
  }
  actualizarValoresPantalla()
}