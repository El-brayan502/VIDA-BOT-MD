/*
*
# Encuesta
*# Compartido por Jose Elber*
# https://whatsapp.com/channel/0029ValMlRS6buMFL9d0iQ0S
*• personalización propia, me importa un comino*
*
*/

// Handler para Encuesta
let handler = async (m) => {
    let name = "¿Te gusta esta función del bot?"
    let values = ["Sí", "No", "Quizás"]
    let selectableCount = 1
    await m.conn.sendMessage(m.chat, { 
        poll: { 
            name, 
            values, 
            selectableCount 
        } 
    }, { quoted: m })
}

handler.help = ['polling'];
handler.tags = ['fun'];
handler.command = ['polling'];
handler.register = true;

export default handler;