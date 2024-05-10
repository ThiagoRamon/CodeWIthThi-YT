class Snake{
    constructor({parent=null, size=20,
                 position={x:88,y:88},color = "green", isAlive = true }){
        this.parent = parent;
        this.context = parent.context;
        this.size = size;
        this.isAlive = isAlive;
        this.body = [{x:position.x, y:position.y, size:this.size}]
        this.color = color;
        this.directionList = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
        this.direction = this.directionList[this.parent.util.getRandomNumber(0, this.directionList.length)]
    }
    update(deltaTime=0){
        this.setDirection(this.parent.parent.hotKey);
        this.eat();
        this.move();
    }
    setDirection(direction){
        console.log(direction);
        if(!this.directionList.includes(direction))return;
        this.direction = this.parent.keyDown;

    }
    draw(){
        this.context.fillStyle = this.color;
        this.body.forEach(part=>{

            this.context.beginPath();
            this.context.strokeRect(part.x, part.y, part.size, part.size);
            this.context.fillRect(part.x, part.y, part.size, part.size);
            this.context.closePath();
        });
    }
    move(){
        const head = {...this.body[0]};
        //console.log(this.keyDown);
        switch(this.direction){
            case "ArrowUp":
                if(head.y <= 0){
                    this.parent.setGameOver(true);
                    return;
                }
                head.y -= 20
                break;
            case "ArrowDown":
                if((head.y+head.size)>= this.context.canvas.height){
                    this.parent.setGameOver(true);
                    return;
                }
                head.y += 20
                break;
            case "ArrowLeft":
                if(head.x <= 0){
                    this.parent.setGameOver(true);
                    return;
                }
                head.x -= 20
                break;
            case "ArrowRight":
                if((head.x+head.size)>= this.context.canvas.width){
                    this.parent.setGameOver(true);
                    return;
                }
                head.x += 20
                break;
        }
        this.body.unshift(head);
        this.body.pop();
    }

    eat(){
        this.parent.gameObjectList.forEach(object=>{
            if(object.constructor.name != "Food")return;
            if(!object.isAlive)return;
            const head = this.body[0];
            if(!(head.x >= object.position.x &&
                head.x<=object.position.x))
                return false;
            if(!(head.y>=object.position.y &&
                head.y<=object.position.y))return

            object.isAlive = false;
            this.grow();
            return;
        });
    }
    grow(){
        const tail = {...this.body[this.body.length-1]}
        this.body.push(tail)
    }

    reset(position){
        this.direction = this.directionList[this.parent.util.getRandomNumber(0, this.directionList.length)];
        this.body = [{x:position.x, y:position.y, size:this.size}]
    }
}