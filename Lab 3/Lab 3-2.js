function init(){
    var w = 600;
	var h = 500;
	var barPadding = 3;
	var padding = 75;
	

	var dataset = [
					[5, 20], 
					[480, 90], 
					[250, 50],
					[100, 33],
					[330, 95],
					[410, 12],
					[475, 44],
					[25, 67],
					[85, 21],
					[220, 88]
				];

	var xScale = d3.scaleLinear()
					.domain([d3.min(dataset, function(d){
						return d[0];
					}),
				d3.max(dataset, function(d){
					return d[0];
				})])
				.range([padding, w - padding + 10]);

	var yScale = d3.scaleLinear()
					.domain([d3.min(dataset, function(d){
						return d[1];
					}),
				d3.max(dataset, function(d){
					return d[1];
				})])
				.range([h - padding , padding]);

    var xAxis = d3.axisBottom()
                .scale(xScale)
                .ticks(10);

    var yAxis = d3.axisLeft()
                .scale(yScale)
                .ticks(10);

	var svg = d3.select("body")
				.append("svg")
				.attr("width", w)
				.attr("height", h)
				.attr("fill", "rgb(106, 90, 205)");
	
		
	svg.selectAll("circle")
		.data(dataset)
		.enter()
		.append("circle")
		.attr("cx", function(d, i){	
			return xScale(d[0]);
		})
		.attr("cy", function(d){
			return yScale(d[1]);
		})
		.attr("r", function(d){
			return 5;
		})
		.attr("fill", "slategrey");
			svg.selectAll("text")
			.data(dataset)
			.enter()
			.append("text")
			.text(function(d){
				return d[0] + ", " + d[1];
			})
			.attr("fill", "black")
			.attr("x", function(d){
				return xScale(d[0]);
			})
			.attr("y", function(d){
				return yScale(d[1]);
		});
	
    svg.append("g")  
        .attr("class", "x axis")  
        .attr("transform", "translate(0, " + (h - padding) + ")")  
        .call(xAxis);  

    svg.append("g")  
        .attr("class", "y axis")  
        .attr("transform", "translate(" + padding + ", 0)")  
        .call(yAxis);  
    }
window.onload =init;