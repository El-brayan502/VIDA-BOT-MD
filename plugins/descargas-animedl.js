// *🌸 [ Anime Download Info ]*
// *By Code Titans*

import axios from 'axios';
import cheerio from 'cheerio';

const getDownloadLinks = async (url) => {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const downloads = {};
    
    $('table.table-downloads tbody tr').each((_, element) => {
      const server = $(element).find('td:nth-child(2)').text().trim();
      const link = $(element).find('td:nth-child(4) a').attr('href');

      if (server && link) {
        downloads[server] = link;
      }
    });
    
    return downloads;
  } catch (error) {
    console.error('Error al procesar la URL:', url, error.message);
    return { error: 'No se pudieron obtener los enlaces' };
  }
};

let handler = async (m, { conn, command, args, usedPrefix }) => {
  if (!args[0]) {
    return conn.reply(m.chat, `🚩 Ingresa el link del anime para obtener información.\n\nEjemplo:\n> *${usedPrefix + command}* https://tioanime.com/ver/dungeon-meshi-1`, m, rcanal);
  }

  const links = await getDownloadLinks(args[0]);

  if (links.error) {
    return conn.reply(m.chat, links.error, m);
  }

  let txt = '`乂  A N I M E  -  D E S C A R G A S`\n\n';
  txt += `    ✩  *Servidores Dispónibles:* ${Object.keys(links).join(', ')}\n`;
  
  for (const [server, link] of Object.entries(links)) {
    txt += `    ✩  *Enlace ${server}:* Descargar ${link}\n`;
  }
  
  await conn.sendMessage(m.chat, { text: txt }, { quoted: m });
}

handler.tags = ['anime'];
handler.help = ['animedl *<url>*'];
handler.command = ['animedl', 'animelinks'];
handler.register = true;
handler.group = true;

export default handler;