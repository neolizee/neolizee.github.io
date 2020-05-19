// Перемещение и масштабирование карты
PanZoom(".map-move", { liner: true });

function PanZoom(selector, opts) {
  let panZoomEles = []
  opts = opts || {};
  let minScale = (opts.minScale ? opts.minScale : 0.6);
  let maxScale = (opts.maxScale ? opts.maxScale : 1.85);
  let increment = (opts.increment ? opts.increment : 0.1);
  let liner = (opts.liner ? opts.liner : false);
  document.querySelectorAll(selector).forEach(function (ele) {
    panZoomEles.push(new AttachPanZoom(ele, minScale, maxScale, increment, liner));
  });
  if (panZoomEles.length == 1)
    return panZoomEles[0];
  return panZoomEles;
}


function AttachPanZoom(ele, minScale, maxScale, increment, liner) {
  this.increment = increment;
  this.minScale = minScale;
  this.maxScale = maxScale;
  this.liner = liner;
  this.panning = false;
  this.oldX = this.oldY = 0;
  let self = this;
  ele.style.transform = "matrix(1, 0, 0, 1, 0, 0)";


  this.getTransformMatrix = function () {
    let trans = ele.style.transform;
    let start = trans.indexOf("(") + 1;
    let end = trans.indexOf(")");
    let matrix = trans.slice(start, end).split(",");
    return {
      "scale": +matrix[0],
      "transX": +matrix[4],
      "transY": +matrix[5]
    }
  }


  this.setTransformMatrix = function (o) {
    ele.style.transform = 'matrix(' + o.scale + ', 0, 0, ' + o.scale + ', ' + o.transX + ', ' + o.transY + ')';
  }

  this.applyTranslate = function (dx, dy) {
    let newTrans = this.getTransformMatrix();
    newTrans.transX += dx;
    newTrans.transY += dy;
    this.setTransformMatrix(newTrans);
    console.log(newTrans);
  }


  this.applyScale = function (dscale, x, y) {
    let newTrans = this.getTransformMatrix();
    let width = ele.width ? ele.width : ele.offsetWidth;
    let height = ele.height ? ele.height : ele.offsetHeight;
    let tranX = x - (width / 2);
    let tranY = y - (height / 2);
    dscale = (this.liner ? dscale : dscale * (newTrans.scale));
    newTrans.scale += dscale;
    let maxOrMinScale = (newTrans.scale <= this.minScale || newTrans.scale >= this.maxScale);
    if (newTrans.scale < this.minScale) newTrans.scale = this.minScale;
    if (newTrans.scale > this.maxScale) newTrans.scale = this.maxScale;
    if (!maxOrMinScale) {
      this.applyTranslate(tranX, tranY);
      this.setTransformMatrix(newTrans);
      this.applyTranslate(-(tranX * dscale), -(tranY * dscale));
    }
  }


  ele.addEventListener("mousedown", function (e) {
    e.preventDefault();
    this.panning = true;
    this.oldX = e.clientX;
    this.oldY = e.clientY;
    document.querySelector(".map-move").style.cursor = "-webkit-grabbing";
  });

  ele.addEventListener("mouseup", function (e) {
    this.panning = false;
    document.querySelector(".map-move").style.cursor = "";
  });

  ele.addEventListener("mouseleave", function (e) { this.panning = false; });

  ele.addEventListener("mousemove", function (e) {
    if (this.panning) {
      let deltaX = e.clientX - this.oldX;
      let deltaY = e.clientY - this.oldY;
      self.applyTranslate(deltaX, deltaY);
      this.oldX = e.clientX;
      this.oldY = e.clientY;
    }
  });

  this.getScrollDirection = function (e) {
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    if (delta < 0)
      self.applyScale(-self.increment, e.offsetX, e.offsetY)
    else
      self.applyScale(self.increment, e.offsetX, e.offsetY);
  }

  ele.addEventListener('DOMMouseScroll', this.getScrollDirection, false);
  ele.addEventListener('mousewheel', this.getScrollDirection, false);
}