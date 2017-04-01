var initNode = function(data, svg) {
  var force = d3.layout.force()
    .size([width,height])
    .nodes(data)
    .charge(-70)
    .start()
  var node = svg.selectAll("g.node")
    .data(data)

  var nodeEnter = node.enter().append("g")
    .attr("class", "node")
    .call(force.drag)

  nodeEnter.append("svg:circle")
    .attr({"r":8})
    .call(force.drag)

  force.on("tick", function(e) {

    var q = d3.geom.quadtree(node),
        i = 0,
        n = node.length,
        k = .1 * e.alpha

    while (++i < n) q.visit(collide(node[i]))

    node.attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")"
    })

  //   svg.selectAll(".textClass")
  //     .transition()
  //       .duration(100)
  //       .attr("x", function(d) {
  //       return repositionNodeLabel(d)
  //   })
  // })

  // function repositionNodeLabel(d) {
  //   var nameLength = d.name.length
  //   var nameOffset = (nameLength * 9) - (nameLength * 1.25)
  //   var initialX = 25
  //   var offset

  //   offset = d.x < middle ? (-initialX * 2) - nameOffset : 0

  //   return initialX + offset
  // }

    function collide(node) {
      var r = node.radius + 16,
        nx1 = node.x - r,
        nx2 = node.x + r,
        ny1 = node.y - r,
        ny2 = node.y + r
      return function(quad, x1, y1, x2, y2) {
        if (quad.point && (quad.point !== node)) {
          var x = node.x - quad.point.x,
              y = node.y - quad.point.y,
              l = Math.sqrt(x * x + y * y),
              r = node.radius + quad.point.radius
          if (l < r) {
            l = (l - r) / l * .5
            node.x -= x *= l
            node.y -= y *= l
            quad.point.x += x
            quad.point.y += y
          }
        }
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1
      }
    }
  })
}

var updateNodeColor = function(colorArray, attr, svg) {
  svg.selectAll("circle")
    .transition(500)
    .attr("fill", function(d) {
      return colorArray[d[attr]]
  })
}

var updateNodeSize = function(scale, attr, svg) {
  console.log(attr)
  console.log(scale)
  svg.selectAll("circle")
    .transition(500)
    .attr("r", function(d) {
      return scale(parseInt(d[attr]))
  })
}

var updateNodeOutline = function(colorArray, attr, svg) {
  if (attr = "Cancer_Type") {
    svg.selectAll("circle")
      .transition(500)
      .style("stroke-width", "2px")
      .style("stroke", function(d) {
        if (d[attr].includes("No")) {
          return colorArray[0]
        }
        else if (d[attr].includes("Missing")) {
          return colorArray[2]
        }
        else {
          return colorArray[1]
        }
    })
  }
  else {
    svg.selectAll("circle")
      .transition(500)
      .style("stroke-width", "5px")
      .style("stroke", function(d) {
        return colorArray[d[attr]]
    })
  }
}