var graphs = {};
graphs.scatter = function(){
  var svg,
      data,
      parentEl,
      currentHover,
      dispatch = d3.dispatch('hover');

  var graph = {};
  graph.draw = function(){
    d3.select(parentEl).select('svg').remove();
    
    svg = d3.select(parentEl).append('svg')

    //.on('mouseover', function(d, i){ dispatch.hover(d) })

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

  graph.currentHover = function(_x){
    if (!arguments.length) return currentHover;
    currentHover = _x;
    //highlight current hover

    return graph;
  }

  return d3.rebind(graph, dispatch, 'on');
}