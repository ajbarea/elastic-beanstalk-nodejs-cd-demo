var port = process.env.PORT || 3000,
  http = require("http"),
  fs = require("fs"),
  html = fs.readFileSync("index.html");

var log = function (entry) {
  fs.appendFileSync(
    "/tmp/sample-app.log",
    new Date().toISOString() + " - " + entry + "\n"
  );
};

var server = http.createServer(function (req, res) {
  if (req.method === "POST") {
    var body = "";

    req.on("data", function (chunk) {
      body += chunk;
    });

    req.on("end", function () {
      if (req.url === "/") {
        log("Received message: " + body);
      } else if (req.url === "/scheduled") {
        log(
          "Received task " +
            req.headers["x-aws-sqsd-taskname"] +
            " scheduled at " +
            req.headers["x-aws-sqsd-scheduled-at"]
        );
      }

      res.writeHead(200, "OK", { "Content-Type": "text/plain" });
      res.end();
    });
  } else {
    // Handle static file requests
    if (req.url === "/styles.css") {
      try {
        var css = fs.readFileSync("styles.css", "utf8");
        res.writeHead(200, { "Content-Type": "text/css" });
        res.write(css);
        res.end();
      } catch (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.write("CSS file not found");
        res.end();
      }
    } else {
      // Default to serving index.html
      res.writeHead(200);
      res.write(html);
      res.end();
    }
  }
});

// Listen on port 3000, IP defaults to 127.0.0.1
server.listen(port);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:" + port + "/");
