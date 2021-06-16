// CONFIG

const port = 25200;

// CODE

// Setup des librairies de base
const Express = require("Express");
const {Client} = require("pg");
const App = Express();
const fs = require('fs');
const uuid = require('uuid');
const path = require("path");
const bodyParser = require('body-parser');

// Setup Middlewares
App.set('view engine', 'ejs');
App.use(bodyParser.urlencoded({ extended: true })); // Parse request body
App.use(require('cookie-parser')()); // Bad practice, but no time :/

// Setup de la table des globals (usage en routing)
var Globals = {};

// Connection postgres
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'exam',
    password: '123',
    port: 5432,
});
client.connect();

Globals.pgClient = client;
Globals.SavedCookies = {};
Globals.uuid = uuid;

// Routing
fs.readdir("./Routes", (err, files) => {
    files.forEach(file => {
        let FileWithoutExtension = file.split('.').slice(0, -1).join('.')

        App.use("/" + FileWithoutExtension.toLowerCase(), require('./Routes/' + FileWithoutExtension)(Globals));
        console.log("Routing", "/" + FileWithoutExtension.toLowerCase())
    });
});

// Base lib redirects
App.get("/css/style_modif.css", function(req, res){
    res.sendFile(path.resolve("./Public/CSS/style.css"))
});

App.get("/css/a.css", function(req, res){
    res.sendFile(path.resolve("./Public/CSS/a.css"))
});

App.get("/javascript/a.js", function(req, res){
    res.sendFile(path.resolve("./Public/JS/a.js"))
});

App.get("/css/b.css", function(req, res){
    res.sendFile(path.resolve("./Public/CSS/b.css"))
});

App.get("/javascript/b.js", function(req, res){
    res.sendFile(path.resolve("./Public/JS/b.js"))
});

// Connection au port d'écoute
App.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
