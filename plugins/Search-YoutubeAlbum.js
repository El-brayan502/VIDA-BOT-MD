import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `🚩 Por favor, ingrese un término de búsqueda.\n\nEjemplo:\n> *${usedPrefix + command}* Twice`, m, rcanal);
  }

  await m.react('🕓');
  try {
    const res = await fetch(`https://delirius-apiofc.vercel.app/search/ytsearchalbum?q=${text}`);
    const json = await res.json();

    if (!json.status || !json.listItem || json.listItem.length === 0) {
      await m.react('✖️');
      return await conn.reply(m.chat, 'No se encontraron resultados para esta búsqueda.', m);
    }

    let txt = '`🎶 Resultados de búsqueda de álbumes`\n\n';
    json.listItem.forEach((album, index) => {
      txt += `✩ ${index + 1}. *Título:* ${album.title}\n`;
      txt += `   *Artista:* ${album.artist}\n`;
      txt += `   *Tipo:* ${album.type}\n`;
      txt += `   *Año:* ${album.year}\n`;
      txt += `   *Imagen:* ${album.image}\n\n`;
    });

    await conn.reply(m.chat, txt, m, rcanal);
    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('✖️');
    await conn.reply(m.chat, 'Hubo un error al procesar la solicitud. Intenta de nuevo más tarde.', m);
  }
};

handler.help = ['album <término>'];
handler.tags = ['tools'];
handler.command = ['ytsearchalbum', 'buscaralbumyt'];
handler.register = true;

export default handler;