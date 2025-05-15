let handler = async (m, { conn, usedPrefix, command }) => {
  let grupos = `*¡Hola! Te invito a unirte a los grupos oficiales del bot para convivir con la comunidad...*

   ╭─━━───╼◈◉◈╾───━━─╮
   │ *『 1. Grupo Oficial 』*
   ├─ ❏ ⚽️ https://chat.whatsapp.com/C7B0xV6SZLvEQ6sBfEZCSD
   ╰─━━────────────━━─╯

   ╭─━━───╼◈◉◈╾───━━─╮
   │ *『 Canal Oficial 』*
   ├─ ❏ ⚽️ https://whatsapp.com/channel/0029VajUPbECxoB0cYovo60W
   ╰─━━────────────━━─╯`

  const catalogo1 = 'https://qu.ax/ZdsZt.jpg'

  await conn.sendFile(m.chat, catalogo1, 'NagiBot.jpg', grupos, m, rcanal)
  await m.react(emojis)
}

handler.help = ['grupos']
handler.tags = ['info']
handler.command = ['grupos', 'links', 'groups']

export default handler