
let onlineUsers = [];

const connectUser = (id, username, lobby) =>
{
    if(!lobby || !lobby.trim() || !username || !username.trim())
    {
        return "Error: User and Lobby must be declared";
    }

    const user = { id, username, lobby };
    onlineUsers = [...onlineUsers, user];

    return user;
}

const getUser = (id) =>
{
    console.log(onlineUsers);
    const found = onlineUsers.find(user => user.id === id);
    onlineUsers.forEach((user) => {
        console.log(user.id, user.username, id);
    });

    return found ? found : "Error: User not found";
}

const disconnectUser = (id) =>
{
    const index = onlineUsers.findIndex(user => user.id === id);

    if(index >= 0)
    {
        return onlineUsers.splice(index, 1)[0];
    }
}

module.exports = {
    connectUser,
    getUser,
    disconnectUser
};