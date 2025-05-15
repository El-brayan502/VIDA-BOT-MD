import { TempMail } from 'tempmail.lol';

const tempmail = new TempMail();

let handler = async (m, { conn, text, command }) => {
  if (command === 'tempmail') {
    try {
      const inbox = await tempmail.createInbox();
      let emailMessage = `*🚩  C O R R E O  T E M P O R A L*\n\n`;
      emailMessage += `    ✩  *Dirección* : ${inbox.address}\n`;
      emailMessage += `    ✩  *Token* : ${inbox.token}\n\n`;
      emailMessage += `*- 📬 Revisa tu bandeja de entrada usando el token con el comando .checkmail.*`;
      await conn.reply(m.chat, emailMessage, m, rcanal);
    } catch (error) {
      await conn.reply(m.chat, 'No se pudo crear una dirección de correo temporal.', m);
    }
  } else if (command === 'checkmail') {
    if (!text) {
      await conn.reply(m.chat, 'Por favor proporciona el token del correo temporal que deseas revisar.', m);
      return;
    }

    try {
      const emails = await tempmail.checkInbox(text);
      if (!emails || emails.length === 0) {
        await conn.reply(m.chat, 'No se encontraron mensajes en el buzón o ha expirado.', m);
        return;
      }

      let messages = `*💜  M E S A J E S  E N  E L  B U Z O N:*\n\n`;
      emails.forEach(email => {
        messages += `    ✩  *De* : ${email.from}\n`;
        messages += `    ✩  *Asunto* : ${email.subject}\n`;
        messages += `    ✩  *Fecha* : ${new Date(email.date).toLocaleString()}\n\n`;
        messages += `    *Cuerpo:*\n${email.body}\n\n---\n\n`;
      });

      await conn.reply(m.chat, messages, m, rcanal);
    } catch (error) {
      await conn.reply(m.chat, 'No se pudo revisar los mensajes.', m);
    }
  }
};

handler.help = ['tempmail', 'checkmail <token>'];
handler.tags = ['tools'];
handler.command = ['tempmail', 'checkmail'];
handler.diamond = false;

export default handler;