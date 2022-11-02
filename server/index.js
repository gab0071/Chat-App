"use strict";

const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    // Permite el acceso de orígenes mixtos (CORS)
    origin: "*",
  },
});

// cargaremos una vista estatica por defecto en nodejs
app.use(express.static("client"));

// creando una ruta con express
app.get("/hola-mundo", function (req, res) {
  res.status(200).send({ msg: "hola mundo desde mi metodo express ✨" });
});

// el socket enviara un mensaje por defecto al cliente
var messages = [
  {
    id: 1,
    text: "Bienvenido al chat privado de socket.io y nodejs..",
    nickname: "bot - catellaTech",
  },
];

// conexion con socket.io
io.on("connection", function (socket) {
  // este metodo se va a encargar de recibir las conexiones de los clientes
  console.log(
    "el cliente con la IP: " +
      socket.handshake.address +
      " se ha conectado ⚡✨"
  );

  //   emitiendo el mensaje
  socket.emit("messages", messages);

  socket.on("add-message", (data) => {
    messages.push(data);
    io.sockets.emit("messages", messages);
  });
});

// creando un servidor con express
server.listen(6677, function () {
  console.log(
    "El servidor esta funcionando correctamente en http://localhost:6677 ✨"
  );
});
