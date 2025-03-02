const CreateDomElement = (tag, css, text) => {
    let element = document.createElement(tag);
    element.className = css;
    if (text != undefined) element.innerHTML = text;
    return element;
};

data = [
    { url: "photos/beach.jpg" },
    { url: "photos/deers.jpg" },
    { url: "photos/doggy.jpg" },
    { url: "photos/womanandcat.jpg" },
    { url: "photos/man.jpg" },
    { url: "photos/woman.jpg" },
];

class ImageItem {
    constructor(obj) {
        this.url = obj.url;         // image url
        this.stc = this.create();   // dom element
    }

    create() {
        let item = CreateDomElement("div", "item");
        let imagesButtonList = document.getElementById("imagesButtonList");
        imagesButtonList.appendChild(item);
        return item;
    }
}

class ImageGallery {
    constructor() {
        this.image = document.getElementById("image");  // image dom
        this.buttons = this.createButtons();            // images buttons
        this.currentIndex = 0;                          // current image index

        this.updateImage();                 // image 
        this.attachEventListeners();        // events setup
    }

    // Create and return image items for each item of data
    createButtons() {
        return data.map((item) => new ImageItem(item));
    }

    // event listeners setup
    attachEventListeners() {
        document.getElementById("nextImage").addEventListener("click", () => this.nextImage());         // Next image button event
        document.getElementById("previousImage").addEventListener("click", () => this.previousImage()); // Previous image button event

        // buttons click event, to update to the selected image
        this.buttons.forEach((item, index) => {
            item.stc.addEventListener("click", () => {
                this.buttons[this.currentIndex].stc.classList.remove("selected");
                this.currentIndex = index;
                this.updateImage();
            });
        });
    }

    // Change image src to the selected image
    updateImage() {
        this.buttons[this.currentIndex].stc.classList.add("selected");
        this.image.src = this.buttons[this.currentIndex].url;
    }

    // Go to next image, and back at the start
    nextImage() {
        this.buttons[this.currentIndex].stc.classList.remove("selected");
        this.currentIndex = this.currentIndex + 1 < this.buttons.length ? this.currentIndex += 1 : 0;
        this.updateImage();
    }

    // Go to previous image, and back at the end
    previousImage() {
        this.buttons[this.currentIndex].stc.classList.remove("selected");
        this.currentIndex = this.currentIndex - 1 > 0 ? this.currentIndex -= 1 : this.buttons.length-1;
        this.updateImage();
    }
}
 
gallery = new ImageGallery();
