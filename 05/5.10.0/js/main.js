/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 2 - Gapminder Clone
*/


var f_data = [];

d3.json("data/data.json").then(function(data){
	data.forEach(d => {
		f_data = d.countries.filter(c => c.income != null && c.life_exp != null)
	});
});

var margin = { top: 10, right: 10, bottom: 100, left: 100 },
	width = 600 - margin.left - margin.right,
	height = 400 - margin.top - margin.bottom;

var g = d3.select('#chart-area').append('svg')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
		.append('g')
			.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

