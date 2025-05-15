import fetch from 'node-fetch';

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) return conn.reply(m.chat, '🚩 Ingresa el nombre que deseas buscar en WhatsApp.\n\nEjemplo:\n' + `> *${usedPrefix + command}* gbwhatsapp`, m, rcanal);

  await m.react('🕓');

  try {
    let res = await fetch(`https://vajira-official-api.vercel.app/search/modwhatsapp?q=${encodeURIComponent(text)}`);
    let json = await res.json();

    if (!json.status || !json.result || json.result.length === 0) {
      return conn.reply(m.chat, 'No se encontraron resultados para tu búsqueda.', m);
    }

    let txt = '`乂  W H A T S A P P  -  B Ú S Q U E`';

    for (let i = 0; i < json.result.length; i++) {
      let app = json.result[i];
      txt += `\n\n`;
      txt += `  *» Nro*: ${i + 1}\n`;
      txt += `  *» Título*: ${app.title}\n`;
      txt += `  *» Enlace*: ${app.link}\n`;
    }

    await conn.reply(m.chat, txt);
    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('✖️');
  }
}

handler.help = ['whatsappsearch *<búsqueda>*'];
handler.tags = ['search'];
handler.command = /^(modwhatsapp|whatsappmods)$/i;
handler.register = true;

export default handler;