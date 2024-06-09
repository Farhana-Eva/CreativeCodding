var data; // a reference to all the data from the file
var dates = []; // an array of all the "date" values
var texts = []; // an array of all the "text" values
var temps = []; // an array of all the "high" values
var tempColor; // the color of the bars

function preload() {
    // Load the JSON file
    data = loadJSON('dubai-weather.json');
  
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    
    // Parse and filter the data
    var forecastArray = data.query.results.channel.item.forecast;
    for (var i = 0; i < forecastArray.length; i++) {
        dates[i] = forecastArray[i].date;
        texts[i] = forecastArray[i].text;
        temps[i] = parseInt(forecastArray[i].high); // Convert to integer
    }
}

function draw() {
    background(245);
    textAlign(LEFT, TOP);
    textSize(30);

    // Draw title text
    fill(0); // Adjust color as needed
    text("UAE Weather(Jun) 2024", width / 4, 70);

    // iterate over all three arrays and display the values
    for (var i = 0; i < dates.length; i++) {
        var y = 100 + i * 50;

        push();
        translate(50, y);
        // display the dates
        fill(0);
        text(dates[i], 0, 0);

        // map the temperature data to the color of the bars
        var colorVal = map(temps[i], min(temps), max(temps), 10, 255);
        // the higher the temperature, the warmer the color is
        tempColor = color(colorVal, 100, 255 - colorVal);
        fill(tempColor);

        // map the temperature data to the length of the bars
        var barLength = map(temps[i], min(temps), max(temps), 350, 500);
        rect(200, 0, barLength, 35);

        // display the condition and the temperature info
        fill(255);
        text(texts[i], 200, 0);
        // place the temperature number at the end of the bar
        text(temps[i], 200 + barLength - 40, 0);
        pop();
    }
}
