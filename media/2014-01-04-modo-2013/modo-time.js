;(function() {

var oneDay = 1000 * 60 * 60 * 24;
var dayOfYear = _.memoize(function(ds) {
  var da = ds.split('/');
  var y = parseInt(da[2], 10);
  var m = parseInt(da[0], 10) - 1;
  var d = parseInt(da[1], 10);
  var date = new Date(y, m, d);
  var start = new Date(date.getFullYear(), 0, 0);
  var diff = date - start;
  return Math.floor(diff / oneDay);
});

var classColorMap = {
  'Modo': '#903033',
  'Modo Flow': '#EA9B42',
  'Free Style Flow': '#494A47',
  'Yang Yin': '#EE6A38',
  'Hot Yin': '#61875B'
};
var nSteps = 20;
var classColorSteps = _.chain(nSteps).times(_.identity).map(function(n) {
  return n / nSteps * 5;
}).flatten().value();

var colorClass = d3.scale.ordinal()
      .domain(_.keys(classColorMap))
      .range(_.values(classColorMap));
var colorTeacher = d3.scale.category20c();

var stack = d3.layout.stack()
      .values(function(d) { return d.values; });

(window.modo || (window.modo = {})).time = {
  classes: function(svg, data) {
    var x = d3.scale.linear()
        .domain([0, 364]);

    var y = d3.scale.linear();

    var xAxis = d3.svg.axis()
        .scale(x)
        .tickValues([
          dayOfYear('01/03/2013'),
          dayOfYear('02/03/2013'),
          dayOfYear('03/03/2013'),
          dayOfYear('04/03/2013'),
          dayOfYear('05/03/2013'),
          dayOfYear('06/03/2013'),
          dayOfYear('07/03/2013'),
          dayOfYear('08/03/2013'),
          dayOfYear('09/03/2013'),
          dayOfYear('10/03/2013'),
          dayOfYear('11/03/2013'),
          dayOfYear('12/03/2013')
        ])
        .tickFormat(function(d) {
          return ([
            'Januray',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
          ])[(new Date(2013, 0, d)).getMonth()];
        })
        .orient("bottom");
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("right");
    var area = d3.svg.area()
        .x(function(d) { return x(d.x); })
        .y0(function(d) { return y(d.y0); })
        .y1(function(d) { return y(d.y0 + d.y); })
        .interpolate('basis');

    var classes = _.chain(data).map(function(cls) {
      return _.extend({ doy: dayOfYear(cls.Date) }, cls);
    }).sortBy('doy').value();

    var filters = _.object.apply(null, _.zip.apply(null, 
      _.chain(data).pluck('Teacher').unique().map(function(t) { return [t, true]; }).union(
        _.chain(data).pluck('Class').unique().map(function(t) { return [t, true]; }).value()
      ).value()));

    var buildStack = function() {
      return stack(_.chain(classes).groupBy('Class').map(function(classes, className) {
        return _.chain(classes).groupBy('Teacher').map(function(classes, teacher) {
          return {
            className: className,
            teacher: teacher,
            classes: classes,
            total: classes.length,
            values: _.chain(365).times(_.identity).map(function(i) {
              var prior = _.filter(classes, function(cls) {
                return cls.doy <= i;
              });
              return {
                x: i,
                y: filters[className] && filters[teacher] ? prior.length : 0,
                prior: prior
              };
            }).value()
          };
        }).sortBy(function(obj) {
          return dayOfYear(classes[0].Date);
        }).tap(function(arr) {
           classTeachers[className] = _.pluck(arr, 'teacher');
        }).value();
      }).sortBy(function(arr) {
        return _.chain(classes).where({ Class: arr[0].className }).first().doy;
      }).flatten().value());
    };

    var classTeachers = {};
    var byClass = buildStack();

    var transition = function() {
      svg.selectAll('path')
          .data(buildStack())
        // .transition()
          // .duration(1000)
          // .ease('cubic-in-out')
          .attr("d", function(d) { return area(d.values); });

      legend.selectAll('rect')
        .style("fill", function(d) {
          return filters[d] ? colorClass(d) : 'white';
        });
    };

    x.range([0, window.modo.width]);
    y.range([window.modo.height, 0]);
    y.domain([0, Math.ceil(d3.max(byClass, function(layer) { return d3.max(layer.values, function(d) { return d.y0 + d.y; }); }) / 10) * 10]);

    svg.selectAll("path")
      .data(byClass)
    .enter().append("path")
      .attr("d", function(d) { return area(d.values); })
      .style("fill", function(d) {
        var c = d3.rgb(colorClass(d.className));
        var b = classColorSteps[classTeachers[d.className].indexOf(d.teacher)];
        return c.brighter(b).toString();
      })
    .append("title")
      .text(function(d) { return d.className + ' - ' + d.teacher; });

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + window.modo.height + ")")
        .call(xAxis);
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + window.modo.width + ",0)")
        .call(yAxis);


    var legend = svg.selectAll(".legend")
        .data(colorClass.domain().slice())
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; })
        .on('click', function(d) {
          filters[d] = !filters[d];
          transition();
        });

    legend.append("rect")
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function(d) {
          return filters[d] ? colorClass(d) : 'white';
        });

    legend.append("text")
        .attr("x", 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .text(function(d) { return d; });
  },
  teachers: function(svg, data) {
    var x = d3.scale.linear()
        .domain([0, 364]);

    var y = d3.scale.linear();

    var xAxis = d3.svg.axis()
        .scale(x)
        .tickValues([
          dayOfYear('01/03/2013'),
          dayOfYear('02/03/2013'),
          dayOfYear('03/03/2013'),
          dayOfYear('04/03/2013'),
          dayOfYear('05/03/2013'),
          dayOfYear('06/03/2013'),
          dayOfYear('07/03/2013'),
          dayOfYear('08/03/2013'),
          dayOfYear('09/03/2013'),
          dayOfYear('10/03/2013'),
          dayOfYear('11/03/2013'),
          dayOfYear('12/03/2013')
        ])
        .tickFormat(function(d) {
          return ([
            'Januray',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
          ])[(new Date(2013, 0, d)).getMonth()];
        })
        .orient("bottom");
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("right");
    var classes = _.chain(data).map(function(cls) {
      return _.extend({ doy: dayOfYear(cls.Date) }, cls);
    }).sortBy('doy').value();

    var area = d3.svg.area()
        .x(function(d) { return x(d.x); })
        .y0(function(d) { return y(d.y0); })
        .y1(function(d) { return y(d.y0 + d.y); })
        .interpolate('basis');

    var filters = _.object.apply(null, _.zip.apply(null, _.chain(data).pluck('Teacher').unique().map(function(t) { return [t, true]; }).value()));

    var buildStack = function() {
      return stack(_.chain(classes).groupBy('Teacher').map(function(classes, teacher) {
        return {
          teacher: teacher,
          classes: classes,
          total: classes.length,
          values: _.chain(365).times(_.identity).map(function(i) {
            var prior = _.filter(classes, function(cls) {
              return cls.doy <= i;
            });
            return {
              x: i,
              y: filters[teacher] ? prior.length : 0,
              prior: prior
            };
          }).value()
        };
      }).sortBy(function(obj) {
        return dayOfYear(obj.classes[0].Date);
      }).value());
    };

    var transition = function() {
      svg.selectAll('path')
          .data(buildStack())
        .transition()
          .duration(1000)
          .ease('cubic-in-out')
          .attr("d", function(d) { return area(d.values); });

      legend.selectAll('rect')
        .style("fill", function(d) {
          return filters[d] ? colorTeacher(d) : 'white';
        });
    };

    var byTeacher = buildStack();

    x.range([0, window.modo.width]);
    y.range([window.modo.height, 0]);
    y.domain([0, Math.ceil(d3.max(byTeacher, function(layer) { return d3.max(layer.values, function(d) { return d.y0 + d.y; }); }) / 10) * 10]);
    
    colorTeacher.domain(_.pluck(byTeacher, 'teacher'));

    svg.selectAll("path")
      .data(byTeacher)
    .enter().append("path")
      .attr("d", function(d) { return area(d.values); })
      .style("fill", function(d) {
        return colorTeacher(d.teacher);
      })
    .append("title")
      .text(function(d) { return d.teacher; });

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + window.modo.height + ")")
        .call(xAxis);
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + window.modo.width + ",0)")
        .call(yAxis);

  var legend = svg.selectAll(".legend")
      .data(colorTeacher.domain().slice())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; })
      .on('click', function(d) {
        filters[d] = !filters[d];
        transition();
      });

  legend.append("rect")
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", function(d) {
        return filters[d] ? colorTeacher(d) : 'white';
      });

  legend.append("text")
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .text(function(d) { return d; });
  }
};

})();