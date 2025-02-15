//#region Data
const products = [
    {
        title: "Gaming Laptop",
        description: "High-performance laptop with RTX 4070 GPU and 32GB RAM.",
        price: "1899.99$",
    },
    {
        title: "Wireless Headphones",
        description:
            "Noise-canceling Bluetooth headphones with 40-hour battery life.",
        price: "249.99$",
    },
    {
        title: "Smartphone Pro",
        description:
            "Latest flagship smartphone with an ultra-clear 200MP camera.",
        price: "1099.99$",
    },
    {
        title: "Mechanical Keyboard",
        description:
            "RGB backlit mechanical keyboard with hot-swappable switches.",
        price: "129.99$",
    },
    {
        title: "Smartwatch",
        description: "Feature-packed smartwatch with fitness tracking and GPS.",
        price: "199.99$",
    },
    {
        title: "4K Ultra HD Monitor",
        description: "32-inch 4K HDR monitor with 144Hz refresh rate.",
        price: "499.99$",
    },
    {
        title: "Wireless Gaming Mouse",
        description:
            "Ergonomic gaming mouse with customizable DPI and RGB lighting.",
        price: "79.99$",
    },
    {
        title: "VR Headset",
        description:
            "Immersive virtual reality headset with high-resolution display.",
        price: "599.99$",
    },
    {
        title: "Portable SSD 1TB",
        description: "Ultra-fast external SSD with USB-C support.",
        price: "149.99$",
    },
    {
        title: "Streaming Webcam",
        description: "4K webcam with auto-focus and built-in ring light.",
        price: "99.99$",
    },
];
//#endregion

//#region Functionality
const CreateDomElement = (tag, css, text) => {
    let element = document.createElement(tag);
    element.className = css;
    if (text != undefined) element.innerHTML = text;
    return element;
};

const itemFactory = (data) => {
    let item = CreateDomElement("div", "item");
    let itemImage = CreateDomElement("div", "itemImage");
    let itemHeart = CreateDomElement("div", "itemHeart", "🤍");
    let itemTitle = CreateDomElement("div", "itemTitle", data.title);
    let itemDescription = CreateDomElement(
        "div",
        "itemDescription",
        data.description
    );
    let itemPrice = CreateDomElement("div", "itemPrice", data.price);

    item.appendChild(itemImage);
    itemImage.appendChild(itemHeart);
    item.appendChild(itemTitle);
    item.appendChild(itemDescription);
    item.appendChild(itemPrice);

    item.addEventListener("click", () => {
        data.parseDataToModal();
    });

    return item;
};
//#endregion
//#region Structure
class Item {
    constructor(title, description, price) {
        this.title = title;                 // Item title
        this.description = description;     // Item description
        this.price = price;                 // Item price
        this.Cart = {                       // Item Cart (quantity and state)
            quantity: 0,
            state: false,
        };
        this.stc = this.createItem();
    }

    createItem() {                                      // Create the Item DOM
        let item = itemFactory(this);
        document.getElementById("itemContainer").appendChild(item);
        return item;
    }

    parseDataToModal() {                                    // Method to parse the Item data to the Modal
        if (modal != undefined) modal.setItemData(this);
        else console.log("There is no modal!");
    }

    addToCart() {                       // Method to add the Item to the cart
        alert("Item added to cart!");
        this.Cart.quantity++;
        this.Cart.state = true;
    }
}

class Modal {
    constructor() {
        if(document.getElementById("itemModal") != undefined){  // Make sure that there is no other modal with the same id
            console.log("This modal already exists!");
            return;
        }
        this.Item = null;                                       // Item ref
        this.stc = this.createModal();                          // Modal DOM
        document.getElementById("body").appendChild(this.stc);  // Append this modal to body
    }

    setItemData(item) {                                                 // Method to set the given Item data to the modal
        this.Item = item;                                               // Set the given Item to the modal
        this.toggleModalVisibility(true);                               // Show the modal
        this.stc.childNodes[1].innerHTML = item.title;                  // Set the Item title
        this.stc.childNodes[2].innerHTML = item.description;            // Set the Item description
        this.stc.childNodes[3].childNodes[0].innerHTML = item.price;    // Set the Item price
    }

    createModal() {                                     // Method to create the Modal
        if (this.stc != undefined) {
            console.log("This modal already exists!");
            return;
        }

        let itemModal = CreateDomElement("div", "itemModal");
        let modalImage = CreateDomElement("div", "modalImage");
        let modalClose = CreateDomElement("div", "modalClose", "✖️");
        let modalHeart = CreateDomElement("div", "modalHeart", "🤍");
        let modalTitle = CreateDomElement("div", "modalTitle");
        let modalDescription = CreateDomElement("div", "modalDescription");
        let modalPriceContainer = CreateDomElement(
            "div",
            "modalPriceContainer"
        );
        let modalPrice = CreateDomElement("div", "modalPrice");
        let modalCart = CreateDomElement("button", "modalCart", "Add to cart");

        itemModal.appendChild(modalImage);
        modalImage.appendChild(modalClose);
        modalImage.appendChild(modalHeart);
        itemModal.appendChild(modalTitle);
        itemModal.appendChild(modalDescription);
        itemModal.appendChild(modalPriceContainer);
        modalPriceContainer.appendChild(modalPrice);
        modalPriceContainer.appendChild(modalCart);

        modalClose.addEventListener("click", () => {        // Close Modal event
            this.toggleModalVisibility(false);
        });

        modalCart.addEventListener("click", () => {         // Add Item to cart event
            if (this.Item != null) {
                this.Item.addToCart();
            }
        });
        itemModal.style.display = "none";
        itemModal.id = "itemModal";
        return itemModal;
    }

    toggleModalVisibility(state = false) {
        this.stc.style.display = state ? "block" : "none";
    }
}
//#endregion
//#region Main

var Items = [];

products.forEach((item) => {
    Items.push(new Item(item.title, item.description, item.price));
});

modal = new Modal();

// !!! NAS, run this after adding items to the cart !!!
//let itemsInCart = Items.filter(item=>item.Cart.state==true);
//#endregion
