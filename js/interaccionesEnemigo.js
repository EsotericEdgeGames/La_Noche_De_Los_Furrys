function damage(event, index, enemigoActual,enemigo) { //El enemigo te hittea
    if (jugadorPierde){
        enemigoActual.remove()
        enemigoActual = false
    }
    let daño
    switch(enemigo){
        case "foxy":daño=foxy.daño;
        case "pato":daño=pato.daño
    }
    if (enemigoActual) {
        enemigoActual.style.animation = "none";
        enemigoActual.offsetHeight;
        enemigoActual.style.animation = null;
        player.salud = player.salud - daño;
        actualizarValoresPantalla()
    }
}
function enemigoRecibeDaño(event, index, enemy) {
    if (!recargando){
        let armaEquipada = player.armas[player.equipada]
        let dañoRealizado = player.dañoPorTiro
        switch(armaEquipada.especial){
            case false:
                if (armaEquipada.balas>0){
                    enemigosVivos[index].vida = enemigosVivos[index].vida - dañoRealizado
                }
                break
            case "rafaga":
                if (armaEquipada.balas>armaEquipada.balasPorTiro){
                    enemigosVivos[index].vida = enemigosVivos[index].vida - (armaEquipada.balasPorTiro * dañoRealizado)
                }
                else if (armaEquipada.balas>0){
                    enemigosVivos[index].vida = enemigosVivos[index].vida - (armaEquipada.balas * dañoRealizado)
                }
        }
        if (enemigosVivos[index].vida <= 0) {
            let enemyActual = enemigosVivos[index]
            crearMoneda(enemyActual.monedas)
            enemy.remove();
            let existenEnemigosVivos = enemigosVivos.filter(e=>e.vida>0)
            dropItems()
            if (existenEnemigosVivos.length === 0){
                enemigosVivos = []
                indiceEnemigo = -1
                if (terminarFase){
                    recolectarMonedas()
                    setTimeout(() => {
                        cambioDeFase()
                    }, 2500);
                }
            }
        }
    }
}
  function dropItems(){
    player.balasDisponibles = player.balasDisponibles + (RNG(15))
    actualizarValoresPantalla()
}