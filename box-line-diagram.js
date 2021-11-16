'use strict';

// -----------------------------------------------------------------------------

var bld = bld || {};

// -----------------------------------------------------------------------------

bld.Box =
  function Box(width, height, padding, texts) {
    this.width = width;
    this.height = height;
    this.padding = padding;
    this.texts = texts;
  };

// -----------------------------------------------------------------------------

bld.PLACEMENT_LEFT   = 1 << 0;
bld.PLACEMENT_RIGHT  = 1 << 1;
bld.PLACEMENT_TOP    = 1 << 2;
bld.PLACEMENT_BOTTOM = 1 << 3;

bld.ARROWHEAD_START  = 1 << 0;
bld.ARROWHEAD_END    = 1 << 1;

bld.Line =
  function Line(placement, arrowhead, text) {
    this.placement = placement;
    this.arrowhead = arrowhead;
    this.text = text;
  };

// -----------------------------------------------------------------------------

bld.BoxLineDiagram =
  function BoxLineDiagram(box, lines) {
    this.box = box;
    this.lines = lines;
  };

// -----------------------------------------------------------------------------

bld.BoxWithCoordinates =
  function BoxWithCoordinates(box, x, y) {
    this.box = box;
    this.x = x;
    this.y = y;
  };

bld.BoxWithCoordinates.prototype.lineX =
  function lineX(n, i) {
    if (n == 1) {
      return this.x + Math.floor(this.box.width / 2);
    }
    var horizontalDistance = Math.floor(
      (this.box.width - 2 * this.box.padding) / (n - 1)
    );
    return this.x + this.box.padding + i * horizontalDistance;
  };

bld.BoxWithCoordinates.prototype.lineY =
  function lineY(n, i) {
    if (n == 1) {
      return this.y + Math.floor(this.box.height / 2);
    }
    var verticalDistance = Math.floor(
      (this.box.height - 2 * this.box.padding) / (n - 1)
    );
    return this.y + this.box.padding + i * verticalDistance;
  };

// -----------------------------------------------------------------------------

bld.LineWithCoordinates =
  function LineWithCoordinates(line, x1, y1, x2, y2) {
    this.line = line;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  };

bld.LineWithCoordinates.prototype.textX =
  function textX() {
    return Math.floor((this.x2 - this.x1) / 2) + this.x1;
  };

bld.LineWithCoordinates.prototype.textY =
  function textY() {
    return Math.floor((this.y2 - this.y1) / 2) + this.y1;
  };

// -----------------------------------------------------------------------------

bld.BoxLineDiagramWithCoordinates =
  function BoxLineDiagramWithCoordinates(
    boxWithCoordinates,
    linesWithCoordinates
  ) {
    this.boxWithCoordinates = boxWithCoordinates;
    this.linesWithCoordinates = linesWithCoordinates;
  };

bld.buildBoxLineDiagramWithCoordinates =
  function buildBoxLineDiagramWithCoordinates(
    boxLineDiagram,
    width,
    height
  ) {
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    var box = boxLineDiagram.box;
    var lines = boxLineDiagram.lines;

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    var nLines = {};
    nLines[bld.PLACEMENT_LEFT]   = 0;
    nLines[bld.PLACEMENT_RIGHT]  = 0;
    nLines[bld.PLACEMENT_TOP]    = 0;
    nLines[bld.PLACEMENT_BOTTOM] = 0;

    for (var i = 0; i < lines.length; i++) {
      nLines[lines[i].placement]++;
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    var boxX = 0;
    var boxY = 0;

    if (
      nLines[bld.PLACEMENT_LEFT] > 0
      &&
      nLines[bld.PLACEMENT_RIGHT] > 0
      ||
      nLines[bld.PLACEMENT_LEFT] == 0
      &&
      nLines[bld.PLACEMENT_RIGHT] == 0
    ) {
      boxX = Math.floor((width - box.width) / 2);
    }
    else if (nLines[bld.PLACEMENT_LEFT] > 0) {
      boxX = width - box.width;
    }

    if (
      nLines[bld.PLACEMENT_TOP] > 0
      &&
      nLines[bld.PLACEMENT_BOTTOM] > 0
      ||
      nLines[bld.PLACEMENT_TOP] == 0
      &&
      nLines[bld.PLACEMENT_BOTTOM] == 0
    ) {
      boxY = Math.floor((height - box.height) / 2);
    }
    else if (nLines[bld.PLACEMENT_TOP] > 0) {
      boxY = height - box.height;
    }

    var boxWithCoordinates = new bld.BoxWithCoordinates(box, boxX, boxY);

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    var iLines = {};
    iLines[bld.PLACEMENT_LEFT] = 0;
    iLines[bld.PLACEMENT_RIGHT] = 0;
    iLines[bld.PLACEMENT_TOP] = 0;
    iLines[bld.PLACEMENT_BOTTOM] = 0;

    var linesWithCoordinates = lines
      .map(
        function buildLineWithCoordinates(line) {
          var n = nLines[line.placement];
          var i = iLines[line.placement];
          var x1 = 0;
          var y1 = 0;
          var x2 = 0;
          var y2 = 0;
          switch (line.placement) {
            case bld.PLACEMENT_LEFT:
              x1 = 0;
              y1 = boxWithCoordinates.lineY(n, i);
              x2 = boxX;
              y2 = y1;
              break;
            case bld.PLACEMENT_RIGHT:
              x1 = boxX + box.width;
              y1 = boxWithCoordinates.lineY(n, i);
              x2 = width;
              y2 = y1;
              break;
            case bld.PLACEMENT_TOP:
              x1 = boxWithCoordinates.lineX(n, i);
              y1 = 0;
              x2 = x1;
              y2 = boxY;
              break;
            case bld.PLACEMENT_BOTTOM:
              x1 = boxWithCoordinates.lineX(n, i);
              y1 = boxY + box.height;
              x2 = x1;
              y2 = height;
              break;
          }
          iLines[line.placement]++;
          return new bld.LineWithCoordinates(line, x1, y1, x2, y2);
        }
      );

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    return new bld.BoxLineDiagramWithCoordinates(
      boxWithCoordinates,
      linesWithCoordinates
    );

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  };

// -----------------------------------------------------------------------------
