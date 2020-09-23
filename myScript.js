var url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";
var lista = [];
var carrito = [];
var total=0;
function cancel ( )
{
    total = 0;
    
    document.getElementById("total").innerHTML ="Total: $" + 0;
    var table = document.getElementById("myTable");
    for (var i = 0; i < 5; i++) {
        
            for (var j = 0; j < carrito.length; j++) {
                table.rows[j+1].deleteCell(0);
            }
    }
    carrito=[];
    document.getElementById("items").innerHTML ="items " + carrito.length;
}
function confirm ( )
{
    console.log(carrito);
}

function agregarFila (element )
{
    var table = document.getElementById("myTable");
    var row = table.insertRow(carrito.length);
    row.insertCell(0).innerHTML = carrito.length;
    row.insertCell(1).innerHTML = element.qty;
    row.insertCell(2).innerHTML = element.description;
    row.insertCell(3).innerHTML = element.unitPrice;
    row.insertCell(4).innerHTML = element.amount;
    
}
function comprar() {
  let flag = false;
  var nav = document.getElementById("nav");
  for (let i = 0; i < carrito.length && !flag; i++) {
    if (this.id === carrito[i].description.replaceAll(' ', '')) {
      flag = true;
      carrito[i].qty += 1;
      carrito[i].amount = carrito[i].qty * carrito[i].unitPrice;

      var table = document.getElementById("myTable");
      table.rows[i+1].cells[1].innerHTML = carrito[i].qty;
      table.rows[i+1].cells[4].innerHTML = carrito[i].amount;
      total+=carrito[i].unitPrice;
    }
  }
  if (!flag) {
    for (let i = 0; i < lista.length && !flag; i++) {
      for (let j = 0; j < lista[i].products.length && !flag; j++) {
        if (this.id === lista[i].products[j].name.replaceAll(' ', '')) {
          flag = true;
          var element ={
            description: lista[i].products[j].name,
            unitPrice: lista[i].products[j].price,
            qty: 1,
            amount: lista[i].products[j].price,
          };
          carrito.push(element);
          agregarFila (element);
          document.getElementById("items").innerHTML ="items " + carrito.length;
          total+=lista[i].products[j].price;
        }
      }
    }
  }
  document.getElementById("total").innerHTML ="Total: $" + total;
  
}
function cargar() {
  fetch(url)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        console.log("Respuesta de red OK pero respuesta HTTP no OK");
      }
    })
    .then((json) => {
      var nav = document.getElementById("nav");
      var content = document.getElementById("pills-tabContent");
      document.getElementById("yesCancel").addEventListener("click", cancel);
      document.getElementById("confirm").addEventListener("click", confirm);


      for (let i = 0; i < json.length; i++) {
        lista.push(json[i]);
        var li = document.createElement("li");
        li.className = "nav-item";
        var a = document.createElement("a");
        a.className = "nav-link";
        a.href = "#" + json[i].name.replaceAll(' ', '');
        a.setAttribute("data-toggle", "pill");
        a.setAttribute("role", "tab");
        a.innerHTML = json[i].name;
        li.appendChild(a);
        nav.appendChild(li);
        
        var container = document.createElement("div");
        container.className = "container-fluid";
        var row = document.createElement("div");
        row.className = "row row-cols-4";


        let tab = document.createElement("div");
        tab.className = "tab-pane fade";
        if (i==0 )
        tab.className ='tab-pane fade active show';
        tab.id = json[i].name.replaceAll(' ', '');
        tab.setAttribute("role", "tabpanel");

        let name = document.createElement("h3");
        name.className = "text-center";
        name.innerHTML = json[i].name;

        tab.appendChild(name);

        for (let j = 0; j < json[i].products.length; j++) {
            var col = document.createElement("div");
            col.className = "col";
          let card = document.createElement("div");
          card.className = "card";

          let image = document.createElement("img");
          image.className = "card-img-top";
          image.setAttribute("src", json[i].products[j].image);
          image.setAttribute("alt", "imagen de " + json[i].products[j].name);
          card.appendChild(image);

          let cardBody = document.createElement("div");
          cardBody.className = "card-body";

          let cardTitle = document.createElement("h5");
          cardTitle.className = "card-title";
          cardTitle.innerHTML = json[i].products[j].name;
          cardBody.append(cardTitle);

          let cardText = document.createElement("p");
          cardText.className = "card-text";
          cardText.innerHTML = json[i].products[j].description;
          cardBody.append(cardText);

          let cardPrice = document.createElement("p");
          cardPrice.className = "card-text font-weight-bold";
          cardPrice.innerHTML = "$" + json[i].products[j].price;
          cardBody.append(cardPrice);

          let cardButton = document.createElement("button");
          cardButton.className = "btn btn-dark";
          cardButton.innerHTML = "Add to car";
          cardButton.id = json[i].products[j].name.replaceAll(' ', '');
          cardButton.addEventListener("click", comprar);
          cardBody.append(cardButton);

          card.appendChild(cardBody);

          col.appendChild(card);
          row.appendChild(col);
          

        }
        container.appendChild(row);
        tab.appendChild(container);
        content.appendChild(tab);
      }
    })
    .catch(function (error) {
      console.log("Hubo un problema con la petición Fetch:" + error.message);
    });
}

cargar();
