

/**
 * Particle
 *
 * This class saves the configuration for a given
 * particle and exposes methods to update and draw it:
 * @methods:
 *      - follow
 *      - draw
 */
function Particle(scale, cols, rows) {

    /// Attribute

    // canvas scaled references
    this.cols = cols
    this.rows = rows
    this.scale = scale

    // vectors 
    this.position = createVector(random(width), random(height));
    this.previous = this.position.copy();
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.maximumSpeed = 4;


    /// Private

    /**
     * Follow
     *
     * Given an array of vectors, it look for the vector corresponding
     * to update the force and direction.
     */
    this.follow = function(vectors) {
        var x = floor(this.position.x / this.scale);
        var y = floor(this.position.y / this.scale);
        var index = x + y * this.cols;
        var force = vectors[index];

        this.applyForce(force);
    }

    /**
     * Draw
     *
     * Updates and draws the particle.
     * It wraps the partcile around the edges and limits
     * the particle velocity to avoid high speeds.
     */
    this.draw = function() {
        this.update();
        this.show();
    }

    /// Private

    this.update = function() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maximumSpeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
        this.wrapEdges();
    }


    this.applyForce = function(force) {
        this.acceleration.add(force);
    }

    this.show = function() {
        stroke(0, random(100, 255), 0, 5);
        strokeWeight(random(5));
        line(
            this.position.x, this.position.y,
            this.previous.x, this.previous.y,
        );
        this.updatePrevious();
    }

    this.wrapEdges = function() {
        if (this.position.x > width) {
            this.position.x = 0;
            this.updatePrevious();
        }
        if (this.position.x < 0) {
            this.position.x = width;
            this.updatePrevious();
        }
        if (this.position.y > height) {
            this.position.y = 0;
            this.updatePrevious();
        }
        if (this.position.y < 0) {
            this.position.y = height;
            this.updatePrevious();
        }
    }

    this.updatePrevious = function() {
        this.previous.x = this.position.x
        this.previous.y = this.position.y
    }
}
