const app = require('./app');
const http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

io.on('connection', function(socket) {
    console.log('A user connected');
 
    socket.on('disconnect', function () {
       console.log('A user disconnected');
    });
 });

http.listen(PORT, () => console.log(`server running at ${PORT}`));
