
export class Tool {
  constructor(canvasOverlay) {
    this.canvasOverlay = canvasOverlay; // Reference to the canvas overlay
    this.context =  canvasOverlay.layerManager.currentLayer.getContext();
  }

  onMouseDown(event) {}
  onMouseMove(event) {}
  onMouseUp(event) {}
}