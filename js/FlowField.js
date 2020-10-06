

/**
 * FlowField
 *
 * This class configures and uses particles to
 * draw a flow field.
 * @methods:
 *      - setup
 *      - draw
 */
function FlowField() {

    /// Properties

    this.scale = 10;
    this.increment = 0.1;
    this.zincrement = 0.0003;
    this.magnitude = 1;
    this.particlesLenght = 500;

    // canvas scaled references
    this.cols = floor(width / this.scale);
    this.rows = floor(height / this.scale);

    // particles
    this.particles = new Array(200);

    // vectors
    this.vectors = new Array(this.cols * this.rows);

    // z axis offset
    this.zoff = 0;

    /// Public

    /**
     * Setup
     *
     * This method must be called when setting
     * up the canvas, initalizes the particles
     * and different fields.
     */
    this.setup = function() {
        // initalizes the particles in random positions
        for(var i = 0; i < this.particles.length; i++) {
            this.particles[i] = new Particle(
                this.scale, 
                this.cols,
                this.rows
            );
        }
    }


    /**
     * Draw
     *
     * This method draws the flow field over
     * the canvas by drawing the particles 
     * to follow the flow field vectors.
     */
    this.draw = function() {
        // update all vectors with noisy angles
        for(var y = 0, yoff = 0; y < this.rows; y++, yoff += this.increment) {
            for(var x = 0, xoff = 0; x < this.cols; x++, xoff += this.increment) {
                // create vector from angle
                let angle = noise(xoff, yoff, this.zoff) * TWO_PI * 4;
                let vector = p5.Vector.fromAngle(angle);
                vector.setMag(this.magnitude);

                // store vector
                let index = x + y * this.cols;
                this.vectors[index] = vector;
            }
            this.zoff += this.zincrement;
        }

        // draw all particles
        for(var p = 0; p < this.particles.length; p++) {
            this.particles[p].follow(this.vectors);
            this.particles[p].draw();
        }
    }

}
