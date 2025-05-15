// Generador de QR - By BrayanCrazzy 🔥
// Free Code Titans
// https://whatsapp.com/channel/0029ValMlRS6buMFL9d0iQ0S

import { toDataURL } from 'qrcode';

const handler = async (m, { text, conn }) => {
  if (!text) {
    return conn.reply(m.chat, `*[❗𝐈𝐍𝐅𝐎❗] 𝙸𝙽𝙶𝚁𝙴𝚂𝙴 𝙴𝙻 𝚃𝙴𝚇𝚃𝙾 𝚀𝚄𝙴 𝚀𝚄𝙸𝙴𝚁𝙰 𝙲𝙾𝙽𝚅𝙴𝚁𝚃𝙸𝚁 𝙴𝙽 𝙲𝙾𝙳𝙸𝙶𝙾 𝚀𝚁*`, m, rcanal);
  }

  const qrCode = await toDataURL(text.slice(0, 2048), { scale: 8 });
  conn.sendFile(m.chat, qrCode, 'qrcode.png', '¯\\_(ツ)_/¯', m);
};

handler.help = ['', 'code'].map((v) => 'qr' + v + ' <teks>');
handler.tags = ['tools'];
handler.command = /^qr(code)?$/i;

export default handler;