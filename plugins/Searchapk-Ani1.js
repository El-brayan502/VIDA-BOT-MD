import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `🍇 Ingrese un término de búsqueda.\n\nEjemplo:\n> *${usedPrefix + command}* CapCut`, m, rcanal);
  }

  await m.react('🕓');

  try {
    const res = await fetch(`https://delirius-apiofc.vercel.app/search/ani1?query=${encodeURIComponent(text)}`);
    const json = await res.json();

    if (!json.data || json.data.length === 0) {
      await m.react('✖️');
      return conn.reply(m.chat, 'No se encontraron resultados para esta búsqueda.', m);
    }

    let txt = '🎮 Resultados de la búsqueda:\n\n';
    json.data.forEach(result => {
      txt += `*Nombre:* ${result.name}\n`;
      txt += `*Título:* ${result.title}\n`;
      txt += `*Desarrollador:* ${result.developer}\n`;
      txt += `*Descripción:* ${result.description}\n`;
      txt += `*Versión:* ${result.version}\n`;
      txt += `*Tamaño:* ${result.size}\n`;
      txt += `*Sistema operativo:* ${result.system}\n`;
      txt += `*Calificación:* ${result.rating} (${result.vote} votos)\n`;
      txt += `*Enlace de descarga:* ${result.download}\n\n`;
    });

    await conn.reply(m.chat, txt, m);
    await m.react('✅');

  } catch (error) {
    console.error('Error:', error);
    await m.react('✖️');
    await conn.reply(m.chat, 'Hubo un error al procesar la solicitud. Intenta de nuevo más tarde.', m);
  }
};

handler.help = ['ani1 <término>'];
handler.tags = ['tools', 'ApkSearchs'];
handler.command = ['ani1', 'ani1search'];
handler.register = true;

export default handler;
