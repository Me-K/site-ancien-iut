$(document).ready(function(){
    $("#bouton").click(function(){
        $("input#email")[0].value = ""
        alert("Un mail de récupération a été envoyer sur cettte adresse e-mail.");
    });
});
