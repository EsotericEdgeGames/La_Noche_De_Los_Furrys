const balasDisponiblesParaRecargar = document.getElementById("remainingAmmunitionH")

function recargar(){
    recargando = true
    let armaEquipada = player.armas[player.equipada]
    let balasRestantes = player.balasDisponibles
    let tiempoRecarga = (player.velocidadRecarga / 100) * armaEquipada.tiempoRecarga
    switch(armaEquipada.recarga){
      case "full":
        if (armaEquipada.balas + balasRestantes >= armaEquipada.balasMaximas){
          let municionGastada = armaEquipada.balasMaximas - armaEquipada.balas
          armaEquipada.balas = armaEquipada.balasMaximas
          player.balasDisponibles = player.balasDisponibles - municionGastada
        }
        else{
          armaEquipada.balas = armaEquipada.balas + balasRestantes
          player.balasDisponibles = 0
        }
        break
      case "individual":
        if (balasRestantes>0){
          armaEquipada.balas++
          if (armaEquipada.balas>armaEquipada.balasMaximas){
            armaEquipada.balas--
          }
          else{
            player.balasDisponibles = player.balasDisponibles - 1
          }
        }
    }
    actualizarValoresPantalla()
    if (balasRestantes>0){
      setTimeout(() => {
        recargando = false
      }, tiempoRecarga);
    }
    else{
      recargando = false
    }
}