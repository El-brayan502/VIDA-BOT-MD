import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, '🚩 Ingresa el término de búsqueda.', m, rcanal);

    await m.react('🕓');
    try {
        const response = await fetch(`https://api.rynn-archive.biz.id/search/android1?q=${encodeURIComponent(text)}`);
        const data = await response.json();

        if (!data.status || !data.result || data.result.length === 0) {
            throw new Error('No se encontraron resultados para tu búsqueda.');
        }

        let txt = `*乂  S E A R C H  -  A N D R O I D 1*\n\n`;
        for (const app of data.result) {
            txt += `    ✩  *Nombre* : ${app.name}\n`;
            txt += `    ✩  *Desarrollador* : ${app.developer}\n`;
            txt += `    ✩  *Calificación* : ${app.rating}\n`;
            txt += `    ✩  *Enlace* : ${app.link}\n`;
            txt += `\n    ✩  *Imagen* : ${app.imageUrl}\n\n`;
        }

        await conn.reply(m.chat, txt, m, rcanal);
        await m.react('✅');
    } catch (error) {
        console.error(error);
        await m.react('✖️');
        await conn.reply(m.chat, '🚩 Ocurrió un error: ' + error.message, m);
    }
};

handler.help = ['androidsearch <término>'];
handler.tags = ['search'];
handler.command = ['androidsearch'];
handler.register = true;

export default handler;