function init(){

    var w = 300;
    var h = 300;

    var dataset = [
            { apples: 5, oranges: 10, grapes: 22 },
            { apples: 4, oranges: 12, grapes: 28 },
            { apples: 2, oranges: 19, grapes: 32 },
            { apples: 7, oranges: 23, grapes: 35 },
            { apples: 23, oranges: 17, grapes: 43 }
            ];

    var stack = d3.stack()
                    .keys(["apples", "oranges", "grapes"])
                    .order(d3.stackOrderDescending);

    var series = stack(dataset);

    var xScale = d3.scaleBand()
                    .domain(d3.range(dataset.length))
                    .range([0, w])
                    .paddingInner(0.025);

    var yScale = d3.scaleLinear()
                    .domain([0, d3.max(dataset, function(d) {
                        return d.apples + d.oranges + d.grapes;
                        })
                    ])
                    .range([h, 0]);

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    var groups = svg.selectAll("g")
                .data(series)
                .enter()
                .append("g")
                .style("fill", function(d, i){
                    return color(i);
                });
        
    var rects = groups.selectAll("rect")
                .data(function(d) {return d;})
                .enter()
                .append("rect")
                .attr("x", function(d, i){
                    return xScale(i);
                })
                .attr("y", function(d){
                    return yScale(d[1]);
                })
                .attr("height", function(d){
                    return yScale(d[0]) - yScale(d[1]);
                })
                .attr("width", xScale.bandwidth());
    
    //Legend
    var keys = ["apples", "oranges", "grapes"];

    var dots = svg.selectAll("mydots")
            .data(keys)
            .enter()
            .append("circle")
                .attr("cx", 7)
                .attr("cy", function(d, i){
                    return 14 + i*25;
                })
                .attr("r", 7)
                .attr("fill", function(d, i){
                    return color(i);
                });

    var dots = svg.selectAll("text")
            .data(keys)
            .enter()
            .append("text")
                .attr("x", 21)
                .attr("y", function(d, i){
                    return 17.5 + i*25;
                })
                .attr("fill", function(d, i){
                    return color(i);
                })
                .text (function(d){
                    return d;
                })
                .attr("text-anchor", "left")
                .script("alignment-baseline", "middle");
}
window.onload =init;