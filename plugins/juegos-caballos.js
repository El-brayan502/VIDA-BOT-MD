let handler = async (m, { conn, args }) => {
  try {
    // Verificar si el usuario proporcionó una apuesta
    if (!args[0] || isNaN(args[0]) || parseInt(args[0]) <= 0) {
      return conn.reply(m.chat, '❌ Debes ingresar una cantidad válida para apostar.', m);
    }

    let apuesta = parseInt(args[0]);
    let userBalance = global.db.data.users[m.sender].money; // Aquí tomamos el balance de dinero del usuario
    
    // Verificar que el usuario tenga suficiente dinero
    if (userBalance < apuesta) {
      return conn.reply(m.chat, '❌ No tienes suficiente dinero para realizar esta apuesta.', m);
    }

    // Lista de caballos (puedes agregar más caballos si lo deseas)
    let caballos = ['Caballo A', 'Caballo B', 'Caballo C', 'Caballo D', 'Caballo E'];

    // Selección aleatoria del caballo que gana
    let ganador = caballos[Math.floor(Math.random() * caballos.length)];

    // Mensaje inicial de la carrera
    let texto = `
    🏇 **CARRERA DE CABALLOS** 🏇
    
    Caballos disponibles:
    1. Caballo A
    2. Caballo B
    3. Caballo C
    4. Caballo D
    5. Caballo E
    
    Estás apostando *${apuesta}* a un caballo.
    `;
    
    // Espera de 3 segundos para simular la carrera
    await conn.reply(m.chat, texto, m);
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Resultado de la carrera
    let resultado = `🎉 El ganador es: *${ganador}* 🎉`;
    
    // Verificar si el usuario ganó o perdió
    if (ganador === 'Caballo A' && args[1] === 'A' || 
        ganador === 'Caballo B' && args[1] === 'B' || 
        ganador === 'Caballo C' && args[1] === 'C' || 
        ganador === 'Caballo D' && args[1] === 'D' || 
        ganador === 'Caballo E' && args[1] === 'E') {
      
      global.db.data.users[m.sender].money += apuesta; // El usuario gana
      resultado += `\n🏆 ¡Felicidades! Ganaste *${apuesta}* por acertar el caballo correcto.`;
    } else {
      global.db.data.users[m.sender].money -= apuesta; // El usuario pierde
      resultado += `\n😢 Lo siento, perdiste *${apuesta}*.`;
    }
    
    // Mostrar el resultado de la carrera
    await conn.reply(m.chat, resultado, m);
    
  } catch (e) {
    console.log(e);
    conn.reply(m.chat, '❌ Ocurrió un error con la carrera de caballos.', m);
  }
};

handler.help = ['carrera <cantidad> <caballo>'];
handler.tags = ['juegos];
handler.command = ['carrera', 'race'];

export default handler;