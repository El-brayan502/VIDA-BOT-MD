import fetch from 'node-fetch';

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) return conn.reply(m.chat, '🚩 Ingresa el título de la canción que deseas buscar en Deezer.\n\nEjemplo:\n' + `> *${usedPrefix + command}* Feel Special`, m, rcanal);
  await m.react('🕓');

  try {
    let res = await fetch(`https://delirius-apiofc.vercel.app/search/deezer?q=${encodeURIComponent(text)}`);
    let json = await res.json();

    if (!json.data || json.data.length === 0) {
      return conn.reply(m.chat, 'No se encontraron resultados para tu búsqueda.', m);
    }

    let txt = '`乂  D E E Z E R  -  B Ú S Q U E`';

    for (let i = 0; i < json.data.length; i++) {
      let track = json.data[i];
      txt += `\n\n`;
      txt += `  *» Nro* : ${i + 1}\n`;
      txt += `  *» Título* : ${track.title}\n`;
      txt += `  *» Artista* : ${track.artist}\n`;
      txt += `  *» Duración* : ${track.duration}\n`;
      txt += `  *» Rango* : ${track.rank}\n`;
      txt += `  *» URL de la pista* : ${track.url}\n`;
      txt += `  *» Previo* : ${track.preview}\n`;
      txt += `  *» Imagen* : ${track.image}\n`;
    }

    await conn.reply(m.chat, txt, m, rcanal);
    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('✖️');
  }
}

handler.help = ['deezersearch *<búsqueda>*'];
handler.tags = ['search'];
handler.command = ['deezersearch'];
handler.register = true;

export default handler;