import fetch from 'node-fetch';

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) return conn.reply(m.chat, '🐲 Ingresa el nombre de usuario del canal de YouTube que deseas buscar.\n\nEjemplo:\n' + `> *${usedPrefix + command}* wanzofc`, m, rcanal);
  await m.react('🕓');

  try {
    let res = await fetch(`https://only-awan.biz.id/api/fullApi/stalk/youtube?username=${encodeURIComponent(text)}`);
    let json = await res.json();

    if (!json.data || !json.data.data) {
      return conn.reply(m.chat, 'No se encontraron resultados para tu búsqueda.', m);
    }

    let channel = json.data.data.channel;
    let latestVideos = json.data.data.latest_videos;

    let txt = '`乂  Y O U T U B E  -  S T A L K`';
    txt += `\n\n*» Nombre de usuario* : ${channel.username}`;
    txt += `\n*» Suscriptores* : ${channel.subscriberCount}`;
    txt += `\n*» Vídeos* : ${channel.videoCount}`;
    txt += `\n*» Avatar* : ${channel.avatarUrl}`;
    txt += `\n*» URL del canal* : ${channel.channelUrl}`;
    txt += `\n*» Descripción* : ${channel.description}`;

    txt += `\n\n*» Últimos vídeos* :`;
    for (let i = 0; i < latestVideos.length; i++) {
      let video = latestVideos[i];
      txt += `\n\n*» ${i + 1}* :`;
      txt += `\n  *» Título* : ${video.title}`;
      txt += `\n  *» ID del vídeo* : ${video.videoId}`;
      txt += `\n  *» Miniatuta* : ${video.thumbnail}`;
      txt += `\n  *» Publicado* : ${video.publishedTime}`;
      txt += `\n  *» Vistas* : ${video.viewCount}`;
      txt += `\n  *» Duración* : ${video.duration}`;
      txt += `\n  *» URL del vídeo* : ${video.videoUrl}`;
    }

    await conn.reply(m.chat, txt, m, rcanal);
    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('✖️');
  }
}

handler.help = ['youtubestalk *<nombre de usuario>*'];
handler.tags = ['ytstalk', 'youtubestalk'];
handler.command = ['youtubestalk', 'ytstalk'];
handler.register = true;

export default handler;