

// Check if the canvas already exists
if (!document.getElementById('drawingCanvas')) {
  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.id = 'drawingCanvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  //canvas.style.pointerEvents = 'none'; // Prevent interfering with page content
  canvas.style.zIndex = '100000';
  canvas.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Append canvas to body
  document.body.appendChild(canvas);

  // Drawing logic
  const ctx = canvas.getContext('2d');
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'green';

  let drawing = false;

  const startDrawing = (e) => {
    //console.log("start");
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
  };

  const draw = (e) => {
   // console.log("draw");
    if (!drawing) return;
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
  };

  const stopDrawing = () => {
   // console.log("stop draw");
    drawing = false;
    ctx.closePath();
  };
  document.body.addEventListener("click", (e)=>{
    console.log("abv");
  })
  // Add event listeners
  canvas.addEventListener('mousedown', (e) => {
  //  alert("");
    console.log(e.button);
    if (e.button === 0) { // Left click only
     canvas.style.pointerEvents = 'auto'; // Allow drawing
     startDrawing(e);
    }
  });

  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDrawing);

  // Clear drawing with a keyboard shortcut (e.g., press "C")
  window.addEventListener('keydown', (e) => {
    console.log(e.key );
    if (e.key === 'c') {
        console.log("im here -> c")
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
     if (e.key === 'Escape') {
        console.log("im here - Escape")
      canvas.remove();
    }
  });

}



