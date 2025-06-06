const handler = async (m, {conn}) => {
  let txt = '';
  for (const [jid, chat] of Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats)) txt += `\n—◉ ${await conn.getName(jid)}\n➤ ${jid} [${chat?.metadata?.read_only ? '𝙽𝙾 𝙿𝙰𝚁𝚃𝙸𝙲𝙸𝙿𝙰𝙽𝚃𝙴' : '𝙿𝙰𝚁𝚃𝙸𝙲𝙸𝙿𝙰𝙽𝚃𝙴'}]\n\n`;
  m.reply(`*𝙻𝙸𝚂𝚃𝙰 𝙳𝙴 𝙶𝚁𝚄𝙿𝙾𝚂 𝙴𝙽 𝙻𝙾𝚂 𝚀𝚄𝙴 𝙴𝚂𝚃𝙰 𝙴𝙻 𝙱𝙾𝚃:*
${txt}
`.trim());
};
handler.help = ['groupss', 'grouplist'];
handler.tags = ['info'];
handler.command = /^(groupss|grouplist|listadegrupo|gruposslista|listagrupos)$/i;
export default handler;
