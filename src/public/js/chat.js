//este es el chat.js de cliente

const socket = io()

function getChatForm(){
  const newMsg ={
    user: document.getElementById('user').value,
    message: document.getElementById('message').value
  }
  socket.emit('newMessage', newMsg);
  return false ;
}

const chat = document.getElementById('chat');
  chat.addEventListener('submit', (e) => {
        e.preventDefault();
        chat.reset();
      }
  )

  socket.on('allMessages', (data) => {
        
        renderMessage(data)
  })
      

//function render
function renderMessage(data) {
        let html = data.map(elem => {
            return `
            <div class = "container">
            </div>
            <div class="container chat mx-4 my-2">
                <strong>${elem.user}</strong> dice <em>${elem.message}</em>
            </div>
            `;
        })
        .join(' ')
        document.getElementById('boxChat').innerHTML = html
    }
