class Food{
    constructor({parent, size=20, position={x:88,y:88}, color="#c9c9", isAlive=true}){
        this.parent  = parent;
        this.context = parent.context;
        this.size    = size;
        this.position = position;
        this.color   = color;
        this.isAlive = isAlive;

    }
    update(deltaTime = 0){}
    reset(position){
        this.isAlive=true;
        this.respawn(position);
    }
    respawn(position){
        if(this.parent.util.isNull(position))return;
        this.position = position;
        this.isAlive  = true;
    }
    draw(){
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.fillRect(this.position.x, this.position.y, this.size, this.size)
        this.context.closePath();
    }
}