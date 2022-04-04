
const express = require('express');
const socket = require('socket.io');
const cors = require('cors');

const { connectUser, getUser, disconnectUser } = require('./libs/onlineUsers');


const app = express();
const port = 8000;

app.use(express());
app.use(cors());

const server = app.listen(port, console.log(`Server is running on port n. ${port}`));
const io = socket(server);

// Socket Connection
io.on('connection', socket => 
{
    // user join in a room
    socket.on('userConnection', ({ username, lobby }) => 
    {
        const xUser = connectUser(socket.id, username, lobby);
        console.log('id = ', socket.id);////////////////

        socket.join(xUser.room);

        // user entry notification: user
        socket.emit('msg', 
        {
            idUser: xUser.id,
            username: xUser.username,
            message: `Welcome ${xUser.username}`
        });
        // user entry notification: other users
        socket.broadcast.to(xUser.lobby).emit('msg', 
        {
            idUser: xUser.id,
            username: xUser.username,
            message: `${xUser.username} has entered the chat.`
        });

    });

    // user send message
    socket.on('chat', textMessage =>
    {
        const xUser = getUser(socket.id);

        io.to(xUser.lobby).emit('msg', 
        {
            idUser: xUser.id,
            username: xUser.username,
            message:  textMessage
        });
    });

    // user exits
    socket.on('disconnect', () =>
    {
        const xUser = disconnectUser(socket.id);

        if(xUser)
        {
            io.to(xUser.lobby).emit('msg', 
            {
                idUser: xUser.id,
                username: xUser.username,
                message: `${xUser.username} has left the chat.`
            });
        }
    });

});
