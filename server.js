// CONFIG

const port = 25200;

// CODE

const Express = require("Express");
const pg = require("pg");
const App = Express();
const fs = require('fs');

var Globals = {};
Globals.pg = pg

fs.readdir("./Routes", (err, files) => {
    files.forEach(file => {
        let FileWithoutExtension = file.split('.').slice(0, -1).join('.')

        App.use("/" + FileWithoutExtension.toLowerCase(), require('./Routes/' + FileWithoutExtension)(Globals));
        console.log("Routing", "/" + FileWithoutExtension.toLowerCase())
    });
});


//App.get('/', (req, res) => {
//    res.send("ok");
//})

App.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
