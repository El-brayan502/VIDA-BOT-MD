import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `🚩 Ingrese el nombre del elemento químico.\n\nEjemplo:\n> *${usedPrefix + command}* Magnesium`, m, rcanal);

    await m.react('🕓');

    try {
        const response = await axios.get(`https://delirius-apiofc.vercel.app/tools/table?element=${encodeURIComponent(text)}`);
        const { status, data } = response.data.elementData;

        if (!status) {
            return conn.reply(m.chat, `😞 No se pudo encontrar información sobre el elemento "${text}".`, m);
        }

        const { name, symbol, atomic_number, atomic_mass, period, phase, discovered_by, description, image } = data;

        let txt = '`乂  I N F O R M A C I Ó N -  E L E M E N T O`\n\n';
        txt += `  ✩   Nombre : ${name}\n`;
        txt += `  ✩   Símbolo : ${symbol}\n`;
        txt += `  ✩   Número Atómico : ${atomic_number}\n`;
        txt += `  ✩   Masa Atómica : ${atomic_mass}\n`;
        txt += `  ✩   Período : ${period}\n`;
        txt += `  ✩   Fase : ${phase}\n`;
        txt += `  ✩   Descubierto por : ${discovered_by}\n`;
        txt += `  ✩   Descripción : ${description}\n`;
        txt += `  ✩   Imagen : ${image}\n\n`;

        conn.reply(m.chat, txt, m, rcanal);
        await m.react('✅');
    } catch (error) {
        console.error(error);
        await m.react('✖️');
        conn.reply(m.chat, `Error al obtener información del elemento.`, m);
    }
};

handler.help = ['elemento <nombre>'];
handler.tags = ['tools'];
handler.command = ['discordelemento', 'infoelementodc', 'dcelement'];
handler.register = true;

export default handler;