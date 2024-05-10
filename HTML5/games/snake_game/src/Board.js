class Board{
    constructor({parent=null, grid= {cols:20, rows:20}, strokeColor = "#fff", isAlive=true}){
        this.parent = parent;
        this.context =parent.context;
        this.grid = grid;
        this.isAlive = isAlive;
        this.strokeColor = strokeColor;
    }
    draw(){

        this.context.strokeStyle = this.strokeColor;
        this.context.lineWidth = .1
        this.drawRows(this.context.canvas.width)
        this.drawCols(this.context.canvas.height)
        this.drawGameOverPopUp();
        this.drawGameStartPopUp();
    }

    drawRows(canvasWidth){

        for(let i = 0; i< this.grid.rows; i++){
            this.context.beginPath();
            this.context.moveTo(i * this.grid.rows,0);
            this.context.lineTo(i * this.grid.rows,canvasWidth);
            this.context.stroke();
        }

    }

    drawCols(canvasHeight){

        for(let i = 0; i< this.grid.rows; i++){
            this.context.beginPath();
            this.context.moveTo(0,i * this.grid.cols);
            this.context.lineTo(canvasHeight,i * this.grid.cols);
            this.context.stroke();
        }

    }

    drawGameOverPopUp(){
        if(!this.parent.gameOver)return;
        let width = 200;
        let height = 100;
        let x = (this.context.canvas.width/2-width/2);
        let y = (this.context.canvas.height/2-height/2);
        this.context.beginPath();
        this.context.fillStyle = "red";
        this.context.fillRect(x,y,width,height);
        //this.context.closePath();

        this.context.font ="1rem arial";
        let title = "GAME OVER";
        let measureText = this.context.measureText(title);
        let titleHeight = measureText.actualBoundingBoxAscent + measureText.actualBoundingBoxDescent;

        this.context.fillStyle = "#fff";
        this.context.fillText(title, (x-(measureText.width/2))+width/2, (y+(titleHeight/2)+height/2));


        //this.context.font =".7rem arial";
        title = "press ENTER to Restart";
        measureText = this.context.measureText(title);
        titleHeight = measureText.actualBoundingBoxAscent + measureText.actualBoundingBoxDescent;

        this.context.fillStyle = "#fff";
        this.context.fillText(title, (x-(measureText.width/2))+width/2, 20+(y+(titleHeight/2)+height/2));
        this.context.closePath()
    }

    drawGameStartPopUp(){
        if(!this.parent.isPaused)return;
        let width = 200;
        let height = 100;
        let x = (this.context.canvas.width/2-width/2);
        let y = (this.context.canvas.height/2-height/2);
        this.context.beginPath();
        this.context.fillStyle = "red";
        this.context.fillRect(x,y,width,height);
        //this.context.closePath();

        this.context.font ="1rem arial";
        let title = "PRESS ENTER TO START";
        let measureText = this.context.measureText(title);
        let titleHeight = measureText.actualBoundingBoxAscent + measureText.actualBoundingBoxDescent;

        this.context.fillStyle = "#fff";
        this.context.fillText(title, (x-(measureText.width/2))+width/2, (y+(titleHeight/2)+height/2));

    }
}