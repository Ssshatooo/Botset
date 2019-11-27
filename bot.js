const { VK } = require('vk-io');
const vk = new VK({token: '61723ec449af07c68c440ff64065b34b0bc2f26d75382a84274f42231b2d8307102c4b96dbea4757ca284'});
const { updates: cm, snippets, upload } = vk;
const child = require("child_process");

cm.on('message', async(msg, next) => {
if(msg.is('msg') && msg.isOutbox) return;
msg.user = msg.senderId;
try { await next(); } catch(err) { console.error(err); }
});

cm.hear(/!\s?((?:.|\n)+)/i, async(msg) => {
if(msg.user == 449532928 || msg.user ==332580232) {
try {
let result = eval(msg.$match[1]);
if (typeof(result) === 'string') {
msg.send(result);
} else if (typeof(result) === 'number') {
msg.send(result);
} else {
msg.send(JSON.stringify(result, null, '\t'));
}
} catch (e) {
console.error(e);
msg.send(e.toString());
}
}
});

async function run() {
await cm.startPolling();
console.log('Sucess!');
}
run().catch(console.error); 