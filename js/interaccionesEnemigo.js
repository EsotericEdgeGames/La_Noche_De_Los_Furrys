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
                    enemigosVivos[index].indiceBorrar.classList.add("daño")
                    enemigosVivos[index].vida = enemigosVivos[index].vida - dañoRealizado
                }
                break
            case "rafaga":
                enemigosVivos[index].indiceBorrar.classList.add("daño")
                if (armaEquipada.balas>armaEquipada.balasPorTiro){
                    enemigosVivos[index].vida = enemigosVivos[index].vida - (armaEquipada.balasPorTiro * dañoRealizado)
                }
                else if (armaEquipada.balas>0){
                    enemigosVivos[index].vida = enemigosVivos[index].vida - (armaEquipada.balas * dañoRealizado)
                }
        }
        setTimeout(() => {
            enemigosVivos[index].indiceBorrar.classList.remove("daño")
        }, 100);
        if (enemigosVivos[index].vida <= 0) {
            let enemyActual = enemigosVivos[index]
            crearMoneda(enemyActual.monedas)
            enemy.remove();
            let existenEnemigosVivos = enemigosVivos.filter(e=>e.vida>0)
            dropExtras(enemyActual)
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
  function dropExtras(enemigo){
    let dropBalas = RNG(enemigo.balasMaxDrop)
    if (dropBalas < enemigo.balasMinDrop){
        dropBalas = enemigo.balasMinDrop
    }
    player.balasDisponibles = player.balasDisponibles + dropBalas
    actualizarValoresPantalla()
}