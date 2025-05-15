// *👂 [ Descargar Tono de Llamada ]*
// *By Code Titans*

import axios from 'axios';

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) return conn.reply(m.chat, '🚩 Ingresa la URL del tono de llamada que deseas descargar.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* https://www.zedge.net/ringtone/d0d0996d-7974-480b-857f-f8e45805fc81`, m, rcanal);

  await m.react('🕓');

  try {
    const response = await axios.get(`https://apis-starlights-team.koyeb.app/starlight/zedge-dl?url=${encodeURIComponent(text)}`);
    
    if (response.status === 200) {
      const ringtoneInfo = response.data;
      let txt = '`乂  Z D E D G E  -  D O W N L O A D`\n\n';
      txt += `    ✩  *Creador* : ${ringtoneInfo.creator}\n`;
      txt += `    ✩  *Tipo* : ${ringtoneInfo.type}\n`;
      txt += `    ✩  *Tamaño* : ${ringtoneInfo.size}\n`;
      txt += `    ✩  *URL* : ${ringtoneInfo.url}`;

      await conn.sendMessage(m.chat, { text: txt, mentions: [m.sender] }, { quoted: m });
      await m.react('✅');
    } else {
      await m.react('✖️');
      await conn.reply(m.chat, 'Error al obtener datos desde Zedge.', m);
    }
  } catch (error) {
    console.error(error);
    await m.react('✖️');
    await conn.reply(m.chat, 'Hubo un error al procesar la solicitud. Intenta de nuevo más tarde.', m);
  }
}

handler.tags = ['zedge'];
handler.help = ['zedge-download *<url>*'];
handler.command = ['zedge', 'zdownload'];
handler.register = true;

export default handler;