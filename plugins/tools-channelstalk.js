/*
 * WhatsApp Channel Info Bot
 * Free Code Titans 
 * Power By Jose XrL 
 */

// *📊 [ WhatsApp Channel Info Bot ]*

import axios from 'axios';

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) {
    return conn.reply(m.chat, '🚩 Ingresa el link del canal de WhatsApp que deseas obtener información.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* https://whatsapp.com/channel/0029ValMlRS6buMFL9d0iQ0S`, m, rcanal);
  }
  await m.react('🕓');

  try {
    const url = `https://itzpire.com/stalk/whatsapp-channel?url=${encodeURIComponent(text)}`;
    const response = await axios.get(url);

    if (response.data && response.data.status === 'success') {
      const channelData = response.data.data;
      let txt = '`🌹  W H A T S A P P  -  C H A N N E L  -  I N F O`\n\n';
      txt += `    ✩  *Imagen* : ${channelData.img}\n`;
      txt += `    ✩  *Título* : ${channelData.title}\n`;
      txt += `    ✩  *Seguidores* : ${channelData.followers}\n`;
      txt += `    ✩  *Descripción* : ${channelData.description}\n\n`;

      let imge = channelData.img;
      let title = channelData.title;

      await conn.sendMessage(m.chat, { image: { url: imge }, caption: txt }, { quoted: m });
      await m.react('✅');
    } else {
      await m.react('✖️');
      await conn.reply(m.chat, 'No se pudo obtener información del canal de WhatsApp.', m);
    }
  } catch (error) {
    console.error(error);
    await m.react('✖️');
    await conn.reply(m.chat, 'Hubo un error al procesar la solicitud. Intenta de nuevo más tarde.', m);
  }
}

handler.tags = ['info'];
handler.help = ['whatsappchannelinfo *<link>*'];
handler.command = ['channelstalk', 'chinfo'];
handler.register = true;

export default handler;