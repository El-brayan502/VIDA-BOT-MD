import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `🚩 Ingrese la URL de la imagen.\n\nEjemplo:\n> *${usedPrefix + command}* https://i.postimg.cc/fWSq0Tsz/apitest.jpg`, m, rcanal);

    await m.react('🕓');

    try {
        const response = await axios.get(`https://delirius-apiofc.vercel.app/tools/cdn?url=${encodeURIComponent(text)}&filename=Delirius`);
        const { status, data } = response.data;

        if (!status) {
            return conn.reply(m.chat, `😞 No se pudo procesar la imagen.`, m);
        }

        const { filename, size, publish, url } = data;

        let txt = '`乂  I M A G E -  C D N`\n\n';
        txt += `  ✩   Nombre del archivo : ${filename}\n`;
        txt += `  ✩   Tamaño : ${size}\n`;
        txt += `  ✩   Publicado : ${publish}\n`;
        txt += `  ✩   URL : ${url}\n\n`;

        conn.reply(m.chat, txt, m, rcanal);
        await m.react('✅');
    } catch (error) {
        console.error(error);
        await m.react('✖️');
        conn.reply(m.chat, `Error al obtener información de la imagen.`, m);
    }
};

handler.help = ['cdn <url>'];
handler.tags = ['tools'];
handler.command = ['cdn', 'cdnimage'];
handler.register = true;

export default handler;