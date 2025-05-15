import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `🚩 Ingrese el nombre de usuario de TikTok.\n\nEjemplo:\n> *${usedPrefix + command}* djayyz_1`, m, rcanal);

  await m.react('🕓');
  try {
    const res = await fetch(`https://vapis.my.id/api/tt-stalk?username=${text}`);
    const json = await res.json();

    if (!json.status || !json.data) {
      await m.react('✖️');
      return await conn.reply(m.chat, 'No se encontraron resultados para esta búsqueda.', m);
    }

    const { uniqueId: username, nickname, avatarLarger: profile, verified, region } = json.data.user;
    const { followerCount: followers, followingCount: following, heart: likes, videoCount: videos } = json.data.stats;

    let txt = '`乂  T I K T O K  -  S T A L K`\n\n';
    txt += `  ✩   *Usuario* : ${username}\n`;
    txt += `  ✩   *Apodo* : ${nickname}\n`;
    txt += `  ✩   *Seguidores* : ${followers}\n`;
    txt += `  ✩   *Siguiendo* : ${following}\n`;
    txt += `  ✩   *Likes* : ${likes}\n`;
    txt += `  ✩   *Videos* : ${videos}\n`;
    txt += `  ✩   *Verificado* : ${verified ? 'Sí' : 'No'}\n`;
    txt += `  ✩   *Región* : ${region || 'No disponible'}\n`;

    await conn.sendFile(m.chat, profile, 'thumbnail.jpg', txt, m);
    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('✖️');
    await conn.reply(m.chat, 'Hubo un error al procesar la solicitud. Intenta de nuevo más tarde.', m);
  }
};

handler.help = ['tiktokstalk <usuario>'];
handler.tags = ['tools'];
handler.command = ['tiktokstalk', 'stalktiktok', 'ttstalk'];
handler.register = true;

export default handler;