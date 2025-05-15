let handler = async (m, { conn }) => {
  let uptime = clockString(process.uptime() * 1000);
  let totalUsers = Object.keys(global.db.data.users).length;

  let message = `
    *Estado del Bot*
    
    📊 *Uptime:* ${uptime}
    👤 *Total de usuarios:* ${totalUsers}
    🛠 *Estado del Bot:* Activo
  `;

  conn.reply(m.chat, message, m);
};

handler.command = ['estado', 'status', 'botstatus'];
handler.tags = ['main'];
handler.help = ['estado', 'status'];
export default handler;

function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return `${h}:${m}:${s}`;
}