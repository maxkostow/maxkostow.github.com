document.addEventListener('DOMContentLoaded', function() {

window.modo || (window.modo = {});

window.modo.margin = {top: 20, right: 20, bottom: 30, left: 40};
window.modo.width = 950,
window.modo.height = 600;

var svgs = d3.selectAll('.svg-modo')
      .attr("width", window.modo.width + window.modo.margin.left + window.modo.margin.right)
      .attr("height", window.modo.height + window.modo.margin.top + window.modo.margin.bottom)
    .append("g")
      .attr("transform", "translate(" + window.modo.margin.left + "," + window.modo.margin.top + ")");

d3.csv("/media/2014-01-04-modo-2013/modo.csv", function(err, data) {
  window.modo.teachers(d3.select(svgs[0][0]), data);
  window.modo.time.teachers(d3.select(svgs[0][1]), data);
  window.modo.time.classes(d3.select(svgs[0][2]), data);
});

});