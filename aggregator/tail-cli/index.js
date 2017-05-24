var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


let Tail = require('tail').Tail
let colors = require('colors')
let tail = new Tail("/tmp/remote_logs/remotetail.test2-rails/log.sym")
let ansiHTML = require('ansi-html');
tail.on("line", function(line) {
  // io.emit('chat message', line)
  let data = parse(line)
  io.emit('chat message', ansiHTML(data.timestamp.gray + "\t" + data.tag.blue + "\t" + data.host.red + "\t" + data.message.green))
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

// let Tail = require('tail').Tail
// let colors = require('colors')
//
// tail = new Tail("/tmp/remote_logs/remotetail.test1/log.sym")
//
function parse(line) {
  let words = line.split("\t")
  let params = JSON.parse(words[2].replace(/\\/g, '\\'))
  
  return {
    timestamp: words[0],
    tag: words[1],
    message: params.message,
    host: params.host
  }
}
//
// tail.on("line", function(line) {
//   let data = parse(line)
//   console.log(data.timestamp.white + "\t" + data.tag.blue + "\t" + data.body.green)
// });
//
// tail.on("error", function(error) {
//   console.log('ERROR: ', error)
// });
