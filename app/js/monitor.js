const path = require('path');
const osu = require('node-os-utils');
const os = osu.os;
const cpu = osu.cpu;
const mem = osu.mem;

// Run every 2 seconds
setInterval(() => {
    // CPU Usage
    cpu.usage().then(info => {
        document.getElementById('cpu-usage').innerText = info + '%';
    });
    // CPU Free
    cpu.free().then(info => {
        document.getElementById('cpu-free').innerText = info + '%';
    });
    // Uptime
    document.getElementById('sys-uptime').innerText = secondsToDhms(os.uptime());
}, 2000);

// Set model
document.getElementById('cpu-model').innerText = cpu.model();
// Computer Name
document.getElementById('comp-name').innerText = os.hostname();
// OS
document.getElementById('os').innerText = `${os.type()} ${os.arch()}`
// Total Mem
mem.info().then(info => {
   document.getElementById('mem-total').innerText = info.totalMemMb;
});

// Show days, hours, mins, sec
function secondsToDhms(seconds) {
    seconds = +seconds;
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    return `${d}d, ${h}h, ${m}m, ${s}s`;
}