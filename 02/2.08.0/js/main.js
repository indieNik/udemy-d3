/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!
*/

d3.json('data/buildings.json').then(data => {
    data.forEach(d => {
        d.height = +d.height;
    });

    var margin = {
        top: 10,
        right: 10,
        bottom: 100,
        left: 100
    };

    var width = 500 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;

    var svg = d3.select('#chart-area').append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    
    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
    
    var rects = g.selectAll('rect')
        .data(data);
    
    var linearScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => { return d.height })])
        .range([0, height]);
    
    var logScale = d3.scaleLog()
        .domain([1, 150000])
        .range([0, height])
        .base(10);
    
    var bandScale = d3.scaleBand()
        .domain(data.map( d => { return d.name }))
        .range([0, width])
        .paddingInner(0.3)
        .paddingOuter(0); 

    rects.enter()
        .append('rect')
            .attr('x', (d) => {
                return bandScale(d.name);
            })
            .attr('width', bandScale.bandwidth)
            .attr('height', (d) => {
                console.log(d.height, linearScale(d.height), logScale(d.height));
                return linearScale(d.height);
            })
            .style('fill', 'grey');
    
}).catch(err => {
    console.log("Caught", err);
})