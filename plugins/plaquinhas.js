import fetch from 'node-fetch';

const handler = async (m, { text, usedPrefix, command }) => {
    const apiMapping = {
        plaq1: `https://api.nexfuture.com.br/api/plaquinhas/plaq1?query=${encodeURIComponent(text)}`,
        plaq2: `https://api.nexfuture.com.br/api/plaquinhas/plaq2?query=${encodeURIComponent(text)}`,
        plaq3: `https://api.nexfuture.com.br/api/plaquinhas/plaq3?query=${encodeURIComponent(text)}`,
        plaq4: `https://api.nexfuture.com.br/api/plaquinhas/plaq4?query=${encodeURIComponent(text)}`,
        plaq5: `https://api.nexfuture.com.br/api/plaquinhas/plaq5?query=${encodeURIComponent(text)}`,
        plaq6: `https://api.nexfuture.com.br/api/plaquinhas/plaq6?query=${encodeURIComponent(text)}`,
        plaq7: `https://api.nexfuture.com.br/api/plaquinhas/plaq7?query=${encodeURIComponent(text)}`,
        plaq8: `https://api.nexfuture.com.br/api/plaquinhas/plaq8?query=${encodeURIComponent(text)}`,
        plaq9: `https://api.nexfuture.com.br/api/plaquinhas/plaq9?query=${encodeURIComponent(text)}`,
        plaq10: `https://api.nexfuture.com.br/api/plaquinhas/plaq10?query=${encodeURIComponent(text)}`
    };

    const apiUrl = apiMapping[command];

    if (!text || !apiUrl) {
        return conn.reply(m.chat, `☕️ *Por favor ingresa una texto para convertira su plaquinha *\n\nEjemplo: ${usedPrefix + command} Jose`, m, rcanal);
    }

    try {
        await m.react('🕒');
        conn.sendPresenceUpdate('composing', m.chat);

        var response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`No se pudo generar la imagen de ${apiUrl}.`);

        var imageBuffer = await response.buffer();
        await conn.sendFile(m.chat, imageBuffer, 'image.png', '', m);
        await m.react('✅️');
    } catch (error) {
        console.error(error);
        return conn.reply(m.chat, 'Ocurrió un error al comunicarse con la API.', m);
    }
}

handler.tags = ['tools'];
handler.help = ['plaq1', 'plaq2', 'plaq3', 'plaq4', 'plaq5', 'plaq6', 'plaq7', 'plaq8', 'plaq9', 'plaq10'];
handler.command = ['plaq1', 'plaq2', 'plaq3', 'plaq4', 'plaq5', 'plaq6', 'plaq7', 'plaq8', 'plaq9', 'plaq10'];

export default handler;