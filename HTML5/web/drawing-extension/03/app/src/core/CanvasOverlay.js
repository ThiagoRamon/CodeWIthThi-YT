class Tool {
  constructor(canvas) {
    this.init(canvas);
  }
init( canvas ){
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
  }
  activate() {
    console.log(`${this.constructor.name} activated`);
  }

  deactivate() {
    console.log(`${this.constructor.name} deactivated`);
  }
}

// Drawing Tool
class DrawTool extends Tool {
  constructor(canvas) {
    super(canvas);
    this.isDrawing = false;
    this.currentLayer = null;
  }

  activate(layer) {
    super.activate();
    this.currentLayer = layer;
    this.currentLayer.canvas.addEventListener('mousedown', this.startDrawing.bind(this));
    this.currentLayer.canvas.addEventListener('mousemove', this.draw.bind(this));
    this.currentLayer.canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
  }

  deactivate() {
    super.deactivate();
    this.currentLayer.canvas.removeEventListener('mousedown', this.startDrawing.bind(this));
    this.currentLayer.canvas.removeEventListener('mousemove', this.draw.bind(this));
    this.currentLayer.canvas.removeEventListener('mouseup', this.stopDrawing.bind(this));
  }

  startDrawing(e) {
    this.isDrawing = true;
    this.context.beginPath();
    this.context.moveTo(e.offsetX, e.offsetY);

  }

  draw(e) {
    if (!this.isDrawing) return;
    this.context.lineTo(e.offsetX, e.offsetY);
    this.context.stroke();
   // this.currentLayer.updateMiniature();
  }

  stopDrawing() {
    this.isDrawing = false;
    this.context.closePath();
  }
}

class Layer{
    constructor(width, height){
        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;
         this.canvas.style.top = "0";
        this.canvas.style.left = "0";
        this.canvas.style.position = "absolute";
        this.context = this.canvas.getContext("2d");
        this.miniature = this.createMiniature();
        this.addDrawingListener();
        //this.addActivationListener();
    }
   createMiniature() {
    const miniature = document.createElement('canvas');
    miniature.width = window.innerWidth;
    miniature.height =window.innerHeight;
    return miniature;
  }

  updateMiniature() {
    const miniCtx = this.miniature.getContext('2d');
    miniCtx.clearRect(0, 0, this.miniature.width, this.miniature.height);
    miniCtx.drawImage(
      this.canvas,
      0, 0, this.canvas.width, this.canvas.height, // Source
      0, 0, this.miniature.width, this.miniature.height // Destination
    );
  }


   // Listen for drawing and update the miniature
  addDrawingListener() {
    const updateMiniatureBound = this.updateMiniature.bind(this);

    this.canvas.addEventListener('mouseup', updateMiniatureBound);
    this.canvas.addEventListener('mousemove', (e) => {
      if (e.buttons === 1) {
        updateMiniatureBound();
      }
    });
  }
  addActivationListener(c){
    this.miniature.addEventListener("click",(e)=>{
      console.log(this.miniature.getAttribute("mini-id"));
    });
  }
  getCanvas() {
    return this.canvas;
  }

  getMiniature() {
    this.updateMiniature();
    return this.miniature;
  }
}

class CanvasOverlay{
    constructor(containerId, navbarId){
        this.canvas = null;
        this.context = null;
        this.activeTool = null;
        this.strokeColor = "000";
        this.strokeSize = 8;
        this.fontSize = 16;
        this.fontStyle = "Arial";
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;


        this.layer = [];
        this.currentLayer = null;
        this.navbar = document.getElementById(navbarId);
         this.tools = [];
        this.currentTool = null;
        this.container = document.createElement("div");
        this.container.id = containerId;
        document.body.appendChild(this.container);
        this.init();
        this.initLayerDrag();
    }

    init(){
        const initialLayer = new Layer(this.windowWidth, this.windowHeight);
        this.container.appendChild(initialLayer.getCanvas());
        initialLayer.getCanvas().style.background = "green";
        this.layer.push(initialLayer);
        this.currentLayer = initialLayer;
        this.updateLayerNavbar();
       /* this.canvas = document.createElement("canvas");
        this.canvas.id = "drawing-canvas";
        this.canvas.style.position = "absolute";
        this.canvas.style.top = "0";
        this.canvas.style.left = "0";
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHight;
        document.body.appendChild(this.canvas);
        this.context = this.canvas.getContext("2d");*/

    }

    addLayer(color){
        const newLayer = new Layer(this.windowWidth, this.windowHeight);
        newLayer.getCanvas().style.background = "red";
        this.container.appendChild(newLayer.getCanvas());
        this.layer.push(newLayer);
        this.setNewCurrentLayer(newLayer);
        this.currentTool.init(this.currentLayer.getCanvas());
        this.setActiveTool(this.currentTool.constructor.name);
        this.updateLayerNavbar();
    }
    updateLayerNavbar() {
    this.navbar.innerHTML = ''; // Clear the navbar
    this.layer.forEach((layer, index) => {
      const layerItem = document.createElement('div');
      layerItem.className = 'layer-item';
      layerItem.setAttribute('data-id', index);

      const miniature = layer.getMiniature();
      miniature.className = 'layer-preview';
      miniature.setAttribute("mini-id", index);
      layerItem.appendChild(miniature);

      const label = document.createElement('span');
      label.textContent = `Layer ${index + 1}`;
      layerItem.appendChild(label);

      this.navbar.appendChild(layerItem);

      miniature.addEventListener("click",(e)=>{
             const layer_id =  miniature.getAttribute("mini-id");
             this.setNewCurrentLayer(this.layer[layer_id]);
       });

    });
  }

  initLayerDrag() {
    let draggingElement = null;
    let currentIndex = null;

    this.navbar.addEventListener('dragstart', (e) => {
      const item = e.target.closest('.layer-item');
      if (item) {
        draggingElement = item;
        currentIndex = Number(item.getAttribute('data-id'));
        item.classList.add('dragging');
        e.dataTransfer.setData('text/plain', '');
      }
    });

    this.navbar.addEventListener('dragover', (e) => {
      e.preventDefault();
      const afterElement = this.getDragAfterElement(e.clientY);
      if (afterElement) {
        this.navbar.insertBefore(draggingElement, afterElement);
      } else {
        this.navbar.appendChild(draggingElement);
      }
    });

    this.navbar.addEventListener('dragend', () => {
      draggingElement.classList.remove('dragging');
      const newOrder = Array.from(this.navbar.children).map((child) =>
        Number(child.getAttribute('data-id'))
      );

      // Reorder layers
      this.layers = newOrder.map((index) => this.layers[index]);
      this.updateLayerOrder();
    });
  }

  getDragAfterElement(y) {
    const items = [...this.navbar.querySelectorAll('.layer-item:not(.dragging)')];
    return items.find((item) => item.getBoundingClientRect().top + item.offsetHeight / 2 > y);
  }

  updateLayerOrder() {
    this.container.innerHTML = '';
    this.layers.forEach((layer) => {
      this.container.appendChild(layer.getCanvas());
    });
    this.updateLayerNavbar();
  }

    addTool(tool) {
        this.tools.push(tool);
    }
    setActiveTool(toolName) {
        if (this.currentTool) this.currentTool.deactivate();
        const tool = this.tools.find(t => t.constructor.name === toolName);
        tool.init(this.currentLayer.getCanvas());
        if (tool) {
          this.currentTool = tool;

          this.currentTool.activate(this.currentLayer);
        }
    }
    setNewCurrentLayer(newLayer){
      this.currentLayer.canvas.style.zIndex = "0";
      this.currentLayer = newLayer;
      this.currentLayer.canvas.style.zIndex = "9999";
       this.setActiveTool(this.currentTool.constructor.name);
      //this.updateLayerNavbar();
    }
}
