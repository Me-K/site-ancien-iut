$(document).ready(function(){
    $("#bouton_confirmer").click(function(e){
        e.preventDefault();
        var entreprise = $("#input_entreprise").val();
        var poste = $("#input_poste").val();
        var areadescription = $("#input_description").val();
        var visibilite = $("#input_visibilite").val();
        console.log(entreprise, poste, areadescription, visibilite);
        const url= window.location.hostname + "/account/modification";
        const param = {
            description: areadescription,
            noment: entreprise,
            posteent: poste
        }
        axios.get(url, param)
    })
});