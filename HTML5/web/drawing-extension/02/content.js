if (!document.getElementById("transparentCanvasOverlay")) {
  const canvas = document.createElement("canvas");
  canvas.id = "transparentCanvasOverlay";
  canvas.style.position = "absolute";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = document.documentElement.scrollWidth+"px";
  canvas.style.height = document.documentElement.scrollHeight+"px";//"100vh";
  canvas.style.pointerEvents = "auto";
  canvas.style.zIndex = "2147483647";
  canvas.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
  canvas.width = document.documentElement.scrollWidth;
  canvas.height = document.documentElement.scrollHeight;//window.innerHeight;
  canvas.style.cursor = "crosshair";
  canvas.style.userSelect = "none"
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  ctx.lineWidth = 8;
  ctx.lineCap = "round";
  ctx.strokeStyle = "red";

  let drawing = false;

  const startDrawing = (e) => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX +window.scrollX, e.clientY+window.scrollY);
  };

  const draw = (e) => {
    if (!drawing) return;
    const x = e.clientX + window.scrollX;
    const y = e.clientY + window.scrollY;
  const pageWidth = document.documentElement.scrollWidth;
    const pageHeight = document.documentElement.scrollHeight;

// Check if the mouse is inside the window bounds
    if (
        e.clientX < 0 || e.clientX > pageWidth ||
        e.clientY < 0 || e.clientY > pageHeight
    ) {
        stopDrawing(); // Stop drawing if outside bounds
        return;
    }
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    drawing = false;
    ctx.closePath();
  };

  //canvas.addEventListener("mousedown", startDrawing);
  //canvas.addEventListener("mousemove", draw);
  //canvas.addEventListener("mouseup", stopDrawing);

  window.addEventListener("mousedown", startDrawing);
  window.addEventListener("mousemove", draw);
  window.addEventListener("mouseup", stopDrawing);

  window.addEventListener("keydown", (e) => {
    if (e.key === "c") ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (e.key === "Escape") canvas.remove();
  });

  // Monitor for dynamically inserted ads
  const observer = new MutationObserver(() => { //console.log("--->>")
    const ads = document.querySelectorAll("iframe, [id*='ad'], [class*='ad']");
    ads.forEach((ad) => {
        //console.log("---")
      ad.style.zIndex = "0"; // Push ad layers behind
      ad.style.pointerEvents = "none"; // Disable interaction with ads
    });
  });

  // Observe changes in the document
  observer.observe(document.body, { childList: true, subtree: true });
canvas.style.cursor = "crosshair";

window.addEventListener("scroll", ()=>{
  if(!document.documentElement.scrollHeight > canvas.height)return;
  let tempCanvas = document.createElement("canvas");
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  tempCanvas.getContext("2d").drawImage(canvas, 0, 0);

  canvas.style.height = document.documentElement.scrollHeight+"px";//"100vh";
  canvas.height = document.documentElement.scrollHeight;//window.innerHeight;
   ctx.lineWidth = 8;
  ctx.lineCap = "round";
  ctx.strokeStyle = "red";
  ctx.drawImage(tempCanvas, 0, 0);
})
window.addEventListener("resize", () => {
  /*let tempCanvas = document.createElement("canvas");
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  tempCanvas.getContext("2d").drawImage(canvas, 0, 0);
*/
console.log("resize:"+document.documentElement.scrollHeight)
  canvas.width = document.documentElement.scrollWidth;
  canvas.height = document.documentElement.scrollHeight;

 // ctx.drawImage(tempCanvas, 0, 0);
});

}
