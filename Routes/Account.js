var express = require('express');
var router = express.Router();
var Globals = {};

// Page de gestion du compte
router.get('/', function(req, res) {
    var cookie = req.cookies.TOKEN;
    if (!cookie || cookie === undefined || !(cookie in Globals.SavedCookies)) {
        return res.send("Connectez vous pour récupérer vos infos");
    }
    
    Globals.pgClient.query("SELECT * FROM Membre WHERE id_membre = " + Globals.SavedCookies[cookie], function(err, sqlres){
        console.log(sqlres.rows)
        return res.render("../Public/HTML/basehtml", {
            nom: sqlres.rows[0].nom_membre + " " + sqlres.rows[0].prenom_membre
        })
    });
});

// Requete de connexion
router.get('/login', function(req, res) {
    let UniqueId = Globals.uuid.v4();
    Globals.SavedCookies[UniqueId] = 1
    res.cookie('TOKEN', UniqueId)
    res.send("Cookie sent")
});

module.exports = function(Global){
    Globals = Global;
    return router
};