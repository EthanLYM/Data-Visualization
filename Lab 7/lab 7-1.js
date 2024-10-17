function init(){

    var w = 600;
    var h = 300;
    var padding = 100;

    d3.csv("Unemployment_78-95.csv", function(d){
        return{
        date: new Date(+d.year, +d.month-1),
        number: +d.number
    };
    }).then(function(data) {
        dataset = data;

        lineChart(dataset);

        console.table(dataset, ["data", "number"]);
    });3.

    function lineChart(dataset)
    {
        xScale = d3.scaleTime()
                    .domain([
                    d3.min(dataset, function(d) { return d.date; }),
                    d3.max(dataset, function(d) { return d.date; })
                    ])
                .range([padding, w]);

        yScale = d3.scaleLinear()
                .domain([0, d3.max(dataset, function(d) { return d.number; })])
                .range([h - padding, 0]);


        var line = d3.line()
                    .x(function(d) { return xScale(d.date); })
                    .y(function(d) { return yScale(d.number); });

        //Create SVG element
        var svg = d3.select("#chart")
                    .append("svg")
                    .attr("width",w)
                    .attr("height",h);

        //Create line
        svg.append("path")
            .datum(dataset)
            .attr("class", "line")
            .attr("d", line);
    
            
        var xAxis = d3.axisBottom()
            .scale(xScale)
            .ticks(10);

        var yAxis = d3.axisLeft()
                    .scale(yScale)
                    .ticks(10);

        svg.append("g")  
            .attr("class", "x axis")  
            .attr("transform", "translate(0, " + (h - padding) + ")")  
            .call(xAxis);  
            
        svg.append("g")  
            .attr("class", "y axis")  
            .attr("transform", "translate(" + padding + ", 0)")  
            .call(yAxis); 

        svg.append("line")
            .attr("class", "line halfMilMark")
            //start of line
            .attr("x1", padding)
            .attr("y1", yScale(500000))
            //end of line
            .attr("x2", w)
            .attr("y2", yScale(500000))
            .attr("r", 255);

        svg.append("text")
            .attr("class", "halfMilLabel")
            .attr("x", padding + 10)
            .attr("y", yScale(500000) - 7)
            .text("Half a million unemployed");
    }


}
window.onload =init;