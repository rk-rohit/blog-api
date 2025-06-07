const dbConnect = require("./db");
const dotenv = require("dotenv");
const app = require("./index");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();
dbConnect();

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

const io = new Server(server);
app.set("io", io);

io.on("connection", (socket) => {
  console.log("Socket connected");
});

app.listen(PORT, () => {
  console.log("server listen on ", PORT);
});
