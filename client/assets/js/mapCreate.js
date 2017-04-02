var parseRowId = function(row) {
  row.Id = Number(row.Id);
  return row;
}

var nestYears = function(data) {
  var dataByYear = d3.nest()
  .key(function(d) { return d.Year; })
  .entries(data)
  return dataByYear
}

var parseKImm = function(data) {
  data.forEach(function(d) {
    d.Year = Number(d.Year)
    if (d.Total_Kindergarten_Population != "NA") {
      d.Total_Kindergarten_Population = Number(d.Total_Kindergarten_Population)
    }
    else {
      d.Total_Kindergarten_Population = -1
    }
    if (d.Percent_Surveyed != "NA") {
      d.Percent_Surveyed = Number(d.Percent_Surveyed)
    }
    else {
      d.Percent_Surveyed = -1
    }
    if (d.Polio_Vaccine != "NA") {
      d.Polio_Vaccine = Number(String(d.Polio_Vaccine).replace(/[^\d.]/g,''))
    }
    else {
      d.Polio_Vaccine = -1
    }
    if (d.Measles_Mumps_Rubella_Vaccine != "NA") {
      d.Measles_Mumps_Rubella_Vaccine = Number(String(d.Measles_Mumps_Rubella_Vaccine).replace(/[^\d.]/g,''))
    }
    else {
      d.Measles_Mumps_Rubella_Vaccine = -1
    }
    if (d.Diphtheria_And_Tetanus_Toxoids_And_Acellular_Pertussis_Vaccine != "NA") {
      d.Diphtheria_And_Tetanus_Toxoids_And_Acellular_Pertussis_Vaccine = Number(String(d.Diphtheria_And_Tetanus_Toxoids_And_Acellular_Pertussis_Vaccine).replace(/[^\d.]/g,''))
    }
    else {
      d.Diphtheria_And_Tetanus_Toxoids_And_Acellular_Pertussis_Vaccine = -1
    }
    if (d.HepatitisB != "NA") {
      d.HepatitisB = Number(String(d.HepatitisB).replace(/[^\d.]/g,''))
    }
    else {
      d.HepatitisB = -1
    }
    if (d.Varicella_1Dose != "NA") {
      d.Varicella_1Dose = Number(String(d.Varicella_1Dose).replace(/[^\d.]/g,''))
    }
    else {
      d.Varicella_1Dose = -1
    }
  })
  return data
}

var parseMH = function(data) {
  data.forEach(function(d) {
    d.Percent_Suffering_Depression = Number(d.Percent_Suffering_Depression)
    d.pVeterans = Number(d.pVeterans)
    d.Health_Workers_to_Population_Ratio = Number(d.Health_Workers_to_Population_Ratio)
  })
  return data
}

var svg1 = d3.select("#map1")
var svg2 = d3.select("#map2")

var percentScale = function(attr, data) {
  var domain = d3.extent(data, function(d) {
      return d[attr]
    })
  return d3.scale.linear().domain(domain).range(['#7f7fff', '#4c4cff', '#0000FF'])
}

var updateMap1ColorYear = function(attr, domain, year, statePaths, data) {
  // var scale = percentScale(attr, domain)
  if (attr == "Polio_Vaccine") {
    domain = [84,100]
  }
  else if (attr == "Measles_Mumps_Rubella_Vaccine" || attr == "Diphtheria_And_Tetanus_Toxoids_And_Acellular_Pertussis_Vaccine") {
    domain = [80,100]
  }
  else if (attr == "HepatitisB") {
    domain = [90,100]
  }
  var scale = d3.scale.linear().domain(domain).range(['#7f7fff', '#4c4cff', '#1919ff'])
  var dataYear
  data.forEach(function(d) {
    if (d.key == String(year)) {
      dataYear = d.values
    }
  })
  statePaths.selectAll("path")
    .transition(500)
    .style("fill",
      function(state) {
        var stateData = dataYear.filter(function(d) { return d.Id == state.id })
        if(stateData.length == 0) {return 0}
        return scale(stateData[0][attr])
      })
}

var updateMap1ColorNoYear = function(attr, statePaths, data) {
  var scale = percentScale(attr, data)
  statePaths.selectAll("path")
    .transition(500)
    .style("fill",
      function(state) {
        var stateData = data.filter(function(d) { return d.Id == state.id })
        if(stateData.length == 0) {return 0}
        return scale(stateData[0][attr])
      })
}


d3_queue.queue()
  .defer(d3.json, "data/us.json")
  .defer(d3.csv, "data/MentalHealthPop.csv", parseRowId)
  .defer(d3.csv, "data/KinderImmun.csv", parseRowId)
  .defer(d3.csv, "data/Immuniz13-19.csv", parseRowId)
  .await(function (error, rawMap, rawMH, rawKI, raw1319) {
    var projection = d3.geo.albersUsa()
    var path = d3.geo.path().projection(projection)

    yearSepData = nestYears(parseKImm(rawKI))

    processHM = parseMH(rawMH)

    states = topojson.feature(rawMap, rawMap.objects.states).features

    // var map1 = svg1.append("g").attr("transform","translate(180,0) scale(1.1)")
    // var map2 = svg2.append("g").attr("transform","translate(180,0) scale(1.1)")

    var statePaths1 = svg1.append("g")
      statePaths1.selectAll("path").data(states).enter()
      .append("path").attr("d", path)
      .attr("transform", "scale(.65)")
      .style("fill", "none")
      .style("stroke", "#ccc")
    var statePaths2 = svg2.append("g")
      statePaths2.selectAll("path").data(states).enter()
      .append("path").attr("d", path)
      .attr("transform", "scale(.65)")
      .style("fill", "none")
      .style("stroke", "#ccc")

    d3.selectAll("#dropdown-menu-data1 li a").on("click", function() {
      var dataset = this.text
      $('#dropdown-title-data-map1').html($(this).text());
      d3.select(".dropdown-menu-vals1").selectAll("li a")
      .on('click', function() {
        $('#dropdown-title-color-map1').html($(this).text());
        var color_var = $(this).text().replace(/ /g , "_")
        if (dataset != "Mental Health") {
          d3.select(".dropdown-menu-years1").selectAll("li a")
            .on('click', function() {
              $('#dropdown-title-year-map1').html($(this).text())
              var year = this.text
              var domain = [75.0, 100.0]
              updateMap1ColorYear(color_var, domain, year, statePaths1, yearSepData)
            })
        }
        else {
          updateMap1ColorNoYear(color_var, statePaths1, processHM)
        }
      })
    })

    d3.selectAll("#dropdown-menu-data2 li a").on("click", function() {
      var dataset = this.text
      $('#dropdown-title-data-map2').html($(this).text());
      d3.select(".dropdown-menu-vals2").selectAll("li a")
      .on('click', function() {
        $('#dropdown-title-color-map2').html($(this).text());
        var color_var = $(this).text().replace(/ /g , "_")
        if (dataset != "Mental Health") {
          d3.select(".dropdown-menu-years2").selectAll("li a")
            .on('click', function() {
              $('#dropdown-title-year-map2').html($(this).text())
              var year = this.text
              var domain = [75.0, 100.0]
              updateMap1ColorYear(color_var, domain, year, statePaths2, yearSepData)
            })
        }
        else {
          updateMap1ColorNoYear(color_var, statePaths2, processHM)
        }
      })
    })
  })





