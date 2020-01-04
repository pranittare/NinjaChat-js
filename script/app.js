// dom queries
const chatList = document.querySelector('.chat-list');
const newChatForum = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');

//add a new chat
newChatForum.addEventListener('submit', e =>{
    e.preventDefault();
    const message = newChatForum.message.value.trim();
    chatroom.addChat(message)
        .then(()=> newChatForum.reset())
        .catch((err)=>{console.log(err)});
    newChatForum.reset();
});
//update username
newNameForm.addEventListener('submit', e =>{
    e.preventDefault();
    //name via chatroom class
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    //reset the form
    newNameForm.reset();
    //show then hide the update msg
    updateMssg.innerText = `Your name was Updated to ${newName}`;
    setTimeout(()=>updateMssg.innerText = ``,3000)
});
//update the chat room
rooms.addEventListener('click', e=>{
    if(e.target.tagName === "BUTTON"){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat))
    }
})

//check local storage for a name
const username = localStorage.username ? localStorage.username : 'anon'

// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('gaming', username);

// get chats & render
chatroom.getChats(data => chatUI.render(data));