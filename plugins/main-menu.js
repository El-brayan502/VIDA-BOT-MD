import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'

let tags = {
  'main': 'Info Bot',
  'buscador': 'Buscador',
  'fun': 'Juegos',
  'rpg': 'Rpg',
  'rg': 'Registror',
  'xp': 'Exp',
  'sticker': 'Stickers',
  'anime': 'Animes',
  'database': 'Database',
  'fix': 'Fix Mensaje',
  'grupo': 'Grupos',
  'nable': 'On / Off',
  'descargas': 'Descargas',
  'tools': 'Herramientas',
  'info': 'Información',
  'nsfw': 'Nsfw',
  'owner': 'Creador',
  'mods': 'Staff',
  'audio': 'Audios',
  'ai': 'Ia',
  'transformador': 'Convertidores'
};

const defaultMenu = {
  before: `Hola %name ${ucapan()} , soy 𝚅𝙸𝙳𝙰𝙱𝙾𝚃.𝟸.𝟶 bot
  
  
  *\`乂  I N F O  -  B O T\`*

┌  ◦ *Cʀᴇᴀᴅᴏʀ:*  Panda
│  ◦ *Mᴏᴅᴏ:* Público
│  ◦ *Bᴀɪʟᴇʏs:* Multi Device
│  ◦ *Tɪᴇᴍᴘᴏ ᴀᴄᴛɪᴠᴏ:* %muptime
└  ◦ *Usᴜᴀʀɪᴏs:* %totalreg

  *\`乂  I N F O  -  U S U A R I O\`*
  
┌  ◦ *Cʟɪᴇɴᴛᴇ:* %name
│  ◦ *Exᴘ:* %exp
│  ◦ *Nɪᴠᴇʟ:* %level
└  ◦ *Rᴀɴɢᴏ:* %role
   
*– L I S T A   D E   C O M A N D O S*\n
`.trimStart(),
    header: '┏━━━━━━ *%category* ━━━━━┓',
  body: '┣┅⟣ ❒ %cmd %isdiamond %isPremium',
  footer: '┗━━━━━━━━━━━━━━━━━━━┛\n',
  after: `> ${dev}`,
}
let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { exp, estrellas, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'es'
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        estrellas: plugin.estrellas,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == conn.user.jid ? '' : `Powered by https://wa.me/${conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%isdiamond/g, menu.diamond ? '(ⓓ)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Ⓟ)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
let replace = {
'%': '%',
p: _p, uptime, muptime,
me: conn.getName(conn.user.jid),
taguser: '@' + m.sender.split("@s.whatsapp.net")[0],
npmname: _package.name,
npmdesc: _package.description,
version: _package.version,
exp: exp - min,
maxexp: xp,
botofc: (conn.user.jid == global.conn.user.jid ? '🚩 𝙴𝚂𝚃𝙴 𝙴𝚂 𝙴𝙻 𝙱𝙾𝚃 𝙾𝙵𝙲' : `🚩 𝚂𝚄𝙱-𝙱𝙾𝚃 𝙳𝙴: Wa.me/${global.conn.user.jid.split`@`[0]}`), 
totalexp: exp,
xp4levelup: max - exp,
github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
level, estrellas, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
readmore: readMore
}
text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])

const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender

const pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://qu.ax/jDLsx.jpg')

await conn.sendMessage(m.chat, { 
  footer: `2025 ${botname}`,
  headerType: 1,
  viewOnce: true,
  document: fs.readFileSync("./package.json"),
  fileName: `${wm} </>`,
  mimetype: 'application/vnd.ms-excel',
  fileLength: 99999999,
  caption: text.trim(),
  contextInfo: { 
    isForwarded: true,
    mentionedJid: [m.sender],
    forwardedNewsletterMessageInfo: { 
      newsletterJid: idchannel,
      newsletterName: namechannel
    },
    externalAdReply: { 
      title: `${titulowm2}`,
      body: `${dev}`,
      thumbnailUrl: `https://qu.ax/jDLsx.jpg`,
      sourceUrl: `https://www.instagram.com/xrljose?igsh=MWt0a2EyMXk2aXdpag==`,
      mediaType: 1,
      renderLargerThumbnail: true
    }
  }
}, { quoted: fkontak });
m.react('🐼');

  } catch (e) {
    conn.reply(m.chat, '❎ Lo sentimos, el menú tiene un error.', m)
    throw e
  }
}

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = /^(allmenu|menu|help|menú|\?)$/i;
handler.register = true;

export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  return [d, ' D ', h, ' H ', m, ' M '].map(v => v.toString().padStart(2, '0')).join('');
}
function clockStringP(ms) {
  let ye = isNaN(ms) ? '--' : Math.floor(ms / 31104000000) % 10
  let mo = isNaN(ms) ? '--' : Math.floor(ms / 2592000000) % 12
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000) % 30
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [ye, ' *Years 🗓️*\n', mo, ' *Month 🌙*\n', d, ' *Days ☀️*\n', h, ' *Hours 🕐*\n', m, ' *Minute ⏰*\n', s, ' *Second ⏱️*'].map(v => v.toString().padStart(2, 0)).join('')
}
function ucapan() {
    const time = moment.tz('America/Lima').format('HH')
    let res = "Buenas Noches🌙"
    if (time >= 5) {
        res = "Buena día de Madrugada🌄"
    }
    if (time > 10) {
        res = "Buenos días☀️"
    }
    if (time >= 12) {
        res = "Buenas Tardes🌅"
    }
    if (time >= 19) {
        res = "Buenas Noches🌙"
    }
    return res
}