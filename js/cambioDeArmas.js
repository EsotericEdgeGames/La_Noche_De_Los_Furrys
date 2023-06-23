var triggerDelay = false;
var triggerTimeout;

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
    const armaEquipadaDisplay = document.getElementById("weaponH")
    armaEquipadaDisplay.textContent = "Arma equipada: " +armaEquipada.nombre;
    actualizarValoresPantalla()
    triggerTimeout = setTimeout(function() {
      triggerDelay = false;
    }, 500);
  } else {
    return false;
  }
});