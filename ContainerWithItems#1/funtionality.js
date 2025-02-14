const products = [
    {
        title: "Gaming Laptop",
        description: "High-performance laptop with RTX 4070 GPU and 32GB RAM.",
        price: "1899.99$"
    },
    {
        title: "Wireless Headphones",
        description: "Noise-canceling Bluetooth headphones with 40-hour battery life.",
        price: "249.99$"
    },
    {
        title: "Smartphone Pro",
        description: "Latest flagship smartphone with an ultra-clear 200MP camera.",
        price: "1099.99$"
    },
    {
        title: "Mechanical Keyboard",
        description: "RGB backlit mechanical keyboard with hot-swappable switches.",
        price: "129.99$"
    },
    {
        title: "Smartwatch",
        description: "Feature-packed smartwatch with fitness tracking and GPS.",
        price: "199.99$"
    },
    {
        title: "4K Ultra HD Monitor",
        description: "32-inch 4K HDR monitor with 144Hz refresh rate.",
        price: "499.99$"
    },
    {
        title: "Wireless Gaming Mouse",
        description: "Ergonomic gaming mouse with customizable DPI and RGB lighting.",
        price: "79.99$"
    },
    {
        title: "VR Headset",
        description: "Immersive virtual reality headset with high-resolution display.",
        price: "599.99$"
    },
    {
        title: "Portable SSD 1TB",
        description: "Ultra-fast external SSD with USB-C support.",
        price: "149.99$"
    },
    {
        title: "Streaming Webcam",
        description: "4K webcam with auto-focus and built-in ring light.",
        price: "99.99$"
    }
];


CreateDomElement = (tag, css, text) => {
    let element = document.createElement(tag);
    element.className = css;
    if(text!=undefined)element.innerHTML = text;
    return element;
}

var  itemContainer = document.getElementById("itemContainer");

itemFactory = (element)=>{
    let item = CreateDomElement("div", "item");
    let itemImage       = CreateDomElement("div", "itemImage");
    let itemHeart       = CreateDomElement("div", "itemHeart", "🤍");
    let itemTitle       = CreateDomElement("div", "itemTitle", element.title);
    let itemDescription = CreateDomElement("div", "itemDescription", element.description);
    let itemPrice       = CreateDomElement("div", "itemPrice", element.price);

    item.appendChild(itemImage);
    itemImage.appendChild(itemHeart);
    item.appendChild(itemTitle);
    item.appendChild(itemDescription);
    item.appendChild(itemPrice);

    return item;
}

products.forEach(item=>{
    itemContainer.appendChild(itemFactory(item));
})