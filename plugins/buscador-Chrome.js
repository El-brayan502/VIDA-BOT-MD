import axios from 'axios';
import cheerio from 'cheerio';

const chromeStoreSearch = async (query) => {
  try {
    const { data } = await axios.get(`https://chromewebstore.google.com/search/${query}`);
    const $ = cheerio.load(data);
    
    const results = [];

    $('div.Cb7Kte').each((index, element) => {
      const title = $(element).find('h2.CiI2if').text();
      const link = $(element).find('a.q6LNgd').attr('href').replace('./', 'https://chromewebstore.google.com/');
      const imgSrc = $(element).find('img.fzxcm').attr('src');
      const publisher = $(element).find('span.cJI8ee.HtRvfe').text() || 'No encontrado';
      const rating = $(element).find('span.Vq0ZA').text();
      const ratingCount = $(element).find('span.Y30PE').text();

      results.push({
        title,
        link,
        imgSrc,
        publisher,
        rating,
        ratingCount
      });
    });

    return results;
  } catch (error) {
    throw new Error("Error al realizar la búsqueda en la Chrome Web Store: " + error.message);
  }
};

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) return conn.reply(m.chat, `🚩 Ingrese un término de búsqueda\n\nEjemplo:\n> *${usedPrefix + command}* cookie`, m);

  await m.react('🕓');
  try {
    const results = await chromeStoreSearch(args.join(' '));
    
    if (results.length === 0) {
      return conn.reply(m.chat, 'No se encontraron resultados.', m);
    }

    let txt = '`乂  B Ú S Q U E D A  -  C H R O M E  W E B  S T O R E`\n\n';
    results.forEach((item) => {
      txt += `✩  *Título*: ${item.title}\n`;
      txt += `   *Enlace*: ${item.link}\n`;
      txt += `   *Editor*: ${item.publisher}\n`;
      txt += `   *Calificación*: ${item.rating || 'Sin calificación'} (${item.ratingCount || '0'} reseñas)\n`;
      txt += `   *Imagen*: ${item.imgSrc}\n\n`;
    });

    await conn.sendMessage(m.chat, { text: txt }, { quoted: m });
    await m.react('✅');
  } catch (error) {
    await conn.reply(m.chat, error.message, m);
    await m.react('✖️');
  }
};

handler.help = ['chromestore *<término>*'];
handler.tags = ['search'];
handler.command = ['chromestore', 'chrome'];
handler.register = true;

export default handler;
