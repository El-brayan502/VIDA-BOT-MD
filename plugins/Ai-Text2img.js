import fetch from 'node-fetch';

var handler = async (m, { text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `🖼️ *Por favor ingresa una descripción*\n\nEjemplo: ${usedPrefix + command} un gato`, m, rcanal);

    try {
        await m.react('🕒');
        conn.sendPresenceUpdate('composing', m.chat);

        var apii = await fetch(`https://api.agungny.my.id/api/text2img?prompt=${encodeURIComponent(text)}`);
        var res = await apii.arrayBuffer();

        await conn.reply(m.chat, 'Aquí está tu imagen:', m, rcanal);
        await conn.sendFile(m.chat, Buffer.from(res), 'image.png', '', m, rcanal);

        await m.react('✅️');
    } catch (error) {
        console.error(error);
        return conn.reply(m.chat, 'Ocurrió un error al comunicarse con la API.', m);
    }
}

handler.command = ['text2img'];
handler.help = ['text2img'];
handler.tags = ['ai-imagen'];
export default handler;