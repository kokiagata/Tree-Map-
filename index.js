let url = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json"

let movieData
let h = 1000
let w = 1400
let padding = 30

let svg = d3.select("body")

let generateCanvas = ()=>{
  svg = svg.append("svg")
  .attr("height", h)
  .attr("width", w)
  
}

let drawMaps = ()=>{
  let hierarchy = d3.hierarchy(movieData, (node)=>{
    return node['children']
  })
  .sum((node)=>{
    return node["value"]
  })
  .sort((node1, node2)=>{
    return node2["value"]-node1["value"]
  })
  console.log(hierarchy)
  
  let generateTreemap = d3.treemap()
  .size([w-200, h])
  
  generateTreemap(hierarchy)
  
  let movieTiles = hierarchy.leaves()
  console.log(movieTiles)
  
 let tiles = svg.selectAll("g")
  .data(movieTiles)
  .enter()
  .append("g")
  .attr("transform", (item)=>{
    return "translate(" + item['x0'] + "," + item['y0'] + ")"
  })
 
    tiles.append("rect")
         .attr("class", "tile")
         .attr("fill", (item)=>{
      let category = item["data"]["category"]
      if(category === "Action"){
        return "#D98880"
      } else if(category === "Drama"){
        return "#C39BD3"
      } else if(category === "Adventure"){
        return "#7FB3D5"
      } else if(category === "Family"){
        return "#76D7C4"
      } else if(category === "Animation"){
        return "#F7DC6F"
      } else if(category === "Comedy"){
        return "#E59866"
      } else if(category === "Biography"){
        return "#F4F6F7"
      }
    })
  .attr("data-name", (item)=>{
      return item['data']['name']
    })
  .attr("data-category", (item)=>{
      return item['data']['category']
    })
  .attr("data-value", (item)=>{
      return item['data']['value']
    })
  .attr("width", (item)=>{
      return item['x1'] - item['x0']
    })
  .attr("height", (item)=>{
      return item['y1'] - item['y0']
    })
  .attr("stroke", "white")
  .on("mouseover", (item, i)=>{
      
      div.transition().duration(50)
        .style("opacity", .8)
      .style("left", (event.pageX + 10) + "px")
      .style("top", (event.pageY + 10) + "px")
      
      div.html("Name: " + i['data']['name'] + "<br>" + "Category: " + i['data']['category'] + "<br>" + "Value: " + i['data']['value'])
      .attr("data-value", i['data']['value'])
    })
  .on("mouseout", (item)=>{
      
      div.transition().duration(50)
        .style("opacity", 0)
      
    })
  
  let div = d3.select("body").append("div")
  .attr("id", "tooltip")
  .attr("opacity", 0)
  .attr("height", 50)
  .attr("width", 50)
  
 tiles.append('text')
  .selectAll("tspan")
  .data((item)=>{
   return item['data']['name'].split(/\s/g)
 })
  .enter()
  .append('tspan')
    .text((item)=>{
   return item
 })
  .attr("x", 5)
  .attr("y", (d, i)=>{
   return 15 + i*13
 })
  .attr("class", "movie-names")
 
  

   
  let legend = svg.append("g")
  .attr("id", "legend")
  
  legend.append("rect")
  .attr("x", w-170)
  .attr("y", h/2)
  .attr("height", 30)
  .attr("width", 30)
  .attr("fill", "#D98880")
  .attr("class", "legend-item")
  
  legend.append("rect")
  .attr("x", w-170)
  .attr("y", h/2+30)
  .attr("height", 30)
  .attr("width", 30)
  .attr("fill", "#C39BD3")
  .attr("class", "legend-item")
  
  legend.append("rect")
  .attr("x", w-170)
  .attr("y", h/2+60)
  .attr("height", 30)
  .attr("width", 30)
  .attr("fill", "#7FB3D5")
  .attr("class", "legend-item")
  
  legend.append("rect")
  .attr("x", w-170)
  .attr("y", h/2+90)
  .attr("height", 30)
  .attr("width", 30)
  .attr("fill", "#76D7C4")
  .attr("class", "legend-item")
  
  legend.append("rect")
  .attr("x", w-170)
  .attr("y", h/2+120)
  .attr("height", 30)
  .attr("width", 30)
  .attr("fill", "#F7DC6F")
  .attr("class", "legend-item")
  
  legend.append("rect")
  .attr("x", w-170)
  .attr("y", h/2+150)
  .attr("height", 30)
  .attr("width", 30)
  .attr("fill", "#E59866")
  .attr("class", "legend-item")
  
  legend.append("rect")
  .attr("x", w-170)
  .attr("y", h/2+180)
  .attr("height", 30)
  .attr("width", 30)
  .attr("fill", "#F4F6F7")
  .attr("class", "legend-item")
  
  legend.append('text')
  .text("Action")
  .attr("x", w-130)
  .attr("y", h/2+18)
  .attr("class", "movies")
  .attr("fill", "white")
  
  
  legend.append('text')
  .text("Drama")
  .attr("x", w-130)
  .attr("y", h/2+48)
  .attr("class", "movies")
  .attr("fill", "white")
  
  legend.append('text')
  .text("Adventure")
  .attr("x", w-130)
  .attr("y", h/2+78)
  .attr("class", "movies")
  .attr("fill", "white")
  
  legend.append('text')
  .text("Family")
  .attr("x", w-130)
  .attr("y", h/2+108)
  .attr("class", "movies")
  .attr("fill", "white")
  
  legend.append('text')
  .text("Animation")
  .attr("x", w-130)
  .attr("y", h/2+138)
  .attr("class", "movies")
  .attr("fill", "white")
  
  legend.append('text')
  .text("Comedy")
  .attr("x", w-130)
  .attr("y", h/2+168)
  .attr("class", "movies")
  .attr("fill", "white")
  
  legend.append('text')
  .text("Biography")
  .attr("x", w-130)
  .attr("y", h/2+198)
  .attr("class", "movies")
  .attr("fill", "white")
  
 
}


d3.json(url).then((data, error)=>{
  if(error){
    console.log(error)
  } else {
    movieData = data  
    console.log(movieData)
    generateCanvas()
    drawMaps()
  }
})