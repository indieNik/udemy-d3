/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

var margin = { top: 10, right: 10, bottom: 100, left: 100 },
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
    
var g = d3.select('#chart-area')
    .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
            .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

d3.json('data/revenues.json').then(data => {
    
    data.forEach(d => {
        d.revenue = +d.revenue;
    });

    console.log(data);
    
    var x = d3.scaleBand()
        .domain(data.map(d => d.month))
        .range([0, width])
        .paddingInner(0.3)
        .paddingOuter(0.3)

    var y = d3.scaleLinear()
        .domain([0, d3.max(data, d => { return d.revenue })])
        .range([height, 0])
    
    var xAxisCall = d3.axisBottom(x);
    g.append('g')
        .attr('transform', 'translate(' + 0 + ',' + height + ')')
        .call(xAxisCall);

    var yAxisCall = d3.axisLeft(y)
        .tickFormat(axisLabel => {
            return '$' + axisLabel;
        });
    g.append('g')
        .call(yAxisCall);
    
    // X-Axis Label
    g.append('text')
        .attr('text-anchor', 'middle')
        .attr('x', width / 2)
        .attr('y', height + 50)
        .attr('font-size', '20px')
        .text('Month')

    // Y-Axis Label
    g.append('text')
        .attr('text-anchor', 'middle')
        .attr('x', -160)
        .attr('y', -60)
        .attr('transform', 'rotate(-90)')
        .attr('font-size', '20px')
        .text('Revenue')

    var rects = g.selectAll('rect')
        .data(data);
    
    rects.enter()
    .append('rect')
    .attr('width', x.bandwidth)
    .attr('height', d => {
        return height - y(d.revenue);
    })
    .style('fill', 'gray')
    .attr('x', data => {
        return x(data.month);
    })
    .attr('y', data => {
        return y(data.revenue);
    })
});
