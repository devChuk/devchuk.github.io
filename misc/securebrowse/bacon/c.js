'use strict'
console.log('c.js is present');

fetch('https://dns.google.com/resolve?name=brianch.uk&type=16', {mode: 'cors'})
    .then(r => r.json())
    .then(response => {
        document.getElementById('json').innerHTML = JSON.stringify(response, null, 4);
    });
document.getElementById('doc').innerText = document.documentElement.innerHTML;
