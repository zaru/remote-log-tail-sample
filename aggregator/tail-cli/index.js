let Tail = require('tail').Tail
let colors = require('colors')

tail = new Tail("/tmp/remote_logs/remotetail.test1/log.sym")

function parse(line) {
  let words = line.split("\t")
  return {
    timestamp: words[0],
    tag: words[1],
    body: words[2]
  }
}

tail.on("line", function(line) {
  let data = parse(line)
  console.log(data.timestamp.white + "\t" + data.tag.blue + "\t" + data.body.green)
});

tail.on("error", function(error) {
  console.log('ERROR: ', error)
});
