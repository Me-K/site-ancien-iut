$(document).ready(function(){
    const urlParams = new URLSearchParams(window.location.search);
    let Error = urlParams.get('error');

    $("#bouton").click(function(){
        let mail = $("input#nom")[0].value;
        let mdp = $("input#mdp")[0].value;

        document.location.href = "/account/login?" + "mail=" + encodeURIComponent(mail) + "&mdp=" + encodeURIComponent(mdp);
    });

    if (Error){
        alert(Error);
    }
});
