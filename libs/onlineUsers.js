
const onlineUsers = [];

const connectUser = (id, user, lobby) =>
{
    if(!user.trim() || !lobby.trim())
    {
        return "Error: User and Lobby must be declared";
    }

    const user = { id, user, lobby };
    onlineUsers.push(user);

    return user;
}

const getUser = (id) =>
{
    const found = onlineUsers.find(user => user.id === id);

    return found ? found : "Error: User not found";
}

const disconnectUser = (id) =>
{
    const index = onlineUsers.findIndex(user => user.id === id);

    if(index)
    {
        return onlineUsers.splice(index, 1);
    }
}

export {
    connectUser,
    getUser,
    disconnectUser
};