"use strict";
// trabajaremos con los Sockets aqui
// Main
console.log("Conectando al servidor");
var socket = io.connect("http://192.168.0.39:6677", { forceNew: true });

socket.on("messages", (data) => {
  console.log(data);
  render(data);
});

// Función para renderizar los mensajes
function render(data) {
  let html = data
    .map((elem, index) => {
      return `<div class="message">
                <strong>${elem.nickname}</strong> dice:
                <p>${elem.text}</p>
            </div>`;
    })
    .join(" ");

  let div_msgs = document.getElementById("messages");
  div_msgs.innerHTML = html;
  div_msgs.scrollTop = div_msgs.scrollHeight;
}

function addMessage(e) {
  // Recogemos el nombre y mensaje
  let message = {
    nickname: document.getElementById("nickname").value,
    text: document.getElementById("text").value,
  };
  // Desaparecemos el campo nombre para que no se pueda cambiar hasta nueva sesión
  document.getElementById("nickname").style.display = "none";
  // Enviamos el mensaje
  socket.emit("add-message", message);
  return false;
}
