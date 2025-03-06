const CreateDomElement = (tag, css, text) => {
    let element = document.createElement(tag);
    element.className = css;
    if (text != undefined) element.innerHTML = text;
    return element;
};

