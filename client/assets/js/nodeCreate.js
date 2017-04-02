var convertNum = function(val) {
  if (val == 0) {
    return "No"
  }
  else if (val == 1) {
    return "Yes"
  }
  else {
    return "Missing"
  }
}
var width = 1600,
  height = 1600


var svgGr = d3.select(".graph").append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("class", "graphSVG")

var parseRowBC = function(row) {
  row.Age_At_The_Time_Of_Mammography = Number(row.Age_At_The_Time_Of_Mammography);
  row.Body_Mass_Index_At_Time_Of_Mammogram = Number(row.Body_Mass_Index_At_Time_Of_Mammogram)
  if (row.Binary_Indicator_Of_Cancer_Diagnosis_In_1_Year_Of_Screening_Mammogram.includes("No")) {
    row.Binary_Indicator_Of_Cancer_Diagnosis_In_1_Year_Of_Screening_Mammogram = 0
  }
  else if (row.Binary_Indicator_Of_Cancer_Diagnosis_In_1_Year_Of_Screening_Mammogram.includes("Missing")) {
    row.Binary_Indicator_Of_Cancer_Diagnosis_In_1_Year_Of_Screening_Mammogram = 2
  }
  else {
    row.Binary_Indicator_Of_Cancer_Diagnosis_In_1_Year_Of_Screening_Mammogram = 1
  }
  if (row.Comparison_Mammogram_From_Prior_Mammography_Available.includes("No")) {
    row.Comparison_Mammogram_From_Prior_Mammography_Available = 0
  }
  else if (row.Comparison_Mammogram_From_Prior_Mammography_Available.includes("Missing")) {
    row.Comparison_Mammogram_From_Prior_Mammography_Available = 2
  }
  else {
    row.Comparison_Mammogram_From_Prior_Mammography_Available = 1
  }
  if (row.Family_History_Of_Breast_Cancer_In_A_First_Degree_Relative.includes("No")) {
    row.Family_History_Of_Breast_Cancer_In_A_First_Degree_Relative = 0
  }
  else if (row.Family_History_Of_Breast_Cancer_In_A_First_Degree_Relative.includes("Missing")) {
    row.Family_History_Of_Breast_Cancer_In_A_First_Degree_Relative = 2
  }
  else {
    row.Family_History_Of_Breast_Cancer_In_A_First_Degree_Relative = 1
  }
  if (row.Current_Use_Of_Hormone_Therapy_At_Time_Of_Mammogram.includes("No")) {
    row.Current_Use_Of_Hormone_Therapy_At_Time_Of_Mammogram = 0
  }
  else if (row.Current_Use_Of_Hormone_Therapy_At_Time_Of_Mammogram.includes("Missing")) {
    row.Current_Use_Of_Hormone_Therapy_At_Time_Of_Mammogram = 2
  }
  else {
    row.Current_Use_Of_Hormone_Therapy_At_Time_Of_Mammogram = 1
  }
  if (row.Binary_Indicator_Whether_Woman_Had_Ever_Received_Prior_Mammogram.includes("No")) {
    row.Binary_Indicator_Whether_Woman_Had_Ever_Received_Prior_Mammogram = 0
  }
  else if (row.Binary_Indicator_Whether_Woman_Had_Ever_Received_Prior_Mammogram.includes("Missing")) {
    row.Binary_Indicator_Whether_Woman_Had_Ever_Received_Prior_Mammogram = 2
  }
  else {
    row.Binary_Indicator_Whether_Woman_Had_Ever_Received_Prior_Mammogram = 1
  }
  if (row.History_Of_Breast_Biopsy.includes("No")) {
    row.History_Of_Breast_Biopsy = 0
  }
  else if (row.History_Of_Breast_Biopsy.includes("Missing")) {
    row.History_Of_Breast_Biopsy = 2
  }
  else {
    row.History_Of_Breast_Biopsy = 1
  }
  row.Age = Number(row.Age)
  row.BMI = Number(row.BMI)
  return row;
}

var parseRowId = function(row) {
  row.Id = Number(row.Id);
  return row;
}
// red, green, gray
var discreteColorArray = ['#ff6666', '#99cc99', '#d8d8d8']
var discreteOutlineArray = ['#e76b6b', '#4CA64C', '#a6a6a6']


d3_queue.queue()
  .defer(d3.json, "data/us.json")
  .defer(d3.csv, "data/BreastDataParse.csv", parseRowBC)
  .defer(d3.csv, "data/MentalHealthPop.csv", parseRowId)
  .defer(d3.csv, "data/KinderImmun.csv", parseRowId)
  .defer(d3.csv, "data/Immuniz13-19.csv", parseRowId)
  .await(function (error, rawMap, rawBC, rawMH, rawKI, raw1319) {

    var ageScale = d3.scale.sqrt().domain(d3.extent(rawBC, function(d) {
      return d.Age
    })).range([3,25])
    var bmiScale = d3.scale.sqrt().domain(d3.extent(rawBC, function(d) {
      return d.BMI
    })).range([3,25])

    initNode(rawBC, svgGr)

    d3.select(".dropdown-menu").on("click", function() {
      $('#dropdown-title-data').html($(this).find('a').html());
      d3.select("#dropdown-menu-color").selectAll("li a")
      .on('click', function() {
        $('#dropdown-title-color').html($(this).text());
        var color_var = $(this).text().replace(/ /g , "_")
        updateNodeColor(discreteColorArray, color_var, svgGr)
      })

      d3.select("#dropdown-menu-size").selectAll("li a")
      .on('click', function() {
        $('#dropdown-title-radius').html($(this).text());
        var size_var = $(this).text().replace(/ /g , "_")
        if (size_var == "Age") {
          updateNodeSize(ageScale, size_var, svgGr)
        }
        else {
          updateNodeSize(bmiScale, size_var, svgGr)
        }
      })

      d3.select("#dropdown-menu-outline").selectAll("li a")
      .on('click', function() {
        $('#dropdown-title-out').html($(this).text());
        var out_var = $(this).text().replace(/ /g , "_")
        updateNodeOutline(discreteOutlineArray, out_var, svgGr)
      })

     })
    svgGr.selectAll('circle')
    // .data(rawBC)
    // .enter().append('circle')
    // .attr('class', 'clickable')
    // .attr('r', function(d, i) { return random2(i) * 10 })
    // .attr('cx', function(d, i) { return x(i) })
    // // .attr('cy', y)
    .on('click', function(d) {
      var stats = d3.select(".stats")
      stats
        .html("")
        .attr('class', 'stats')
        // .offset([-10, 0])
        .html(function() {
          return "<strong>Age:</strong> <span style='color:red'>" + d.Age + "</span><br/>" +
          "<strong>BMI:</strong> <span style='color:red'>" + d.BMI + "</span><br/>" +
          "<strong>Cancer Diagnosis in 1 Year:</strong> <span style='color:red'>" + convertNum(d.Binary_Indicator_Of_Cancer_Diagnosis_In_1_Year_Of_Screening_Mammogram) + "</span><br/>" +
          "<strong>Prior Mamogram Avail To Consult:</strong> <span style='color:red'>" + convertNum(d.Comparison_Mammogram_From_Prior_Mammography_Available) + "</span><br/>" +
          "<strong>Family History of BC:</strong> <span style='color:red'>" + convertNum(d.Family_History_Of_Breast_Cancer_In_A_First_Degree_Relative) + "</span><br/>" +
          "<strong>Currently Using Hormone Therapy:</strong> <span style='color:red'>" + convertNum(d.Current_Use_Of_Hormone_Therapy_At_Time_Of_Mammogram) + "</span><br/>" +
          "<strong>Ever Received a Mamogram:</strong> <span style='color:red'>" + convertNum(d.Binary_Indicator_Whether_Woman_Had_Ever_Received_Prior_Mammogram) + "</span><br/>" +
          "<strong>History Of Breast Biopsy:</strong> <span style='color:red'>" + convertNum(d.History_Of_Breast_Biopsy) + "</span><br/>" +
          "<strong>Cancer Type:</strong> <span style='color:red'>" + d.Cancer_Type + "</span><br/>"
      })
    })

})