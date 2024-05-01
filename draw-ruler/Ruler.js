document.body.style.cursor = "crosshair";

// Event Listeners
document.addEventListener("mousedown", handleMouseDown);
document.addEventListener("mouseup", handleMouseUp);
document.addEventListener("mousemove", handleMouseMove);

// Constants for CSS styles
const boxCss =
  "background-color:#2b574b !important;" +
  "position:fixed !important;" +
  "width:180px !important;" +
  "height:35px !important;" +
  "border-radius:2em !important;" +
  "z-index:10000000000000 !important;" +
  "display:block !important;";

const labelCss =
  "left: 5%;" +
  "color: white !important;" +
  "padding-top: 4px !important;" +
  "top: 12%;" +
  "position: relative !important; " +
  "font-size: 20px !important;" +
  "font-family: arial !important;" +
  "z-index:10000000000000 !important;" +
  "display:block !important;";

// Event Handlers
let clicked = false;
let x = 0,
  y = 0;

function handleMouseDown(e) {
  clicked = true;
  x = e.pageX;
  y = e.pageY;
  clearLines();
  updateSpecs(x, y, x, y);
  drawAxisLines(x, y);
}

function handleMouseUp() {
  clicked = false;
}

function handleMouseMove(e) {
  if (clicked) {
    clearLines();
    const x2 = e.pageX,
      y2 = e.pageY;
    updateSpecs(x, y, x2, y2);
    drawAxisLines(x, y);
    drawAxisLines(x2, y2, "2");
    drawRectangle(x, y, x2, y2);
  }
}

// Utility functions
function clearLines() {
  const lines = document.querySelectorAll(
    "[id^='ChromeRulerhorizontal'], [id^='ChromeRulervertical'], #ChromeRulerSelectionRectangle"
  );
  lines.forEach((line) => line.remove());
}

function createLine(x1, y1, x2, y2, id) {
  const a = x1 - x2,
    b = y1 - y2,
    c = Math.sqrt(a * a + b * b);
  const sx = (x1 + x2) / 2,
    sy = (y1 + y2) / 2;
  const x = sx - c / 2,
    y = sy;
  const alpha = Math.PI - Math.atan2(-b, a);
  return createLineElement(x, y, c, alpha, id);
}

function createLineElement(x, y, length, angle, id) {
  const line = document.createElement("div");
  line.id = `ChromeRuler${id}`;
  const styles = `border-Top: thin dashed #e04300; z-index:10000000000000 !important; display:block !important; width: ${length}px; height: 0px; -moz-transform: rotate(${angle}rad); -webkit-transform: rotate(${angle}rad); -o-transform: rotate(${angle}rad); -ms-transform: rotate(${angle}rad); position: absolute; top: ${y}px; left: ${x}px;`;
  line.style.cssText = styles;
  return line;
}

function drawAxisLines(x, y, axis = "1") {
  document.body.appendChild(
    createLine(
      x,
      0,
      x,
      document.body.getBoundingClientRect().height,
      `vertical${axis}`
    )
  );
  document.body.appendChild(
    createLine(
      0,
      y,
      document.body.getBoundingClientRect().width,
      y,
      `horizontal${axis}`
    )
  );
}

function drawRectangle(x1, y1, x2, y2) {
  const rect = document.createElement("div");
  const style = `left:${Math.min(x1, x2)}px;top:${Math.min(
    y1,
    y2
  )}px;position:absolute;z-index:10000000000000 !important;opacity:0.5;display:block !important;width:${Math.abs(
    x2 - x1
  )}px;height:${Math.abs(y2 - y1)}px;background-color:#e04300`;
  rect.style.cssText = style;
  rect.id = "ChromeRulerSelectionRectangle";
  document.body.appendChild(rect);
}

function createDisplayNodes(name, position) {
  const node = document.createElement("div");
  const nodeStyle = boxCss + position;
  node.style.cssText = nodeStyle;
  node.id = `ChromeRuler${name}DisplayNode`;

  const textNode = document.createElement("label");
  textNode.style.cssText = labelCss;
  textNode.id = `ChromeRuler${name}`;
  textNode.textContent = name;

  node.appendChild(textNode);
  document.body.appendChild(node);
}

function updateSpecs(x1, y1, x2, y2) {
  const pageWidth = document.body.getBoundingClientRect().width;
  const pageHeight = document.body.getBoundingClientRect().height;
  document.getElementById("ChromeRulerTop").textContent = `Top : ${y1}px`;
  document.getElementById(
    "ChromeRulerBottom"
  ).textContent = `Bottom : ${Math.abs(pageHeight - y2)}px`;
  document.getElementById("ChromeRulerLeft").textContent = `Left : ${x1}px`;
  document.getElementById("ChromeRulerRight").textContent = `Right : ${Math.abs(
    pageWidth - x2
  )}px`;
  document.getElementById("ChromeRulerWidth").textContent = `Width : ${Math.abs(
    x2 - x1
  )}px`;
  document.getElementById(
    "ChromeRulerHeight"
  ).textContent = `Height : ${Math.abs(y2 - y1)}px`;
}

// Creating display nodes
createDisplayNodes("Top", "top:0px;left:40%;");
createDisplayNodes("Bottom", "bottom:0px;left:40%;");
createDisplayNodes("Left", "left:0px;top:40%;");
createDisplayNodes("Right", "right:0px;top:40%;");
createDisplayNodes(
  "Width",
  "right:0px;top:10px;background-color:#2b574b !important;"
);
createDisplayNodes(
  "Height",
  "right:0px;top:50px;background-color:#2b574b !important;"
);
