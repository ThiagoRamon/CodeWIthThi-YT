import {Tool} from "../core/Tool.js";

export class Pencil extends Tool {
  constructor(canvasOverlay) {
    super(canvasOverlay);
    this.isDrawing = false;
    this.points = [];
  }

  onMouseDown(event) {
    this.isDrawing = true;
    const { clientX, clientY } = event;
    this.context.beginPath();
    this.context.moveTo(clientX + window.scrollX, clientY+window.scrollY);
    this.points.push({ x: clientX+ window.scrollX, y: clientY +window.scrollY});
  }

  onMouseMove(event) {
    if (!this.isDrawing) return;

    const { clientX, clientY } = event;
    const pageWidth = window.scrollX;
    const pageHeight = window.scrollY;

    const x  =  clientX + pageWidth;
    const y  =  clientY + pageHeight;

    this.context.strokeStyle = this.canvasOverlay.toolManager.strokeColor;
    this.context.lineWidth = this.canvasOverlay.toolManager.strokeSize;
     /*if (
        event.clientX < 0 || event.clientX > pageWidth ||
        event.clientY < 0 || event.clientY > pageHeight
    ) {
       // this.stopDrawing();
        //return;
    }*/
    this.context.lineTo(x, y);


    this.context.stroke();
    this.points.push({ x: x, y: y});

  }

  onMouseUp(event) {
    this.isDrawing = false;
    this.context.closePath();
    this.canvasOverlay.actionManager.addAction({
      tool: "Pencil",
      points: this.points,
      color: this.canvasOverlay.strokeColor,
      size: this.canvasOverlay.strokeSize,
    });
  }
  stopDrawing(){
    this.isDrawing = false;
    this.context.closePath();
  }
}

