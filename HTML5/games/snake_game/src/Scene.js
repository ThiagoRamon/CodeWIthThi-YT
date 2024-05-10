class Scene{
    constructor({isPaused = true, parent, id="default", width=400,  height=400, background="#000", isAlive=false}){//parent, id="default", width = 400, height= 400, background = "#000"){
        this.parent        = parent;
        this.canvas        = document.createElement("canvas");
        this.canvas.id     = id;
        this.canvas.width  = width;
        this.canvas.height = height;
        this.canvas.style.background = background;
        this.isPaused      = isPaused;
        this.isCurrentScene= isAlive;
        this.context       = this.canvas.getContext("2d");
        this.gameObjectList= [];
        this.util = new Util();
        this.gameOver = false;
        this.keyDown = ""
    }
    init(){
        if(!this.isCurrentScene)return;
        document.body.prepend(this.canvas);
    }
    update(){
        this.keyDown =  this.parent.hotKey;
        if(this.isPaused){
            this.clearCanvas();
            return
        }

        this.gameObjectList.forEach(object=>{
            if(!object.isAlive && this.util.hasOwnProperty(object,"respawn"))
                object.respawn(this.util.generatePosition(0,20))
            if(!object.isAlive)return;
            if(!this.util.hasOwnProperty(object,"update"))return
            object.update(this.parent.deltaTime);
        });

        this.clearCanvas();

    }
    render(){
        this.gameObjectList.forEach(object=>{
            if(!object.isAlive)return;
            if(!this.util.hasOwnProperty(object, "draw"))return;
            object.draw()
        });
    }
    addGameObjectList(object = null){
        if(this.util.isNull(object))return;
        this.gameObjectList.push(object)
    }
    clearCanvas(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    pause(){
        this.isPaused = this.isPaused ? false : true;
    }
    isGameOver(){
        return this.gameOver;
    }
    setGameOver(gameOver){
        this.gameOver = gameOver;
    }
    reset(){

        this.setGameOver(false);
        console.log(this.gameOver)
         this.gameObjectList.forEach(object=>{
            if(!object.isAlive)return;
            if(!this.util.hasOwnProperty(object, "reset"))return;
            let min = 0;
            let max = 20
            if(object.constructor.name == "Snake"){
                min = 5;
                max = 10;
            }
            object.reset(this.util.generatePosition(min,max))
        });
    }
}