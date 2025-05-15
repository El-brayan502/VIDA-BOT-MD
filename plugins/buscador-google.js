import fetch from 'node-fetch';

let handler = async (m, { text }) => {
  if (!text) {
    m.reply(`🐇 Por favor, proporciona el término de búsqueda que deseas realizar a *Google*.`);
    return;
  }

  const apiUrl = `https://vapis.my.id/api/googlev1?q=${encodeURIComponent(text)}`;

  try {
    const response = await fetch(apiUrl);
    const result = await response.json();

    if (!result.status) {
      m.reply('Error al realizar la búsqueda.');
      return;
    }

    let replyMessage = `Resultados de la búsqueda:\n\n`;
    result.data.forEach((item, index) => {
      replyMessage += `☁️ *${index + 1}. ${item.title}*\n`;
      replyMessage += `📰 *${item.desc}*\n`;
      replyMessage += `🔗 URL: ${item.link}\n\n`;
    });

    m.react('✅');
    m.reply(replyMessage);
  } catch (error) {
    console.error(`Error al realizar la solicitud a la API:`, error);
    m.reply(`Ocurrió un error al obtener los resultados.`);
  }
};

handler.command = ['google'];

export default handler;
