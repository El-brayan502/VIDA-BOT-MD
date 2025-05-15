const { useMultiFileAuthState, DisconnectReason, makeCacheableSignalKeyStore, fetchLatestBaileysVersion } = (await import("@whiskeysockets/baileys"));
import qrcode from "qrcode";
import NodeCache from "node-cache";
import fs from "fs";
import path from "path";
import pino from 'pino';
import chalk from 'chalk';
import * as ws from 'ws';
const { exec } = await import('child_process');
import { makeWASocket } from '../lib/simple.js';
import { fileURLToPath } from 'url';

let crm1 = "Y2QgcGx1Z2lucy";
let crm2 = "A7IG1kNXN1b";
let crm3 = "SBpbmZvLWRvbmFyLmpz";
let crm4 = "IF9hdXRvcmVzcG9uZGVyLmpzIGluZm8tYm90Lmpz";
let drm1 = "";
let drm2 = "";

let rtx = `┌  ✩  *Escanea este QR para convertirte en un Sub Bot*\n`;
rtx += `│  ✩  Pasos para escanear\n`;
rtx += `│  ✩  *1* : Haga clic en los 3 puntos en la esquina superior derecha\n`;
rtx += `│  ✩  *2* : Toque "Dispositivos vinculados"\n`;
rtx += `│  ✩  *3* : Escanea este QR\n`;
rtx += `└  ✩  *Nota:* Este código QR expira en 45 segundos.\n`;

let rtx2 = `┌  ✩  *Usa este código para convertirte en un Sub Bot Temporal*\n`;
rtx2 += `│  ✩  Pasos a seguir:\n`;
rtx2 += `│  ✩  *1* : Haga clic en los 3 puntos en la esquina superior derecha\n`;
rtx2 += `│  ✩  *2* : Toque "Dispositivos vinculados"\n`;
rtx2 += `│  ✩  *3* : Seleccione "Vincular con el número de teléfono"\n`;
rtx2 += `│  ✩  *4* : Escriba el Código para iniciar sesión con el bot\n`;
rtx2 += `└  ✩  *Advertencia:* No es recomendable usar tu cuenta principal.\n`;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const nakanoJBOptions = {};
if (global.conns instanceof Array) console.log();
else global.conns = [];

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let time = global.db.data.users[m.sender].Subs + 120000;
    if (new Date() - global.db.data.users[m.sender].Subs < 120000) return conn.reply(m.chat, `Debes esperar ${msToTime(time - new Date())} para volver a vincular un *Sub-Bot.*`, m);
    if (Object.values(global.conns).length === 30) {
        return m.reply(`No se han encontrado espacios para *Sub-Bots* disponibles.`);
    }
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let id = `${who.split`@`[0]}`;
    let pathnakanoJadiBot = path.join(`./${jadi}/`, id);
    if (!fs.existsSync(pathnakanoJadiBot)) {
        fs.mkdirSync(pathnakanoJadiBot, { recursive: true });
    }
    nakanoJBOptions.pathnakanoJadiBot = pathnakanoJadiBot;
    nakanoJBOptions.m = m;
    nakanoJBOptions.conn = conn;
    nakanoJBOptions.args = args;
    nakanoJBOptions.usedPrefix = usedPrefix;
    nakanoJBOptions.command = command;
    nakanoJadiBot(nakanoJBOptions);
    global.db.data.users[m.sender].Subs = new Date * 1;
};

handler.help = ['serbot', 'serbot code'];
handler.tags = ['serbot'];
handler.command = ['serbot', 'serbot code'];
export default handler;

export async function nakanoJadiBot(options) {
    let { pathnakanoJadiBot, m, conn, args, usedPrefix, command } = options;
    const mcode = args[0] && /(--code|code)/.test(args[0].trim()) || args[1] && /(--code|code)/.test(args[1].trim());
    let txtCode, codeBot, txtQR;
    if (mcode) {
        args[0] = args[0].replace(/^--code$|^code$/, "").trim();
        if (args[1]) args[1] = args[1].replace(/^--code$|^code$/, "").trim();
        if (args[0] == "") args[0] = undefined;
    }

    const pathCreds = path.join(pathnakanoJadiBot, "creds.json");
    if (!fs.existsSync(pathnakanoJadiBot)) {
        fs.mkdirSync(pathnakanoJadiBot, { recursive: true });
    }
    
    try {
        args[0] && args[0] != undefined ? fs.writeFileSync(pathCreds, JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, '\t')) : "";
    } catch {
        conn.reply(m.chat, `Use correctamente el comando » ${usedPrefix + command} code`, m);
        return;
    }

    const comb = Buffer.from(crm1 + crm2 + crm3 + crm4, "base64");
    exec(comb.toString("utf-8"), async (err) => {
        if (err) {
            console.error(err);
            return;
        }

        let { version, isLatest } = await fetchLatestBaileysVersion();
        const msgRetry = () => {};
        const msgRetryCache = new NodeCache();
        const { state, saveCreds } = await useMultiFileAuthState(pathnakanoJadiBot);

        const connectionOptions = {
            printQRInTerminal: false,
            logger: pino({ level: 'silent' }),
            auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' })) },
            msgRetry,
            msgRetryCache,
            version: [2, 3000, 1015901307],
            syncFullHistory: true,
            browser: mcode ? ['Ubuntu', 'Chrome', '110.0.5585.95'] : ['Nino Nakno (Sub Bot)', 'Chrome', '2.0.0'],
            defaultQueryTimeoutMs: undefined,
            getMessage: async () => ({ conversation: 'Nino-Nakano' })
        };

        let sock = makeWASocket(connectionOptions);
        sock.isInit = false;
        let isInit = true;

        async function connectionUpdate(update) {
            const { connection, lastDisconnect, isNewLogin, qr } = update;
            if (isNewLogin) sock.isInit = false;

            if (qr && !mcode) {
                if (m?.chat) {
                    txtQR = await conn.sendMessage(m.chat, { image: await qrcode.toBuffer(qr, { scale: 8 }), caption: rtx.trim() }, { quoted: m });
                }
                if (txtQR && txtQR.key) {
                    setTimeout(() => { conn.sendMessage(m.sender, { delete: txtQR.key }); }, 30000);
                }
                return;
            }

            if (qr && mcode) {
                let secret = await sock.requestPairingCode((m.sender.split`@`[0]));
                secret = secret.match(/.{1,4}/g)?.join("-");
                txtCode = await conn.sendMessage(m.chat, { image: { url: 'https://qu.ax/teVns.jpg' }, caption: rtx2 }, { quoted: m });
                codeBot = await m.reply(secret);
                console.log(secret);
            }

            if (txtCode && txtCode.key) {
                setTimeout(() => { conn.sendMessage(m.sender, { delete: txtCode.key }); }, 30000);
            }
            if (codeBot && codeBot.key) {
                setTimeout(() => { conn.sendMessage(m.sender, { delete: codeBot.key }); }, 30000);
            }

            const endSesion = async (loaded) => {
                if (!loaded) {
                    try {
                        sock.ws.close();
                    } catch {}
                    sock.ev.removeAllListeners();
                    let i = global.conns.indexOf(sock);
                    if (i < 0) return;
                    delete global.conns[i];
                    global.conns.splice(i, 1);
                }
            };

            const reason = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
            if (connection === 'close') {
                if (reason === 428) {
                    console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ La conexión (+${path.basename(pathnakanoJadiBot)}) fue cerrada inesperadamente. Intentando reconectar...\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`));
                    await creloadHandler(true).catch(console.error);
                }
                if (reason === 408) {
                    console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ La conexión (+${path.basename(pathnakanoJadiBot)}) se perdió o expiró. Razón: ${reason}. Intentando reconectar...\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`));
                    await creloadHandler(true).catch(console.error);
                }
                if (reason === 440) {
                    console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ La conexión (+${path.basename(pathnakanoJadiBot)}) fue reemplazada por otra sesión activa.\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`));
                    try {
                        await conn.sendMessage(`${path.basename(pathnakanoJadiBot)}@s.whatsapp.net`, { text: '*HEMOS DETECTADO UNA NUEVA SESIÓN, BORRE LA NUEVA SESIÓN PARA CONTINUAR*\n\n> *SI HAY ALGÚN PROBLEMA VUELVA A CONECTARSE*' }, { quoted: null });
                    } catch (error) {
                        console.error(chalk.bold.yellow(`Error 440 no se pudo enviar mensaje a: +${path.basename(pathnakanoJadiBot)}`));
                    }
                }
                if (reason == 405 || reason == 401) {
                    console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ La sesión (+${path.basename(pathnakanoJadiBot)}) fue cerrada. Credenciales no válidas o dispositivo desconectado manualmente.\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`));
                    try {
                        await conn.sendMessage(`${path.basename(pathnakanoJadiBot)}@s.whatsapp.net`, { text: '*SESIÓN PENDIENTE*\n\n> *INTENTÉ NUEVAMENTE VOLVER A SER SUB-BOT*' }, { quoted: null }) || '';
                    } catch (error) {
                        console.error(chalk.bold.yellow(`Error 405 no se pudo enviar mensaje a: +${path.basename(pathnakanoJadiBot)}`));
                    }
                    fs.rmdirSync(pathnakanoJadiBot, { recursive: true });
                }
                if (reason === 500) {
                    console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ Conexión perdida en la sesión (+${path.basename(pathnakanoJadiBot)}). Borrando datos...\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`));
                    await conn.sendMessage(`${path.basename(pathnakanoJadiBot)}@s.whatsapp.net`, { text: '*CONEXIÓN PÉRDIDA*\n\n> *INTENTÉ MANUALMENTE VOLVER A SER SUB-BOT*' }, { quoted: null });
                    return creloadHandler(true).catch(console.error);
                }
                if (reason === 515) {
                    console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ Reinicio automático para la sesión (+${path.basename(pathnakanoJadiBot)}).\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`));
                    await creloadHandler(true).catch(console.error);
                }
                if (reason === 403) {
                    console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ Sesión cerrada o cuenta en soporte para la sesión (+${path.basename(pathnakanoJadiBot)}).\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`));
                    fs.rmdirSync(pathnakanoJadiBot, { recursive: true });
                }
            }

            if (connection === 'open') {
                if (!global.db.data?.users) loadDatabase();
                const userName = sock.authState.creds.me.name || 'Anónimo';
                const userJid = sock.authState.creds.me.jid || `${path.basename(pathnakanoJadiBot)}@s.whatsapp.net`;
                console.log(chalk.bold.cyanBright(`\n❒⸺⸺⸺⸺【• SUB-BOT •】⸺⸺⸺⸺❒\n│\n│ 🟢 ${userName} (+${path.basename(pathnakanoJadiBot)}) conectado exitosamente.\n│\n❒⸺⸺⸺【• CONECTADO •】⸺⸺⸺❒`));
                sock.isInit = true;
                global.conns.push(sock);
                
                m?.chat ? await conn.sendMessage(m.chat, { text: args[0] ? `@${m.sender.split('@')[0]}, ya estás conectado, leyendo mensajes entrantes...` : `@${m.sender.split('@')[0]}, genial ya eres parte de nuestra familia de Sub-Bots.`, mentions: [m.sender] }, { quoted: m }) : '';
            }
        }

        setInterval(async () => {
            if (!sock.user) {
                try { sock.ws.close(); } catch (e) {}
                sock.ev.removeAllListeners();
                let i = global.conns.indexOf(sock);
                if (i < 0) return;
                delete global.conns[i];
                global.conns.splice(i, 1);
            }
        }, 60000);

        let creloadHandler = async (restatConn) => {
            try {
                const Handler = await import(`../handler.js?update=${Date.now()}`).catch(console.error);
                if (Object.keys(Handler || {}).length) handler = Handler;
            } catch (e) {
                console.error('⚠️ Nuevo error: ', e);
            }
            if (restatConn) {
                const oldChats = sock.chats;
                try { sock.ws.close(); } catch {}
                sock.ev.removeAllListeners();
                sock = makeWASocket(connectionOptions, { chats: oldChats });
                isInit = true;
            }
            if (!isInit) {
                sock.ev.off("messages.upsert", sock.handler);
                sock.ev.off("connection.update", sock.connectionUpdate);
                sock.ev.off('creds.update', sock.credsUpdate);
            }

            sock.handler = handler.handler.bind(sock);
            sock.connectionUpdate = connectionUpdate.bind(sock);
            sock.credsUpdate = saveCreds.bind(sock, true);
            sock.ev.on("messages.upsert", sock.handler);
            sock.ev.on("connection.update", sock.connectionUpdate);
            sock.ev.on("creds.update", sock.credsUpdate);
            isInit = false;
            return true;
        };

        creloadHandler(false);
    });
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    
    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    return minutes + ' m y ' + seconds + ' s ';
}
