export class LayerManager{
    constructor(){
        this.currentLayer = null;
        this.layerList = [];
    }

    addLayer(layer){
        this.layerList.push(layer);
    }
    setCurrentLayer(layer){
        this.currentLayer = layer;
    }
}