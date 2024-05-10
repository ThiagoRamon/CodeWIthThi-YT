class Util{
    isNull(element){
            return element != null ? false : true;
    }
    hasOwnProperty(object = null, property = null){
        if(this.isNull(object)||this.isNull(property))return false;
        return object.__proto__.hasOwnProperty(property);
    }
    getRandomNumber(min, max){
        return Math.floor(Math.random() * (max - min) + min);
    }
    generatePosition(min, max, size =20){
        return {x:this.getRandomNumber(min, max)*size,
                y:this.getRandomNumber(min, max)*size};
    }
}

class GameEng{
    constructor(level = 1){
        this.isRunning     = true;
        this.frameRate     = level;
        this.lastFrameTime = 0;
        this.frameInterval = 1000/this.frameRate;
        this.currentTime   = 0;
        this.currentScene  = null;
        this.deltaTime     = 0;
        this.requestId     = 0;
        this.util = new Util();
        this.hotKey = "";
    }
    init(){
        this.handleUserInput();
        this.initCurrentScene();
        this.loop();
    }
    loop(){
        if(this.hotKey == "Enter" && this.currentScene.isGameOver()){
            if(!this.util.hasOwnProperty(this.currentScene,"reset"))return;
            this.currentScene.reset();

        }
        if(this.hotKey == "Enter" && this.currentScene.isPaused){
            this.currentScene.pause();

        }


        if(this.currentScene.isGameOver()){
            this.requestAnimation();
            return;
        }

        this.currentTime = performance.now();
        this.deltaTime = this.currentTime - this.lastFrameTime;
        if(!(this.deltaTime >= this.frameInterval)){
            this.requestAnimation();
            return;
        }
        this.lastFrameTime = this.currentTime - (this.deltaTime % this.frameInterval);
        this.update();
        this.render();
        this.requestAnimation();
    }
    update(){
       // console.log("hotkey = "+this.hotKey)
        //console.log("GameEng update")
        if(!this.hasCurrentScene()) return;
        this.currentScene.update();
        console.log(this.hotkey)
        this.hotKey =""
    }
    render(){
        //console.log("GameEng render")
        if(!this.hasCurrentScene()) return;
        this.currentScene.render();
    }
    requestAnimation(){
        this.requestId = window.requestAnimationFrame(()=>this.loop());
        window.cancelAnimationFrame(this.requestId-1)
    }
    initCurrentScene(){
        if(this.util.isNull(this.currentScene))return;
        if(!this.util.hasOwnProperty(this.currentScene,"init"))return;
        this.currentScene.init();
    }
    setCurrentScene(scene =  null){
        if(this.util.isNull(scene))return;
        this.currentScene = scene;
    }

    hasCurrentScene(){
        return this.currentScene==null ? false : true;
    }
    handleUserInput(){
        window.addEventListener("keydown", event=>{
            this.hotKey = event.key;
        });
    }
}