import fetch from 'node-fetch';

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) return conn.reply(m.chat, '🚩 Ingresa el nombre del canal para obtener información on el anterior canal.', m, rcanal);

  await m.react('🕓');

  try {
    let res = await fetch(`https://delirius-apiofc.vercel.app/tools/channelstalk?channel=deliriuus`);
    let json = await res.json();

    if (!json.data || json.data.length === 0) {
      return conn.reply(m.chat, 'No se encontraron resultados para tu búsqueda.', m);
    }

    let txt = '`乂  C A N A L  -  I N F O R M A C I Ó N`';

    for (let i = 0; i < json.data.length; i++) {
      let post = json.data[i];
      txt += `\n\n`;
      txt += `  *» Nro* : ${i + 1}\n`;
      txt += `  *» Texto del Mensaje* : ${post.message_text}\n`;
      txt += `  *» URL del Mensaje* : ${post.message_url}\n`;
      txt += `  *» Usuario* : [${post.user_name}](${post.user_url})\n`;
      txt += `  *» Foto del Usuario* : ${post.user_photo}\n`;
      txt += `  *» Fecha y Hora* : ${post.datetime || 'No disponible'}\n`;
      txt += `  *» Vistas* : ${post.views || 'No disponible'}\n`;

      if (post.message_photo.length > 0) {
        txt += `  *» Imágenes* : ${post.message_photo.join(', ')}\n`;
      }
    }

    await conn.reply(m.chat, txt, m, rcanal);
    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('✖️');
    await conn.reply(m.chat, 'Ocurrió un error al obtener la información.', m);
  }
}

handler.help = ['canalinfo *<nombre del canal>*'];
handler.tags = ['info'];
handler.command = ['canalinfotelegram'];
handler.register = true;

export default handler;