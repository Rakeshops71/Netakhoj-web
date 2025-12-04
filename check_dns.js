import dns from 'dns';

console.log('Resolving myneta.info...');

dns.resolve4('myneta.info', (err, addresses) => {
    if (err) console.error('IPv4 Error:', err);
    else console.log('IPv4 Addresses:', addresses);
});

dns.resolve6('myneta.info', (err, addresses) => {
    if (err) console.error('IPv6 Error:', err);
    else console.log('IPv6 Addresses:', addresses);
});
