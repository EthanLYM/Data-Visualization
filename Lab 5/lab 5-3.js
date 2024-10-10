function init(){
    
    // Set up SVG dimensions and dataset
    var w = 500;
    var h = 300;
    var barPadding = 3;
    var dataset = [14, 5, 26, 23, 9, 14, 5, 26, 23, 9];

    var xScale = d3.scaleBand()
                    .domain(d3.range(dataset.length))
                    .range([0, w])
                    .paddingInner(0.05);

    var yScale = d3.scaleLinear()
                    .domain([0, d3.max(dataset)])
                    .range([0, h]);

    // Create SVG container
    var svg = d3.select("article.content")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    // Add an axis using d3.axisBottom() for the x-axis
    var xAxis = d3.axisBottom(xScale);

    svg.append("g")
        .attr("transform", "translate(0," + h + ")")
        .call(xAxis);

    // Draw bars for each data point
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return xScale(i);
        })
        .attr("y", function(d) {
            return h - yScale(d);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) {
            return yScale(d);
        })
        
        .attr("fill", "slategrey");  // Set fill color for bars

    // Add button functionality
    d3.select("#addButton").on("click", function() {
        // Generate new random number
        var newNumber = Math.floor(Math.random()*d3.max(dataset));
        dataset.push(newNumber);

        xScale.domain(d3.range(dataset.length));

        // Update the bars with random number
        var bars = svg.selectAll("rect")
            .data(dataset);

        bars.enter()
            // Updates bars here
            .append("rect")
            .attr("x", w)
            .attr("y", function(d) {
                return h - yScale(d);
            })
            .merge(bars)
            .transition()
            .duration(500)
            .attr("x", function(d, i) {
                return xScale(i);
            })
            .attr("y", function(d) {
                return h - yScale(d);
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function(d) {
                return yScale(d);
            })
            .attr("fill", "slategrey");
    });

    d3.select("#removeButton").on("click", function() {
        dataset.shift()
        xScale.domain(d3.range(dataset.length));
        var bars = svg.selectAll("rect")
            .data(dataset);
        svg.selectAll("rect")
            .transition()
            .duration(500)
            .attr("y", function(d) {
                return h - yScale(d);
            })
            .attr("x", function(d, i) {
                return xScale(i);
            })
            .attr("height", function(d) {
                return yScale(d);
            })
            .attr("width", xScale.bandwidth());
        bars.exit()    
            //.transition()
            //.duration(500)
            //.attr("x", w) 
            // commented out because it does not flow as well as not having
            // .transition(), .duration() and .attr("x", w)
            // you may uncomment and try
            .remove();
    });

}
window.onload = init;
