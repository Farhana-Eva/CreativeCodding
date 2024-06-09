var shapes = ['ellipse', 'rect', 'triangle']; // Different shapes to choose from
var rows = 10;
var cols = 10;
var tileSize = 60;
var noiseScale = 0.1;
var yOffset = 0;
var colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"]; // Array of 6 colors
var hoverColor = "#ffffff"; // Color for hover effect

function setup() {
    createCanvas(600, 600);
    noiseDetail(4); // Increase noise detail for smoother results
    drawPattern(); // Call the function to draw the pattern
}

function drawPattern() {
    background(255);
    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
            var x = c * tileSize;
            var y = r * tileSize;

            // Calculate noise value based on position
            var noiseVal = noise(c * noiseScale, r * noiseScale, yOffset);

            // Map noise value to select a color from the array
            var colorIndex = floor(map(noiseVal, 0, 1, 0, colors.length));
            var fillColor = colors[colorIndex];
            fill(fillColor);

            // Randomly choose a shape from the shapes array
            var selectedShape = shapes[floor(random(shapes.length))];

            // Draw different shapes based on the randomly selected shape
            switch (selectedShape) {
                case 'ellipse':
                    ellipse(x + tileSize / 2, y + tileSize / 2, tileSize * noiseVal, tileSize * noiseVal);
                    break;
                case 'rect':
                    rect(x, y, tileSize * noiseVal, tileSize * noiseVal);
                    break;
                case 'triangle':
                    // Draw triangle with vertices based on position and noise value
                    var noiseMapped = map(noiseVal, 0, 1, 0, tileSize);
                    triangle(x, y + tileSize, x + tileSize, y + tileSize, x + tileSize / 2, y + tileSize - noiseMapped);
                    break;
                // Add more cases for different shapes if desired
            }

            // Check if the mouse is hovering over the current shape
            if (mouseX > x && mouseX < x + tileSize && mouseY > y && mouseY < y + tileSize) {
                // If hovered, change the color
                fill(hoverColor);
                switch (selectedShape) {
                    case 'ellipse':
                        ellipse(x + tileSize / 2, y + tileSize / 2, tileSize * noiseVal, tileSize * noiseVal);
                        break;
                    case 'rect':
                        rect(x, y, tileSize * noiseVal, tileSize * noiseVal);
                        break;
                    case 'triangle':
                        // Draw triangle with vertices based on position and switch (selectedShape) {
    case 'ellipse':
        ellipse(x + tileSize / 2, y + tileSize / 2, tileSize * noiseVal, tileSize * noiseVal);
        break;
    case 'rect':
        rect(x, y, tileSize * noiseVal, tileSize * noiseVal);
        break;
    case 'triangle':
        // Draw triangle with vertices based on position and noise value
        var noiseMapped = map(noiseVal, 0, 1, 0, tileSize);
        // Calculate vertices of the triangle
        var x1 = x;
        var y1 = y + tileSize;
        var x2 = x + tileSize;
        var y2 = y + tileSize;
        var x3 = x + tileSize / 2;
        var y3 = y + tileSize - noiseMapped;
        triangle(x1, y1, x2, y2, x3, y3);
        break;
    // Add more cases for different shapes if desired
                }

            }
        }
    }
}

// This function is called when the mouse is clicked to regenerate the pattern
function mouseClicked() {
    yOffset = random(1000); // Change the yOffset to create a different pattern
    drawPattern(); // Redraw the pattern
}
