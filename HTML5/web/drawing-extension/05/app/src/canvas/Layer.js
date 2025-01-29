export class Layer{
    constructor({id = 0, width=100, height=100, backgroundColor = "rgba(0, 0, 0, 0.2)"}={}){
        this.id = id;
        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.width = width+"px";
        this.canvas.style.height = height+"px";//"100vh";
        this.canvas.style.backgroundColor = backgroundColor;
        this.canvas.style.position = "absolute";
        this.canvas.style.userSelect = "none";

        this.canvas.style.top = 0;
        this.canvas.style.left = 0;
        this.context = this.canvas.getContext("2d");

    }
    getCanvas(){
        return this.canvas;
    }
    getContext(){
        return this.context;
    }
}
