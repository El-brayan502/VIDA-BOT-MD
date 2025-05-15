import axios from 'axios';
import FormData from 'form-data';
import cheerio from 'cheerio';

const handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) {
        return conn.reply(m.chat, `*🍇 Ingresa un texto* *• Ejemplo :* ${usedPrefix + command} *JoseXrl15k*`, m, rcanal);
    }

    m.reply("Creando su Logo Porfavor Espere 🍇... ");

    const modelos = {
        glitchtext: 'https://en.ephoto360.com/create-digital-glitch-text-effects-online-767.html',
        writetext: 'https://en.ephoto360.com/write-text-on-wet-glass-online-589.html',
        advancedglow: 'https://en.ephoto360.com/advanced-glow-effects-74.html',
        typographytext: 'https://en.ephoto360.com/create-typography-text-effect-on-pavement-online-774.html',
        pixelglitch: 'https://en.ephoto360.com/create-pixel-glitch-text-effect-online-769.html',
        neonglitch: 'https://en.ephoto360.com/create-impressive-neon-glitch-text-effects-online-768.html',
        flagtext: 'https://en.ephoto360.com/nigeria-3d-flag-text-effect-online-free-753.html',
        flag3dtext: 'https://en.ephoto360.com/free-online-american-flag-3d-text-effect-generator-725.html',
        deletingtext: 'https://en.ephoto360.com/create-eraser-deleting-text-effect-online-717.html',
        blackpinkstyle: 'https://en.ephoto360.com/online-blackpink-style-logo-maker-effect-711.html',
        glowingtext: 'https://en.ephoto360.com/create-glowing-text-effects-online-706.html',
        underwatertext: 'https://en.ephoto360.com/3d-underwater-text-effect-online-682.html',
        logomaker: 'https://en.ephoto360.com/free-bear-logo-maker-online-673.html',
        cartoonstyle: 'https://en.ephoto360.com/create-a-cartoon-style-graffiti-text-effect-online-668.html',
        papercutstyle: 'https://en.ephoto360.com/multicolor-3d-paper-cut-style-text-effect-658.html',
        watercolortext: 'https://en.ephoto360.com/create-a-watercolor-text-effect-online-655.html',
        effectclouds: 'https://en.ephoto360.com/write-text-effect-clouds-in-the-sky-online-619.html',
        blackpinklogo: 'https://en.ephoto360.com/create-blackpink-logo-online-free-607.html',
        gradienttext: 'https://en.ephoto360.com/create-3d-gradient-text-effect-online-600.html',
        summerbeach: 'https://en.ephoto360.com/write-in-sand-summer-beach-online-free-595.html',
        luxurygold: 'https://en.ephoto360.com/create-a-luxury-gold-text-effect-online-594.html',
        multicoloredneon: 'https://en.ephoto360.com/create-multicolored-neon-light-signatures-591.html',
        sandsummer: 'https://en.ephoto360.com/write-in-sand-summer-beach-online-576.html',
        galaxywallpaper: 'https://en.ephoto360.com/create-galaxy-wallpaper-mobile-online-528.html',
        style: 'https://en.ephoto360.com/1917-style-text-effect-523.html',
        makingneon: 'https://en.ephoto360.com/making-neon-light-text-effect-with-galaxy-style-521.html',
        royaltext: 'https://en.ephoto360.com/royal-text-effect-online-free-471.html',
        freecreate: 'https://en.ephoto360.com/free-create-a-3d-hologram-text-effect-441.html',
        galaxystyle: 'https://en.ephoto360.com/create-galaxy-style-free-name-logo-438.html',
        amongustext: 'https://en.ephoto360.com/create-a-cover-image-for-the-game-among-us-online-762.html',
        rainytext: 'https://en.ephoto360.com/foggy-rainy-text-effect-75.html',
        graffititext: 'https://en.ephoto360.com/graffiti-color-199.html',
        colorfulltext: 'https://en.ephoto360.com/create-colorful-neon-light-text-effects-online-797.html#google_vignette',
        equalizertext: 'https://en.ephoto360.com/music-equalizer-text-effect-259.html',
        narutotext: 'https://en.ephoto360.com/naruto-shippuden-logo-style-text-effect-online-808.html',
        angeltxt: 'https://en.ephoto360.com/angel-wing-effect-329.html',
        starlight: 'https://en.ephoto360.com/stars-night-online-1-85.html'
    };

    const modelo = modelos[command.toLowerCase()];

    if (!modelo) {
        return m.reply(`Modelo de texto no encontrado ${command}`);
    }

    const data = await ephoto(modelo, text);
    await conn.sendMessage(m.chat, { image: { url: data } }, { quoted: m });
};

async function ephoto(url, text) {
    const formData = new FormData();
    const initialResponse = await axios.get(url, {
        headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36'
        }
    });

    const $ = cheerio.load(initialResponse.data);
    const token = $('input[name=token]').val();
    const buildServer = $('input[name=build_server]').val();
    const buildServerId = $('input[name=build_server_id]').val();
    formData.append('text[]', text);
    formData.append('token', token);
    formData.append('build_server', buildServer);
    formData.append('build_server_id', buildServerId);

    const postResponse = await axios({
        url: url,
        method: 'POST',
        data: formData,
        headers: {
            'Accept': '*/*',
            'Accept-Language': 'en-US,enq=0.9',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
            'cookie': initialResponse.headers['set-cookie']?.join(' '),
            ...formData.getHeaders()
        }
    });

    const $$ = cheerio.load(postResponse.data);
    const formValueInput = JSON.parse($$('input[name=form_value_input]').val());
    formValueInput['text[]'] = formValueInput.text;
    delete formValueInput.text;

    const finalResponse = await axios.post('https://en.ephoto360.com/effect/create-image', new URLSearchParams(formValueInput), {
        headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
            'cookie': initialResponse.headers['set-cookie'].join(' ')
        }
    });

    const dataFinal = buildServer + finalResponse.data.image;
    return dataFinal;
};

handler.help = [
    'glitchtext', 'writetext', 'advancedglow', 'typographytext', 'pixelglitch', 
    'neonglitch', 'flagtext', 'flag3dtext', 'deletingtext', 'blackpinkstyle', 
    'glowingtext', 'underwatertext', 'logomaker', 'cartoonstyle', 'papercutstyle', 
    'watercolortext', 'effectclouds', 'blackpinklogo', 'gradienttext', 'summerbeach', 
    'luxurygold', 'multicoloredneon', 'sandsummer', 'galaxywallpaper', 'style', 
    'makingneon', 'royaltext', 'freecreate', 'galaxystyle', 'amongustext', 'rainytext', 
    'graffititext', 'colorfulltext', 'equalizertext', 'narutotext', 'angeltxt', 'starlight'
];

handler.tags = ['ephoto'];
handler.command = handler.help;

export default handler;