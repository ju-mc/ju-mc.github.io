document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    var drawing = false;
    var oldMousePos = null;

    // Function to get mouse position relative to the canvas
    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    // Function to draw a line between two points
    function drawLine(ctx, startPos, endPos) {
        ctx.beginPath();
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(endPos.x, endPos.y);
        ctx.strokeStyle = 'white'; // Change color as needed
        ctx.lineWidth = 5;         // Change line width as needed
        ctx.stroke();
    }

    // Mouse event handlers
    canvas.addEventListener('mousedown', function(e) {
        drawing = true;
        oldMousePos = getMousePos(canvas, e);
    });

    canvas.addEventListener('mouseup', function(e) {
        drawing = false;
        oldMousePos = null;
    });

    canvas.addEventListener('mousemove', function(e) {
        if (drawing && oldMousePos) {
            var mousePos = getMousePos(canvas, e);
            drawLine(ctx, oldMousePos, mousePos);
            oldMousePos = mousePos;
        }
    });

    // 'Done' button event handler
    document.getElementById('doneButton').addEventListener('click', function() {
        saveCanvas();
    });

    // Function to save the canvas content
    function saveCanvas() {
        var imageData = canvas.toDataURL('image/png');

        // Sending the image data to the server
        fetch('/process-drawing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image: imageData })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Process the response here, e.g., display the generated text
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});
