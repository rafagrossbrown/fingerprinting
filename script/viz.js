// var data=[10,20,30,40,50];

//Fingerprinted Traffic by Website Category
var svg = d3.select("svg"),
    margin = {top: 20, right: 50, bottom: 30, left: 100},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;
  
var tooltip = d3.select("body").append("div").attr("class", "toolTip");
  
var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleBand().range([height, 0]);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
d3.json("horizontalData.json", function(error, data) {
    if (error) throw error;
  
    data.sort(function(a, b) { return a.value - b.value; });
  
    x.domain([0, d3.max(data, function(d) { return d.value; })]);
    y.domain(data.map(function(d) { return d.category; })).padding(0.1);

    g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(5).tickFormat(function(d) { return parseInt(d / 1000); }).tickSizeInner([-height]));

    g.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y));

    g.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("height", y.bandwidth())
        .attr("y", function(d) { return y(d.category); })
        .attr("width", function(d) { return x(d.value); })
        .on("mousemove", function(d){
      // Replace hard coded vals (50, 90) with 50% of the tooltip wioth and height + a top buffer
            tooltip
              .style("left", d3.event.pageX - 50 + "px")
              .style("top", d3.event.pageY - 90 + "px")
              .style("display", "inline-block")
              .html((d.category) + "<br><span>" + (d.value) + "   "+ "tracked visits" + "</span>");
        })
        .on("mouseout", function(d){ tooltip.style("display", "none");});
});              


// PERCENTAGE OF NEWS SITES DOUGHNUT  
// thevariable data is defined as an argument in the callback function of d3 json
// d3.json("mydata.json", function(data) {
    var data=[75,25];
    var r=150;
    var color= d3.scaleOrdinal()
                  .range(["blue", "white"]);



    var canvas= d3.select("#doughnut").append("svg")
          .attr("width", 500)
          .attr("height", 500);

    var group= canvas.append("g")
                    .attr("transform", "translate(300,200)");


// creat an arc path generator. the path function will fetch info from here.
    var arc= d3.arc()
              .innerRadius(75)
              .outerRadius(r);

var pie= d3.pie()
          .value(function (d){ return d; });


// fetch data, then pass it through the Pie Layout "var pie"    
var arcs = group.selectAll(".arc")
                .data(pie(data))
                .enter()
                  .append("g")
                  .attr("class","arc")
         

          // append paths

          arcs.append("path")
            .attr("d", arc)
            .attr("fill", function(d) { return color(d.data);})

            arcs.append("text")
                .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")";})
                .attr("text-anchor","middle")
                .attr("font-size","24px")
                .attr("fill", "white")
                .text(function(d) { return d.data + " %"  ;});


