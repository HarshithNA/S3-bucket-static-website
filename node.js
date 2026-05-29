// app.js

const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    res.write(`
        <html>
            <head>
                <title>Node.js App</title>
            </head>
            <body>
                <h1>Welcome to Node.js Server</h1>
                <p>This is a basic Node.js application.</p>
            </body>
        </html>
    `);

    res.end();
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
