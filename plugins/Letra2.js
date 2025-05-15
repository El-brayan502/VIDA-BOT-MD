/**
 * [ *FEATURE SUNDANESE* ]
 * Created By Jose
 * 
 * Channel: https://whatsapp.com/channel/0029ValMlRS6buMFL9d0iQ0S
 **/

const latinToSundanese = {
  'a': 'ᮅ',
  'b': 'ᮘ',
  'c': 'ᮎ',
  'd': 'ᮓ',
  'e': 'ᮌ',
  'f': 'ᮕ',
  'g': 'ᮎ',
  'h': 'ᮠ',
  'i': 'ᮄ',
  'j': 'ᮏ',
  'k': 'ᮊ',
  'l': 'ᮜ',
  'm': 'ᮙ',
  'n': 'ᮔ',
  'o': 'ᮇ',
  'p': 'ᮕ',
  'q': 'ᮃ',
  'r': 'ᮛ',
  's': 'ᮞ',
  't': 'ᮒ',
  'u': 'ᮅ',
  'v': 'ᮗ',
  'w': 'ᮝ',
  'x': 'ᮞ',
  'y': 'ᮌ',
  'z': 'ᮚ',
  ' ': ' '
};

const sundaneseToLatin = {
  'ᮅ': 'a',
  'ᮘ': 'b',
  'ᮎ': 'c',
  'ᮓ': 'd',
  'ᮌ': 'e',
  'ᮕ': 'f',
  'ᮎ': 'g',
  'ᮠ': 'h',
  'ᮄ': 'i',
  'ᮏ': 'j',
  'ᮊ': 'k',
  'ᮜ': 'l',
  'ᮙ': 'm',
  'ᮔ': 'n',
  'ᮇ': 'o',
  'ᮕ': 'p',
  'ᮃ': 'q',
  'ᮛ': 'r',
  'ᮞ': 's',
  'ᮒ': 't',
  'ᮅ': 'u',
  'ᮗ': 'v',
  'ᮝ': 'w',
  'ᮞ': 'x',
  'ᮌ': 'y',
  'ᮚ': 'z',
  ' ': ' '
};

async function convertToSundanese(text) {
  return [...text.toLowerCase()]
    .map(char => latinToSundanese[char] || char)
    .join('');
}

async function convertFromSundanese(text) {
  return [...text]
    .map(char => sundaneseToLatin[char] || char)
    .join('');
}

let handler = async (m, { conn, command, text }) => {
  switch (command) {
    case 'tosunda':
      if (!text) return conn.reply(m.chat, "Ejemplo: .tosunda Jose", m, rcanal);
      const kntlsundaa = await convertToSundanese(text);
      await conn.sendMessage(m.chat, { text: `${kntlsundaa}` }, { quoted: m });
      break;

    case 'sunda2text':
      if (!text) return conn.reply(m.chat, "Ejemplo: .sunda2text bahasanya", m, rcanal);
      const kntlsunda = await convertFromSundanese(text);
      await conn.sendMessage(m.chat, { text: `${kntlsunda}` }, { quoted: m });
      break;
  }
}

handler.tags = ['language'];
handler.help = ['tosunda *<text>*', 'sunda2text *<text>*'];
handler.command = ['tosunda', 'sunda2text'];

export default handler;