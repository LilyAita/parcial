var url="https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";
var lista =[];
function cargar ()
{
    console.log("Cargar");
    fetch(url)
  .then((json) => {
    lista = json;
    var nav = document.getElementById("nav");
    for (let i = 0; i < json.length; i++) {
        var newc = document.createElement('a');
        newc.className = "navbar-brand";
         newc.innerHTML = json[i].name;
         nav.appendChild(newc);
    }
  })
  .catch(function (error) {
    console.log("Hubo un problema con la petición Fetch:" + error.message);
  });
}

cargar();

