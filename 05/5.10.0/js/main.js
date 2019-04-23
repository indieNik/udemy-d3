/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 2 - Gapminder Clone
*/


var f_data = [];

var margin = { left:80, right:20, top:50, bottom:100 };

var width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var flag = true;

var t = d3.transition().duration(750);
    
var g = d3.select("#chart-area")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

var xAxisGroup = g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height +")");

var yAxisGroup = g.append("g")
    .attr("class", "y axis");

// X Scale
var x = d3.scaleLog()
    .range([0, width])
    .base(10)

// Y Scale
var y = d3.scaleLinear()
    .range([height, 0]);

// X Label
g.append("text")
    .attr("y", height + 50)
    .attr("x", width / 2)
    .attr("font-size", "16px")
    .attr("text-anchor", "middle")
    .text("GDP Per Capita ($)");

// Y Label
var yLabel = g.append("text")
    .attr("y", -60)
    .attr("x", -(height / 2))
    .attr("font-size", "16px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Life Expectency (Years)");

d3.json("data/data.json").then(function(data){

	// Clean data
    data.forEach(d => {
		d.countries = d.countries.filter( c => (c.income != null && c.life_exp != null));
	});
	
	console.log(data);
	
    // d3.interval(function(){
    //     // At the end of our data, loop back
    //     var time = (time < 214) ? time+1 : 0
    //     update(data[time].countries);
    // }, 100);

    // First run of the visualization
    update(data[0].countries);
});

function update(data) {
    
    x.domain([300, 15000]);
    y.domain([0, 90]);

    // X Axis
    var xAxisCall = d3.axisBottom(x)
        .tickValues([400, 4000, 40000]);
    xAxisGroup.transition(t).call(xAxisCall);;

    // Y Axis
    var yAxisCall = d3.axisLeft(y)
    yAxisGroup.transition(t).call(yAxisCall);

    // JOIN new data with old elements.
    var bubbles = g.selectAll("circle")
        .data(data, function(d){
            return d;
        });

    // EXIT old elements not present in new data.
    bubbles.exit()
        .attr("fill", "red")
    .transition(t)
        .attr("cy", y(0))
        .remove();

    // ENTER new elements present in new data...
    bubbles.enter()
        .append("circle")
            .attr("fill", "grey")
            .attr("cy", y(0))
            .attr("cx", function(d){ return x(d.month) })
            .attr("r", 5)
            // AND UPDATE old elements present in new data.
            .merge(bubbles)
            .transition(t)
                .attr("cx", function(d){ return x(d.month) })
                // .attr("cy", function(d){ return y(d[value]); });

    

}



