
export class ToolManager{
    constructor(){
        this.currentTool = null;
        this.toolList = [];
        this.strokeColor = "red";
        this.strokeSize = 8;
    }

    addTool(tool){
        this.toolList.push(tool);
    }
    setCurrentTool(tool){
        this.currentTool = tool;
    }
}