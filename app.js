const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let tool = 'pencil'; // Default tool


canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Handle tool selection
document.getElementById('pencil').addEventListener('click', () => tool = 'pencil');
document.getElementById('pen').addEventListener('click', () => tool = 'pen');
document.getElementById('eraser').addEventListener('click', () => tool = 'eraser');
document.getElementById('text').addEventListener('click', () => tool = 'text');

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