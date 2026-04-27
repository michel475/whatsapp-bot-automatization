const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client();


client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
async function start(){


    client.on('message', (msg) => {
        if (msg.body == 'oii meu amor') {
            sleep(Math.floor(Math.random() * 5000 - 1000 + 1)) + 1000;
            msg.reply(`Oii ${msg.author} meu amor `);
            if(msg.author == "amanda")
            {
              msg.reply('Te amo meu amor.');
            }
        }
        else{
          if(msg.body == 'Olar')
          {
            sleep(Math.floor(Math.random() * 5000 - 1000 + 1)) + 1000;
            msg.reply(`Olar, como vai?`)
          }
          else{
            if(msg.body == 'Tudo bem e com voce?'){
              sleep(Math.floor(Math.random() * 5000 - 1000 + 1)) + 1000;
              msg.reply(`Vou bem também`)
            }
            else{
              if(msg.body == 'Info')
              {
                sleep(Math.floor(Math.random() * 5000 - 1000 + 1)) + 1000;
                msg.reply(`Nome: ${msg.author} Dispositivo: ${msg.deviceType}`)
              }
              else{
                  if(msg.body == 'Oi filho')
                  {
                    sleep(Math.floor(Math.random() * 5000 - 1000 + 1)) + 1000;
                    if(msg.author == 'mãe')
                      msg.reply(`Benção mamae`);
                    else{
                      if(msg.author == 'pai')
                        msg.reply("Benção papai");
                    }
                  }
                }
              }
            }
          }
    });

client.initialize();
}
start();