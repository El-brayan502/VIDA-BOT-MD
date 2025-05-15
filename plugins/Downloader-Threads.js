// *👂 [ Threads Post Downloader ]*
// *By Code Titans*

import axios from 'axios';

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) return conn.reply(m.chat, '🚩 Ingresa la URL de la publicación de Threads que deseas descargar.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* https://www.threads.net/@soyaa.hw/post/DBRILEWOKc9?xmt=DAQGzWjBQvLI1eZ6eAkWKyptdNqIC2QyZlitAZYkhJdSqTw`, m, rcanal);

  await m.react('🕓');

  try {
    const response = await axios.get(`https://apis-starlights-team.koyeb.app/starlight/threads-DL?url=${encodeURIComponent(text)}`);
    
    if (response.status === 200) {
      const post = response.data;

      let txt = '`乂  T H R E A D S  -  D O W N L O A D`\n\n';
      txt += `    ✩  *Autor* : ${post.creator}\n`;
      txt += `    ✩  *Imágenes* : ${post.images.length}\n\n`;

      for (let i = 0; i < post.images.length; i++) {
        await conn.sendMessage(m.chat, { image: { url: post.images[i] }, caption: txt + `> 🖼️ Imagen ${i + 1}: ${post.images[i]}` }, { quoted: m });
      }

      if (post.videos.length > 0) {
        for (let i = 0; i < post.videos.length; i++) {
          await conn.sendMessage(m.chat, { video: { url: post.videos[i] }, caption: txt + `> 📹 Video ${i + 1}: ${post.videos[i]}` }, { quoted: m });
        }
      }

      await m.react('✅');
    } else {
      await m.react('✖️');
      await conn.reply(m.chat, 'Error al obtener datos desde Threads.', m);
    }
  } catch (error) {
    console.error(error);
    await m.react('✖️');
    await conn.reply(m.chat, 'Hubo un error al procesar la solicitud. Intenta de nuevo más tarde.', m);
  }
}

handler.tags = ['downloader'];
handler.help = ['threads *<url>*'];
handler.command = ['threads', 'dlthreads'];
handler.register = true;

export default handler;