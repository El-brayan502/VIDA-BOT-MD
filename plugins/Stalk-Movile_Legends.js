/* Movile Legends Stalk By Jose XrL
- Free Codes Titan
- https://whatsapp.com/channel/0029ValMlRS6buMFL9d0iQ0S
- No olviden definir rcanal o sino lo lo quieren lo borran
*/

// 【🍁】MOVILE LEGENDS STALK

import axios from 'axios'

const getToken = async (url) => {
  try {
    const response = await axios.get(url)
    const cookies = response.headers['set-cookie']
    const joinedCookies = cookies ? cookies.join('; ') : null

    const csrfTokenMatch = response.data.match(/<meta name="csrf-token" content="(.*?)">/)
    const csrfToken = csrfTokenMatch ? csrfTokenMatch[1] : null

    if (!csrfToken || !joinedCookies) {
      throw new Error('No se pudo obtener el token CSRF o las cookies.')
    }

    return { csrfToken, joinedCookies }
  } catch (error) {
    console.error('❌ Error al obtener cookies o token CSRF:', error.message)
    throw error
  }
}

const mlStalk = async (userId, zoneId) => {
  try {
    const { csrfToken, joinedCookies } = await getToken('https://www.gempaytopup.com')

    const payload = {
      uid: userId,
      zone: zoneId
    }

    const { data } = await axios.post(
      'https://www.gempaytopup.com/stalk-ml',
      payload,
      {
        headers: {
          'X-CSRF-Token': csrfToken,
          'Content-Type': 'application/json',
          'Cookie': joinedCookies
        }
      }
    )

    return data
  } catch (error) {
    console.error('❌ Error:', error.message)
    console.error('Respuesta:', error.response?.data || 'Sin datos de respuesta')
    throw error
  }
}

let handler = async (m, { text, conn, usedPrefix, command, rcanal }) => {
  if (!text) {
    return conn.reply(m.chat, '🤍 Ingresa el ID de usuario y el ID de zona (ejemplo: 696964467 8770).\n\n`» Ejemplo :`\n' + `> *${usedPrefix + command}* 696964467 8770`, m, rcanal)
  }

  const [userId, zoneId] = text.split(' ')
  try {
    const stalkData = await mlStalk(userId, zoneId)
    if (stalkData) {
      const formattedResult = '`🎮 Información del Jugador de Mobile Legends`\n\n' +
        `✩   *Usuario* : ${stalkData.username || 'No Conocido'}\n` +
        `✩   *Región* : ${stalkData.region || 'No Conocida'}\n` +
        `✩   *ID de Usuario* : ${userId}\n` +
        `✩   *ID de Zona* : ${zoneId}\n\n` +
        `${stalkData.success ? '✅ Búsqueda Exitosa' : '❌ Búsqueda Fallida'}`

      conn.reply(m.chat, formattedResult, m, rcanal)
    } else {
      conn.reply(m.chat, 'No se pudo obtener los datos de stalk', m, rcanal) 
    }
  } catch (error) {
    console.error(error)
    conn.reply(m.chat, 'Ocurrió un error al procesar el stalk. Asegúrate de que el ID ingresado sea correcto.', m, rcanal)
  }
}

handler.help = ['mlstalk <id> <servidor>']
handler.tags = ['internet']
handler.command = ['mlstalk']

export default handler