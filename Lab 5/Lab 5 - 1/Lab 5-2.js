function init(){

    var w = 500;
    var h = 100;
    var barPadding = 3;

    var dataset = [14, 5, 26, 23, 9];

    var xScale = d3.scaleBand()
                    .domain(d3.rangeRound(dataset.length))
                    .range([0,w])
                    .paddingInner(0.05);
    
    var yScale = d3.scaleBand()
                    .domain(d3.rangeRound(dataset.length))
                    .range([h,0])
                    .paddingInner(0.05);

    var svg = d3.select("body")
    			.append("svg")
	    		.attr("width", xScale.bandwith())
		    	.attr("height", yScale)
			    .attr("fill", "rgb(106, 90, 205)");

    svg.selectAll("rect")
	    .data(dataset)
	    .enter()
	    .append("rect")
	    .attr("x", function(d, i){	
		    return i * xScale(w/dataset.length);
	    })
	    .attr("y", function(d){
		    return yScale - (d*4)
	    })
	    .attr("width", function(d){	
		    return (w/dataset.length-barPadding);
	    })
	    .attr("height", function(d){
		    return d*4
	    });


	    svg.selectAll("text")
	    	.data(dataset)
	    	.enter()
	    	.append("text")
	    	.text(function(d){
	    		return d;
	    	})
	    	.attr("fill", "black")
	    	.attr("x", function(d, i){
	    		return i * (w/dataset.length) + 25;
	    	})
	    	.attr("y", function(d){
	    		return h - (d*3)
	    	});

        }

window.onload = init;