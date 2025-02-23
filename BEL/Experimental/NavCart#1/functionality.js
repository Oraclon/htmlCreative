//#region Data
const items = [
    { name: "Apple", quantity: 10, price: 1.2 },
    { name: "Banana", quantity: 15, price: 0.5 },
    { name: "Orange", quantity: 20, price: 0.8 },
    { name: "Grapes", quantity: 8, price: 2.5 },
    { name: "Mango", quantity: 12, price: 1.7 },
    { name: "Strawberry", quantity: 6, price: 3.0 },
    { name: "Pineapple", quantity: 5, price: 2.8 },
    { name: "Blueberry", quantity: 9, price: 4.0 },
    { name: "Watermelon", quantity: 3, price: 5.0 },
    { name: "Peach", quantity: 7, price: 1.5 },
    { name: "Cherry", quantity: 14, price: 2.2 },
    { name: "Pear", quantity: 11, price: 1.3 },
    { name: "Plum", quantity: 10, price: 1.4 },
    { name: "Kiwi", quantity: 8, price: 2.0 },
    { name: "Papaya", quantity: 6, price: 3.5 },
    { name: "Guava", quantity: 9, price: 1.9 },
    { name: "Coconut", quantity: 4, price: 3.8 },
    { name: "Pomegranate", quantity: 5, price: 2.9 },
    { name: "Fig", quantity: 7, price: 2.7 },
    { name: "Lemon", quantity: 13, price: 0.6 }
  ];
//#endregion

const CreateDomElement = (tag, css, text) => {
    let element = document.createElement(tag);
    element.className = css;
    if (text != undefined) element.innerHTML = text;
    return element;
};

var MyCart = [];

const addItemToCart = (data) => {
    let item = CreateDomElement("div", "item");
    let itemName = CreateDomElement("div", "itemName", data.name);
    let itemQuantity = CreateDomElement("div", "itemQuantity", data.quantity);
    let itemPrice = CreateDomElement("div", "itemPrice", data.price);

    item.appendChild(itemName);
    item.appendChild(itemQuantity);
    item.appendChild(itemPrice);
    document.getElementById("cartList").appendChild(item);

    MyCart.push(data);
    document.getElementById("emptyCart").style.display ="none";
    let totalPrice=0;
    MyCart.map(x=>totalPrice+=x.price*x.quantity);
    totalPrice=totalPrice.toFixed(2);
    document.getElementById("cartInput").value=MyCart.length + " item(s) - " + totalPrice+"€";
    document.getElementById("cartTotalPrice").innerHTML=totalPrice;
};


addItemToCart(items[1]);
addItemToCart(items[2]);
addItemToCart(items[3]);
addItemToCart(items[4]);
addItemToCart(items[5]);
addItemToCart(items[6]);
addItemToCart(items[7]);
addItemToCart(items[8]);
addItemToCart(items[9]);
addItemToCart(items[10]);
addItemToCart(items[11]);
addItemToCart(items[12]);
addItemToCart(items[13]);
addItemToCart(items[14]);
