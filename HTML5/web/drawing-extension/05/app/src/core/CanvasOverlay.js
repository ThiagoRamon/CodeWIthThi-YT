import {LayerManager} from "./LayerManager.js";
import {ToolManager} from "./ToolManager.js";
import {ActionManager} from "./ActionManager.js";

export class CanvasOverlay{
    constructor(){
        this.layerManager = new LayerManager();
        this.toolManager = new ToolManager();
        this.actionManager = new ActionManager();
    }
    init(){

    }
    getCurrentCanvas(){
        return this.layerManager.currentLayer.getCanvas();
    }

}

