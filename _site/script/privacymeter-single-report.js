// d3.select(window).on("resize", throttle);

//set the sclae of colours in two different ways
// var cs = chroma.scale('OrRd').colors(6); //OrRd scale designed colours to fit well


var cs = [
  "#eff3ff",
  "#c6dbef",
  "#9ecae1",
  "#6baed6",
  "#4292c6",
  "#2171b5",
  "#084594"
]


var c = document.getElementById('trafficMap');
var width = c.offsetWidth;
var height = width / 2;


//offsets for tooltips
var offsetL = c.offsetLeft+20;
var offsetT = c.offsetTop+10;

var topo,projection,path,svg,g;

//var graticule = d3.geo.graticule();
var graticule = d3.geoGraticule();

var tooltip = d3.select("#trafficMap").append("div").attr("class", "tooltip hidden");

setup(width,height);

function setup(width,height){
  projection = d3.geoMercator()
    .translate([(width/2), (height/2)])
    .scale( width / 3 / Math.PI);

  path = d3.geoPath().projection(projection);

  svg = d3.select("#trafficMap").append("svg")
      .attr("width", width)
      .attr("height", height)
      //.call(zoom)
      //.on("click", click)
      .append("g");

  g = svg.append("g")
         .on("click", click);

}

d3.json("data/world-topo-min.json", function(error, world) {

  var countries = topojson.feature(world, world.objects.countries).features;

  topo = countries;
  //draw(topo);

});

function handleMouseOver(){
  var mouse = d3.mouse(svg.node()).map( function(d) { return parseInt(d); } );
  var ratio = ratio_dict[this.__data__.properties.name] || "Unknown"


  tooltip.classed("hidden", false)
    .attr("style", "left:"+(mouse[0]+offsetL)+"px;top:"+(mouse[1]+offsetT)+"px")
    .html(this.__data__.properties.name + "\n" + ratio);
}

function handleMouseOut(){
  tooltip.classed("hidden", true);
}

function draw(topo) {

 //map legend creation
 // d3.select(window).on("resize", throttle);

 //set the sclae of colours in two different ways
 // var cs = chroma.scale('OrRd').colors(6); //OrRd scale designed colours to fit well




 var c = document.getElementById('trafficMap');
 var width = c.offsetWidth;
 var height = width / 2;


 //offsets for tooltips
 var offsetL = c.offsetLeft+20;
 var offsetT = c.offsetTop+10;

 var topo,projection,path,svg,g;

 //var graticule = d3.geo.graticule();
 var graticule = d3.geoGraticule();

 var tooltip = d3.select("#trafficMap").append("div").attr("class", "tooltip hidden");

 setup(width,height);

 function setup(width,height){
   projection = d3.geoMercator()
     .translate([(width/2), (height/2)])
     .scale( width / 2 / Math.PI);

   path = d3.geoPath().projection(projection);

   svg = d3.select("#trafficMap").append("svg")
       .attr("width", width)
       .attr("height", height)
       //.call(zoom)
       //.on("click", click)
       .append("g");

   g = svg.append("g")
          .on("click", click);

 }

 d3.json("data/world-topo-min.json", function(error, world) {

   var countries = topojson.feature(world, world.objects.countries).features;

   topo = countries;
   //draw(topo);

 });

 function handleMouseOver(){
   var mouse = d3.mouse(svg.node()).map( function(d) { return parseInt(d); } );
   var ratio = ratio_dict[this.__data__.properties.name] || "Unknown"


   tooltip.classed("hidden", false)
     .attr("style", "left:"+(mouse[0]+offsetL)+"px;top:"+(mouse[1]+offsetT)+"px")
     .html(this.__data__.properties.name + "\n" + ratio);
 }

 function handleMouseOut(){
   tooltip.classed("hidden", true);
 }




 function redraw() {
   width = c.offsetWidth;
   height = width / 2;
   d3.select('svg').remove();
   setup(width,height);
   draw(topo);
 }


 function move() {

   var t = [d3.event.transform.x,d3.event.transform.y];
   var s = d3.event.transform.k;
   zscale = s;
   var h = height/4;

   t[0] = Math.min(
     (width/height)  * (s - 1),
     Math.max( width * (1 - s), t[0] )
   );

   t[1] = Math.min(
     h * (s - 1) + h * s,
     Math.max(height  * (1 - s) - h * s, t[1])
   );

   //zoom.translateBy(t);
   g.attr("transform", "translate(" + t + ")scale(" + s + ")");

   //adjust the country hover stroke width based on zoom level
   d3.selectAll(".country").style("stroke-width", 0.5 / s);

 }

 var throttleTimer;
 function throttle() {
   window.clearTimeout(throttleTimer);
     throttleTimer = window.setTimeout(function() {
       redraw();
     }, 200);
 }


 //geo translation on mouse click in map
 function click() {
   var latlon = projection.invert(d3.mouse(this));
   console.log(latlon);
 }


 //function to add points and text to the map (used in plotting capitals)
 function addpoint(lon,lat,text) {

   var gpoint = g.append("g").attr("class", "gpoint");
   var x = projection([lon,lat])[0];
   var y = projection([lon,lat])[1];

   gpoint.append("svg:circle")
         .attr("cx", x)
         .attr("cy", y)
         .attr("class","point")
         .attr("r", 1.5);

   //conditional in case a point has no associated text
   if(text.length>0){

     gpoint.append("text")
           .attr("x", x+2)
           .attr("y", y+2)
           .attr("class","text")
           .text(text);
   }

 }

 var ratio_dict = {}

 function countryFill(countryName){

   countries = Object.keys(top_trackers)

   for (var i = 0; i < countries.length; i++){
     //console.log("before")
     var ratio_trackers = parseFloat(top_trackers[countries[i]] * 100).toFixed(2)
     //console.log(ratio_trackers)
     //console.log("after")
     ratio_dict[countries[i]] = ratio_trackers + "%";
     //console.log(ratio_dict)
     if (countries[i] == countryName){

       if (ratio_trackers == 0){
         return cs[0];

       } else if (ratio_trackers < 10){
         return cs[2];

       } else if (ratio_trackers < 20){
         return cs[3];

       } else if (ratio_trackers < 30){
         return cs[4];

       } else if (ratio_trackers < 60){
         return cs[5];

       } else if (ratio_trackers >= 60){
         return cs[6];
           }
     }
   }
   return "white";
 }



  var color_domain = [50, 150, 350, 750, 1500]
  var ext_color_domain = [ 50, 150, 350, 750, 1500]
  var legend_labels = ["< 10%", "< 20%", "< 30%", "< 60%", "> 60%"]

  var color = d3.scaleThreshold()
  .domain(color_domain)
  .range(cs)

  var legend = svg.selectAll("g.legend")
  .data(ext_color_domain)
  .enter().append("g")
  .attr("class", "legend");

  var ls_w = 10, ls_h = 20;

  legend.append("rect")
  .attr("x", 20)
  .attr("y", function(d, i){ return height - (i*ls_h) - 2*ls_h;})
  .attr("width", ls_w)
  .attr("height", ls_h)
  .style("fill", function(d, i) { return color(d); })
  .style("opacity", 0.8);

  legend.append("text")
  .attr("x", 40)
  .attr("y", function(d, i){ return height - (i*ls_h) - ls_h - 4;})
  .text(function(d, i){ return legend_labels[i]; });

  legend.append("text")
    .attr("x", 20)
    .attr("y", function(d, i){ return height - (6*ls_h) - ls_h - 4;})
    .attr("style","font-size: 14px; position: absolute;")
    .text("Top fingerprinted countries & % of the total visits");



  svg.append("path")
     .datum(graticule)
     .attr("class", "graticule")
     .attr("d", path);


  g.append("path")
   .datum({type: "LineString", coordinates: [[-180, 0], [-90, 0], [0, 0], [90, 0], [180, 0]]})
   .attr("class", "equator")
   .attr("d", path);


  var country = g.selectAll(".country").data(topo);

  country.enter().insert("path").attr("class", "country").attr("d", path).attr("id", function(d,i) { return d.id; }).attr("title", function(d,i) { return d.properties.name; }).style("fill", function(d, i) { return countryFill(d.properties.name); }).style("stroke", "#000").style("stroke-width", "0.7px").on("mouseover", handleMouseOver).on("mouseout", handleMouseOut);

}
  //.style("fill", function(d, i) { return d.properties.color; })

function redraw() {
  width = c.offsetWidth;
  height = width / 2;
  d3.select('svg').remove();
  setup(width,height);
  draw(topo);
}


function move() {

  var t = [d3.event.transform.x,d3.event.transform.y];
  var s = d3.event.transform.k;
  zscale = s;
  var h = height/4;

  t[0] = Math.min(
    (width/height)  * (s - 1),
    Math.max( width * (1 - s), t[0] )
  );

  t[1] = Math.min(
    h * (s - 1) + h * s,
    Math.max(height  * (1 - s) - h * s, t[1])
  );

  //zoom.translateBy(t);
  g.attr("transform", "translate(" + t + ")scale(" + s + ")");

  //adjust the country hover stroke width based on zoom level
  d3.selectAll(".country").style("stroke-width", 0.5 / s);

}

var throttleTimer;
function throttle() {
  window.clearTimeout(throttleTimer);
    throttleTimer = window.setTimeout(function() {
      redraw();
    }, 200);
}


//geo translation on mouse click in map
function click() {
  var latlon = projection.invert(d3.mouse(this));
  //console.log(latlon);
}


//function to add points and text to the map (used in plotting capitals)
function addpoint(lon,lat,text) {

  var gpoint = g.append("g").attr("class", "gpoint");
  var x = projection([lon,lat])[0];
  var y = projection([lon,lat])[1];

  gpoint.append("svg:circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("class","point")
        .attr("r", 1.5);

  //conditional in case a point has no associated text
  if(text.length>0){

    gpoint.append("text")
          .attr("x", x+2)
          .attr("y", y+2)
          .attr("class","text")
          .text(text);
  }

}

var ratio_dict = {}

