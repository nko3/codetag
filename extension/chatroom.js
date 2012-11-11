//inyecta js en la pagina del cliente
var injectJS = function(script){
    var oScript = document.createElement("script");
    oScript.src = script;
    document.body.appendChild(oScript);
};

(function(){
    if(document.getElementById('chatHeader')){
        return;
    }
    injectJS("http://codechat.jit.su/js/loader.js");
    //injectJS("http://localhost:3000/js/loader.js");
    
})();
