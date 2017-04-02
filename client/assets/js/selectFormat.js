var dataset_selector = $("#node-dropdown-menu a")
var map_dataset_selector1 = $("#dropdown-menu-data1 li a")
console.log(map_dataset_selector1)
var map_dataset_selector2 = $("#dropdown-menu-data2 li a")

dataset_selector.click(function(){
  var select_val = this.text

  if (select_val == "Breast Cancer") {
    var color = $("#dropdown-menu-color")
    color.empty()
    color.append('<li class="dropdown-header">Node Color</li>')
    color.append('<li><a href="#">Binary Indicator Of Cancer Diagnosis In 1 Year Of Screening Mammogram</a></li>')
    color.append('<li><a href="#">Comparison Mammogram From Prior Mammography Available</a></li>')
    color.append('<li><a href="#">Family History Of Breast Cancer In A First Degree Relative</a></li>')

    var size = $("#dropdown-menu-size")
    size.empty()
    size.append('<li class="dropdown-header">Radius Size</li>')
    size.append('<li><a href="#">BMI</a></li>')
    size.append('<li><a href="#">Age</a></li>')

    var outline = $("#dropdown-menu-outline")
    outline.empty()
    outline.append('<li class="dropdown-header">Outline Color</li>')
    outline.append('<li value="1"><a href="#">Binary Indicator Of Cancer Diagnosis In 1 Year Of Screening Mammogram</a></li>')
    outline.append('<li value="2"><a href="#">Comparison Mammogram From Prior Mammography Available</a></li>')
    outline.append('<li value="3"><a href="#">Family History Of Breast Cancer In A First Degree Relative</a></li>')
    outline.append('<li value="4"><a href="#">Current Use Of Hormone Therapy At Time Of Mammogram</a></li>')
    outline.append('<li value="5"><a href="#">Binary Indicator Whether Woman Had Ever Received Prior Mammogram</a></li>')
    outline.append('<li value="6"><a href="#">History Of Breast Biopsy</a></li>')
    outline.append('<li value="7"><a href="#">Cancer Type</a></li>')
  }
})

map_dataset_selector1.click(function(){
    var select_val_map1 = this.text
    var color_map1 = $(".dropdown-menu-vals1")
    var years1 = $(".dropdown-menu-years1")
    if (select_val_map1 == "Mental Health") {
        color_map1.empty()
        color_map1.append('<li class="dropdown-header">Color Variable</li>')
        color_map1.append('<li><a href="#">Percent Suffering Depression</a></li>')
        color_map1.append('<li><a href="#">Health Workers to Population Ratio</a></li>')

        years1.empty()
        years1.append('<li class="dropdown-header">2014</li>')
    }
    else if (select_val_map1 == "Kindergarden Immunization Records") {
        color_map1.empty()
        color_map1.append('<li class="dropdown-header">Color Variable</li>')
        color_map1.append('<li><a href="#">Polio Vaccine</a></li>')
        color_map1.append('<li><a href="#">Measles Mumps Rubella Vaccine</a></li>')
        color_map1.append('<li><a href="#">Diphtheria And Tetanus Toxoids And Acellular Pertussis Vaccine</a></li>')
        color_map1.append('<li><a href="#">HepatitisB</a></li>')
        color_map1.append('<li><a href="#">Varicella 1Dose</a></li>')
        color_map1.append('<li><a href="#">Varicella Doses</a></li>')

        years1.empty()
        years1.append('<li class="dropdown-header">Year</li>')
        years1.append('<li><a href="#">2011</a></li>')
        years1.append('<li><a href="#">2012</a></li>')
        years1.append('<li><a href="#">2013</a></li>')
        years1.append('<li><a href="#">2014</a></li>')
    }
})

map_dataset_selector2.click(function(){
    var select_val_map2 = this.text
    var color_map2 = $(".dropdown-menu-vals2")
    var years2 = $(".dropdown-menu-years2")
    if (select_val_map2 == "Mental Health") {
        color_map2.empty()
        color_map2.append('<li class="dropdown-header">Color Variable</li>')
        color_map2.append('<li><a href="#">Percent Suffering Depression</a></li>')
        color_map2.append('<li><a href="#">Health Workers to Population Ratio</a></li>')

        years2.empty()
        years2.append('<li class="dropdown-header">2014</li>')
    }
    else if (select_val_map2 == "Kindergarden Immunization Records") {
        color_map2.empty()
        color_map2.append('<li class="dropdown-header">Color Variable</li>')
        color_map2.append('<li><a href="#">Polio Vaccine</a></li>')
        color_map2.append('<li><a href="#">Measles Mumps Rubella Vaccine</a></li>')
        color_map2.append('<li><a href="#">Diphtheria And Tetanus Toxoids And Acellular Pertussis Vaccine</a></li>')
        color_map2.append('<li><a href="#">HepatitisB</a></li>')
        color_map2.append('<li><a href="#">Varicella 1Dose</a></li>')
        color_map2.append('<li><a href="#">Varicella Doses</a></li>')

        years2.empty()
        years2.append('<li class="dropdown-header">Year</li>')
        years2.append('<li><a href="#">2011</a></li>')
        years2.append('<li><a href="#">2012</a></li>')
        years2.append('<li><a href="#">2013</a></li>')
        years2.append('<li><a href="#">2014</a></li>')
    }
})





