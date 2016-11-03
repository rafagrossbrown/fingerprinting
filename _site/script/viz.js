// Visualization 1 -- Global Overview
//Get website object with a certain url.
// ALL DATA URL: https://privacymeter-eddbf.firebaseio.com/.json
var globalData, total_sites,fingerprint_sites; // a global

  d3.json("https://privacymeter-eddbf.firebaseio.com/data/global.json", function(json) {
  globalData = json;
       

 
 
      
  // draw global data doughnut viz
  visualizeDataT();
  drawDoughnuts("categories","business","#category1");
  drawDoughnuts("categories","news","#category2");
    drawDoughnuts("categories","health","#category3");
     drawDoughnuts("categories","kids_and_teens","#category4");
     drawDoughnuts("categories","computers","#category5");
     drawDoughnuts("categories","shopping","#category6");
     drawDoughnuts("categories","arts","#category7");
     drawDoughnuts("categories","home","#category8");

 
});


function visualizeDataT(){  

 total_sites =globalData.websites;
 fingerprint_sites = globalData.websites_tracking;

// console.log("FP Sites===" + total_sites);
// console.log("FP Sites===" + fingerprint_sites);
// console.log("PERCENTAGE of sites that fingerprint ===" + "    "+ fingerprint_sites/total_sites);
var fpPercent=fingerprint_sites/total_sites*100;
//limit the float width, number of decimals
fpPercent= d3.format(".3g")(fpPercent);
var noFpPercent= 100-fpPercent;
console.log("formatted =="+fpPercent);



// PERCENTAGE OF NEWS SITES DOUGHNUT  
// thevariable data is defined as an argument in the callback function of d3 json
// d3.json("mydata.json", function(data) {
    var data=[fpPercent,noFpPercent];

    var r=170;
    var color= d3.scaleOrdinal()
                  .range([d3.rgb(111, 37, 127), "#eeeeee"]);
var maxD= d3.max(data);
var minD= d3.min(data);


    var canvas= d3.select("#globalVisitors").append("svg")
          .attr("width", 500)
          .attr("height",500);

    var group= canvas.append("g")
                    .attr("transform", "translate(300,200)");


// creat an arc path generator. the path function will fetch info from here.
    var arc= d3.arc()
              .innerRadius(110)
              .outerRadius(r)


var pie= d3.pie()
          .value(function (d){ return d; });


// fetch data, then pass it through the Pie Layout "var pie"    
var arcs = group.selectAll(".arc")
                .data(pie(data))
                .enter()
                  .append("g")
                  .attr("class","arc")

                 
           
           group.append("text")
                .attr("text-anchor","middle")
                .attr("class","dataHighlight")
                .attr("transform", arc.centroid(minD))
                .text(function(d) { return d3.min(data)+"%";});
// necesitaras enter() method para texto dinamico viniendo de db
          // append paths

          arcs.append("path")
            .attr("d", arc)
            .attr("fill", function(d) { return color(d.data);})

 
// text on arcs
            // arcs.append("text")
            //     .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")";})
            //     .attr("text-anchor","middle")
            //     .attr("font-size","24px")
            //     .attr("fill", "white")
            //     .text(function(d) { return d.data + " %"  ;});

 
   


}


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







    //Fingerprinted Traffic by Website Category
function drawBargraph() {



    var svgCat = d3.select("svg"),
        margin = {top: 20, right: 50, bottom: 30, left: 100},
        width = +svgCat.attr("width") - margin.left - margin.right,
        height = +svgCat.attr("height") - margin.top - margin.bottom;
      
    var tooltip = d3.select("body").append("div").attr("class", "toolTip");
      // map the domain data to the view div width 
    var x = d3.scaleLinear()
              .range([0, width]);
              // map to the view div height
    var y = d3.scaleBand()
              .range([height, 0]);

    var gr = svgCat.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

// URL FOR CATEGORIES: https://privacymeter-eddbf.firebaseio.com/data/global/categories.json      
    d3.json("horizontalData.json", function(error, data1) {
        if (error) throw error;
      
        data1.sort(function(a, b) { return a.value - b.value; });
      //add the domain data
        x.domain([0, d3.max(data1, function(d) { return d.value; })]);
        y.domain(data1.map(function(d) { return d.category; }))
          .padding(0.08);

//Append AXES to svg group
//d3.axis generates the visual elements, it's a 'draw function', are meant to be used with quantitative scales.
//At a minimum, each axis also needs to be told on what scale to operate. Here, x is the scaleLinear
        gr.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).ticks(5).tickFormat(function(d) { return parseInt(d); }).tickSizeInner([-height]));

        gr.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(y));

//APPEND RECTANGLES BOUND TO DATA. Use .enter because data willl be updated
        gr.selectAll(".bar")
            .data(data1)
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
            .on("mouseout", function(d){ tooltip.style("display", "none");})


            // gr.append("text")
            //   .text("TEXTTT");
    });                      
}
//Fingerprinted Traffic by Website Category
drawBargraph();

// PERCENTAGE OF NEWS SITES DOUGHNUT  
function drawDoughnuts(query,target,catDiv){
// PERCENTAGE OF NEWS SITES DOUGHNUT  
// thevariable data is defined as an argument in the callback function of d3 json
// d3.json("mydata.json", function(data) {
 




// 1- get # of total news analyzed
var total= globalData[query][target].websites;
// 2- get # of fingerprint news sites 
var tracking= globalData[query][target].websites_tracking;
// 3- convert to PERCENTAGE
var perc= tracking/total *100;
perc= d3.format(".3g")(perc);
var balance= 100-perc;


var colorMap = {
 arts:d3.rgb(204,0,190),
 health:d3.rgb(0, 190, 204),
 business: d3.rgb(0, 204, 14),
 news:d3.rgb(116, 0, 204) ,
 computers:d3.rgb(18,152,241)  ,
 shopping:d3.rgb(0,204,116)  ,
 home: d3.rgb(116,255,0) ,
 kids_and_teens: d3.rgb(204, 0, 88)
};

// var color= d3.rgb(204, 0, 88);
var color= colorMap[target];


var iconMap={

  arts:"images/icons/film-strip-with-two-photograms.svg"  ,
 health:"images/icons/medical-kit.svg" ,
 business: "images/icons/briefcase.svg" ,
 news:"images/icons/newspaper.svg"   ,
 computers: "images/icons/open-laptop-computer.svg"  ,
 shopping:"images/icons/shopping-cart-black-shape.svg"   ,
 home:"images/icons/home.svg"   ,
 kids_and_teens:  "images/icons/smile.svg" 
}
var icon= iconMap[target];



    var data=[perc, balance];
    var r=100;
    var color= d3.scaleOrdinal()
                  .range([color, "#eeeeee"]);
var maxD= d3.max(data);
var minD= d3.min(data);

var catDiv;

    var canvas= d3.select(catDiv).append("svg")
          .attr("width", 300)
          .attr("height", 300);

           d3.select(catDiv)
              .append("div")
              .attr("class", "doughnutLabel")
              .html("<br><span>" + perc + "%" + "</span>" +"  of " + target + "  sites are fingerprinting.");

                   // .text("Website Category:" + "  "+ target);

    var group= canvas.append("g")
                    .attr("transform", "translate(150,140)");

// creat an arc path generator. the path function will fetch info from here.
    var arc= d3.arc()
              .innerRadius(60)
              .outerRadius(r);

var pie= d3.pie()
          .value(function (d){ return d; });


// fetch data, then pass it through the Pie Layout "var pie"    
var arcs = group.selectAll(".arc")
                .data(pie(data))
                .enter()
                  .append("g")
                  .attr("class","arc");

           
            // group.append("image")
            //     .attr("xlink:href", "url"):
         group.append("svg:image")
                .attr("xlink:href", icon)
                .attr("text-anchor","middle")
                .transition().duration(4000)
                .style("opacity",.5)
                .attr("width", 50)
                .attr("height", 50)
                .attr("x", -25)
                .attr("y",-25);
   


           // group.append("text")
           //      .attr("text-anchor","middle")
           //      .attr("class","doughnutText")
           //      .attr("transform", arc.centroid(minD))
           //      .text(function(d) { return d3.min(data) + "%" ;});
// necesitaras enter() method para texto dinamico viniendo de db
          // append paths

          arcs.append("path")
            .attr("d", arc)            
            .attr("fill", function(d) { return color(d.data);});

            // group.append("text")
            //           .attr("text-anchor","middle")
            //            .attr("transform", "translate(-200,-50)")
            //             .text("News"+ "   "+ "Websites");

       
// text on arcs
            // arcs.append("text")
            //     .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")";})
            //     .attr("text-anchor","middle")
            //     .attr("font-size","24px")
            //     .attr("fill", "white")
            //     .text(function(d) { return d.data + " %"  ;});
   
 }
 

 
 // d3.select("body").transition().style("background-color", "red");
