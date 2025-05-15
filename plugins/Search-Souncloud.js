/* 
- SoundCloud Search Bot
- Free Code Titans 
- https://whatsapp.com/channel/0029ValMlRS6buMFL9d0iQ0S 
*/
// *🍁 [ SoundCloud Search Bot ]*

import axios from 'axios';

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) return conn.reply(m.chat, '🚩 Ingresa el texto que deseas buscar en SoundCloud.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* Que te parece`, m, rcanal);
  await m.react('🕓');

  try {
    const response = await axios.get(`https://apis-starlights-team.koyeb.app/starlight/soundcloud-search?text=${encodeURIComponent(text)}`);

    if (response.data && Array.isArray(response.data)) {
      const results = response.data;
      if (results.length > 0) {
        for (let i = 0; i < results.length; i++) {
          let track = results[i];
          let txt = '`乂  S O U N D C L O U D  -  B U S Q U E D A`\n\n';
          txt += `    ✩  *Nro* : ${i + 1}\n`;
          txt += `    ✩  *Título* : ${track.title || 'Sin título'}\n`;
          txt += `    ✩  *Artista* : ${track.artist || 'Desconocido'}\n`;
          txt += `    ✩  *Reproducciones* : ${track.repro || 'N/A'}\n`;
          txt += `    ✩  *Duración* : ${track.duration || 'N/A'}\n`;
          txt += `    ✩  *Creador* : ${track.creator || 'Desconocido'}\n`;
          txt += `    ✩  *URL* : ${track.url}\n\n`;
          txt += `    Imagen : ${track.image}`;

          await conn.sendMessage(m.chat, { text: txt, caption: '🔊 Escucha aquí:', url: track.url }, { quoted: m });
        }
        await m.react('✅');
      } else {
        await m.react('✖️');
        await conn.reply(m.chat, 'No se encontraron resultados para esta búsqueda en SoundCloud.', m);
      }
    } else {
      await m.react('✖️');
      await conn.reply(m.chat, 'Error al obtener datos de la API de SoundCloud.', m);
    }
  } catch (error) {
    console.error(error);
    await m.react('✖️');
    await conn.reply(m.chat, 'Hubo un error al procesar la solicitud. Intenta de nuevo más tarde.', m);
  }
}

handler.tags = ['search'];
handler.help = ['soundcloudsearch *<texto>*'];
handler.command = ['soundcloudsearch', 'scsearch'];
handler.register = true;

export default handler;