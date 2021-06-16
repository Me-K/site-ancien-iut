var express = require('express');
var router = express.Router();
var Globals = {};

// Page de gestion du compte
router.get('/', function(req, res) {
    var cookie = req.cookies.TOKEN;
    if (!cookie || cookie === undefined || !(cookie in Globals.SavedCookies)) {
        return res.render("../Public/HTML/connexion")
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
    var Body = req.query
    if (!Body.mdp || !Body.mail) return res.redirect('/account?' + "error=" + encodeURI("Champ(s) non rempli(s)."));

    Globals.pgClient.query("SELECT * FROM Membre WHERE mdp_membre = '" + Body.mdp + "' AND mail_membre = '" + Body.mail + "'", function(err, sqlres){
        console.log("Connection: mdp_membre = " + Body.mdp + " | mail_membre = " + Body.mail)
        if (sqlres.rows.length <= 0){
            return res.redirect('/account?' + "error=" + encodeURIComponent("Mot de passe éronée."));
        }else{
            let id_membre = sqlres.rows[0].id_membre
            let UniqueId = Globals.uuid.v4();
            Globals.SavedCookies[UniqueId] = id_membre;
            res.cookie('TOKEN', UniqueId);
            return res.redirect("/account");
        }
    });
});

router.get('/recuppass', function(req, res) {
    res.render("../Public/HTML/RecupMdp");
});

router.get('/clear', function(req, res) {
    res.cookie('TOKEN').redirect('/account');
});

module.exports = function(Global){
    Globals = Global;
    return router
};