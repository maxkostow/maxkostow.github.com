;(function() {

var x = d3.scale.ordinal();

var y = d3.scale.linear();

var color = d3.scale.category20c();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".2s"));

(window.modo || (window.modo = {})).teachers = function(svg, data) {
  var d = _.chain(data).tap(function(classes) {
    color.domain(_.chain(data).groupBy('Teacher').pairs().sortBy(function(pair) {
      return -_.last(pair).length;
    }).map(function(pair){ return _.first(pair); }).value());
  }).groupBy('Class').map(function(classes, name) {
    var y0 = 0;
    return {
      name: name,
      total: classes.length,
      teachers: color.domain().map(function(name) {
        var total = _.where(classes, { 'Teacher': name }).length;
        return {
          name: name,
          total: total,
          y0: y0,
          y1: y0 += total
        };
      })
    };
  }).sortBy('total').reverse().value();

  x.rangeRoundBands([0, window.modo.width], .1);
  x.domain(d.map(function(d) { return d.name; }));
  y.rangeRound([window.modo.height, 0]);
  y.domain([0, d3.max(d, function(d) { return d.total; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + window.modo.height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Classes");

  var klass = svg.selectAll(".klass")
      .data(d)
    .enter().append("g")
      .attr("class", "g")
      .attr("transform", function(d) { return "translate(" + x(d.name) + ",0)"; });

  klass.selectAll("rect")
      .data(function(d) { return d.teachers; })
    .enter().append("rect")
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.y1); })
      .attr("height", function(d) { return y(d.y0) - y(d.y1); })
      .style("fill", function(d) { return color(d.name); });
  
  klass.selectAll("text")
      .data(function(d) { return d.teachers; })
    .enter().append("text")
      .attr("x", function(d) { return 3; })
      .attr("y", function(d) { return y(d.y1) + 6; })
      .attr("dy", ".35em")
      .attr("fill", "#fefefe")
      .text(function(d) { return d.total > 0 ? d.name + ': ' + d.total : ''; });

};

})();