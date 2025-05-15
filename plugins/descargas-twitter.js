import axios from 'axios';
import cheerio from 'cheerio';

let handler = async (m, { conn, args }) => {
    if (!args[0]) throw m.reply('✧ Por favor ingresa el link de Twitter');
    const sender = m.sender.split('@')[0];
    const url = args[0];

    m.reply('⏳ Procesando tu solicitud, espera un momento...');

    try {
        // Intentar descargar usando la primera función
        let downloadResult = await twitterDL(url);

        // Si falla, intenta con la segunda función
        if (!downloadResult.status || downloadResult.media.length === 0) {
            downloadResult = await twitterDLv2(url);
        }

        // Si ambas funciones fallan, lanzar error
        if (!downloadResult.status || downloadResult.media.length === 0) {
            throw m.reply('❌ No se pudo descargar el contenido.');
        }

        // Procesar y enviar cada medio
        for (const media of downloadResult.media) {
            const fileUrl = typeof media === 'string' ? media : media.url;
            const { data: buffer } = await axios.get(fileUrl, { responseType: 'arraybuffer' });

            const caption = `✧ Para: @${sender}`;

            // Verificar si es imagen o video basado en su extensión
            if (downloadResult.type === 'image' || /\.(jpg|jpeg|png|gif)$/.test(fileUrl)) {
                await conn.sendMessage(
                    m.chat,
                    {
                        image: buffer,
                        caption: caption,
                        mentions: [m.sender],
                    },
                    { quoted: m }
                );
            } else if (downloadResult.type === 'video' || /\.(mp4|mov|avi|mkv)$/.test(fileUrl)) {
                await conn.sendMessage(
                    m.chat,
                    {
                        video: buffer,
                        mimetype: 'video/mp4',
                        fileName: 'video.mp4',
                        caption: caption,
                        mentions: [m.sender],
                    },
                    { quoted: m }
                );
            } else {
                m.reply('❌ Formato desconocido, no se pudo enviar el contenido.');
            }
        }
    } catch (error) {
        console.error('Handler Error:', error);
        conn.reply(m.chat, `❌ Error: ${error.message}`, m);
    }
};

handler.help = ['twitter *<url>*'];
handler.tags = ['dl'];
handler.command = /^(x|twt|twitter(dl)?)$/i;

handler.limit = true;
handler.register = true;

export default handler;

// Función de descarga desde Twitter (versión 1)
async function twitterDL(url) {
    try {
        const result = { status: true, type: '', media: [] };
        const { data } = await axios(`https://savetwitter.net/api/ajaxSearch`, {
            method: 'post',
            data: { q: url, lang: 'en' },
            headers: {
                accept: '*/*',
                'user-agent': 'PostmanRuntime/7.32.2',
                'content-type': 'application/x-www-form-urlencoded',
            },
        });

        let $ = cheerio.load(data.data);
        if ($('div.tw-video').length === 0) {
            $('div.video-data > div > ul > li').each(function () {
                result.type = 'image';
                result.media.push($(this).find('div > div:nth-child(2) > a').attr('href'));
            });
        } else {
            $('div.tw-video').each(function () {
                let qualityText = $(this).find('.tw-right > div > p:nth-child(1) > a').text().includes('(')
                    ? $(this).find('.tw-right > div > p:nth-child(1) > a').text().split('(')[1].split('p')[0].trim()
                    : $(this).find('.tw-right > div > p:nth-child(1) > a').text().trim();

                result.type = 'video';
                result.media.push({
                    quality: qualityText,
                    url: $(this).find('.tw-right > div > p:nth-child(1) > a').attr('href'),
                });
            });
        }

        return result;
    } catch (err) {
        const result = {
            status: false,
            message: 'Media not found!\n\n' + String(err),
        };
        console.log(result);
        return result;
    }
}

// Función de descarga desde Twitter (versión 2)
async function twitterDLv2(url) {
    try {
        const { data } = await axios.get(`https://twitsave.com/info?url=${url}`);
        let $ = cheerio.load(data);
        let result = [];

        $('div.origin-top-right > ul > li').each(function () {
            const resolutionText = $(this).find('a > div > div > div').text();
            if (resolutionText.includes('Resolution: ')) {
                const width = resolutionText.split('Resolution: ')[1].split('x')[0];
                const height = resolutionText.split('Resolution: ')[1].split('x')[1];
                const videoUrl = $(this).find('a').attr('href');
                result.push({ width, height, url: videoUrl });
            }
        });

        if (result.length === 0) {
            return { status: false, message: 'No se encontró el video' };
        }

        const sortedResult = result.sort((a, b) => b.height - a.height);
        const highestResolution = sortedResult[0].width;
        return { status: true, type: 'video', media: sortedResult.filter((video) => video.width === highestResolution) };
    } catch (err) {
        return { status: false, message: 'Error al obtener datos de twitsave\n\n' + String(err) };
    }
}