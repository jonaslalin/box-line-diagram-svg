'use strict';

// -----------------------------------------------------------------------------

var bld = bld || {};

// -----------------------------------------------------------------------------

bld.TextOptions =
  function TextOptions(width, height) {
    this.width = width;
    this.height = height;
  };

bld.ArrowheadOptions =
  function ArrowheadOptions(width, height, fill) {
    this.width = width;
    this.height = height;
    this.fill = fill;
  };

bld._drawBoxLineDiagram =
  function _drawBoxLineDiagram(
    counter,
    svgId,
    cssPrefix,
    boxLineDiagramWithCoordinates,
    textOptions,
    arrowheadOptions
  ) {
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    var svg = d3.select('#' + svgId);

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    var defs = svg
      .selectAll('defs')
      .data([
        {
          box: boxLineDiagramWithCoordinates.boxWithCoordinates.box,
          text: textOptions,
          arrowhead: arrowheadOptions
        }
      ])
      .join('defs');

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    var defsGTemplateBoxClass = cssPrefix + '-template-box';

    var defsGTemplateBox = defs
      .selectAll('g.' + defsGTemplateBoxClass)
      .data(function (d) { return [d]; })
      .join('g')
      .classed(defsGTemplateBoxClass, true);

    var defsGTemplateBoxRectId = (
      defsGTemplateBoxClass
      + '-rect-'
      + counter.i
    );

    var defsGTemplateBoxRect = defsGTemplateBox
      .selectAll('rect')
      .data(function (d) { return [d]; })
      .join('rect')
      .attr('id', defsGTemplateBoxRectId)
      .attr('width', function (d) { return d.box.width; })
      .attr('height', function (d) { return d.box.height; });

    var defsGTemplateBoxRectClipPathId = (
      defsGTemplateBoxClass
      + '-rect-clip-path-'
      + counter.i
    );

    var defsGTemplateBoxRectClipPath = defsGTemplateBox
      .selectAll('clipPath')
      .data(function (d) { return [d]; })
      .join('clipPath')
      .attr('id', defsGTemplateBoxRectClipPathId);

    var defsGTemplateBoxRectClipPathUse = defsGTemplateBoxRectClipPath
      .selectAll('use')
      .data(function (d) { return [d]; })
      .join('use')
      .attr('href', '#' + defsGTemplateBoxRectId);

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    var defsGTemplateTextClass = cssPrefix + '-template-text';

    var defsGTemplateText = defs
      .selectAll('g.' + defsGTemplateTextClass)
      .data(function (d) { return [d]; })
      .join('g')
      .classed(defsGTemplateTextClass, true);

    var defsGTemplateTextRectId = (
      defsGTemplateTextClass
      + '-rect-'
      + counter.i
    );

    var defsGTemplateTextRect = defsGTemplateText
      .selectAll('rect')
      .data(function (d) { return [d]; })
      .join('rect')
      .attr('id', defsGTemplateTextRectId)
      .attr('width', function (d) { return d.text.width; })
      .attr('height', function (d) { return d.text.height; });

    var defsGTemplateTextRectClipPathId = (
      defsGTemplateTextClass
      + '-rect-clip-path-'
      + counter.i
    );

    var defsGTemplateTextRectClipPath = defsGTemplateText
      .selectAll('clipPath')
      .data(function (d) { return [d]; })
      .join('clipPath')
      .attr('id', defsGTemplateTextRectClipPathId);

    var defsGTemplateTextRectClipPathUse = defsGTemplateTextRectClipPath
      .selectAll('use')
      .data(function (d) { return [d]; })
      .join('use')
      .attr('href', '#' + defsGTemplateTextRectId);

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    var defsGTemplateArrowheadStartClass = (
      cssPrefix
      + '-template-arrowhead-start'
    );

    var defsGTemplateArrowheadStart = defs
      .selectAll('g.' + defsGTemplateArrowheadStartClass)
      .data(function (d) { return [d]; })
      .join('g')
      .classed(defsGTemplateArrowheadStartClass, true);

    var defsGTemplateArrowheadStartMarkerId = (
      defsGTemplateArrowheadStartClass
      + '-marker-'
      + counter.i
    );

    var defsGTemplateArrowheadStartMarker = defsGTemplateArrowheadStart
      .selectAll('marker')
      .data(function (d) { return [d]; })
      .join('marker')
      .attr('id', defsGTemplateArrowheadStartMarkerId)
      .attr('markerWidth', function (d) { return d.arrowhead.width; })
      .attr('markerHeight', function (d) { return d.arrowhead.height; })
      .attr('refX', function (d) { return d.arrowhead.width; })
      .attr('refY', function (d) {
        return Math.floor(d.arrowhead.height / 2);
      })
      .attr('orient', 'auto')
      .attr('markerUnits', 'userSpaceOnUse');

    var defsGTemplateArrowheadStartMarkerPolygon =
      defsGTemplateArrowheadStartMarker
        .selectAll('polygon')
        .data(function (d) { return [d]; })
        .join('polygon')
        .attr('points', function (d) {
          return (
            '0,'
            + Math.floor(d.arrowhead.height / 2)
            + ' '
            + d.arrowhead.width
            + ',0 '
            + d.arrowhead.width
            + ','
            + d.arrowhead.height
          );
        })
        .style('fill', function (d) { return d.arrowhead.fill; });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    var defsGTemplateArrowheadEndClass = (
      cssPrefix
      + '-template-arrowhead-end'
    );

    var defsGTemplateArrowheadEnd = defs
      .selectAll('g.' + defsGTemplateArrowheadEndClass)
      .data(function (d) { return [d]; })
      .join('g')
      .classed(defsGTemplateArrowheadEndClass, true);

    var defsGTemplateArrowheadEndMarkerId = (
      defsGTemplateArrowheadEndClass
      + '-marker-'
      + counter.i
    );

    var defsGTemplateArrowheadEndMarker = defsGTemplateArrowheadEnd
      .selectAll('marker')
      .data(function (d) { return [d]; })
      .join('marker')
      .attr('id', defsGTemplateArrowheadEndMarkerId)
      .attr('markerWidth', function (d) { return d.arrowhead.width; })
      .attr('markerHeight', function (d) { return d.arrowhead.height; })
      .attr('refX', 0)
      .attr('refY', function (d) {
        return Math.floor(d.arrowhead.height / 2);
      })
      .attr('orient', 'auto')
      .attr('markerUnits', 'userSpaceOnUse');

    var defsGTemplateArrowheadEndMarkerPolygon =
      defsGTemplateArrowheadEndMarker
        .selectAll('polygon')
        .data(function (d) { return [d]; })
        .join('polygon')
        .attr('points', function (d) {
          return (
            '0,0 0,'
            + d.arrowhead.height
            + ' '
            + d.arrowhead.width
            + ','
            + Math.floor(d.arrowhead.height / 2)
          );
        })
        .style('fill', function (d) { return d.arrowhead.fill; });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    var gBoxClass = cssPrefix + '-box';

    var gBox = svg
      .selectAll('g.' + gBoxClass)
      .data([
        boxLineDiagramWithCoordinates.boxWithCoordinates
      ])
      .join('g')
      .classed(gBoxClass, true);

    var gBoxUse = gBox
      .selectAll('use')
      .data(function (d) { return [d]; })
      .join('use')
      .attr('href', '#' + defsGTemplateBoxRectId)
      .attr('x', function (d) { return d.x; })
      .attr('y', function (d) { return d.y; })
      .style('clip-path', 'url(#' + defsGTemplateBoxRectClipPathId + ')');

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    var gLinesClass = cssPrefix + '-lines';

    var gLines = svg
      .selectAll('g.' + gLinesClass)
      .data([
        boxLineDiagramWithCoordinates.linesWithCoordinates
      ])
      .join('g')
      .classed(gLinesClass, true);

    var gLinesGLineClass = cssPrefix + '-line';

    var gLinesGLine = gLines
      .selectAll('g.' + gLinesGLineClass)
      .data(function (d) { return d; })
      .join('g')
      .classed(gLinesGLineClass, true);

    var gLinesGLineLine = gLinesGLine
      .selectAll('line')
      .data(function (d) { return [d]; })
      .join('line')
      .attr('x1', function (d) {
        if (
          d.line.arrowhead & bld.ARROWHEAD_START
          &&
          (
            d.line.placement == bld.PLACEMENT_LEFT
            ||
            d.line.placement == bld.PLACEMENT_RIGHT
          )
        ) {
          return d.x1 + arrowheadOptions.width;
        }
        return d.x1;
      })
      .attr('y1', function (d) {
        if (
          d.line.arrowhead & bld.ARROWHEAD_START
          &&
          (
            d.line.placement == bld.PLACEMENT_TOP
            ||
            d.line.placement == bld.PLACEMENT_BOTTOM
          )
        ) {
          return d.y1 + arrowheadOptions.width;
        }
        return d.y1;
      })
      .attr('x2', function (d) {
        if (
          d.line.arrowhead & bld.ARROWHEAD_END
          &&
          (
            d.line.placement == bld.PLACEMENT_LEFT
            ||
            d.line.placement == bld.PLACEMENT_RIGHT
          )
        ) {
          return d.x2 - arrowheadOptions.width;
        }
        return d.x2;
      })
      .attr('y2', function (d) {
        if (
          d.line.arrowhead & bld.ARROWHEAD_END
          &&
          (
            d.line.placement == bld.PLACEMENT_TOP
            ||
            d.line.placement == bld.PLACEMENT_BOTTOM
          )
        ) {
          return d.y2 - arrowheadOptions.width;
        }
        return d.y2;
      })
      .style('marker-start', function (d) {
        if (d.line.arrowhead & bld.ARROWHEAD_START) {
          return 'url(#' + defsGTemplateArrowheadStartMarkerId + ')';
        }
        return 'none';
      })
      .style('marker-end', function (d) {
        if (d.line.arrowhead & bld.ARROWHEAD_END) {
          return 'url(#' + defsGTemplateArrowheadEndMarkerId + ')';
        }
        return 'none';
      });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    var gBoxTextsClass = cssPrefix + '-box-texts';

    var gBoxTexts = svg
      .selectAll('g.' + gBoxTextsClass)
      .data([
        boxLineDiagramWithCoordinates.boxWithCoordinates
      ])
      .join('g')
      .classed(gBoxTextsClass, true);

    var gBoxTextsGBoxTextClass = cssPrefix + '-box-text';

    var gBoxTextsGBoxText = gBoxTexts
      .selectAll('g.' + gBoxTextsGBoxTextClass)
      .data(function (d) {
        var nTexts = d.box.texts.length;
        return Array.apply(null, Array(nTexts))
          .map(function () { return d; });
      })
      .join('g')
      .classed(gBoxTextsGBoxTextClass, true);

    gBoxTextsGBoxText.each(function (_, i) {
      var gBoxTextsGBoxTextUse = d3.select(this)
        .selectAll('use')
        .data(function (d) { return [d]; })
        .join('use')
        .attr('href', '#' + defsGTemplateTextRectId)
        .attr('x', function (d) {
          return d.lineX(1, i) - Math.floor(textOptions.width / 2);
        })
        .attr('y', function (d) {
          var nTexts = d.box.texts.length;
          return d.lineY(nTexts, i) - Math.floor(textOptions.height / 2);
        })
        .style('clip-path', 'url(#' + defsGTemplateTextRectClipPathId + ')');

      var gBoxTextsGBoxTextText = d3.select(this)
        .selectAll('text')
        .data(function (d) { return [d]; })
        .join('text')
        .attr('x', function (d) { return d.lineX(1, i); })
        .attr('y', function (d) {
          var nTexts = d.box.texts.length;
          return d.lineY(nTexts, i);
        })
        .text(function (d) { return d.box.texts[i]; });
    });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    var gLineTextsClass = cssPrefix + '-line-texts';

    var gLineTexts = svg
      .selectAll('g.' + gLineTextsClass)
      .data([
        boxLineDiagramWithCoordinates.linesWithCoordinates
      ])
      .join('g')
      .classed(gLineTextsClass, true);

    var gLineTextsGLineTextClass = cssPrefix + '-line-text';

    var gLineTextsGLineText = gLineTexts
      .selectAll('g.' + gLineTextsGLineTextClass)
      .data(function (d) { return d; })
      .join('g')
      .classed(gLineTextsGLineTextClass, true);

    var gLineTextsGLineTextUse = gLineTextsGLineText
      .selectAll('use')
      .data(function (d) { return [d]; })
      .join('use')
      .attr('href', '#' + defsGTemplateTextRectId)
      .attr('x', function (d) {
        return d.textX() - Math.floor(textOptions.width / 2);
      })
      .attr('y', function (d) {
        return d.textY() - Math.floor(textOptions.height / 2);
      })
      .style('clip-path', 'url(#' + defsGTemplateTextRectClipPathId + ')');

    var gLineTextsGLineTextText = gLineTextsGLineText
      .selectAll('text')
      .data(function (d) { return [d]; })
      .join('text')
      .attr('x', function (d) { return d.textX(); })
      .attr('y', function (d) { return d.textY(); })
      .text(function (d) { return d.line.text; });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    counter.i = counter.i + 1;

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  };

bld.drawBoxLineDiagram = (function () {
  var counter = { i: 0 };
  return bld._drawBoxLineDiagram.bind(null, counter);
})();

// -----------------------------------------------------------------------------
