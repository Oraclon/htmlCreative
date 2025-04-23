const canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let start_background = "black";

const canvasoffsetx = canvas.offsetLeft;
const canvasoffsety = canvas.offsetTop;

//canvas.width = window.innerWidth - canvasoffsetx;
//canvas.height = window.innerHeight - canvasoffsety;
canvas.width = 800;
canvas.height = 800;

context.fillStyle = start_background;
context.fillRect(0,0, canvas.width, canvas.height);
//context.filter = "grayscale(100%)";

let draw_color = "white";
let draw_width = "2";
let is_drawing = false;

let restore_array = [];
let index = -1;

document.onkeydown = (e)=>{
    if(e.keyCode == 90 && e.ctrlKey)
        undo_last()
}

canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);

canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);

function change_color(element)
{
    draw_color = element.style.background;
    console.log(element.style.background)
}

function start(event){
    is_drawing=true;
    context.beginPath();
    context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    event.preventDefault();
}

function draw(event){

    if(is_drawing){
        context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
        context.strokeStyle = draw_color;
        context.lineWidth = draw_width;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.stroke();
    }
    event.preventDefault();
}

function stop(event)
{
    if(is_drawing)
    {
        context.stroke();
        context.closePath();
        is_drawing = false;
    }
    event.preventDefault();
    if(event.type != "mouseout"){
        restore_array.push(context.getImageData(0,0, canvas.width, canvas.height));
        index++;
        console.log(restore_array)
    }
}

function clearCanvas()
{
    context.fillStyle = start_background;
    context.clearRect(0,0, canvas.width, canvas.height);
    context.fillRect(0,0, canvas.width, canvas.height);
    restore_array = [];
    index = -1;
}
function undo_last()
{
    if(index <= 0)
        clearCanvas();
    else
    {
        index --;
        restore_array.pop();
        context.putImageData(restore_array[index],0,0);
    }
}
function doSomething()
{
    const dataurl = canvas.toDataURL("img/png");
    debugger
}
