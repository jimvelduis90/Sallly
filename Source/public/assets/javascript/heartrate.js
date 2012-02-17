function HeartRate(options) {
    this.context          = options && options.context || false;
    this.maxFPS           = 100;
    this.path             = options && options.path || "./heartrate";
    this.frameRate        = 0;
    this.frameCount       = 0;
    this.lineCount        = 0;
    this.drawCount        = 0;
    this.framesPerSecond  = 0;
    this.timeline         = new Array(32);
    this.lastUpdate       = (new Date()).getTime() / 1000;
    this.updated          = false;
    
    if (this.context) {
        // Background template
        this.bgImage        = new Image(), this.bgImage.src = "/assets/images/bg.png";
        
        // Timeline..
        this.timeline[0] = 50;
        this.timeline[1] = 50;
        this.timeline[2] = 50;
        this.timeline[3] = 50;
        this.timeline[4] = 50;
        this.timeline[5] = 45;
        this.timeline[6] = 60;
        this.timeline[7] = 35;
        this.timeline[8] = 100;
        this.timeline[9] = 0;
        this.timeline[10] = 50;
        this.timeline[11] = 50;
        this.timeline[12] = 50;
        this.timeline[13] = 50;
        this.timeline[14] = 50;
        this.timeline[15] = 45;
        this.timeline[16] = 60;
        this.timeline[17] = 35;
        this.timeline[18] = 100;
        this.timeline[19] = 0;
        this.timeline[20] = 50;
        this.timeline[21] = 50;
        this.timeline[22] = 50;
        this.timeline[23] = 50;
        this.timeline[24] = 50;
        this.timeline[25] = 50;
        this.timeline[26] = 50;
        this.timeline[27] = 50;
        this.timeline[28] = 50;
        this.timeline[29] = 50;
        this.timeline[30] = 50;
        this.timeline[31] = 50;
        
        // Sprite strip
        this.sprites        = new Image();
        this.sprites.src    = this.path + "/assets/images/spritestrip.png";
        this.spriteCount    = 61;
        this.spriteWidth    = 20;
        this.spriteHeight   = 18;
        this.spritesReady   = false;
        
        this.sprites.onload = (function(heartRate) {
                               return function() { heartRate.spritesReady = true; };
                               }(this));
        
        // Text color
        this.textColor      = "rgba(100, 64, 64, 1)";
        
        // Graph plot color
        this.plotColor     = "rgba(200, 64, 80, 1)";
    }
}

HeartRate.prototype.calculate = function() {    
    this.frameCount++;
    this.lineCount = this.frameCount % 32;
};

// This method calculates FPS and Renders the monitor
HeartRate.prototype.monitor = function() {
    // only calculate if calculate has not already been called somewhere else
    this.calculate();
    
    var ctx = this.context;
    
    if (ctx && this.spritesReady) {
        var plotScale = 4;
        var spriteWidth = this.spriteWidth;
        var spriteHeight = this.spriteHeight;
        
        ctx.save();
        ctx.translate(0, 0);
        
        // Background
        ctx.drawImage(this.bgImage, 0, 0);
        ctx.drawImage(this.sprites, (this.frameCount % this.spriteCount) * spriteWidth, 0, spriteWidth, spriteHeight, 9, 6, spriteWidth, spriteHeight);
        
        // Line graph
        ctx.strokeStyle = this.plotColor;
        
        for (var i = 0, len = this.lineCount; i < len; i++) {
            var plot1 = 25 - this.timeline[i] / 100 * 20, 
            plot2 = 25 - this.timeline[i+1] / 100 * 20;
            
            if (!isNaN(plot1)) { 
                ctx.beginPath();
                ctx.moveTo(i * plotScale + 35, plot1);
                ctx.lineTo((i+1) * plotScale + 35, plot2);
                ctx.stroke();
                ctx.closePath();
            }
        }
        ctx.restore();
    }
};