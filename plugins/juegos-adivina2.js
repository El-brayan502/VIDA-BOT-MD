let handler = async (m) => {
  let numero = Math.floor(Math.random() * 10) + 1;
  m.reply(`🎲 Adivina un número del 1 al 10.\n\n💭 Escribe tu número respondiendo a este mensaje.`);

  // Guardar el número en la sesión del usuario
  global.adivinanza = global.adivinanza || {};
  global.adivinanza[m.sender] = numero;
};

handler.command = ["adivina"];
handler.tags = ["juegos"];
handler.help = ["adivina"];

export default handler;