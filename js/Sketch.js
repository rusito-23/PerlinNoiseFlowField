
/* Constants */

// soft gray
let backgroundColor = 50;

// flow field
let flowField;


/* P5JS Callbacks */


function setup() {
    // ensure reproducibility
    randomSeed(69);
    noiseSeed(69);

    // setup canvas
    let canvas = createCanvas(1000, 800);
    canvas.parent('sketch-holder');

    // retina displays
    pixelDensity(1);

    // setup background
    background(25);

    // setup flow field
    flowField = new FlowField();
    flowField.setup();
}


function draw() {
    flowField.draw();
}
