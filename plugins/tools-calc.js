let handler = async (m, { conn, text, rcanal }) => {
  let id = m.chat;
  conn.math = conn.math || {};

  if (!text) {
    return conn.reply(m.chat, '🚩 Ingresa la ecuación.\n\nSímbolos compatibles: -, +, *, /, ×, ÷, π, e, (, )', m, rcanal);
  }

  if (id in conn.math) {
    clearTimeout(conn.math[id][3]);
    delete conn.math[id];
    conn.reply(m.chat, '....', m, rcanal);
  }

  let val = text
    .replace(/[^0-9\-\+\/\*\×\÷\π\sin\cos\tan\log\sqrt\^eEasinacosatan\sinhcoshtanhasinhacoshatanh²⅓¾()]/g, '')
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/π|pi/gi, 'Math.PI')
    .replace(/e/gi, 'Math.E')
    .replace(/sin|cos|tan|log|sqrt|asin|acos|atan|sinh|cosh|tanh|asinh|acosh|atanh/gi, (match) => `Math.${match.toLowerCase()}`)
    .replace(/²/g, '**2')
    .replace(/⅓/g, '1/3')
    .replace(/¾/g, '3/4')
    .replace(/x/g, '*')
    .replace(/\/+/g, '/')
    .replace(/\++/g, '+')
    .replace(/-+/g, '-')
    .replace(/\^/g, '**')
    .replace(/([0-9]+)\s*\/\s*([0-9]+)/g, '($1/$2)'); 

  let format = val
    .replace(/Math\.PI/g, 'π')
    .replace(/Math\.E/g, 'e')
    .replace(/Math\.sin/g, 'sin')
    .replace(/Math\.cos/g, 'cos')
    .replace(/Math\.tan/g, 'tan')
    .replace(/Math\.log/g, 'log')
    .replace(/Math\.sqrt/g, '√')
    .replace(/Math\.asin/g, 'asin')
    .replace(/Math\.acos/g, 'acos')
    .replace(/Math\.atan/g, 'atan')
    .replace(/Math\.sinh/g, 'sinh')
    .replace(/Math\.cosh/g, 'cosh')
    .replace(/Math\.tanh/g, 'tanh')
    .replace(/Math\.asinh/g, 'asinh')
    .replace(/Math\.acosh/g, 'acosh')
    .replace(/Math\.atanh/g, 'atanh');

  try {
    console.log(val);
    let result = (new Function('return ' + val))();
    if (result === undefined || result === null) throw result;
    conn.reply(m.chat, `📐 *${format}* = _${result}_`, m, rcanal);
  } catch (e) {
    if (e instanceof SyntaxError) {
      conn.reply(m.chat, '🚩 Hay un error de formato en la ecuación. Asegúrate de usar los símbolos correctos: -, +, *, /, ×, ÷, π, e, sin, cos, tan, log, √, asin, acos, atan, sinh, cosh, tanh, asinh, acosh, atanh, (, ), ², ⅓, ¾, x', m, rcanal);
    } else {
      conn.reply(m.chat, '🚩 Error en el cálculo. Revisa tu ecuación para posibles errores.', m, rcanal);
    }
  }
};

handler.help = ['cal *<ecuacion>*'];
handler.tags = ['tools'];
handler.command = ['cal', 'calc', 'calcular', 'calculadora'];
handler.register = true;

export default handler;