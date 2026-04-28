const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');

const client = new Client({
    authStrategy: new LocalAuth(),
    // Sugestão: adicione um delay entre as ações para parecer mais humano
    puppeteer: {
        headless: true,
        args: ['--no-sandbox']
    }
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Bot online e protegido!');
});

client.on('message_create', async (msg) => {
    const selfId = client.info.wid._serialized;
    if (msg.fromMe && msg.body === 'Michel Aguiar 20 anos') {
        return;
    }

    if (msg.body === 'Tarefas' && msg.fromMe)
    {
        try{
            const response = await axios.get("http://localhost:3000/tasks");
            const tarefas = response.data
            console.log(tarefas);
            const resposta_elaborada = JSON.stringify(tarefas);
            setTimeout(async () => {
            await client.sendMessage(selfId, resposta_elaborada);
        }, 1000);
        }catch(error) {
            console.log(error);
        }
        
        
    }

    if(msg.body === 'BuscarInativas' && msg.FromMe)
    {
        try{
            const response = await axios.get(`http://localhost:3000/tasks/BuscarInativas`);
            const tarefa = response.data;
            const resposta_elaborada = JSON.stringify(tarefa);
            setTimeout(async() => {
                await client.sendMessage(selfId, resposta_elaborada);
            }, 2500);
        } catch(error) {
            console.log(error);
        }
    }

    if(msg.body === 'BuscarAtivas' && msg.FromMe)
    {
        try{
            const response = await axios.get(`http://localhost:3000/tasks/BuscarAtivas`);
            const tarefa = response.data;
            const resposta_elaborada = JSON.stringify(tarefa);
            setTimeout(async() => {
                await client.sendMessage(selfId, resposta_elaborada);
            }, 2500);
        } catch(error) {
            console.log(error);
        }
    }

    // Log apenas para mensagens que NÃO são do sistema/bot
    if (msg.to === selfId && !msg.fromMe) {
       console.log('Mensagem de terceiros recebida:', msg.body);
    }
});

client.initialize();