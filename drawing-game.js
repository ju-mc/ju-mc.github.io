document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    var drawing = false;
    var oldMousePos = null;

    canvas.addEventListener('mousedown', function(e) {
        drawing = true;
        oldMousePos = getMousePos(canvas, e);
    });

    canvas.addEventListener('mouseup', function(e) {
        drawing = false;
        oldMousePos = null;
    });

    canvas.addEventListener('mousemove', function(e) {
        if (drawing) {
            var mousePos = getMousePos(canvas, e);
            if (oldMousePos) {
                drawLine(ctx, oldMousePos, mousePos);
            }
            oldMousePos = mousePos;
        }
    });

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    function drawLine(ctx, startPos, endPos) {
        ctx.beginPath();
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(endPos.x, endPos.y);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 5;
        ctx.stroke();
    }

    function drawCharacter(x, y, design, colors) {
        var pixelSize = 5;
        for (var row = 0; row < design.length; row++) {
            for (var col = 0; col < design[row].length; col++) {
                var colorIndex = design[row][col];
                if (colorIndex !== 0) {
                    ctx.fillStyle = colors[colorIndex];
                    ctx.fillRect(x + col * pixelSize, y + row * pixelSize, pixelSize, pixelSize);
                }
            }
        }
    }

    var girlDesign = [
        [0, 0, 3, 3, 3, 3, 3, 3, 0, 0],
        [0, 3, 2, 2, 2, 2, 2, 2, 3, 0],
        [3, 2, 6, 5, 5, 5, 5, 6, 2, 3],
        [3, 2, 5, 2, 2, 2, 2, 5, 2, 3],
        [3, 2, 2, 2, 2, 2, 2, 2, 2, 3],
        [3, 4, 4, 4, 1, 1, 4, 4, 4, 3],
        [0, 4, 4, 1, 1, 1, 1, 4, 4, 0],
        [0, 4, 4, 1, 1, 1, 1, 4, 4, 0],
        [0, 0, 4, 4, 4, 4, 4, 4, 0, 0],
        [0, 0, 6, 6, 0, 0, 6, 6, 0, 0],  
    ];

    var colors = ['#FFFFFF', '#000000', '#FFe0bd', '#663300', '#0000FF', '#FFB6C1', '#808080'];
    drawCharacter(800, 500, girlDesign, colors);


    document.getElementById('doneButton').addEventListener('click', function() {
        console.log("Done button clicked");
        saveCanvas();
    });
    
    function displayCaption(caption) {
        var captionContainer = document.getElementById('caption-container');
        captionContainer.textContent = caption; // display the caption/interpretation
    }

    function saveCanvas() {
        var canvas = document.getElementById('myCanvas');
        // convert the canvas drawing to a data URL (base64 encoded PNG image)
        var imageData = canvas.toDataURL('image/png');
    
        // send 'imageData' to server for processing
        fetch('/process-drawing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image: imageData })
        })
        .then(response => response.json())
        .then(data => {
            displayCaption(data.description);
            console.log(data);
        });
    
    }
    

});



