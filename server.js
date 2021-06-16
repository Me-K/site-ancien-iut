// CONFIG

const port = 25200;

// CODE

const Express = require("Express");
const pg = require("pg");
const App = Express();

App.get('/', (req, res) => {
    console.log("Got", req);
    res.send("ok");
})

App.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})