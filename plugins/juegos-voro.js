let handler = async (m, { args, usedPrefix }) => {
  // Arrays de preguntas y retos
  let verdades = [
    "¿Cuál es tu mayor vergüenza?",
    "¿Qué es lo más raro que has hecho en público?",
    "¿Alguna vez has dicho una mentira para evitar problemas?",
    "¿A quién fue tu primer crush y por qué?",
    "¿Qué es lo más embarazoso que te ha pasado en el trabajo/escuela?"
  ];

  let retos = [
    "Envía un selfie haciendo una cara graciosa.",
    "Imita a un famoso durante 30 segundos.",
    "Canta el coro de tu canción favorita.",
    "Cuenta un chiste (aunque sea malo).",
    "Haz 10 flexiones y envía un video."
  ];

  // Función para elegir un elemento aleatorio de un array
  const escoger = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // Detecta si se pasó un argumento
  let categoria = args[0] ? args[0].toLowerCase() : '';

  if (categoria === 'verdad') {
    return m.reply(`*Verdad:* ${escoger(verdades)}`);
  } else if (categoria === 'reto') {
    return m.reply(`*Reto:* ${escoger(retos)}`);
  } else {
    // Sin argumento, elegimos al azar entre verdad y reto
    let tipo = Math.random() < 0.5 ? 'verdad' : 'reto';
    if (tipo === 'verdad') {
      return m.reply(`*Verdad:* ${escoger(verdades)}`);
    } else {
      return m.reply(`*Reto:* ${escoger(retos)}`);
    }
  }
};

handler.help = ['verdaderooreto [verdad|reto]'];
handler.tags = ['juegos'];
handler.command = ['verdaderooreto', 'voro', 'vtor'];
export default handler;