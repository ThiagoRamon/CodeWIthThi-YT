import {CanvasOverlay} from "./CanvasOverlay.js";
import {Layer} from "../canvas/Layer.js";
import {Pencil} from "../tool/Pencil.js";

export class App{
    constructor(){
      this.canvasOverlay = new CanvasOverlay();
        this.canvas = null;
        this.init();

    }
    init(){
        //this.canvasOverlay.init();
        this.startLayer();
        this.canvas = this.canvasOverlay.getCurrentCanvas();
        this.canvas.style.cursor = "crosshair";
        this.startPencil();
        document.body.appendChild(this.canvasOverlay.layerManager.layerList[0].getCanvas());
    }
     startLayer(){
        const layerId = this.canvasOverlay.layerManager.layerList.length;
        const layerBackground = "rgba(255, 0, 0, 0.2)";
        const layerWidth =  document.documentElement.scrollWidth;
        const layerHeight =  document.documentElement.scrollHeight;

        const layerSettings = {id:layerId, backgroundColor: layerBackground, width:layerWidth, height:layerHeight};
        this.canvasOverlay.layerManager.addLayer(new Layer(layerSettings));
        this.canvasOverlay.layerManager.setCurrentLayer(this.canvasOverlay.layerManager.layerList[0]);
    }
    startPencil(){
        this.canvasOverlay.toolManager.addTool(new Pencil(this.canvasOverlay));
        this.canvasOverlay.toolManager.setCurrentTool(this.canvasOverlay.toolManager.toolList[0]);
        this.initListeners();
    }
    initListeners() {
    window.addEventListener("mousedown", (e)=> this.canvasOverlay.toolManager.currentTool?.onMouseDown(e));
    window.addEventListener("mousemove",  (e)=> this.canvasOverlay.toolManager.currentTool?.onMouseMove(e));
    window.addEventListener("mouseup",  (e)=> this.canvasOverlay.toolManager.currentTool?.onMouseUp(e));
   // window.addEventListener("mouseup", this.canvasOverlay.toolManager.currentTool.stopDrawing());
  }


}