const balasDisponiblesParaRecargar = document.getElementById("remainingAmmunitionH")

function recargar(){
    recargando = true
    noPuedeDisparar()
    let armaEquipada = player.armas[player.equipada]
    let balasRestantes = player.balasDisponibles
    let tiempoRecarga
    if (player.velocidadRecarga !== 0){
      tiempoRecarga = (player.velocidadRecarga / 100) * armaEquipada.tiempoRecarga
      tiempoRecarga = armaEquipada.tiempoRecarga - tiempoRecarga
      if (player.velocidadRecarga >= 100){
        tiempoRecarga = 100
      }
    }
    else{
      tiempoRecarga = armaEquipada.tiempoRecarga
    }
    switch(armaEquipada.recarga){
      case "full":
        if (armaEquipada.balas + balasRestantes >= armaEquipada.balasMaximas){
          let municionGastada = armaEquipada.balasMaximas - armaEquipada.balas
          armaEquipada.balas = armaEquipada.balasMaximas
          if (player.mejoraBalas !== 0){
            if (!calcularPorcentaje(player.mejoraBalas)){
              console.log("la municion se gasto")
              player.balasDisponibles = player.balasDisponibles - municionGastada
            }
            else{
              console.log("la municion no se gasto")
            }
          }
          else{
            player.balasDisponibles = player.balasDisponibles - municionGastada
          }
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
        puedeDisparar()
      }, tiempoRecarga);
    }
    else{
      recargando = false
    }
}