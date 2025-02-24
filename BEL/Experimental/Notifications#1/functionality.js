const CreateDomElement = (tag, css, text) => {
    let element = document.createElement(tag);
    element.className = css;
    if (text != undefined) element.innerHTML = text;
    return element;
};

class NotificationHandler {
    constructor() {
        this.listSTC = document.getElementById("notificationsContainer");
        this.types=["success", "danger", "normal"];
    }

    create(title, description, type="normal", time=5) {
        let notification = CreateDomElement("div", "notification");
        let nContainer = CreateDomElement("div", "notificationContainer");
        let nTitle = CreateDomElement("div", "notificationTitle", title);
        let nDescription = CreateDomElement("div", "notificationDescription", description);

        nTitle.classList.add(this.types.includes(type)?type:"normal");

        nContainer.appendChild(nTitle);
        nContainer.appendChild(nDescription);
        notification.appendChild(nContainer);
        this.listSTC.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, time * 1000);
    }
}

var MyNotifications = new NotificationHandler();

document.onkeydown = (e)=>{
    if(e.code=="Space"){
        MyNotifications.create("Why did you press it?", "Why on earth would you press it?? You have to stop doing what you are told!", "danger");
    }
}