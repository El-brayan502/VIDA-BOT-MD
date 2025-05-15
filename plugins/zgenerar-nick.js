import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `🚩 Por favor, ingrese un texto para generar su nick.\n\nEjemplo:\n> *${usedPrefix + command}* Jose`, m, rcanal);
  }

  await m.react('🕓');
  try {
    const res = await fetch(`https://api.nexfuture.com.br/api/outros/fazer/nick?query=${encodeURIComponent(text)}`);
    const json = await res.json();

    if (!json.status || !json.resultado || json.resultado.length === 0) {
      await m.react('✖️');
      return await conn.reply(m.chat, 'No se encontraron resultados para esta búsqueda.', m);
    }

    let txt = '`N I C K  -  G E N E R A D O`\n\n';
    json.resultado.forEach((resultado, index) => {
      txt += `✩ *Fuente:* ${resultado.fonte}\n`;
      txt += `✩ *Nombre:* ${resultado.nome}\n\n`;
    });

    await conn.reply(m.chat, txt, m, rcanal);
    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('✖️');
    await conn.reply(m.chat, 'Hubo un error al procesar la solicitud. Intenta de nuevo más tarde.', m);
  }
};

handler.help = ['nick <término>'];
handler.tags = ['Generador'];
handler.command = ['nick', 'generarnick'];
handler.register = true;

export default handler;