import { readdirSync, statSync, unlinkSync, existsSync, readFileSync, watch, rmSync, promises as fsPromises } from "fs";
import path, { join } from 'path'; 
import ws from 'ws';

const fs = { ...fsPromises, existsSync };

let handler = async (m, { conn: _envio, command, usedPrefix, args, text, isOwner }) => {
    const isCommand1 = /^(deletesesion|deletebot|deletesession|deletesesaion)$/i.test(command);  
    const isCommand2 = /^(stop|pausarai|pausarbot)$/i.test(command);  
    const isCommand3 = /^(bots|sockets|socket)$/i.test(command);   

    async function reportError(e) {
        await m.reply('Ocurrió un error en la operación. Por favor, inténtelo de nuevo más tarde.');
        console.error(e); 
    }

    async function deleteSession(uniqid) {
        const path = `./${jadi}/${uniqid}`;
        if (!await fs.existsSync(path)) {
            return `Usted no tiene una sesión, puede crear una usando:\n${usedPrefix + command}\n\nSi tiene una *(ID)* puede usar para saltarse el paso anterior usando:\n*${usedPrefix + command}* \`\`\`(ID)\`\`\``;
        }

        if (global.conn.user.jid !== conn.user.jid) {
            return `Use este comando al *Bot* principal.\n\n*https://api.whatsapp.com/send/?phone=${global.conn.user.jid.split`@`[0]}&text=${usedPrefix + command}&type=phone_number&app_absent=0*`; 
        } else {
            try {
                await fs.rmdir(path, { recursive: true, force: true });
                return `Tu sesión como *Sub-Bot* se ha eliminado. Ha cerrado sesión y borrado todo rastro.`;
            } catch (e) {
                await reportError(e);
                return `No se pudo eliminar la sesión.`;
            }
        }
    }

    function formatUptime(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        return `${days > 0 ? days + "d " : ""}${hours % 24 > 0 ? (hours % 24) + "h " : ""}${minutes % 60 > 0 ? (minutes % 60) + "m " : ""}${seconds % 60 > 0 ? (seconds % 60) + "s" : "Desconocido"}`.trim();
    }

    async function listActiveBots() {
        const users = [...new Set(global.conns.filter(conn => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED))];
        let responseText = '–  L I S T A  -  D E  S U B - B O T S\n\n';
        const totalUsers = users.length;

        responseText += `┌  ✩  *Total de Sub-Bots Activos:* ${totalUsers || '0'}\n`;
        responseText += `│  ✩  *Puedes pedir permiso para agregar el bot a tu grupo.*\n`;

        if (totalUsers === 0) {
            responseText += `> *No hay Sub-Bots disponibles por el momento, verifica más tarde.*`;
        } else {
            for (const [index, user] of users.entries()) {
                const localTime = new Date().toLocaleTimeString('es-PE', { timeZone: user.user.timezone || 'America/Lima' });
                responseText += `│ • 【${index + 1}】\n`;
                responseText += `│   *Usuario:* ${user.user.name || 'Desconocido'}\n`;
                responseText += `│   *Data:* wa.me/${user.user.jid.replace(/[^0-9]/g, '')}?text=${usedPrefix}estado\n`;
                responseText += `│   *Online:* ${user.uptime ? formatUptime(Date.now() - user.uptime) : 'Desconocido'}\n`;
                responseText += `│   *Ubicación:* ${user.user.location || 'Desconocido'}\n`;
                responseText += `│   *Hora Local:* ${localTime}\n`;
            }
        }

        responseText += `└  ✩`;
        return responseText;
    }

    switch (true) {       
        case isCommand1:
            const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
            const uniqid = `${who.split`@`[0]}`;
            const sessionResponse = await deleteSession(uniqid);
            await conn.sendMessage(m.chat, { text: sessionResponse }, { quoted: m });
            break;

        case isCommand2:
            if (global.conn.user.jid === conn.user.jid) {
                conn.reply(m.chat, `Si no es *Sub-Bot* comuníquese al numero principal del *Bot* para ser *Sub-Bot*.`, m);
            } else {
                await conn.reply(m.chat, `*${botname}* desactivada.`, m);
                conn.ws.close();
            }  
            break;

        case isCommand3:
            const botListResponse = await listActiveBots();
            let imageUrl = 'https://qu.ax/SnmFS.jpg';
            await _envio.sendMessage(m.chat, { image: { url: imageUrl }, caption: botListResponse }, { quoted: m });
            break;   
    }
};

handler.tags = ['serbot'];
handler.help = ['sockets', 'deletesesion', 'pausarai'];
handler.command = ['deletesesion', 'deletebot', 'deletesession', 'pausarai', 'stop', 'pausarbot', 'bots', 'sockets', 'socket'];

export default handler;