/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!
*/

var margin = { top: 10, right: 10, bottom: 100, left: 100 };

var width = 500 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var g = d3.select('#chart-area')
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")

d3.json('data/buildings.json').then(data => {
    data.forEach(d => {
        d.height = +d.height;
    });    

    var bandScale = d3.scaleBand()
        .domain(data.map( d => { return d.name }))
        .range([0, width])
        .paddingInner(0.3)
        .paddingOuter(0.3); 

    var linearScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => { return d.height })])
        .range([0, height]);
        
    
    var rects = g.selectAll('rect')
        .data(data);
    
    var xAxisCall = d3.axisBottom(bandScale);
    g.append("g")
        .attr('class', "x-axis")
        .attr("transform", "translate(" + 0 + ", " + height + ")")
        .call(xAxisCall)
        .selectAll("text")
            .attr("text-anchor", "end")
            .attr('transform', 'rotate(-40)')
            .attr('x', -7)
            .attr('y', 5)

    var yAxisCall = d3.axisLeft(linearScale)
        .ticks(3)
        .tickFormat(d => {
            return d + 'm';
        })
    g.append("g")
        .attr('class', "y-axis")
        .call(yAxisCall);

    rects.enter()
        .append('rect')
            .attr('x', (d) => {
                return bandScale(d.name);
            })
            .attr('width', bandScale.bandwidth)
            .attr('height', (d) => {
                return linearScale(d.height);
            })
            .style('fill', 'grey');
    
}).catch(err => {
    console.log("Caught", err);
})