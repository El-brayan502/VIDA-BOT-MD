import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let pp = await conn.profilePictureUrl(who, 'image').catch(_ => imagen1)
    let userId = who;

    let user = global.db.data.users[userId] || {};
    let name = conn.getName(userId);
    let cumpleanos = user.birthday || 'No especificado';
    let genero = user.gender || 'No especificado';
    let pareja = user.partner || 'Nadie';
    let description = user.description || 'Sin Descripción';
    let exp = user.exp || 0;
    let nivel = user.level || 0;
    let role = user.role || 'Sin Rango';
    let coins = user.coins || 0;
    let bankCoins = user.bank || 0;

    let moneda = '💰';
    let now = new Date();
    let usedPrefix = '!';

    let txt = '*`—  P E R F I L  〤  U S U A R I O`*\n\n';
    txt += `✦ *Edad* » ${user.age || 'Desconocida'}\n`;
    txt += `♛ *Cumpleaños* » ${cumpleanos}\n`;
    txt += `⚥ *Género* » ${genero}\n`;
    txt += `♡ *Casado con* » ${pareja}\n`;
    txt += `☆ *Experiencia* » ${exp.toLocaleString()}\n`;
    txt += `❖ *Nivel* » ${nivel}\n`;
    txt += `✎ *Rango* » ${role}\n`;
    txt += `⛁ *Coins Cartera* » ${coins.toLocaleString()} ${moneda}\n`;
    txt += `⛃ *Coins Banco* » ${bankCoins.toLocaleString()} ${moneda}\n`;
    txt += `❁ *Premium* » ${user.premium ? '✅' : '❌'}\n`;
    txt += `> Escribe *${usedPrefix}profile* para ver tu perfil.`;

    conn.sendFile(m.chat, pp, 'perfil.jpg', txt.trim(), m, false, { mentions: [who] });
}

handler.help = ['profile']
handler.register = true
handler.group = true
handler.tags = ['rg']
handler.command = ['profile', 'perfil']

export default handler