var graphs = {};
graphs.scatter = function(){
  var svg,
      data,
      parentEl,
      currentHover,
      brush,
      dispatch = d3.dispatch('hover');

  var graph = {};
  graph.draw = function(){
    d3.select(parentEl).select('svg').remove();
    
    svg = d3.select(parentEl).append('svg')
        .attr({x: 400, y: 400});

    var x = d3.scale.linear()
        .domain(d3.extent(data.map(function(d) { return d.date; })))
        .range([0, 400])
    var y = d3.scale.linear()
        .domain([0, d3.max(data.map(function(d) { return d.price; }))])
        .range([400, 0])

    var maxExtent = x.domain();


    svg.selectAll('circle')
        .data(data).enter()
      .append('circle')
        .attr('cx', function(d){ return x(d.date); })
        .attr('cy', function(d){ return y(d.price); })
        .attr('r', 5)
        .on('mouseover', function(d, i){ dispatch.hover(d) })

    brush.on('brush', function(){
      x.domain(brush.empty() ? maxExtent : brush.extent());
      svg.selectAll('circle')
          .attr('cx', function(d){ return x(d.date); })
          .attr('cy', function(d){ return y(d.price); })
    })

    return graph;
  }

  graph.data = function(_x){
    if (!arguments.length) return data;
    data = _x;
    return graph;
  };

  graph.parentEl = function(_x){
    if (!arguments.length) return parentEl;
    parentEl = _x;
    return graph;
  }

  graph.brush = function(_x){
    if (!arguments.length) return brush;
    brush = _x;
    return graph;
  }

  graph.currentHover = function(_x){
    if (!arguments.length) return currentHover;
    currentHover = _x;
    //highlight current hover

    return graph;
  }

  return d3.rebind(graph, dispatch, 'on');
}