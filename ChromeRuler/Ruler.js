//Adding events
document.body.style.cursor = "crosshair";

let clicked = false;
let x = 0,
  y = 0;

function CreateDisplayNodes(name, position) {
  var node = document.createElement("div");
  var nodestyle = boxcss + position;
  node.setAttribute("style", nodestyle);
  node.setAttribute("id", "ChromeRuler" + name + "DisplayNode");

  var textnode = document.createElement("label");
  textnode.setAttribute("style", labelcss);
  textnode.setAttribute("id", "ChromeRuler" + name);
  textnode.innerHTML = name;

  node.appendChild(textnode);

  document.body.appendChild(node);
}

let boxcss =
  "background-color:#21262d !important;position:fixed !important;width:240px !important;height:35px !important;border-radius:2em !important;z-index:10000000000000 !important;display:block !important;";
let labelcss =
  "left: 5%;top: 12%;position: relative !important; color: white; font-size: 20px !important;font-family: monospace !important;z-index:10000000000000 !important;display:block !important;";
CreateDisplayNodes("Top", "top:0px;left:40%;");
CreateDisplayNodes("Bottom", "bottom:0px;left:40%;");
CreateDisplayNodes("Left", "left:0px;top:40%;");
CreateDisplayNodes("Right", "right:0px;top:40%;");
CreateDisplayNodes(
  "Width",
  "right:0px;top:10px;background-color:#21262d !important;"
);
CreateDisplayNodes(
  "Height",
  "right:0px;top:50px;background-color:#21262d !important;"
);

//clearing lines
function clearLines() {
  if (document.getElementById("ChromeRulerhorizontal1"))
    document.getElementById("ChromeRulerhorizontal1").remove();

  if (document.getElementById("ChromeRulervertical1"))
    document.getElementById("ChromeRulervertical1").remove();

  if (document.getElementById("ChromeRulerhorizontal2"))
    document.getElementById("ChromeRulerhorizontal2").remove();

  if (document.getElementById("ChromeRulervertical2"))
    document.getElementById("ChromeRulervertical2").remove();

  if (document.getElementById("ChromeRulerSelectionRectangle"))
    document.getElementById("ChromeRulerSelectionRectangle").remove();
}

//drawing lines
function createLineElement(x, y, length, angle, id) {
  let line = document.createElement("div");
  line.setAttribute("id", "ChromeRuler" + id);

  var styles =
    "border-Top: thin dashed #00a9e0; z-index:10000000000000 !important; display:block !important;" +
    "width: " +
    length +
    "px; " +
    "height: 0px; " +
    "-moz-transform: rotate(" +
    angle +
    "rad); " +
    "-webkit-transform: rotate(" +
    angle +
    "rad); " +
    "-o-transform: rotate(" +
    angle +
    "rad); " +
    "-ms-transform: rotate(" +
    angle +
    "rad); " +
    "position: absolute; " +
    "top: " +
    y +
    "px; " +
    "left: " +
    x +
    "px; ";
  line.setAttribute("style", styles);
  return line;
}

function createLine(x1, y1, x2, y2, id) {
  let a = x1 - x2,
    b = y1 - y2,
    c = Math.sqrt(a * a + b * b);

  let sx = (x1 + x2) / 2,
    sy = (y1 + y2) / 2;

  let x = sx - c / 2,
    y = sy;

  let alpha = Math.PI - Math.atan2(-b, a);

  return createLineElement(x, y, c, alpha, id);
}

function DrawRectangle(x1, y1, x2, y2) {
  let rec = document.createElement("div");
  rec.setAttribute("id", "ChromeRulerSelectionRectangle");
  let style =
    "left:" +
    Math.min(x1, x2) +
    "px;" +
    "top:" +
    Math.min(y1, y2) +
    "px;" +
    "position:absolute;z-index:10000000000000 !important;opacity:0.5;display:block !important;" +
    "width:" +
    Math.abs(x2 - x1) +
    "px;" +
    "height:" +
    Math.abs(y2 - y1) +
    "px;" +
    "background-color:#00a9e0";
  rec.setAttribute("style", style);
  document.body.appendChild(rec);
}

function UpdateSpecs(x1, y1, x2, y2) {
  document.getElementById("ChromeRulerTop").innerHTML = "Top : " + y1 + " px";
  document.getElementById("ChromeRulerBottom").innerHTML =
    "Bottom :  " + Math.abs(document.body.clientHeight - y2) + " px";
  document.getElementById("ChromeRulerLeft").innerHTML = "Left : " + x1 + " px";
  document.getElementById("ChromeRulerRight").innerHTML =
    "Right :  " + Math.abs(document.body.clientWidth - x2) + " px";
  document.getElementById("ChromeRulerWidth").innerHTML =
    "Width : " + Math.abs(x2 - x1) + " px";
  document.getElementById("ChromeRulerHeight").innerHTML =
    "Height : " + Math.abs(y2 - y1) + " px";
}

function Mousedownfunction(e) {
  clicked = true;
  x = e.pageX;
  y = e.pageY;
  clearLines();
  UpdateSpecs(x, y, x, y);
  document.body.appendChild(
    createLine(
      x,
      0,
      x,
      document.body.getBoundingClientRect().height,
      "vertical1"
    )
  );
  document.body.appendChild(
    createLine(
      0,
      y,
      document.body.getBoundingClientRect().width,
      y,
      "horizontal1"
    )
  );
}

function Mouseupfunction(e) {
  clicked = false;
}

function Mousemovefunction(e) {
  if (clicked == true) {
    //dragging
    clearLines();
    var x2 = e.pageX,
      y2 = e.pageY;
    UpdateSpecs(x, y, x2, y2);
    //Axis1
    document.body.appendChild(
      createLine(
        x,
        0,
        x,
        document.body.getBoundingClientRect().height,
        "vertical1"
      )
    );
    document.body.appendChild(
      createLine(
        0,
        y,
        document.body.getBoundingClientRect().width,
        y,
        "horizontal1"
      )
    );

    //Axis2
    document.body.appendChild(
      createLine(
        x2,
        0,
        x2,
        document.body.getBoundingClientRect().height,
        "vertical2"
      )
    );
    document.body.appendChild(
      createLine(
        0,
        y2,
        document.body.getBoundingClientRect().width,
        y2,
        "horizontal2"
      )
    );

    DrawRectangle(x, y, x2, y2);
  }
}

document.addEventListener("mousedown", Mousedownfunction);
document.addEventListener("mouseup", Mouseupfunction);
document.addEventListener("mousemove", Mousemovefunction);
