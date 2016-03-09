var discount = 1
var season = 0
var prices = []

function returnToBasics() {
  for (i in prices) {
    document.getElementById('id' + i).innerHTML = prices[i]
  }
}

function onProd() {
  var prod = JSON.parse(this.responseText)
  var placement = document.getElementById('output')
  for (i in prod.products) {
    var div = ""
    var product = prod.products[i]
    div += `<article>`
    div += `<h1>${product.name}</h1>`
    div += `<section name="num${product.category_id}"></section>`
    div += `<p id = "id${i}" name="discounts${product.category_id}">${product.price * discount}</p>`
    div += "</article>"
    placement.innerHTML += div
    prices[i] = product.price
  }
}

function onCat() {
  var cat = JSON.parse(this.responseText)
  for (i in cat.categories) {
    var div = cat.categories[i].name
    var dumbShit = document.getElementsByName('num' + cat.categories[i].id)
    for (j in dumbShit) {
      dumbShit[j].innerHTML = div
    };
  }
}

function giveMeDaMoney() {
  var seasonValue = discountsFuckingSuck.value
  if (seasonValue === "Summer") {
    discount = 1
    season = 0
    returnToBasics()
  } else if (seasonValue === "Winter") {
    discount = .1
    season = 1
    returnToBasics()
    runDiscounts()
  } else if (seasonValue === "Autumn") {
    discount = .25
    season = 2
    returnToBasics()
    runDiscounts()
  } else if (seasonValue === "Spring") {
    discount = .15
    season = 3
    returnToBasics()
    runDiscounts()
  }
}
function runDiscounts() {
  var discountDiv = document.getElementsByName("discounts" + season)
  for (i in discountDiv) {
    discountDiv[i].innerHTML = parseInt(discountDiv[i].innerHTML) - parseInt(discountDiv[i].innerHTML) * discount
  }
}
var prod = new XMLHttpRequest();
prod.addEventListener("load", onProd);
prod.open("GET", "products.json");
prod.send();

var cat = new XMLHttpRequest();
cat.addEventListener("load", onCat);
cat.open("GET", "categories.json");
cat.send();

var discountsFuckingSuck = document.getElementById("seasons")
discountsFuckingSuck.addEventListener("click", giveMeDaMoney)
