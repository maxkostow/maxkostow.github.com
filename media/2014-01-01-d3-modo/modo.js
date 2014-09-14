document.addEventListener('DOMContentLoaded', function() {

var margin = {top: 30, right: 20, bottom: 30, left: 40},
    width = 950 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .rangeRound([height, 0]);

var color = d3.scale.category20b();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(",.0d"));

var svg = d3.select(".svg-modo")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

svg.append("text")
  .attr("class", "svg-modo-title")
  .attr("x", (width / 2))
  .attr("y", (margin.top / 2))
  .attr("text-anchor", "middle")
  .text('Max’s 2013 Modo Yoga Attendance');

var chart = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("/media/2014-01-01-d3-modo/modo.csv", function(error, data) {
  color.domain(_.chain(data).groupBy('Teacher').pairs().sortBy(function(pair) {
    return _.last(pair).length;
  }).map(function(pair){ return _.first(pair); }).value());

  var d = _.chain(data).groupBy('Class').map(function(classes, name) {
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

  x.domain(d.map(function(d) { return d.name; }));
  y.domain([0, Math.ceil(d3.max(d, function(d) { return d.total; }) / 10) * 10]);

  chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  chart.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .attr("fill", 'white')
      .style("text-anchor", "end")
      .text("Classes");

  var klass = chart.selectAll(".class")
      .data(d)
    .enter().append("g")
      .attr("class", "class")
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
      .text(function(d) { return d.total > 0 ? d.name + ': ' + d.total : ''; });

});

});