let handler = async (m, { conn }) => {
  const info = `
╭─❒ 「 *INFO DEL BOT* 」
│ 🤖 *Nombre:* Vida-AI
│ 👑 *Creador:* @Brayan330
│ 🧠 *Base:* VidaBot-MD
│ 🌐 *Plataforma:* Baileys MD
│ 📆 *Fecha:* ${new Date().toLocaleDateString()}
╰───────────────`;

  await conn.sendMessage(m.chat, {
    text: info,
    contextInfo: {
      externalAdReply: {
        title: "Información del Bot",
        body: "Bot desarrollado con amor",
        sourceUrl: "https://github.com/El-brayan502/NagiBotV2",
        thumbnailUrl: "https://qu.ax/AYeKF.jpg",
        mediaType: 1,
        renderLargerThumbnail: true,
        showAdAttribution: true
      }
    }
  });
};

handler.command = ['infobot'];
handler.tags = ['main'];
handler.help = ['infobot'];
export default handler;