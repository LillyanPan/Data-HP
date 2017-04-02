var dataset_selector = $(".dropdown-menu a")

dataset_selector.click(function(){
  var select_val = dataset_selector.html()
  if (select_val == "Breast Cancer") {
    var color = $("#dropdown-menu-color")
    color.empty()
    color.append('<li><a href="#">Binary Indicator Of Cancer Diagnosis In 1 Year Of Screening Mammogram</a></li>')
    color.append('<li><a href="#">Comparison Mammogram From Prior Mammography Available</a></li>')
    color.append('<li><a href="#">Family History Of Breast Cancer In A First Degree Relative</a></li>')

    var size = $("#dropdown-menu-size")
    size.empty()
    size.append('<li><a href="#">BMI</a></li>')
    size.append('<li><a href="#">Age</a></li>')

    var outline = $("#dropdown-menu-outline")
    outline.empty()
    outline.append('<li value="1"><a href="#">Binary Indicator Of Cancer Diagnosis In 1 Year Of Screening Mammogram</a></li>')
    outline.append('<li value="2"><a href="#">Comparison Mammogram From Prior Mammography Available</a></li>')
    outline.append('<li value="3"><a href="#">Family History Of Breast Cancer In A First Degree Relative</a></li>')
    outline.append('<li value="4"><a href="#">Current Use Of Hormone Therapy At Time Of Mammogram</a></li>')
    outline.append('<li value="5"><a href="#">Binary Indicator Whether Woman Had Ever Received Prior Mammogram</a></li>')
    outline.append('<li value="6"><a href="#">History Of Breast Biopsy</a></li>')
    outline.append('<li value="7"><a href="#">Cancer Type</a></li>')

  }
})