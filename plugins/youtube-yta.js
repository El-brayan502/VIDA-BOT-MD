import fetch from "node-fetch";
import axios from "axios";

const formatAudio = ['mp3', 'm4a', 'webm', 'aac', 'flac', 'opus', 'ogg', 'wav'];

const ddownr = {
  download: async (url, format) => {
    const config = {
      method: 'GET',
      url: `https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, como Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    };

    try {
      const response = await axios.request(config);
      if (response.data && response.data.success) {
        const { id } = response.data;
        const downloadUrl = await ddownr.cekProgress(id);
        return downloadUrl;
      } else {
        throw new Error('Fallo al obtener los detalles del video.');
      }
    } catch (error) {
      throw error;
    }
  },

  cekProgress: async (id) => {
    const config = {
      method: 'GET',
      url: `https://p.oceansaver.in/ajax/progress.php?id=${id}`,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, como Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    };

    try {
      while (true) {
        const response = await axios.request(config);
        if (response.data && response.data.success && response.data.progress === 1000) {
          return response.data.download_url;
        }
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    } catch (error) {
      throw error;
    }
  }
};

const handler = async (m, { conn, text, command }) => {
  try {
    const args = text.trim().split(' ');
    const url = args[0];
    const format = args[1] || 'mp3';

    if (!url) {
      return conn.reply(m.chat, `💜 Ingresa la URL de un video de YouTube.`, m);
    }

    const isValidUrl = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/.test(url);
    if (!isValidUrl) {
      return m.reply('Por favor, proporciona una URL válida de YouTube.');
    }

    if (!formatAudio.includes(format.toLowerCase())) {
      return m.reply(`Formato no soportado. Los formatos válidos son: ${formatAudio.join(', ')}`);
    }

    const downloadUrl = await ddownr.download(url, format);
    if (downloadUrl) {
      await conn.sendMessage(m.chat, {
        audio: { url: downloadUrl },
        mimetype: "audio/mpeg"
      }, { quoted: m });
    } else {
      return m.reply(`No se pudo descargar el audio.`);
    }
  } catch (error) {
    return m.reply(`Ocurrió un error: ${error.message}`);
  }
};

handler.command = handler.help = ['ytmp3', 'yta'];
handler.tags = ['downloader'];

export default handler;