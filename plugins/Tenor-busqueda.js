import fetch from 'node-fetch';

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) return conn.reply(m.chat, '🚩 Ingresa el nombre que deseas buscar en Tenor.\n\nEjemplo:\n' + `> *${usedPrefix + command}* Nayeon`, m, rcanal);
  await m.react('🕓');

  try {
    let res = await fetch(`https://delirius-apiofc.vercel.app/search/tenor?q=${encodeURIComponent(text)}`);
    let json = await res.json();

    if (!json.data || json.data.length === 0) {
      return conn.reply(m.chat, 'No se encontraron resultados para tu búsqueda.', m);
    }

    let txt = '`乂  T E N O R  -  B Ú S Q U E`';

    for (let i = 0; i < json.data.length; i++) {
      let gif = json.data[i];
      txt += `\n\n`;
      txt += `  *» Nro* : ${i + 1}\n`;
      txt += `  *» Título* : ${gif.title}\n`;
      txt += `  *» Fecha de creación* : ${gif.created}\n`;
      txt += `  *» GIF* : ${gif.gif}\n`;
      txt += `  *» Video MP4* : ${gif.mp4}\n`;
    }

    await conn.reply(m.chat, txt, m, rcanal);
    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('✖️');
  }
}

handler.help = ['tenorsearch *<búsqueda>*'];
handler.tags = ['search'];
handler.command = ['tenorsearch'];
handler.register = true;

export default handler;