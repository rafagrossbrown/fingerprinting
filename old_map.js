// Traffic Map

d3.select(window).on("resize", throttle);

var zoom= d3.zoom()
            .scaleExtent([1,8])
            .on("zoom",move);

var width= document.getElementById('containerMap').offsetWidth-20;
var height= width /2;

var topo,projection,path,svg,g;



setup(width,height);

function setup(width,height){
  projection= d3.geoMercator()
                .translate([0,0])
                .scale(width /2 / Math.PI);

  path= d3.geoPath()
          .projection(projection);

  svg=d3.select("#containerMap").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width/2 + "," + height /2 + ")")
        // .call(zoom);

g = svg.append("g");

}
 
d3.json("data/world-topo.json", function (error, world) {

 
  // var countries = world.objects;
  //topojson.feature  returns a features collection
  var countries= topojson.feature(world, world.objects.countries).features;

  topo = countries;

  draw(topo);

 
 
   

});                

// draw function

function draw(topo){

var country= g.selectAll(".country").data(topo);

country.enter().insert("path")
      .attr("class","country")
      .attr("d",path)
      .attr("id", function(d,i) { return d.id; })
      .attr("title", function (d,i) {return d.properties.name})
     .style("fill", "white");
   
     
      // .style("fill", function(d,i) {return d.properties.color;});

  //ofsets plus width/height of transform, plsu 20 px of padding, plus 20 extra for tooltip offset off mouse
  var offsetL = document.getElementById('containerMap').offsetLeft+(width/2)+40;
  var offsetT =document.getElementById('containerMap').offsetTop+(height/2)+20;

//tooltips
country.on("mousemove", function(d,i){
          var mouse= d3.mouse(svg.node()).map(function (d) {return parseInt (d);});
            tooltip.classed("hidden",false)
              .attr("style", "left:" + (mouse[0] + offsetL) + "px;top:"+ (mouse[1]+offsetT)+ "px")
              .html(d.properties.name)
          })
        .on("mouseout", function(d,i){
          tooltip.classed("hidden",true)
        });
}

function redraw() {
  width= document.getElementById('containerMap').offsetWidth-60;
  height= width/2;
  d3.select('svg').remove();
  setup(width,height);
  draw(topo);
}


//move() es el callback del var zoom
function move(){

  var t= d3.event.translate;
  var s = d3.event.scale;
  var h = height/3;

  t[0]= Math.min(width/ 2 * (s-1), Math.max(width /2 * (1-s), t[0]));
  t[1]= Math.min(height /2 * (s-1) + h * s, Math.max(height/2 *(1-s) - h * s, t[1]));

  zoom.translate(t);
  g.style("stroke-width",1/s).attr("transform", "translate(" + t + ")scale(" + s + ")");


}

var throttleTimer;

function throttle(){
  window.clearTimeout(throttleTimer);
    throttleTimer = window.setTimeout(function(){
      redraw();
    }, 200);

    }
//closemap 