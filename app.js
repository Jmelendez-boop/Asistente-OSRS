const xpPorNivel = [
  0, 83, 174, 276, 388, 512, 650, 801, 969, 1154,
  1358, 1584, 1833, 2107, 2411, 2746, 3115, 3523, 3973, 4470,
  5018, 5624, 6291, 7028, 7842, 8740, 9730, 10824, 12031, 13363,
  14833, 16456, 18247, 20224, 22406, 24815, 27473, 30408, 33648, 37224,
  41171, 45529, 50339, 55649, 61512, 67983, 75127, 83014, 91721, 101333,
  111945, 123660, 136594, 150872, 166636, 184040, 203254, 224466, 247886, 273742,
  302288, 333804, 368599, 407015, 449428, 496254, 547953, 605032, 668051, 737627,
  814445, 899257, 992895, 1096278, 1210421, 1336443, 1475581, 1629200, 1798808, 1986068,
  2192818, 2421087, 2673114, 2951373, 3258594, 3597792, 3972294, 4385776, 4842295, 5346332,
  5902831, 6517253, 7195629, 7944614, 8771558, 9684577, 10692629, 11805606, 13034431
];

function calcular() {
  const skill = document.getElementById("skill").value;
  const nivelActual = parseInt(document.getElementById("nivelActual").value);
  const nivelObjetivo = parseInt(document.getElementById("nivelObjetivo").value);
  const esIronman = document.getElementById("ironman").checked;
  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = "";

  if (!metodosPorSkill[skill]) {
    resultadoDiv.innerHTML = `<p>No hay datos para la skill seleccionada.</p>`;
    return;
  }

  if (nivelObjetivo <= nivelActual) {
    resultadoDiv.innerHTML = `<p>Tu nivel objetivo debe ser mayor que el nivel actual.</p>`;
    return;
  }

  const xpRestante = xpPorNivel[nivelObjetivo - 1] - xpPorNivel[nivelActual - 1];
  const horasPorDia = 10;
  const diasPorSemana = 7;

  const metodosValidos = metodosPorSkill[skill]
    .filter(m => m.minNivel <= nivelActual && nivelActual < m.maxNivel)
    .filter(m => !esIronman || m.ironman)
    .sort((a, b) => b.xpHora - a.xpHora);

  if (metodosValidos.length === 0) {
    resultadoDiv.innerHTML = `<p>No hay métodos compatibles con tu nivel actual y configuración.</p>`;
    return;
  }

  resultadoDiv.innerHTML = `<h2>${skill}</h2><p>XP restante: ${xpRestante.toLocaleString()} XP</p><hr/>`;

  metodosValidos.forEach(metodo => {
    const horas = xpRestante / metodo.xpHora;
    const dias = horas / horasPorDia;
    const precio = metodo.gpHora ? (horas * metodo.gpHora * 0.5) : 0;

    resultadoDiv.innerHTML += `
      <div class="metodo">
        <h3>${metodo.nombre}</h3>
        <p><strong>XP/hora:</strong> ${metodo.xpHora.toLocaleString()} xp</p>
        <p><strong>ETA:</strong> ${horas.toFixed(1)} horas (${dias.toFixed(1)} días)</p>
        ${
          precio > 0
            ? `<p><strong>Precio estimado:</strong> ${precio.toLocaleString()} gp</p>`
            : `<p><strong>Precio estimado:</strong> Gratis</p>`
        }
      </div>
      <hr/>
    `;
  });
}
