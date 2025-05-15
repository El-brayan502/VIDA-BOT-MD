/* 
- Nino NagiBot Bot By Brayan330
- Powered By Team Code Free
- https://whatsapp.com/channel/YOUR_CHANNEL
*/

// *🌤️ [ Weather Information ]*

import fetch from 'node-fetch';

let neura = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `🚩 Por favor, ingresa una ubicación.\n\nEjemplo:\n> *${usedPrefix + command}* Jakarta`, m, rcanal);
  }

  await m.react('🕓');

  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(text)}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return conn.reply(m.chat, '🚩 Ubicación no encontrada.', m);
    }

    const data = await response.json();

    if (data.cod !== 200) {
      throw new Error(data.message || 'Ocurrió un error');
    }

    const location = data.name;
    const country = data.sys.country;
    const weatherDescription = data.weather[0].description;
    const currentTemperature = `${data.main.temp}°C`;
    const minTemperature = `${data.main.temp_min}°C`;
    const maxTemperature = `${data.main.temp_max}°C`;
    const humidity = `${data.main.humidity}%`;
    const windSpeed = `${data.wind.speed} km/h`;

    const weatherMessage = `
🍇 *Informe meteorológico para ${location}, ${country}* 🍁

• *Condición:* ${weatherDescription}
• *Temperatura actual:* ${currentTemperature}
• *Máxima:* ${maxTemperature} | *Mínima:* ${minTemperature}
• *Humedad:* ${humidity}
• *Velocidad del viento:* ${windSpeed}

¡Mantente preparado y planifica tu día en consecuencia! ☀️🌧️
    `;

    await conn.sendMessage(m.chat, { text: weatherMessage }, { quoted: m });

    await m.react('✅');
  
  } catch (error) {
    console.error(error);
    await m.react('✖️');
    await conn.reply(m.chat, `Hubo un error: ${error.message || error}`, m);
  }
};

neura.help = ['clima'];
neura.tags = ['internet'];
neura.command = ['clima', 'weather'];

export default neura;