const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let tool = 'pencil'; // Default tool
let nc = false; //noClick boolean


canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Handle tool selection
document.getElementById('noClick').addEventListener('click', noClick);
document.getElementById('pencil').addEventListener('click', () => tool = 'pencil');
document.getElementById('pen').addEventListener('click', () => tool = 'pen');
document.getElementById('eraser').addEventListener('click', () => tool = 'eraser');
document.getElementById('text').addEventListener('click', () => tool = 'text');
document.getElementById('save').addEventListener('click', saveCanvas);
document.getElementById('load').addEventListener('change', loadCanvas);

function noClick(e){
    console.log("called");
    nc = !nc;
    if(nc){
        console.log("nc true");
        canvas.removeEventListener('mousedown', startDrawing);
        canvas.addEventListener('mouseup', stopDrawing);
        document.addEventListener('keydown', shiftPressed);
        document.addEventListener('keyup', shiftReleased);
    }
    else{
        console.log("nc false");
        canvas.removeEventListener('mousedown', startDrawing);
        canvas.addEventListener('mouseup', stopDrawing);
        document.removeEventListener('keydown', shiftPressed);
        document.removeEventListener('keyup', shiftReleased);
    }
}



function shiftPressed(e) {
    if (e.key === 'Shift') {
        startDrawing(e);
    }
};

function shiftReleased(e) {
    if (e.key === 'Shift') {
        stopDrawing(e);
    }
};

// Start drawing
function startDrawing(e){
    if (tool === 'text') {
        const text = prompt('Enter text: ');
        if (text) {
            ctx.font = '16px Arial';
            ctx.fillText(text, e.offsetX, e.offsetY);
        }
        return;
    }
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
}

// Drawing on canvas
function draw(e) {
    if(!isDrawing) return; 

    if(tool === 'eraser') {
        ctx.strokeStyle = '#ffffff'; // Eraser color (white)
        ctx.lineWidth = 20;
    } else if(tool === 'pen') {
        ctx.strokeStyle = '#0000ff'; // Pen color (blue)
        ctx.lineWidth = 3;
    } else {
        ctx.strokeStyle = '#000000'; // Pencil color (black)
        ctx.lineWidth = 1;
    }


    ctx.lineTo(e.offsetX, e.offsetY); 
    ctx.stroke();
}

// Stop drawing
function stopDrawing() {
    if (!isDrawing) return;
    isDrawing = false;
    ctx.closePath();
}

// Save the current canvas content
function saveCanvas() {
    const dataURL = canvas.toDataURL('image/png'); // Base64-encoded PNG image
    const link = document.createElement('a'); // <a> link
    link.href = dataURL;
    link.download = 'canvas-drawing.png'; // File name
    link.click();
}

// Load an image into the canvas
function loadCanvas(event) {
    const file = event.target.files[0];
    if (!file) return;

    const img = new Image();
    const reader = new FileReader();

    // Once file is read, set the image source
    reader.onload = function(e) {
        img.src = e.target.result;
        img.onload = function() {
            // Clear the canvas and draw the loaded image
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas. height);
        }
    };
    reader.readAsDataURL(file);
}
