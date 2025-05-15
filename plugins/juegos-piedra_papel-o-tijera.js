let handler = async (m, { text }) => {
  const opciones = ["piedra", "papel", "tijera"];
  if (!text) return m.reply("Elige: piedra, papel o tijera. Ej: !ppt piedra");

  const eleccionUsuario = text.toLowerCase();
  if (!opciones.includes(eleccionUsuario)) {
    return m.reply("Opción inválida. Elige entre: piedra, papel o tijera.");
  }

  const eleccionBot = opciones[Math.floor(Math.random() * 3)];
  let resultado = "";

  if (eleccionUsuario === eleccionBot) {
    resultado = "¡Empate!";
  } else if (
    (eleccionUsuario === "piedra" && eleccionBot === "tijera") ||
    (eleccionUsuario === "papel" && eleccionBot === "piedra") ||
    (eleccionUsuario === "tijera" && eleccionBot === "papel")
  ) {
    resultado = "¡Ganaste!";
  } else {
    resultado = "Perdiste...";
  }

  m.reply(`Tú elegiste: ${eleccionUsuario}\nYo elegí: ${eleccionBot}\n${resultado}`);
};

handler.help = ["ppt *<piedra|papel|tijera>*"];
handler.tags = ["juegos"];
handler.command = ["ppt"];

module.exports = handler;