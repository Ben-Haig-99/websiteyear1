const radLatte = document.getElementById("latte");
const radCappu = document.getElementById("cappuccino");
const radFlatw = document.getElementById("flat_white");
const radEspre = document.getElementById("espresso");
const radAmeri = document.getElementById("americano");
const radSmall = document.getElementById("small");
const radMediu = document.getElementById("medium");
const radLarge = document.getElementById("large");
const radWhole = document.getElementById("whole");
const radSkimm = document.getElementById("skimmed");
const radSemi = document.getElementById("semi");
const radCocon = document.getElementById("coconut");
const radSoya = document.getElementById("soya");
const radNone = document.getElementById("none");
const chkCream = document.getElementById("cream");
const numSugar = document.getElementById("sugar");
const numSyrup = document.getElementById("syrup");

const btnAddTo = document.getElementById("addOrder");
const btnPlace = document.getElementById("place");

//Declaring the variables
let coffeeCost = 0;
let creamCost = 0;
let syrupCost = 0;
let price = 2.65;
let ordPrice = 0;

//Starting information for variables
let currentCoffee = "No Coffee ";
let currentSize = "";
let currentMilk = "";
let currentCream = "";
let currentSugar = " No Spoons of Sugar, ";
let currentSyrup = " No Shots of Syrup.";
let finalCoffee = "";

btnAddTo.addEventListener("click", addToOrder);
btnPlace.addEventListener("click", placeOrder);

selectMilk();
selectSize();
creamChoice();  

let drink = document.querySelectorAll("input[name='drink']");

for (let i = 0; i < drink.length; i++) {
    drink[i].addEventListener("change", coffeeMilk);
}

//Checks what coffee is selected and only shows milk option if coffee requires it
function coffeeMilk() {
    if (this.value == "latte") {
        document.getElementById("milks").style.display = "block";
        drinkText.innerText = "Latte";
        currentCoffee = "Latte ";
    }
    else if (this.value == "cappuccino") {
        document.getElementById("milks").style.display = "block";
        drinkText.innerText = "Cappuccino";
        currentCoffee = "Cappuccino ";
    }
    else if (this.value == "flat_white") {
        document.getElementById("milks").style.display = "block";
        drinkText.innerText = "Flat White";
        currentCoffee = "Flat White ";
    }
    else if (this.value == "espresso") {
        document.getElementById("milks").style.display = "none";
        drinkText.innerText = "Espresso";
        currentCoffee = "Espresso ";
        milkText.innerText = "No Milk";
        currentMilk = "with No Milk, "
    }
    else if (this.value == "americano") {
        document.getElementById("milks").style.display = "none";
        drinkText.innerText = "Americano";
        currentCoffee = "Americano ";
        milkText.innerText = "No Milk";
        currentMilk = "with No Milk, ";
    } 
}

let size = document.querySelectorAll("input[name='size']");

for (let i = 0; i < size.length; i++) {
    size[i].addEventListener("change", selectSize);
}

//Choice of size of drink and updating the price
function selectSize() {
    if (this.value == "small") {
        sizeText.innerText = "Small ";
        coffeeCost = 2.45;
        currentSize = "Small ";
        costCalculator();
    }
    else if (this.value == "large") {
        sizeText.innerText = "Large ";
        coffeeCost = 2.85;
        currentSize = "Large ";
        costCalculator();
    }
    else if (this.value == "medium") {
        sizeText.innerText = "Medium ";
        coffeeCost = 2.65;
        currentSize = "Medium ";
        costCalculator();
    }
    else {
        sizeText.innerText = "Medium ";
        coffeeCost = 2.65;
        currentSize = "Medium ";
        costCalculator();
    }    
}

let milk = document.querySelectorAll("input[name='milk']");

for (let i = 0; i < milk.length; i++) {
    milk[i].addEventListener("change", selectMilk);
}

//Choice of milk for the drink
function selectMilk() {
    if (this.value == "whole") {
        milkText.innerText = "Whole";
        currentMilk = "with Whole Milk, ";
    }
    else if (this.value == "skimmed") {
        milkText.innerText = "Skimmed";
        currentMilk = "with Skimmed Milk, ";
    }
    else if (this.value == "coconut") {
        milkText.innerText = "Coconut";
        currentMilk = "with Coconut Milk, ";
    }
    else if (this.value == "soya") {
        milkText.innerText = "Soya";
        currentMilk = "with Soya Milk, ";
    }
    else {
        milkText.innerText = "Semi-Skimmed";
        currentMilk = "with Semi-Skimmed Milk, ";
    }
}

let cream = document.querySelectorAll("input[name='cream']");

for (let i = 0; i < cream.length; i++) {
    cream[i].addEventListener("change", creamChoice);
}

//Checkbox for cream whether it is ticked or not
function creamChoice() {
    if (this.checked) {
        creamCost = 0.5;
        creamText.innerText = "Yes";
        currentCream = " Cream, "
        costCalculator();
    }
    else {
        creamCost = 0;
        creamText.innerText = "No";
        currentCream = "No Cream";
        costCalculator();
    }   
}

let sugar = document.querySelectorAll("input[name='sugar']");
let syrup = document.querySelectorAll("input[name='syrup']");

for (let i = 0; i < sugar.length; i++) {
    sugar[i].addEventListener("change", sugarTotal);
}

for (let i = 0; i < syrup.length; i++) {
    syrup[i].addEventListener("change", syrupTotal);
}

//To display the amount sugar selected
function sugarTotal() {
    sugarText.innerText = this.value;
    currentSugar = this.value + " Spoon(s) of Sugar, ";
}

//To display the amount of syrup selected and update the price
function syrupTotal() {
    syrupText.innerText = this.value;
    syrupCost = 0.25 * this.value;
    currentSyrup = this.value + " Shot(s) of Syrup."
    costCalculator();
}

//Calculates the price of size, cream and syrup
function costCalculator() {
    price = coffeeCost + creamCost + syrupCost;
    curPrice.innerText = "£" + price.toFixed(2);
}

//Adds the current options to the order and updates the total price
function addToOrder () {
    if (currentCoffee == "No Coffee ") {
        alert("No drink selected");
    }
    else {
        finalCoffee = (currentSize + currentCoffee + currentMilk + currentCream + currentSugar + currentSyrup + " £" + price.toFixed(2) +"\n");
        orderField.innerText += finalCoffee;
        ordPrice += price;
        endPrice.innerText = "£" + ordPrice.toFixed(2);
        resetForms();
    }
}

//Thanks the customer for using the system and resets the entire page
function placeOrder() {
    alert("Thank you for your custom, your order has been placed");
    location.reload();
}

//Resets all the forms after adding to order so another coffee can be started from scratch
function resetForms() {
    document.getElementById("coffees").reset();
    document.getElementById("size").reset();
    document.getElementById("milks").reset();
    document.getElementById("extras").reset();
    drinkText.innerText = "No Drink Selected";
    sizeText.innerText = "";
    milkText.innerText = "";
    creamText.innerText = "";
    sugarText.innerText = "0";
    syrupText.innerText = "0";
    curPrice.innerText = "£2.65";
    coffeeCost = "";
    creamCost = "";
    SyrupCost = "";
    price = "";
    ordPrice = "";
}
