const createDomElement = (type, style = null)=>{
            let item = document.createElement(type);
            if(style != null)
            {
                let classItems = style.split(",");
                for(let x = 0; x < classItems.length; x++)
                    item.classList.add(classItems[x]);
            }
            return item;
        }

        const createPropItem = ()=>{
            let propItem = createDomElement("div","propItem");

            //#region [Image]
            let img = createDomElement("img");
            img.src = "./img.jpg";
            propItem.appendChild(img);
            //#endregion

            //#region [Overlay]
            let overlay = createDomElement("div", "overlay");
            //#region [HEADER]
            let header = createDomElement("div","overow,header");
            let title = createDomElement("div", "title");
            
            let propName = createDomElement("div","propertyName");
            propName.innerHTML = "This is a prop name."
            title.appendChild(propName);
            let propLocation = createDomElement("div", "propertyLocation");
            propLocation.innerHTML = "This is a location."
            title.appendChild(propLocation);

            header.appendChild(title);

            let favourite = createDomElement("div", "favourite");
            favourite.innerHTML = "v";
            header.appendChild(favourite);

            overlay.appendChild(header);
            //#endregion
            //#region [CONTROLS]
            let controls = createDomElement("div", "overow,slidecontrol");
            [...Array(2).keys()].map(x=>{ let control = createDomElement("div", "control");
                control.innerHTML = 'a';
                controls.appendChild(control);
                });
            overlay.appendChild(controls);
            //#endregion
            //#region [PRICE]
            let price = createDomElement("div", "overow,price");
            price.innerHTML = 400;
            overlay.appendChild(price);
            //#endregion
            //#region [CONTROLS]
            let items = createDomElement("div","overow,items");
            [...Array(4).keys()].map(x=>{
                let cont = createDomElement("div");
                cont.innerHTML = "s";
                items.appendChild(cont);
            });
            overlay.appendChild(items);
            //#endregion

            propItem.appendChild(overlay);
            //#endregion

            return propItem;
        }
        let cont = document.getElementById("container");
        let totalItems = 16;
        for(let x = 0; x < totalItems; x++)
            cont.appendChild(createPropItem())
