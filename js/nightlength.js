var margin = 30,
width = 500,
height = window.innerHeight / 4;


var svg = d3.select("map_Nightlength").append("svg")
.attr('width', width)
.attr('height', height)



// Data

var treeData = d3.rollup(nightlength,     
    function(v){ return v.length },
    function(d){return d.Month},
    // function(d){return d.Day},
    function(d){return d.NightLength}
    )

var root = d3.hierarchy(treeData);
root.sum(function(d){
    return d[1]
})

var treemapLayout = d3.treemap();
treemapLayout
.size([width, height])
.paddingOuter(12);

treemapLayout(root)
var nodes = root.descendants()
svg
.selectAll('rect')
.data(nodes)
.join('rect')
.attr('x', function (d) { return d.x0; })
.attr('y', function (d) { return d.y0; })
.attr('width', function (d) { console.log((d.x1 - d.x0) > 5); return d.x1 - d.x0; })
.attr('height', function (d) { return d.y1 - d.y0; })
.on("mouseover", function (e, d) {
    var i = nodes.indexOf(d)
    console.log(d.data[0], i, "#" + d.data[0] + i)
    var name = d.data[0]
    if (name === "") {
        name = "unamed"
    }
    d3.select("#" + name + i).attr("opacity", 1)
})
.on("mouseout", function (e, d) {
    var i = nodes.indexOf(d)
    var name = d.data[0]
    if (name === "") {
        name = "unamed"
    }
    d3.select("#" + name + i).attr("opacity", function (d) {
        if ((d.x1 - d.x0) > 70) {
            return 1
        }
        return 0
    })
})

svg
.selectAll('text')
.data(nodes)
.join('text')
.attr('x', function (d) { return d.x0 + 4; })
.attr('y', function (d) { return d.y0 + 10; })
.text(function (d) {
    var name = d.data[0]
    if (name === "") {
        name = "unamed"
    }
    return name
})
.attr("opacity", function (d) {

    if ((d.x1 - d.x0) > 70) {
        return 1
    }
    return 0
})
.attr("id", function (d, i) {
    var name = d.data[0]
    if (name === "") {
        name = "unamed"
    }
    return name + i
})

