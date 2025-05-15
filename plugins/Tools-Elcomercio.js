import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `🍇 Ingrese un término de búsqueda.\n\nEjemplo:\n> *${usedPrefix + command}* castillo`, m, rcanal);
  }

  await m.react('🕓');
  try {
    const res = await fetch(`https://delirius-apiofc.vercel.app/tools/elcomercio?query=${encodeURIComponent(text)}`);
    const json = await res.json();

    if (!json.data || json.data.length === 0) {
      await m.react('✖️');
      return await conn.reply(m.chat, 'No se encontraron resultados para esta búsqueda.', m);
    }

    let responseText = '`📄 Resultados de la búsqueda`\n\n';
    json.data.forEach(article => {
      responseText += `*Título:* ${article.title}\n`;
      responseText += `*Publicación:* ${article.publish}\n`;
      responseText += `*URL:* ${article.url}\n`;
      responseText += `*Imagen:* ${article.image}\n\n`;
    });

    await conn.reply(m.chat, responseText, m);
    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('✖️');
    await conn.reply(m.chat, 'Hubo un error al procesar la solicitud. Intenta de nuevo más tarde.', m);
  }
};

handler.help = ['elcomerciope <término>'];
handler.tags = ['tools'];
handler.command = ['elcomerciope', 'elcomercio'];
handler.register = true;

export default handler;