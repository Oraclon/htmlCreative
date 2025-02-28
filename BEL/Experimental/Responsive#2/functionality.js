data =[
    {
        username: "John Doe",
        description: "Full Stack Developer",
        status: true,
        messages:[
            {type:false , message:"Hey there! How's it going?"},
            {type:true  , message:"Hey! I'm doing great, how about you?"},
            {type:false , message:"Not too bad, just a bit busy with work."},
            {type:true  , message:"I totally get that. Work has been hectic for me too."},
            {type:false , message:"Yeah, deadlines are killing me!"},
            {type:true  , message:"Same here. Need a break soon!"},
            {type:false , message:"Absolutely! Maybe we should plan a weekend trip?"},
            {type:true  , message:"That sounds amazing! Where do you have in mind?"},
            {type:false , message:"Maybe somewhere with a beach?"},
            {type:true  , message:"Perfect! Let's look into it."}
        ]
    },
    {
        username: "Jane Doe",
        description: "UX/UI Developer",
        status: false,
        messages:[
            {type:false , message:"Hey, do you have a moment to talk?"},
            {type:true  , message:"Sure, what's up?"},
            {type:false , message:"I need some advice on coding."},
            {type:true  , message:"Of course! What do you need help with?"},
            {type:false , message:"I'm struggling with JavaScript promises."},
            {type:true  , message:"Ah, async programming can be tricky!"},
            {type:false , message:"Yeah, any simple explanation?"},
            {type:true  , message:"Think of a promise as a placeholder for future data."},
            {type:false , message:"That actually makes sense!"},
            {type:true  , message:"Glad to help!"}
        ]
    },
    {
        username: "Lorem Ipsum",
        description: "Lorem Developer",
        status: false,
        messages:[
            {type:false , message:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique architecto explicabo facilis culpa id dolore vero porro, tenetur distinctio, voluptates eligendi dolores vel autem tempore esse? Numquam saepe excepturi dolor?"},
            {type:true  , message:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas ipsa praesentium quam excepturi. Hic soluta fugit doloribus impedit totam? Possimus aperiam, fugiat quia animi nihil aliquam! Esse unde illum fuga?"},
            {type:false , message:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, veniam dicta excepturi dolores dolor natus ullam vero odit non aliquam nisi ab, id porro molestiae distinctio ad dignissimos ducimus placeat."},
            {type:true  , message:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quasi nesciunt eum saepe ratione accusamus nemo quas esse excepturi qui blanditiis, accusantium magni molestias molestiae, numquam voluptatem cumque eius voluptates."},
            {type:false , message:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique architecto explicabo facilis culpa id dolore vero porro, tenetur distinctio, voluptates eligendi dolores vel autem tempore esse? Numquam saepe excepturi dolor?"},
            {type:true  , message:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas ipsa praesentium quam excepturi. Hic soluta fugit doloribus impedit totam? Possimus aperiam, fugiat quia animi nihil aliquam! Esse unde illum fuga?"},
            {type:false , message:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, veniam dicta excepturi dolores dolor natus ullam vero odit non aliquam nisi ab, id porro molestiae distinctio ad dignissimos ducimus placeat."},
            {type:true  , message:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quasi nesciunt eum saepe ratione accusamus nemo quas esse excepturi qui blanditiis, accusantium magni molestias molestiae, numquam voluptatem cumque eius voluptates."},
        ]
    },
    {
        username: "Dolor Sit",
        description: "Empty Developer",
        status: false,
        messages:[
        ]
    }
]

const CreateDomElement = (tag, css, text) => {
    let element = document.createElement(tag);
    element.className = css;
    if (text != undefined) element.innerHTML = text;
    return element;
};

class Chat{
    constructor(obj){
        this.data = obj;
        this.stc = this.createChat(this.data);
        this.addChatToList();
    }

    createChat(obj){
        let chat = CreateDomElement("div", "chat");
        let chatImage = CreateDomElement("div","chatImage",`<i class="fa-solid fa-image"></i>`);
        let chatSub = CreateDomElement("div","chatSub");
        let userName = CreateDomElement("div","userName", obj.username);
        let userDescription = CreateDomElement("div","userDescription", obj.description);

        chatSub.appendChild(userName);
        chatSub.appendChild(userDescription);
        chat.appendChild(chatImage);
        chat.appendChild(chatSub);

        chat.addEventListener("click", ()=>{
            this.loadChat();
        });

        return chat;
    }

    addChatToList(){
        document.getElementById("listContainer").appendChild(this.stc);
    }

    loadChat(){
        // document.getElementById("contextContainer").style="display:block !important;";
        // document.getElementById("listContainer").style="display:none !important;";
        
        document.getElementById("userIcon").innerHTML= `<i class="fa-solid fa-image"></i>`
        document.getElementById("userName").innerHTML= this.data.username;
        document.getElementById("userStatus").classList = `userStatus  ${this.data.status?"online":"offline"}`
        document.getElementById("userStatus").innerHTML = this.data.status?"online":"offline";
        
        let messagesContainer = document.getElementById("messagesContainer");
        while(messagesContainer.firstChild)
            messagesContainer.removeChild(messagesContainer.firstChild);

        if(this.data.messages.length > 0){
            this.data.messages.forEach(x=>{
                let message = CreateDomElement("div",x.type?"messageSender":"messageRecepient", x.message);
                messagesContainer.appendChild(message);
            });
        }else{
            let empty = CreateDomElement("div", "messagesEmpty", "There are no messages yet!")
            messagesContainer.appendChild(empty);
        }
        
    }
}

// document.getElementById("closeChat").addEventListener("click", ()=>{
//     document.getElementById("contextContainer").style="display:none !important;";
//         document.getElementById("listContainer").style="display:flex !important;";
// })

var chatList = [];

data.forEach(e => {
    var temp = new Chat(e); 
    chatList.push(temp);
});

