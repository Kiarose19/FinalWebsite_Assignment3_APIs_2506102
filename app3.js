document.addEventListener("DOMContentLoaded", function(){
   const apiKey = "6gR7eApMZgrLSRDbUsshjwza78UIFiP2aw2Xw5QO";

   const apiURL = `https://ssd-api.jpl.nasa.gov/fireball.api?api_key = ${apiKey}`;

   fetch(apiURL)
   .then((response) => response.json())
   .then((data) => {

    displayData(data);
   })

   .catch(error => {
    console.error ('Error fetching data:' , error);
   });

   let height = 500;
   width = 800;
   margin = {top:20, right:20, bottom:80, left:40};

   let svg = d3.select('#bubbleGraph')
   .append('svg')
   .attr('height', height)
   .attr('width', width )
   .append('g')
   .attr('transform', `translate(${margin.left}, ${margin.top})`);

   let xScale = d3.scaleTime()
   .domain([new Date('2023-10-01'), new Date('2023-10-10')])
   .range([margin, width - margin]);

   let yScale = d3.scaleLinear()
   .domain([0, d3.max(data, function(d){return d.impactEnergy;})])
   .range([height - margin, margin]);

   let sizeScale = d3.scaleLinear()
   .domain([0, d3.max(data, function(d) {return d.velocity;})])
   .range([5, 20]);

   svg.selectAll('circle')
   .data(data)
   .enter()
   .append('circle')
   .attr('cx', function(d) {return xScale(new Date(d.date))})
   .attr('cy', function(d) {return yScale(d.impactEnergy)})
   .attr('r', function(d) {return sizeScale(d.velocity)})
   .style('fill', 'blue')
   .style('opacity', 0.7)

   let yAxis = d3.axisLeft(yScale);
   svg.append('g')
   .attr('class', 'y-axis')
   .attr('transform', `translate(' + margin + ', 0)`)
   .call(yAxis);

   let xAxis = d3.axisBottom(xScale)
   svg.append('g')
   .attr('class', 'x-axis')
   .attr('transform', `translate(0, '+ (height - margin) + ')`)
   .call(xAxis);

  /* svg.append('text')
   .attr('class', 'y-axis-label')
   .attr('transform', "rotate(-90)")
   .attr('y', margin - 40)
   .attr('x', -height/2)
   .style('text-anchor', 'middle')
   .style('fill', 'white')
   .text('Impact Energy (kT)');*/

   svg.append('text')
   .attr('class', 'x-axis-label')
   .attr('y', height - 20)
   .attr('x', width/2)
   .style('text-anchor', 'middle')
   .style('fill', 'white')
   .text('Date');

  /* svg.append('g')
   .call(d3.axisLeft(y).ticks(12))*/

   let tooltip = d3.select('#bubbleGraph')
   .append('div')
   .style('opacity', '0')
   .style('width', '150px')
   .style('border-radius', '5px')
   .style('padding', '12px')
   .style('background-colour', 'steelblue')
   .style('color', '#fff')
   .style('position', 'relative');

   function showTooltip(d){
    tooltip
    .transition()
    .duration(300)
    .style('opacity', 1)
    .style('left', d3.pointer(event)[0] + 70 + "px")
    .style('top', d3.pointer(event)[1] -540 + "px");


   }

   function moveTooltip(){
    tooltip
    .style('left',d3.pointer(event)[0] + 70 + "px" )
    .style('top',d3.pointer(event)[1] -540 + "px" );
}

function hideTooltip(){
    tooltip.style("opacity", 0);
}
        

})