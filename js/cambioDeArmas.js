var triggerDelay = false;
var triggerTimeout;
const armaEquipadaDisplay = document.getElementById("weaponH")

document.addEventListener("wheel", function(e) { //Cambiar arma
  if (!triggerDelay) {
    triggerDelay = true;
    var deltaY = e.deltaY;
    if (deltaY > 0) {
      player.equipada++;
      if (player.equipada > player.armas.length - 1) {
        player.equipada = 0;
      }
    } else if (deltaY < 0) {
      player.equipada--;
      if (player.equipada < 0) {
        player.equipada = player.armas.length - 1;
      }
    }

    let armaEquipada = player.armas[player.equipada];
    console.log(armaEquipada)
    armaEquipadaDisplay.textContent = "Arma equipada: " +armaEquipada.nombre;
    actualizarValoresPantalla()
    triggerTimeout = setTimeout(function() {
      triggerDelay = false;
    }, 500);
  } else {
    return false;
  }
});

function cambiarArmasConNumeros(index){
  if (!triggerDelay){
    if (!!player.armas[index-1]){
      player.equipada = index-1
      let armaEquipada = player.armas[player.equipada]
      const armaEquipadaDisplay = document.getElementById("weaponH")
      armaEquipadaDisplay.textContent = "Arma equipada: " +armaEquipada.nombre;
      actualizarValoresPantalla()
      triggerTimeout = setTimeout(function() {
        triggerDelay = false;
      }, 500);
    }
  }
}