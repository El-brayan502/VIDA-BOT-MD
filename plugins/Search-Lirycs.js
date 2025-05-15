import fetch from 'node-fetch';

const api = "https://archive-ui.tanakadomp.biz.id/search/lirik?q=";

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) return conn.reply(m.chat, '🚩 Por favor, ingresa el texto o título de la canción que deseas buscar.\n\nEjemplo:\n' + `> *${usedPrefix + command}* neverita`, m, rcanal);

  await m.react('🕓');

  try {
    let url = `${api}${encodeURIComponent(text)}`;
    let res = await fetch(url);
    let json = await res.json();

    if (!json.status || !json.result) {
      return conn.reply(m.chat, 'No se encontraron resultados para tu búsqueda.', m);
    }

    let result = json.result;
    let txt = '`乂  L I R Y C S  -  B Ú S Q U E D A`';

    txt += `\n\n`;
    txt += `  *» Título* : ${result.title}\n`;
    txt += `  *» Álbum* : ${result.album || 'No disponible'}\n`;
    txt += `  *» Imagen* : ${result.thumb}\n`;
    txt += `  *» Letra* :\n${result.lyrics}\n`;

    await conn.reply(m.chat, txt, m, rcanal);
    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('✖️');
  }
}

handler.help = ['lyricssearch *<búsqueda>*'];
handler.tags = ['search'];
handler.command = /^(lirik|lyrics|lyric|letra3)$/i;
handler.register = true;

export default handler;