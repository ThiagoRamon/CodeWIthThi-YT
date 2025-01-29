chrome.runtime.sendMessage({ action: "capture_screenshot" }, (screenshotUrl) => {
  if (document.getElementById("screenshotCanvasOverlay")) {
    alert("Drawing mode is already active.");
    return;
  }

  const overlay = document.createElement("div");
  overlay.id = "screenshotCanvasOverlay";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.background = `url(${screenshotUrl}) no-repeat center/cover`;
  overlay.style.zIndex = "2147483646";
  overlay.style.cursor = "crosshair";

  var canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.cursor = "crosshair";

  overlay.appendChild(canvas);
  document.body.appendChild(overlay);

  var ctx = canvas.getContext("2d");
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.strokeStyle = "red";

  let drawing = false;

  const startDrawing = (e) => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
  };

  const draw = (e) => {
    if (!drawing) return;
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    drawing = false;
    ctx.closePath();
  };

  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDrawing);

  window.addEventListener("keydown", (e) => {
    if (e.key === "c") ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (e.key === "Escape"){
       // overlay.remove();
        //navbar.remove();
        exit();
        //document.body.removeChild(navbar);
    }
    if(e.key ==="t"){
          if (navbar.style.display === "none") {
              navbar.style.display = "flex";
              toggleButton.innerHTML = "&#8593;"; // Upward arrow
            } else {
              navbar.style.display = "none";
              toggleButton.innerHTML = "&#8595;"; // Downward arrow
            }
    }
  });


   // Create the navbar
  const navbar = document.createElement("div");
  navbar.id = "drawingNavbar";

  // Style the navbar
  navbar.style.position = "fixed";
  navbar.style.top = "0";
  navbar.style.left = "0";
  navbar.style.width = "100%";
  navbar.style.height = "40px";
  navbar.style.backgroundColor = "#333"; // Dark background
  navbar.style.color = "#fff"; // White text
  navbar.style.zIndex = "2147483648"; // Higher than the canvas
  navbar.style.display = "flex";
  navbar.style.alignItems = "center";
  navbar.style.justifyContent = "space-evenly";
  navbar.style.padding = "5px 10px";
  navbar.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.2)";

const colorPick = document.createElement("div");
  // Add color options to the navbar
  const colors = ["red", "blue", "green", "yellow", "black", "purple"];
  colors.forEach((color) => {
    const colorButton = document.createElement("button");
   // colorButton.textContent = color;
    colorButton.style.backgroundColor = color;
    colorButton.style.width = "25px"; // Smaller size
    colorButton.style.height = "25px"; // Square shape
    colorButton.style.border = "none";
    colorButton.style.border = "none";
    colorButton.style.color = "#fff";
    //colorButton.style.padding = "10px 15px";
    colorButton.style.border = ".5px solid #fff";
    colorButton.style.cursor = "pointer";
    colorButton.style.margin = "0 5px";
    //colorButton.style.borderRadius = "5px";

    // Change pen color on click
    colorButton.addEventListener ("click", () => {
        console.log(color);
      penColor = color;
      ctx.strokeStyle = penColor;
    });
    colorPick.appendChild(colorButton)
    navbar.appendChild(colorPick);
  });

  // Add a clear button
  const clearButton = document.createElement("button");
  clearButton.textContent = "Clear Canvas";
  clearButton.style.backgroundColor = "gray";
  //clearButton.style.height = "25px";
  clearButton.style.border = "none";
  clearButton.style.color = "#fff";
 // clearButton.style.padding = "10px 15px";
  clearButton.style.cursor = "pointer";
  clearButton.style.margin = "0 5px";
  clearButton.style.borderRadius = "5px";

  clearButton.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  navbar.appendChild(clearButton);
// Add download button
    const downloadButton = document.createElement("button");
    downloadButton.textContent = "Download Screenshot";
    downloadButton.style.backgroundColor = "green";
    downloadButton.style.border = "none";
    downloadButton.style.color = "#fff";
    //downloadButton.style.padding = "10px 15px";
    downloadButton.style.cursor = "pointer";
    downloadButton.style.margin = "0 5px";
    downloadButton.style.borderRadius = "5px";

    downloadButton.addEventListener("click", () => {
    // Create a temporary canvas to capture the page's content
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    // Set canvas dimensions to match the page's visible area
    tempCanvas.width = window.innerWidth;
    tempCanvas.height = window.innerHeight;

    // Draw the screenshot as background image
    const img = new Image();
    img.src = screenshotUrl;
    img.onload = () => {
      tempCtx.drawImage(img, 0, 0, window.innerWidth, window.innerHeight);

      // Overlay the drawing canvas onto the temporary canvas
      tempCtx.drawImage(canvas, 0, 0);

      // Download the combined image (screenshot + drawings)
      const link = document.createElement("a");
      link.download = "screenshot_with_drawings.png";
      link.href = tempCanvas.toDataURL("image/png");
      link.click();
    };
    });

    navbar.appendChild(downloadButton);

  // Add an exit button
  const exitButton = document.createElement("button");
  exitButton.textContent = "Exit";
  exitButton.style.backgroundColor = "red";
  exitButton.style.border = "none";
  exitButton.style.color = "#fff";
 // exitButton.style.padding = "10px 15px";
  exitButton.style.cursor = "pointer";
  exitButton.style.margin = "0 5px";
  exitButton.style.borderRadius = "5px";
  const exit = () =>{
    overlay.remove();
    canvas.remove();
    navbar.remove();
    toggleButton.remove();
  }
  exitButton.addEventListener("click", () => {
    exit();

   /*
    document.body.removeChild(canvas);
    document.body.removeChild(navbar);*/
  });

  navbar.appendChild(exitButton);
  document.body.appendChild(navbar);

  // Create the toggle button (arrow)
  const toggleButton = document.createElement("button");
  toggleButton.style.position = "fixed";
  toggleButton.style.top = "10px";
  toggleButton.style.right = "10px";
  toggleButton.style.backgroundColor = "#333";
  toggleButton.style.border = "none";
  toggleButton.style.color = "#fff";
  toggleButton.style.padding = "10px";
  toggleButton.style.cursor = "pointer";
  toggleButton.style.borderRadius = "50%";
  toggleButton.style.zIndex = "2147483649"; // Above the navbar
  toggleButton.innerHTML = "&#8593;"; // Upward arrow

  toggleButton.addEventListener("click", () => {
    if (navbar.style.display === "none") {
      navbar.style.display = "flex";
      toggleButton.innerHTML = "&#8593;"; // Upward arrow
    } else {
      navbar.style.display = "none";
      toggleButton.innerHTML = "&#8595;"; // Downward arrow
    }
  });

  document.body.appendChild(toggleButton);

   const observer = new MutationObserver(() => {
    const ads = document.querySelectorAll("iframe, [id*='ad'], [class*='ad'], ins");
    ads.forEach((ad) => {
      ad.style.zIndex = "0"; // Push ad layers behind
      ad.style.pointerEvents = "none"; // Disable interaction with ads
      ad.remove(); // Remove the ad element completely
    });
  });

  // Observe changes in the document
  observer.observe(document.body, { childList: true, subtree: true });
});

