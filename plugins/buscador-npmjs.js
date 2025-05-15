
import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `🥀 Escribe el nombre del scraper.\nEjemplo: ${usedPrefix + command} yt-search`, m, rcanal);
  }

  try {
    await m.react('🔍'); 
    conn.reply(m.chat, '🌹 Buscando el scraper....', m, {
      contextInfo: { 
        externalAdReply: { 
          mediaUrl: null, 
          mediaType: 1, 
          showAdAttribution: true,
          title: packname, 
          body: dev, 
          previewType: 0, 
          thumbnail: icons, 
          sourceUrl: channel 
        }
      }
    });

    let res = await fetch(`http://registry.npmjs.com/-/v1/search?text=${text}`);
    let { objects } = await res.json();

    if (!objects.length) {
      return conn.reply(m.chat, `🌹 No se encontró resultado de: ${text}`, m);
    }

    let txt = '`乂  S C R A P E R  -  N I N O  N A K A N O`\n\n';
    txt += objects.map(({ package: pkg }) => {
      return `  ✩   *Nombre* : ${pkg.name}\n` +
             `  ✩   *Versión* : V${pkg.version}\n` +
             `  ✩   *Enlace* : ${pkg.links.npm}\n` +
             `  ✩   *Descripción* : ${pkg.description}\n\n` +
             `  ------------------------\n`;
    }).join('');

    await conn.reply(m.chat, txt, m, rcanal);
    await m.react('✅'); 
  } catch {
    await conn.reply(m.chat, '⚙️ Ocurrió un error', m);
    await m.react('❌'); 
  }
};

handler.help = ['npmjs'];
handler.tags = ['buscador'];
handler.command = ['npmjs'];
handler.register = true;

export default handler;