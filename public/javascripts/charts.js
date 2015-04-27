queue().defer(d3.json, '/diagnostics/payments').await(makeGraphs);

function reduceAddAvg(attr) {
  return function(p,v) {
    ++p.count
    p.sum += v[attr];
    p.avg = p.sum/p.count;
    return p;
  };
}
function reduceRemoveAvg(attr) {
  return function(p,v) {
    --p.count
    p.sum -= v[attr];
    p.avg = p.sum/p.count;
    return p;
  };
}
function reduceInitAvg() {
  return {count:0, sum:0, avg:0};
}


function makeGraphs(error, paymentDiagnostics) {
    //Clean projectsJson data
    var chosenDiagnostics = paymentDiagnostics;
    chosenDiagnostics.forEach(function(d) {
        d["payment_date"] = new Date(d["payment_date"]);
        d["payment_date"].setDate(1);
    });

    //Create a Crossfilter instance
    var ndx = crossfilter(chosenDiagnostics);

    //Define Dimensions
    var dateDim = ndx.dimension(function(d) { return d["payment_date"]; });
    var phoneModelDim = ndx.dimension(function(d) { return d["phone_model"]; });
    var paymentStatusDim = ndx.dimension(function(d) { return d["payment_status"]; });
    var turnaroundTimeDim = ndx.dimension(function(d) { return d["turnaround_time"]; });

    //Calculate metrics
    var numPaymentsByDate = dateDim.group(); 
    var numPaymentsByPhoneModel = phoneModelDim.group();
    var numPaymentsByPaymentStatus = paymentStatusDim.group();


    var averageTurnaroundTimeDimByPhoneModel = phoneModelDim.group();
    // .reduce(reduceAddAvg("turnaround_time"),
    //                                                                  reduceRemoveAvg("turnaround_time"),
    //                                                                  reduceInitAvg);

    // Average Reducer Defined
    var reducer = reductio().count(true).sum(function(d) { return +d["turnaroudn_time"]; }).avg(true);
    reducer(averageTurnaroundTimeDimByPhoneModel);


    var all = ndx.groupAll();
    var totalPayments = ndx.groupAll().reduceCount();

    //Define values (to be used in charts)
    var minDate = dateDim.bottom(1)[0]["payment_date"];
    var maxDate = dateDim.top(1)[0]["payment_date"];

    //Charts
    var timeChart = dc.barChart("#time-chart");
    var phoneModelChart = dc.rowChart("#phone-model-pie-chart");
    var paymentStatusChart = dc.pieChart("#payment-status-pie-chart");
    // //var numberProjectsND = dc.numberDisplay("#number-projects-nd");
    var averageTurnaroundTimeChart = dc.rowChart("#average-turnaround-row-chart");

    timeChart
        .width(900)
        .height(160)
        .dimension(dateDim)
        .group(numPaymentsByDate)
        .transitionDuration(500)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .elasticY(true)
        .elasticX(true)
        .xAxisLabel("Year")
        .yAxis().ticks(4);

    phoneModelChart
        .dimension(phoneModelDim)
        .group(numPaymentsByPhoneModel)
        .renderLabel(true)
        .xAxis().ticks(4);

    paymentStatusChart
        .width(300)
        .height(250)
        .innerRadius(50)
        .dimension(paymentStatusDim)
        .group(numPaymentsByPaymentStatus)
        .renderLabel(true);

    averageTurnaroundTimeChart
        .width(1000)
        .height(330)
        .dimension(phoneModelDim)
        .group(averageTurnaroundTimeDimByPhoneModel)
        .xAxis().ticks(10000);


    dc.renderAll();


}

