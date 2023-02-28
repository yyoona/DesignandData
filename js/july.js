// set the dimensions and margins for the chart
var margin = 30,
    width = 500,
    height = window.innerHeight / 4;

var barWidth = width / 24


// load csv data
d3.csv("./cloudcover_2022_selected.csv").then(function (data) {



    /**
     * Data part 
     * 1. data parsing
     * 2. data grouping
     * 3. define range and scale
     * 4. x, y-axis 
     */

    // data parsing: convert data format 
    var parsedData = data.map(function (row) {
        row.Time = parseFloat(row.Time)
        row.CloudAmount = parseFloat(row.CloudAmount)
        return row;
    })

    // data grouping 
    CloudByMonth = d3.group(data, d => d.Month)
    CloudByDay = d3.group(CloudByMonth.get("7"), d => d.Day)
    // //console.log(CloudByMonth)

    var rangeTime = d3.extent(parsedData, function (d) { return d.Time })
    var rangeCloudAmount = d3.extent(parsedData, function (d) { return d.CloudAmount })

    var maxTime = d3.max(parsedData, function (d) { return d.Time })
    var maxCloudAmount = d3.max(parsedData, function (d) { return d.CloudAmount })
    //console.log(rangeTime, rangeCloudAmount)

    var scaleTime = d3.scaleLinear().domain(rangeTime).range([0, width]);
    var scaleCloudAmount = d3.scaleLinear().domain(rangeCloudAmount).range([0, height]);

    // X and Y axis: x axis is time(0-24), y axis is the amount of cloud cover(0-8).
    var x_axis = d3.scaleLinear().domain([0, 24]).range([0, width]);
    var y_axis = d3.scaleLinear().domain([0, 8]).range([height, 0]);


    /**
     * Statistic parts
     * 1. get average for each month
     * 2. get the sum for the cloud cover for each day, and check the most cloudy day (darkest day) with the console.log
     */


    // statistic for monthly average
    var average = d3.mean((CloudByMonth.get("7")), function (d) { return d.CloudAmount; })

    average = Math.floor(average * 100) / 100
    average = Math.floor(average * 12.5) * 100 / 100



    // statistic for the most cloudy day (darkest day)
    // const mostcloudy1 = d3.sum(CloudByDay.get("1"), function (d) { return d.CloudAmount;})
    // const mostcloudy2 = d3.sum(CloudByDay.get("2"), function (d) {return d.CloudAmount;})
    // const mostcloudy3 = d3.sum(CloudByDay.get("3"), function (d) {return d.CloudAmount;})
    // const mostcloudy4 = d3.sum(CloudByDay.get("4"), function (d) {return d.CloudAmount;})
    // const mostcloudy5 = d3.sum(CloudByDay.get("5"), function (d) {return d.CloudAmount;})
    // const mostcloudy6 = d3.sum(CloudByDay.get("6"), function (d) {return d.CloudAmount;})
    // const mostcloudy7 = d3.sum(CloudByDay.get("7"), function (d) { return d.CloudAmount; })
    // const mostcloudy13 = d3.sum(CloudByDay.get("13"), function (d) {return d.CloudAmount;})
    // const mostcloudy14 = d3.sum(CloudByDay.get("14"), function (d) {return d.CloudAmount;})
    // const mostcloudy15 = d3.sum(CloudByDay.get("15"), function (d) {return d.CloudAmount;})
    // const mostcloudy16 = d3.sum(CloudByDay.get("16"), function (d) {return d.CloudAmount;})
    // const mostcloudy17 = d3.sum(CloudByDay.get("17"), function (d) {return d.CloudAmount;})
    // const mostcloudy18 = d3.sum(CloudByDay.get("18"), function (d) {return d.CloudAmount;})
    // const mostcloudy19 = d3.sum(CloudByDay.get("19"), function (d) {return d.CloudAmount;})
    // const mostcloudy20 = d3.sum(CloudByDay.get("20"), function (d) {return d.CloudAmount;})
    // const mostcloudy21 = d3.sum(CloudByDay.get("21"), function (d) {return d.CloudAmount;})
    // const mostcloudy22 = d3.sum(CloudByDay.get("22"), function (d) {return d.CloudAmount;})
    // const mostcloudy23 = d3.sum(CloudByDay.get("23"), function (d) {return d.CloudAmount;})
    const mostcloudy24 = d3.sum(CloudByDay.get("24"), function (d) { return d.CloudAmount; })
    // const mostcloudy25 = d3.sum(CloudByDay.get("25"), function (d) {return d.CloudAmount;})
    // const mostcloudy26 = d3.sum(CloudByDay.get("26"), function (d) {return d.CloudAmount;})
    // const mostcloudy27 = d3.sum(CloudByDay.get("27"), function (d) {return d.CloudAmount;})
    // const mostcloudy28 = d3.sum(CloudByDay.get("28"), function (d) {return d.CloudAmount;})
    // const mostcloudy29 = d3.sum(CloudByDay.get("29"), function (d) {return d.CloudAmount;})
    // const mostcloudy30 = d3.sum(CloudByDay.get("30"), function (d) {return d.CloudAmount;})

    // console.log(mostcloudy1, mostcloudy2, mostcloudy3, mostcloudy4, mostcloudy5, mostcloudy6, mostcloudy7, mostcloudy8, mostcloudy9, mostcloudy10, mostcloudy11, mostcloudy12, mostcloudy13, mostcloudy14, mostcloudy15, mostcloudy16, mostcloudy17, mostcloudy18, mostcloudy19, mostcloudy20, mostcloudy21, mostcloudy22, mostcloudy23, mostcloudy24, mostcloudy25, mostcloudy26, mostcloudy27, mostcloudy28, mostcloudy29, mostcloudy30, mostcloudy31)

    // average for the most cloudy day
    var mostCloudy = d3.mean((CloudByDay.get("24")), function (d) { return d.CloudAmount; })

    mostCloudy = Math.floor(mostCloudy * 100) / 100
    mostCloudy = Math.floor(mostCloudy * 12.5) * 100 / 100



    /**
     * Canvas starts
     * 1. make the canvas for the description
     * 2. make the canvas for the chart
     */


    // Canvas for the description

    var svg_stat_01 = d3.select("#number_A_7").append("text")

    svg_stat_01.append("text").text(average + " %")

    var svg_stat_02 = d3.select("#number_M_7").append("text")

    svg_stat_02.append("text").text("24th (Cloud of  " + mostCloudy + "%)")



    // Canvas for the chart: each svg is the canvas for one day. 

    var svg_01 = d3.select("#chart_07").append("svg").attr("width", width).attr("height", height + margin * 3).append("g")
        .attr('id', 'hover_07_1').attr("transform", "translate(" + 0 + "," + (margin + 30) + ")")

    var svg_02 = d3.select("#chart_07").append("svg").attr("width", width).attr("height", height + margin * 3).append("g")
        .attr('id', 'hover_07_2').attr("transform", "translate(" + 0 + "," + (margin + 30) + ")")

    var svg_03 = d3.select("#chart_07").append("svg").attr("width", width).attr("height", height + margin * 3).append("g")
        .attr('id', 'hover_07_3').attr("transform", "translate(" + 0 + "," + (margin + 30) + ")")

    var svg_04 = d3.select("#chart_07").append("svg").attr("width", width).attr("height", height + margin * 3).append("g")
        .attr('id', 'hover_07_4').attr("transform", "translate(" + 0 + "," + (margin + 30) + ")")

    var svg_05 = d3.select("#chart_07").append("svg").attr("width", width).attr("height", height + margin * 3).append("g")
        .attr('id', 'hover_07_5').attr("transform", "translate(" + 0 + "," + (margin + 30) + ")")

    var svg_06 = d3.select("#chart_07").append("svg").attr("width", width).attr("height", height + margin * 3).append("g")
        .attr('id', 'hover_07_6').attr("transform", "translate(" + 0 + "," + (margin + 30) + ")")

    var svg_07 = d3.select("#chart_07").append("svg").attr("width", width).attr("height", height + margin * 3).append("g")
        .attr('id', 'hover_07_7').attr("transform", "translate(" + 0 + "," + (margin + 30) + ")")

    var svg_08 = d3.select("#chart_07").append("svg").attr("width", width).attr("height", height + margin * 3).append("g")
        .attr('id', 'hover_07_8').attr("transform", "translate(" + 0 + "," + (margin + 30) + ")")

    var svg_09 = d3.select("#chart_07").append("svg").attr("width", width).attr("height", height + margin * 3).append("g")
        .attr('id', 'hover_07_9').attr("transform", "translate(" + 0 + "," + (margin + 30) + ")")

    var svg_10 = d3.select("#chart_07").append("svg").attr("width", width).attr("height", height + margin * 3).append("g")
        .attr('id', 'hover_07_10').attr("transform", "translate(" + 0 + "," + (margin + 30) + ")")

    var svg_11 = d3.select("#chart_07").append("svg").attr("width", width).attr("height", height + margin * 3).append("g")
        .attr('id', 'hover_07_11').attr("transform", "translate(" + 0 + "," + (margin + 30) + ")")

    var svg_12 = d3.select("#chart_07").append("svg").attr("width", width).attr("height", height + margin * 3).append("g")
        .attr('id', 'hover_07_12').attr("transform", "translate(" + 0 + "," + (margin + 30) + ")")

    var svg_13 = d3.select("#chart_07").append("svg").attr("width", width).attr("height", height + margin * 3).append("g")
        .attr('id', 'hover_07_13').attr("transform", "translate(" + 0 + "," + (margin + 30) + ")")

    var svg_14 = d3.select("#chart_07").append("svg").attr("width", width).attr("height", height + margin * 3).append("g")
        .attr('id', 'hover_07_14').attr("transform", "translate(" + 0 + "," + (margin + 30) + ")")

    var svg_15 = d3.select("#chart_07").append("svg").attr("width", width).attr("height", height + margin * 3).append("g")
        .attr('id', 'hover_07_15').attr("transform", "translate(" + 0 + "," + (margin + 30) + ")")

    var svg_16 = d3.select("#chart_07").append("svg").attr("width", width).attr("height", height + margin * 3).append("g")
        .attr('id', 'hover_07_16').attr("transform", "translate(" + 0 + "," + (margin + 30) + ")")

    var svg_17 = d3.select("#chart_07").append("svg").attr("width", width).attr("height", height + margin * 3).append("g")
        .attr('id', 'hover_07_17').attr("transform", "translate(" + 0 + "," + (margin + 30) + ")")

    var svg_18 = d3.select("#chart_07").append("svg").attr("width", width).attr("height", height + margin * 3).append("g")
        .attr('id', 'hover_07_18').attr("transform", "translate(" + 0 + "," + (margin + 30) + ")")

    var svg_19 = d3.select("#chart_07").append("svg").attr("width", width).attr("height", height + margin * 3).append("g")
        .attr('id', 'hover_07_19').attr("transform", "translate(" + 0 + "," + (margin + 30) + ")")

    var svg_20 = d3.select("#chart_07").append("svg").attr("width", width).attr("height", height + margin * 3).append("g")
        .attr('id', 'hover_07_20').attr("transform", "translate(" + 0 + "," + (margin + 30) + ")")

    var svg_21 = d3.select("#chart_07").append("svg").attr("width", width).attr("height", height + margin * 3).append("g")
        .attr('id', 'hover_07_21').attr("transform", "translate(" + 0 + "," + (margin + 30) + ")")

    var svg_22 = d3.select("#chart_07").append("svg").attr("width", width).attr("height", height + margin * 3).append("g")
        .attr('id', 'hover_07_22').attr("transform", "translate(" + 0 + "," + (margin + 30) + ")")

    var svg_23 = d3.select("#chart_07").append("svg").attr("width", width).attr("height", height + margin * 3).append("g")
        .attr('id', 'hover_07_23').attr("transform", "translate(" + 0 + "," + (margin + 30) + ")")

    var svg_24 = d3.select("#chart_07").append("svg").attr("width", width).attr("height", height + margin * 3).append("g")
        .attr('id', 'hover_07_24').attr("transform", "translate(" + 0 + "," + (margin + 30) + ")")

    var svg_25 = d3.select("#chart_07").append("svg").attr("width", width).attr("height", height + margin * 3).append("g")
        .attr('id', 'hover_07_25').attr("transform", "translate(" + 0 + "," + (margin + 30) + ")")

    var svg_26 = d3.select("#chart_07").append("svg").attr("width", width).attr("height", height + margin * 3).append("g")
        .attr('id', 'hover_07_26').attr("transform", "translate(" + 0 + "," + (margin + 30) + ")")

    var svg_27 = d3.select("#chart_07").append("svg").attr("width", width).attr("height", height + margin * 3).append("g")
        .attr('id', 'hover_07_27').attr("transform", "translate(" + 0 + "," + (margin + 30) + ")")

    var svg_28 = d3.select("#chart_07").append("svg").attr("width", width).attr("height", height + margin * 3).append("g")
        .attr('id', 'hover_07_28').attr("transform", "translate(" + 0 + "," + (margin + 30) + ")")

    var svg_29 = d3.select("#chart_07").append("svg").attr("width", width).attr("height", height + margin * 3).append("g")
        .attr('id', 'hover_07_29').attr("transform", "translate(" + 0 + "," + (margin + 30) + ")")

    var svg_30 = d3.select("#chart_07").append("svg").attr("width", width).attr("height", height + margin * 3).append("g")
        .attr('id', 'hover_07_30').attr("transform", "translate(" + 0 + "," + (margin + 30) + ")")

    var svg_31 = d3.select("#chart_07").append("svg").attr("width", width).attr("height", height + margin * 3).append("g")
        .attr('id', 'hover_07_31').attr("transform", "translate(" + 0 + "," + (margin + 30) + ")")

    var svg_32 = d3.select("#chart_07").append("svg").attr("width", width / 2).attr("height", height + margin * 3) // .append("g")
        // .attr('id', 'hover_07_32')
        .attr("transform", "translate(" + 0 + "," + (margin + 30) + ")")


    /**
    * Repeated Elements: The y-axis and the bottom text for one day are repeated.
    */

    var yAxis = d3.selectAll("g")
        .append("g")
        .call(d3.axisLeft(y_axis).tickSize(0))
        .call(g => g.selectAll(".tick text").remove())
        .attr("font-size", "12px").attr("font-weight", "500").style("stroke", "black").style("stroke-width", '1').style("stroke-dasharray", ("10", "3")).attr("transform", "translate(0, 0)").style("stroke-linecap", "round")

    var BottomText = d3.selectAll("g")
        .attr("x", 0)
        .attr("text-anchor", "start")
        .attr("font-size", "0.8em")
        .attr("font-weight", "600")
        .style("fill", "#2C3C36")



    /**
    * Charts for the cloud cover start. One chart indicates one day.
    */


    // 01072022 Cloud Cover
    svg_01.select("g").enter(yAxis)

    svg_01.append("text").join(BottomText).attr("y", height + 20)
        .text("01-07-Friday")

    svg_01.selectAll("Barchart_07")
        .data(CloudByDay.get("1"))
        .join("rect")
        .attr("width", barWidth)
        .attr("height", function (d) { return scaleCloudAmount(d.CloudAmount) })
        .attr("transform", function (d, i) {
            var x = barWidth
            var barHeight = scaleCloudAmount(d.CloudAmount)
            var y = height - barHeight;
            return "translate(" + x + "," + y + ")"
        })
        .attr("x", function (d, i) { return + barWidth * i - barWidth })
        .attr("rx", 10)
        .attr("fill", "#878787").style("fill-opacity", 0.5)
        .attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)

        .on('mouseover', function (event, d) {
            d3.select("#hover_07_1")
                .append("text")
                .attr("id", "hover_text")
                .attr("x", function () { return + barWidth * d.Time + 15 })
                .attr("y", -40)
                .text((d.CloudAmount * 12.5) + "% covered at " + d.Time + " o'clock")
                .style("opacity", 1)
            d3.select('#hover_07_1')
                .append('line')
                .attr("id", "hover_line")
                .attr("x1", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y1", -52)
                .attr("x2", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y2", height)
                .attr("stroke", "black")
                .attr("stroke-width", 0.8)
                .attr("stroke-opacity", 1)
            d3.select(event.target)
                .attr("fill", "black")
                .style("fill-opacity", 1)
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 1)
        })

        .on("mouseout", function () {
            d3.select("#hover_text").remove()
            d3.select("#hover_line").remove()
            d3.select(event.target).attr("fill", "#878787").style("fill-opacity", 0.5).attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)
        })


    // 02072022 Cloud Cover
    svg_02.select("g").enter(yAxis)

    svg_02.append("text").join(BottomText).attr("y", height + 20)
        .text("02-07-Saturday")

    svg_02.selectAll("BarChart_02")
        .data(CloudByDay.get("2"))
        .join("rect")
        .attr("width", barWidth)
        .attr("height", function (d) { return scaleCloudAmount(d.CloudAmount) })
        .attr("transform", function (d, i) {
            var x = barWidth
            var barHeight = scaleCloudAmount(d.CloudAmount)
            var y = height - barHeight;
            return "translate(" + x + "," + y + ")"
        })
        .attr("x", function (d, i) { return + barWidth * i - barWidth })
        .attr("rx", 10)
        .attr("fill", "#878787").style("fill-opacity", 0.5)
        .attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)

        .on('mouseover', function (event, d) {
            d3.select("#hover_07_2")
                .append("text")
                .attr("id", "hover_text")
                .attr("x", function () { return + barWidth * d.Time + 15 })
                .attr("y", -40)
                .text((d.CloudAmount * 12.5) + "% covered at " + d.Time + " o'clock")
                .style("opacity", 1)
            d3.select('#hover_07_2')
                .append('line')
                .attr("id", "hover_line")
                .attr("x1", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y1", -52)
                .attr("x2", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y2", height)
                .attr("stroke", "black")
                .attr("stroke-width", 0.8)
                .attr("stroke-opacity", 1)
            d3.select(event.target)
                .attr("fill", "black")
                .style("fill-opacity", 1)
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 1)
        })

        .on("mouseout", function () {
            d3.select("#hover_text").remove()
            d3.select("#hover_line").remove()
            d3.select(event.target).attr("fill", "#878787").style("fill-opacity", 0.5).attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)
        })


    // 03072022 Cloud Cover
    svg_03.select("g").enter(yAxis)

    svg_03.append("text").join(BottomText).attr("y", height + 20)
        .text("03-07-Sunday")

    svg_03.selectAll("BarChart_03")
        .data(CloudByDay.get("3"))
        .join("rect")
        .attr("width", barWidth)
        .attr("height", function (d) { return scaleCloudAmount(d.CloudAmount) })
        .attr("transform", function (d, i) {
            var x = barWidth
            var barHeight = scaleCloudAmount(d.CloudAmount)
            var y = height - barHeight;
            return "translate(" + x + "," + y + ")"
        })
        .attr("x", function (d, i) { return + barWidth * i - barWidth })
        .attr("rx", 10)
        .attr("fill", "#878787").style("fill-opacity", 0.5)
        .attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)

        .on('mouseover', function (event, d) {
            d3.select("#hover_07_3")
                .append("text")
                .attr("id", "hover_text")
                .attr("x", function () { return + barWidth * d.Time + 15 })
                .attr("y", -40)
                .text((d.CloudAmount * 12.5) + "% covered at " + d.Time + " o'clock")
                .style("opacity", 1)
            d3.select('#hover_07_3')
                .append('line')
                .attr("id", "hover_line")
                .attr("x1", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y1", -52)
                .attr("x2", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y2", height)
                .attr("stroke", "black")
                .attr("stroke-width", 0.8)
                .attr("stroke-opacity", 1)
            d3.select(event.target)
                .attr("fill", "black")
                .style("fill-opacity", 1)
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 1)
        })

        .on("mouseout", function () {
            d3.select("#hover_text").remove()
            d3.select("#hover_line").remove()
            d3.select(event.target).attr("fill", "#878787").style("fill-opacity", 0.5).attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)
        })


    // 04072022 Cloud Cover
    svg_04.select("g").enter(yAxis)

    svg_04.append("text").join(BottomText).attr("y", height + 20)
        .text("04-07-Monday")

    svg_04.selectAll("BarChart_04")
        .data(CloudByDay.get("4"))
        .join("rect")
        .attr("width", barWidth)
        .attr("height", function (d) { return scaleCloudAmount(d.CloudAmount) })
        .attr("transform", function (d, i) {
            var x = barWidth
            var barHeight = scaleCloudAmount(d.CloudAmount)
            var y = height - barHeight;
            return "translate(" + x + "," + y + ")"
        })
        .attr("x", function (d, i) { return + barWidth * i - barWidth })
        .attr("rx", 10)
        .attr("fill", "#878787").style("fill-opacity", 0.5)
        .attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)

        .on('mouseover', function (event, d) {
            d3.select("#hover_07_4")
                .append("text")
                .attr("id", "hover_text")
                .attr("x", function () { return + barWidth * d.Time + 15 })
                .attr("y", -40)
                .text((d.CloudAmount * 12.5) + "% covered at " + d.Time + " o'clock")
                .style("opacity", 1)
            d3.select('#hover_07_4')
                .append('line')
                .attr("id", "hover_line")
                .attr("x1", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y1", -52)
                .attr("x2", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y2", height)
                .attr("stroke", "black")
                .attr("stroke-width", 0.8)
                .attr("stroke-opacity", 1)
            d3.select(event.target)
                .attr("fill", "black")
                .style("fill-opacity", 1)
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 1)
        })

        .on("mouseout", function () {
            d3.select("#hover_text").remove()
            d3.select("#hover_line").remove()
            d3.select(event.target).attr("fill", "#878787").style("fill-opacity", 0.5).attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)
        })


    // 05072022 Cloud Cover
    svg_05.select("g").enter(yAxis)

    svg_05.append("text").join(BottomText).attr("y", height + 20)
        .text("05-07-Tuesday")

    svg_05.selectAll("BarChart_05")
        .data(CloudByDay.get("5"))
        .join("rect")
        .attr("width", barWidth)
        .attr("height", function (d) { return scaleCloudAmount(d.CloudAmount) })
        .attr("transform", function (d, i) {
            var x = barWidth
            var barHeight = scaleCloudAmount(d.CloudAmount)
            var y = height - barHeight;
            return "translate(" + x + "," + y + ")"
        })
        .attr("x", function (d, i) { return + barWidth * i - barWidth })
        .attr("rx", 10)
        .attr("fill", "#878787").style("fill-opacity", 0.5)
        .attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)

        .on('mouseover', function (event, d) {
            d3.select("#hover_07_5")
                .append("text")
                .attr("id", "hover_text")
                .attr("x", function () { return + barWidth * d.Time + 15 })
                .attr("y", -40)
                .text((d.CloudAmount * 12.5) + "% covered at " + d.Time + " o'clock")
                .style("opacity", 1)
            d3.select('#hover_07_5')
                .append('line')
                .attr("id", "hover_line")
                .attr("x1", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y1", -52)
                .attr("x2", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y2", height)
                .attr("stroke", "black")
                .attr("stroke-width", 0.8)
                .attr("stroke-opacity", 1)
            d3.select(event.target)
                .attr("fill", "black")
                .style("fill-opacity", 1)
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 1)
        })

        .on("mouseout", function () {
            d3.select("#hover_text").remove()
            d3.select("#hover_line").remove()
            d3.select(event.target).attr("fill", "#878787").style("fill-opacity", 0.5).attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)
        })


    // 06072022 Cloud Cover
    svg_06.select("g").enter(yAxis)

    svg_06.append("text").join(BottomText).attr("y", height + 20)
        .text("06-07-Wednesday")

    svg_06.selectAll("BarChart_06")
        .data(CloudByDay.get("6"))
        .join("rect")
        .attr("width", barWidth)
        .attr("height", function (d) { return scaleCloudAmount(d.CloudAmount) })
        .attr("transform", function (d, i) {
            var x = barWidth
            var barHeight = scaleCloudAmount(d.CloudAmount)
            var y = height - barHeight;
            return "translate(" + x + "," + y + ")"
        })
        .attr("x", function (d, i) { return + barWidth * i - barWidth })
        .attr("rx", 10)
        .attr("fill", "#878787").style("fill-opacity", 0.5)
        .attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)

        .on('mouseover', function (event, d) {
            d3.select("#hover_07_6")
                .append("text")
                .attr("id", "hover_text")
                .attr("x", function () { return + barWidth * d.Time + 15 })
                .attr("y", -40)
                .text((d.CloudAmount * 12.5) + "% covered at " + d.Time + " o'clock")
                .style("opacity", 1)
            d3.select('#hover_07_6')
                .append('line')
                .attr("id", "hover_line")
                .attr("x1", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y1", -52)
                .attr("x2", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y2", height)
                .attr("stroke", "black")
                .attr("stroke-width", 0.8)
                .attr("stroke-opacity", 1)
            d3.select(event.target)
                .attr("fill", "black")
                .style("fill-opacity", 1)
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 1)
        })

        .on("mouseout", function () {
            d3.select("#hover_text").remove()
            d3.select("#hover_line").remove()
            d3.select(event.target).attr("fill", "#878787").style("fill-opacity", 0.5).attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)
        })


    // 07072022 Cloud Cover
    svg_07.select("g").enter(yAxis)

    svg_07.append("text").join(BottomText).attr("y", height + 20)
        .text("07-07-Thursday")

    svg_07.selectAll("BarChart_07")
        .data(CloudByDay.get("7"))
        .join("rect")
        .attr("width", barWidth)
        .attr("height", function (d) { return scaleCloudAmount(d.CloudAmount) })
        .attr("transform", function (d, i) {
            var x = barWidth
            var barHeight = scaleCloudAmount(d.CloudAmount)
            var y = height - barHeight;
            return "translate(" + x + "," + y + ")"
        })
        .attr("x", function (d, i) { return + barWidth * i - barWidth })
        .attr("rx", 10)
        .attr("fill", "#878787").style("fill-opacity", 0.5)
        .attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)

        .on('mouseover', function (event, d) {
            d3.select("#hover_07_7")
                .append("text")
                .attr("id", "hover_text")
                .attr("x", function () { return + barWidth * d.Time + 15 })
                .attr("y", -40)
                .text((d.CloudAmount * 12.5) + "% covered at " + d.Time + " o'clock")
                .style("opacity", 1)
            d3.select('#hover_07_7')
                .append('line')
                .attr("id", "hover_line")
                .attr("x1", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y1", -52)
                .attr("x2", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y2", height)
                .attr("stroke", "black")
                .attr("stroke-width", 0.8)
                .attr("stroke-opacity", 1)
            d3.select(event.target)
                .attr("fill", "black")
                .style("fill-opacity", 1)
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 1)
        })

        .on("mouseout", function () {
            d3.select("#hover_text").remove()
            d3.select("#hover_line").remove()
            d3.select(event.target).attr("fill", "#878787").style("fill-opacity", 0.5).attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)
        })


    // 08072022 Cloud Cover
    svg_08.select("g").enter(yAxis)

    svg_08.append("text").join(BottomText).attr("y", height + 20)
        .text("08-07-Friday")

    svg_08.selectAll("BarChart_08")
        .data(CloudByDay.get("8"))
        .join("rect")
        .attr("width", barWidth)
        .attr("height", function (d) { return scaleCloudAmount(d.CloudAmount) })
        .attr("transform", function (d, i) {
            var x = barWidth
            var barHeight = scaleCloudAmount(d.CloudAmount)
            var y = height - barHeight;
            return "translate(" + x + "," + y + ")"
        })
        .attr("x", function (d, i) { return + barWidth * i - barWidth })
        .attr("rx", 10)
        .attr("fill", "#878787").style("fill-opacity", 0.5)
        .attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)

        .on('mouseover', function (event, d) {
            d3.select("#hover_07_8")
                .append("text")
                .attr("id", "hover_text")
                .attr("x", function () { return + barWidth * d.Time + 15 })
                .attr("y", -40)
                .text((d.CloudAmount * 12.5) + "% covered at " + d.Time + " o'clock")
                .style("opacity", 1)
            d3.select('#hover_07_8')
                .append('line')
                .attr("id", "hover_line")
                .attr("x1", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y1", -52)
                .attr("x2", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y2", height)
                .attr("stroke", "black")
                .attr("stroke-width", 0.8)
                .attr("stroke-opacity", 1)
            d3.select(event.target)
                .attr("fill", "black")
                .style("fill-opacity", 1)
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 1)
        })

        .on("mouseout", function () {
            d3.select("#hover_text").remove()
            d3.select("#hover_line").remove()
            d3.select(event.target).attr("fill", "#878787").style("fill-opacity", 0.5).attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)
        })


    // 09072022 Cloud Cover
    svg_09.select("g").enter(yAxis)

    svg_09.append("text").join(BottomText).attr("y", height + 20)
        .text("09-07-Saturday")

    svg_09.selectAll("BarChart_09")
        .data(CloudByDay.get("9"))
        .join("rect")
        .attr("width", barWidth)
        .attr("height", function (d) { return scaleCloudAmount(d.CloudAmount) })
        .attr("transform", function (d, i) {
            var x = barWidth
            var barHeight = scaleCloudAmount(d.CloudAmount)
            var y = height - barHeight;
            return "translate(" + x + "," + y + ")"
        })
        .attr("x", function (d, i) { return + barWidth * i - barWidth })
        .attr("rx", 10)
        .attr("fill", "#878787").style("fill-opacity", 0.5)
        .attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)

        .on('mouseover', function (event, d) {
            d3.select("#hover_07_9")
                .append("text")
                .attr("id", "hover_text")
                .attr("x", function () { return + barWidth * d.Time + 15 })
                .attr("y", -40)
                .text((d.CloudAmount * 12.5) + "% covered at " + d.Time + " o'clock")
                .style("opacity", 1)
            d3.select('#hover_07_9')
                .append('line')
                .attr("id", "hover_line")
                .attr("x1", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y1", -52)
                .attr("x2", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y2", height)
                .attr("stroke", "black")
                .attr("stroke-width", 0.8)
                .attr("stroke-opacity", 1)
            d3.select(event.target)
                .attr("fill", "black")
                .style("fill-opacity", 1)
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 1)
        })

        .on("mouseout", function () {
            d3.select("#hover_text").remove()
            d3.select("#hover_line").remove()
            d3.select(event.target).attr("fill", "#878787").style("fill-opacity", 0.5).attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)
        })


    // 10072022 Cloud Cover
    svg_10.select("g").enter(yAxis)

    svg_10.append("text").join(BottomText).attr("y", height + 20)
        .text("10-07-Sunday")

    svg_10.selectAll("BarChart_10")
        .data(CloudByDay.get("10"))
        .join("rect")
        .attr("width", barWidth)
        .attr("height", function (d) { return scaleCloudAmount(d.CloudAmount) })
        .attr("transform", function (d, i) {
            var x = barWidth
            var barHeight = scaleCloudAmount(d.CloudAmount)
            var y = height - barHeight;
            return "translate(" + x + "," + y + ")"
        })
        .attr("x", function (d, i) { return + barWidth * i - barWidth })
        .attr("rx", 10)
        .attr("fill", "#878787").style("fill-opacity", 0.5)
        .attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)

        .on('mouseover', function (event, d) {
            d3.select("#hover_07_10")
                .append("text")
                .attr("id", "hover_text")
                .attr("x", function () { return + barWidth * d.Time + 15 })
                .attr("y", -40)
                .text((d.CloudAmount * 12.5) + "% covered at " + d.Time + " o'clock")
                .style("opacity", 1)
            d3.select('#hover_07_10')
                .append('line')
                .attr("id", "hover_line")
                .attr("x1", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y1", -52)
                .attr("x2", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y2", height)
                .attr("stroke", "black")
                .attr("stroke-width", 0.8)
                .attr("stroke-opacity", 1)
            d3.select(event.target)
                .attr("fill", "black")
                .style("fill-opacity", 1)
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 1)
        })

        .on("mouseout", function () {
            d3.select("#hover_text").remove()
            d3.select("#hover_line").remove()
            d3.select(event.target).attr("fill", "#878787").style("fill-opacity", 0.5).attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)
        })


    // 11072022 Cloud Cover
    svg_11.select("g").enter(yAxis)

    svg_11.append("text").join(BottomText).attr("y", height + 20)
        .text("11-07-Monday")

    svg_11.selectAll("BarChart_11")
        .data(CloudByDay.get("11"))
        .join("rect")
        .attr("width", barWidth)
        .attr("height", function (d) { return scaleCloudAmount(d.CloudAmount) })
        .attr("transform", function (d, i) {
            var x = barWidth
            var barHeight = scaleCloudAmount(d.CloudAmount)
            var y = height - barHeight;
            return "translate(" + x + "," + y + ")"
        })
        .attr("x", function (d, i) { return + barWidth * i - barWidth })
        .attr("rx", 10)
        .attr("fill", "#878787").style("fill-opacity", 0.5)
        .attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)

        .on('mouseover', function (event, d) {
            d3.select("#hover_07_11")
                .append("text")
                .attr("id", "hover_text")
                .attr("x", function () { return + barWidth * d.Time + 15 })
                .attr("y", -40)
                .text((d.CloudAmount * 12.5) + "% covered at " + d.Time + " o'clock")
                .style("opacity", 1)
            d3.select('#hover_07_11')
                .append('line')
                .attr("id", "hover_line")
                .attr("x1", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y1", -52)
                .attr("x2", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y2", height)
                .attr("stroke", "black")
                .attr("stroke-width", 0.8)
                .attr("stroke-opacity", 1)
            d3.select(event.target)
                .attr("fill", "black")
                .style("fill-opacity", 1)
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 1)
        })

        .on("mouseout", function () {
            d3.select("#hover_text").remove()
            d3.select("#hover_line").remove()
            d3.select(event.target).attr("fill", "#878787").style("fill-opacity", 0.5).attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)
        })


    // 12072022 Cloud Cover
    svg_12.select("g").enter(yAxis)

    svg_12.append("text").join(BottomText).attr("y", height + 20)
        .text("12-07-Tuesday")

    svg_12.selectAll("BarChart_12")
        .data(CloudByDay.get("12"))
        .join("rect")
        .attr("width", barWidth)
        .attr("height", function (d) { return scaleCloudAmount(d.CloudAmount) })
        .attr("transform", function (d, i) {
            var x = barWidth
            var barHeight = scaleCloudAmount(d.CloudAmount)
            var y = height - barHeight;
            return "translate(" + x + "," + y + ")"
        })
        .attr("x", function (d, i) { return + barWidth * i - barWidth })
        .attr("rx", 10)
        .attr("fill", "#878787").style("fill-opacity", 0.5)
        .attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)

        .on('mouseover', function (event, d) {
            d3.select("#hover_07_12")
                .append("text")
                .attr("id", "hover_text")
                .attr("x", function () { return + barWidth * d.Time + 15 })
                .attr("y", -40)
                .text((d.CloudAmount * 12.5) + "% covered at " + d.Time + " o'clock")
                .style("opacity", 1)
            d3.select('#hover_07_12')
                .append('line')
                .attr("id", "hover_line")
                .attr("x1", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y1", -52)
                .attr("x2", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y2", height)
                .attr("stroke", "black")
                .attr("stroke-width", 0.8)
                .attr("stroke-opacity", 1)
            d3.select(event.target)
                .attr("fill", "black")
                .style("fill-opacity", 1)
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 1)
        })

        .on("mouseout", function () {
            d3.select("#hover_text").remove()
            d3.select("#hover_line").remove()
            d3.select(event.target).attr("fill", "#878787").style("fill-opacity", 0.5).attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)
        })


    // 13072022 Cloud Cover
    svg_13.select("g").enter(yAxis)

    svg_13.append("text").join(BottomText).attr("y", height + 20)
        .text("13-07-Wednesday")

    svg_13.selectAll("BarChart_13")
        .data(CloudByDay.get("13"))
        .join("rect")
        .attr("width", barWidth)
        .attr("height", function (d) { return scaleCloudAmount(d.CloudAmount) })
        .attr("transform", function (d, i) {
            var x = barWidth
            var barHeight = scaleCloudAmount(d.CloudAmount)
            var y = height - barHeight;
            return "translate(" + x + "," + y + ")"
        })
        .attr("x", function (d, i) { return + barWidth * i - barWidth })
        .attr("rx", 10)
        .attr("fill", "#878787").style("fill-opacity", 0.5)
        .attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)

        .on('mouseover', function (event, d) {
            d3.select("#hover_07_13")
                .append("text")
                .attr("id", "hover_text")
                .attr("x", function () { return + barWidth * d.Time + 15 })
                .attr("y", -40)
                .text((d.CloudAmount * 12.5) + "% covered at " + d.Time + " o'clock")
                .style("opacity", 1)
            d3.select('#hover_07_13')
                .append('line')
                .attr("id", "hover_line")
                .attr("x1", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y1", -52)
                .attr("x2", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y2", height)
                .attr("stroke", "black")
                .attr("stroke-width", 0.8)
                .attr("stroke-opacity", 1)
            d3.select(event.target)
                .attr("fill", "black")
                .style("fill-opacity", 1)
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 1)
        })

        .on("mouseout", function () {
            d3.select("#hover_text").remove()
            d3.select("#hover_line").remove()
            d3.select(event.target).attr("fill", "#878787").style("fill-opacity", 0.5).attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)
        })


    // 14072022 Cloud Cover
    svg_14.select("g").enter(yAxis)

    svg_14.append("text").join(BottomText).attr("y", height + 20)
        .text("14-07-Thursday")

    svg_14.selectAll("BarChart_14")
        .data(CloudByDay.get("14"))
        .join("rect")
        .attr("width", barWidth)
        .attr("height", function (d) { return scaleCloudAmount(d.CloudAmount) })
        .attr("transform", function (d, i) {
            var x = barWidth
            var barHeight = scaleCloudAmount(d.CloudAmount)
            var y = height - barHeight;
            return "translate(" + x + "," + y + ")"
        })
        .attr("x", function (d, i) { return + barWidth * i - barWidth })
        .attr("rx", 10)
        .attr("fill", "#878787").style("fill-opacity", 0.5)
        .attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)

        .on('mouseover', function (event, d) {
            d3.select("#hover_07_14")
                .append("text")
                .attr("id", "hover_text")
                .attr("x", function () { return + barWidth * d.Time + 15 })
                .attr("y", -40)
                .text((d.CloudAmount * 12.5) + "% covered at " + d.Time + " o'clock")
                .style("opacity", 1)
            d3.select('#hover_07_14')
                .append('line')
                .attr("id", "hover_line")
                .attr("x1", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y1", -52)
                .attr("x2", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y2", height)
                .attr("stroke", "black")
                .attr("stroke-width", 0.8)
                .attr("stroke-opacity", 1)
            d3.select(event.target)
                .attr("fill", "black")
                .style("fill-opacity", 1)
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 1)
        })

        .on("mouseout", function () {
            d3.select("#hover_text").remove()
            d3.select("#hover_line").remove()
            d3.select(event.target).attr("fill", "#878787").style("fill-opacity", 0.5).attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)
        })


    // 15072022 Cloud Cover
    svg_15.select("g").enter(yAxis)

    svg_15.append("text").join(BottomText).attr("y", height + 20)
        .text("15-07-Friday")

    svg_15.selectAll("BarChart_15")
        .data(CloudByDay.get("15"))
        .join("rect")
        .attr("width", barWidth)
        .attr("height", function (d) { return scaleCloudAmount(d.CloudAmount) })
        .attr("transform", function (d, i) {
            var x = barWidth
            var barHeight = scaleCloudAmount(d.CloudAmount)
            var y = height - barHeight;
            return "translate(" + x + "," + y + ")"
        })
        .attr("x", function (d, i) { return + barWidth * i - barWidth })
        .attr("rx", 10)
        .attr("fill", "#878787").style("fill-opacity", 0.5)
        .attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)

        .on('mouseover', function (event, d) {
            d3.select("#hover_07_15")
                .append("text")
                .attr("id", "hover_text")
                .attr("x", function () { return + barWidth * d.Time + 15 })
                .attr("y", -40)
                .text((d.CloudAmount * 12.5) + "% covered at " + d.Time + " o'clock")
                .style("opacity", 1)
            d3.select('#hover_07_15')
                .append('line')
                .attr("id", "hover_line")
                .attr("x1", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y1", -52)
                .attr("x2", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y2", height)
                .attr("stroke", "black")
                .attr("stroke-width", 0.8)
                .attr("stroke-opacity", 1)
            d3.select(event.target)
                .attr("fill", "black")
                .style("fill-opacity", 1)
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 1)
        })

        .on("mouseout", function () {
            d3.select("#hover_text").remove()
            d3.select("#hover_line").remove()
            d3.select(event.target).attr("fill", "#878787").style("fill-opacity", 0.5).attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)
        })


    // 16072022 Cloud Cover
    svg_16.select("g").enter(yAxis)

    svg_16.append("text").join(BottomText).attr("y", height + 20)
        .text("16-07-Saturday")

    svg_16.selectAll("BarChart_16")
        .data(CloudByDay.get("16"))
        .join("rect")
        .attr("width", barWidth)
        .attr("height", function (d) { return scaleCloudAmount(d.CloudAmount) })
        .attr("transform", function (d, i) {
            var x = barWidth
            var barHeight = scaleCloudAmount(d.CloudAmount)
            var y = height - barHeight;
            return "translate(" + x + "," + y + ")"
        })
        .attr("x", function (d, i) { return + barWidth * i - barWidth })
        .attr("rx", 10)
        .attr("fill", "#878787").style("fill-opacity", 0.5)
        .attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)

        .on('mouseover', function (event, d) {
            d3.select("#hover_07_16")
                .append("text")
                .attr("id", "hover_text")
                .attr("x", function () { return + barWidth * d.Time + 15 })
                .attr("y", -40)
                .text((d.CloudAmount * 12.5) + "% covered at " + d.Time + " o'clock")
                .style("opacity", 1)
            d3.select('#hover_07_16')
                .append('line')
                .attr("id", "hover_line")
                .attr("x1", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y1", -52)
                .attr("x2", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y2", height)
                .attr("stroke", "black")
                .attr("stroke-width", 0.8)
                .attr("stroke-opacity", 1)
            d3.select(event.target)
                .attr("fill", "black")
                .style("fill-opacity", 1)
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 1)
        })

        .on("mouseout", function () {
            d3.select("#hover_text").remove()
            d3.select("#hover_line").remove()
            d3.select(event.target).attr("fill", "#878787").style("fill-opacity", 0.5).attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)
        })


    // 17072022 Cloud Cover
    svg_17.select("g").enter(yAxis)

    svg_17.append("text").join(BottomText).attr("y", height + 20)
        .text("17-07-Sunday")

    svg_17.selectAll("BarChart_17")
        .data(CloudByDay.get("17"))
        .join("rect")
        .attr("width", barWidth)
        .attr("height", function (d) { return scaleCloudAmount(d.CloudAmount) })
        .attr("transform", function (d, i) {
            var x = barWidth
            var barHeight = scaleCloudAmount(d.CloudAmount)
            var y = height - barHeight;
            return "translate(" + x + "," + y + ")"
        })
        .attr("x", function (d, i) { return + barWidth * i - barWidth })
        .attr("rx", 10)
        .attr("fill", "#878787").style("fill-opacity", 0.5)
        .attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)

        .on('mouseover', function (event, d) {
            d3.select("#hover_07_17")
                .append("text")
                .attr("id", "hover_text")
                .attr("x", function () { return + barWidth * d.Time + 15 })
                .attr("y", -40)
                .text((d.CloudAmount * 12.5) + "% covered at " + d.Time + " o'clock")
                .style("opacity", 1)
            d3.select('#hover_07_17')
                .append('line')
                .attr("id", "hover_line")
                .attr("x1", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y1", -52)
                .attr("x2", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y2", height)
                .attr("stroke", "black")
                .attr("stroke-width", 0.8)
                .attr("stroke-opacity", 1)
            d3.select(event.target)
                .attr("fill", "black")
                .style("fill-opacity", 1)
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 1)
        })

        .on("mouseout", function () {
            d3.select("#hover_text").remove()
            d3.select("#hover_line").remove()
            d3.select(event.target).attr("fill", "#878787").style("fill-opacity", 0.5).attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)
        })


    // 18072022 Cloud Cover
    svg_18.select("g").enter(yAxis)

    svg_18.append("text").join(BottomText).attr("y", height + 20)
        .text("18-07-Monday")

    svg_18.selectAll("BarChart_18")
        .data(CloudByDay.get("18"))
        .join("rect")
        .attr("width", barWidth)
        .attr("height", function (d) { return scaleCloudAmount(d.CloudAmount) })
        .attr("transform", function (d, i) {
            var x = barWidth
            var barHeight = scaleCloudAmount(d.CloudAmount)
            var y = height - barHeight;
            return "translate(" + x + "," + y + ")"
        })
        .attr("x", function (d, i) { return + barWidth * i - barWidth })
        .attr("rx", 10)
        .attr("fill", "#878787").style("fill-opacity", 0.5)
        .attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)

        .on('mouseover', function (event, d) {
            d3.select("#hover_07_18")
                .append("text")
                .attr("id", "hover_text")
                .attr("x", function () { return + barWidth * d.Time + 15 })
                .attr("y", -40)
                .text((d.CloudAmount * 12.5) + "% covered at " + d.Time + " o'clock")
                .style("opacity", 1)
            d3.select('#hover_07_18')
                .append('line')
                .attr("id", "hover_line")
                .attr("x1", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y1", -52)
                .attr("x2", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y2", height)
                .attr("stroke", "black")
                .attr("stroke-width", 0.8)
                .attr("stroke-opacity", 1)
            d3.select(event.target)
                .attr("fill", "black")
                .style("fill-opacity", 1)
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 1)
        })

        .on("mouseout", function () {
            d3.select("#hover_text").remove()
            d3.select("#hover_line").remove()
            d3.select(event.target).attr("fill", "#878787").style("fill-opacity", 0.5).attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)
        })


    // 19072022 Cloud Cover
    svg_19.select("g").enter(yAxis)

    svg_19.append("text").join(BottomText).attr("y", height + 20)
        .text("19-07-Tuesday")

    svg_19.selectAll("BarChart_19")
        .data(CloudByDay.get("19"))
        .join("rect")
        .attr("width", barWidth)
        .attr("height", function (d) { return scaleCloudAmount(d.CloudAmount) })
        .attr("transform", function (d, i) {
            var x = barWidth
            var barHeight = scaleCloudAmount(d.CloudAmount)
            var y = height - barHeight;
            return "translate(" + x + "," + y + ")"
        })
        .attr("x", function (d, i) { return + barWidth * i - barWidth })
        .attr("rx", 10)
        .attr("fill", "#878787").style("fill-opacity", 0.5)
        .attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)

        .on('mouseover', function (event, d) {
            d3.select("#hover_07_19")
                .append("text")
                .attr("id", "hover_text")
                .attr("x", function () { return + barWidth * d.Time + 15 })
                .attr("y", -40)
                .text((d.CloudAmount * 12.5) + "% covered at " + d.Time + " o'clock")
                .style("opacity", 1)
            d3.select('#hover_07_19')
                .append('line')
                .attr("id", "hover_line")
                .attr("x1", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y1", -52)
                .attr("x2", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y2", height)
                .attr("stroke", "black")
                .attr("stroke-width", 0.8)
                .attr("stroke-opacity", 1)
            d3.select(event.target)
                .attr("fill", "black")
                .style("fill-opacity", 1)
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 1)
        })

        .on("mouseout", function () {
            d3.select("#hover_text").remove()
            d3.select("#hover_line").remove()
            d3.select(event.target).attr("fill", "#878787").style("fill-opacity", 0.5).attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)
        })


    // 20072022 Cloud Cover
    svg_20.select("g").enter(yAxis)

    svg_20.append("text").join(BottomText).attr("y", height + 20)
        .text("20-07-Wednesday")

    svg_20.selectAll("BarChart_20")
        .data(CloudByDay.get("20"))
        .join("rect")
        .attr("width", barWidth)
        .attr("height", function (d) { return scaleCloudAmount(d.CloudAmount) })
        .attr("transform", function (d, i) {
            var x = barWidth
            var barHeight = scaleCloudAmount(d.CloudAmount)
            var y = height - barHeight;
            return "translate(" + x + "," + y + ")"
        })
        .attr("x", function (d, i) { return + barWidth * i - barWidth })
        .attr("rx", 10)
        .attr("fill", "#878787").style("fill-opacity", 0.5)
        .attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)

        .on('mouseover', function (event, d) {
            d3.select("#hover_07_20")
                .append("text")
                .attr("id", "hover_text")
                .attr("x", function () { return + barWidth * d.Time + 15 })
                .attr("y", -40)
                .text((d.CloudAmount * 12.5) + "% covered at " + d.Time + " o'clock")
                .style("opacity", 1)
            d3.select('#hover_07_20')
                .append('line')
                .attr("id", "hover_line")
                .attr("x1", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y1", -52)
                .attr("x2", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y2", height)
                .attr("stroke", "black")
                .attr("stroke-width", 0.8)
                .attr("stroke-opacity", 1)
            d3.select(event.target)
                .attr("fill", "black")
                .style("fill-opacity", 1)
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 1)
        })

        .on("mouseout", function () {
            d3.select("#hover_text").remove()
            d3.select("#hover_line").remove()
            d3.select(event.target).attr("fill", "#878787").style("fill-opacity", 0.5).attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)
        })


    // 21072022 Cloud Cover
    svg_21.select("g").enter(yAxis)

    svg_21.append("text").join(BottomText).attr("y", height + 20)
        .text("21-07-Thursday")

    svg_21.selectAll("BarChart_21")
        .data(CloudByDay.get("21"))
        .join("rect")
        .attr("width", barWidth)
        .attr("height", function (d) { return scaleCloudAmount(d.CloudAmount) })
        .attr("transform", function (d, i) {
            var x = barWidth
            var barHeight = scaleCloudAmount(d.CloudAmount)
            var y = height - barHeight;
            return "translate(" + x + "," + y + ")"
        })
        .attr("x", function (d, i) { return + barWidth * i - barWidth })
        .attr("rx", 10)
        .attr("fill", "#878787").style("fill-opacity", 0.5)
        .attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)

        .on('mouseover', function (event, d) {
            d3.select("#hover_07_21")
                .append("text")
                .attr("id", "hover_text")
                .attr("x", function () { return + barWidth * d.Time + 15 })
                .attr("y", -40)
                .text((d.CloudAmount * 12.5) + "% covered at " + d.Time + " o'clock")
                .style("opacity", 1)
            d3.select('#hover_07_21')
                .append('line')
                .attr("id", "hover_line")
                .attr("x1", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y1", -52)
                .attr("x2", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y2", height)
                .attr("stroke", "black")
                .attr("stroke-width", 0.8)
                .attr("stroke-opacity", 1)
            d3.select(event.target)
                .attr("fill", "black")
                .style("fill-opacity", 1)
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 1)
        })

        .on("mouseout", function () {
            d3.select("#hover_text").remove()
            d3.select("#hover_line").remove()
            d3.select(event.target).attr("fill", "#878787").style("fill-opacity", 0.5).attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)
        })


    // 22072022 Cloud Cover
    svg_22.select("g").enter(yAxis)

    svg_22.append("text").join(BottomText).attr("y", height + 20)
        .text("22-07-Friday")

    svg_22.selectAll("BarChart_22")
        .data(CloudByDay.get("22"))
        .join("rect")
        .attr("width", barWidth)
        .attr("height", function (d) { return scaleCloudAmount(d.CloudAmount) })
        .attr("transform", function (d, i) {
            var x = barWidth
            var barHeight = scaleCloudAmount(d.CloudAmount)
            var y = height - barHeight;
            return "translate(" + x + "," + y + ")"
        })
        .attr("x", function (d, i) { return + barWidth * i - barWidth })
        .attr("rx", 10)
        .attr("fill", "#878787").style("fill-opacity", 0.5)
        .attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)

        .on('mouseover', function (event, d) {
            d3.select("#hover_07_22")
                .append("text")
                .attr("id", "hover_text")
                .attr("x", function () { return + barWidth * d.Time + 15 })
                .attr("y", -40)
                .text((d.CloudAmount * 12.5) + "% covered at " + d.Time + " o'clock")
                .style("opacity", 1)
            d3.select('#hover_07_22')
                .append('line')
                .attr("id", "hover_line")
                .attr("x1", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y1", -52)
                .attr("x2", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y2", height)
                .attr("stroke", "black")
                .attr("stroke-width", 0.8)
                .attr("stroke-opacity", 1)
            d3.select(event.target)
                .attr("fill", "black")
                .style("fill-opacity", 1)
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 1)
        })

        .on("mouseout", function () {
            d3.select("#hover_text").remove()
            d3.select("#hover_line").remove()
            d3.select(event.target).attr("fill", "#878787").style("fill-opacity", 0.5).attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)
        })


    // 23072022 Cloud Cover
    svg_23.select("g").enter(yAxis)

    svg_23.append("text").join(BottomText).attr("y", height + 20)
        .text("23-07-Saturday")

    svg_23.selectAll("BarChart_23")
        .data(CloudByDay.get("23"))
        .join("rect")
        .attr("width", barWidth)
        .attr("height", function (d) { return scaleCloudAmount(d.CloudAmount) })
        .attr("transform", function (d, i) {
            var x = barWidth
            var barHeight = scaleCloudAmount(d.CloudAmount)
            var y = height - barHeight;
            return "translate(" + x + "," + y + ")"
        })
        .attr("x", function (d, i) { return + barWidth * i - barWidth })
        .attr("rx", 10)
        .attr("fill", "#878787").style("fill-opacity", 0.5)
        .attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)

        .on('mouseover', function (event, d) {
            d3.select("#hover_07_23")
                .append("text")
                .attr("id", "hover_text")
                .attr("x", function () { return + barWidth * d.Time + 15 })
                .attr("y", -40)
                .text((d.CloudAmount * 12.5) + "% covered at " + d.Time + " o'clock")
                .style("opacity", 1)
            d3.select('#hover_07_23')
                .append('line')
                .attr("id", "hover_line")
                .attr("x1", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y1", -52)
                .attr("x2", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y2", height)
                .attr("stroke", "black")
                .attr("stroke-width", 0.8)
                .attr("stroke-opacity", 1)
            d3.select(event.target)
                .attr("fill", "black")
                .style("fill-opacity", 1)
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 1)
        })

        .on("mouseout", function () {
            d3.select("#hover_text").remove()
            d3.select("#hover_line").remove()
            d3.select(event.target).attr("fill", "#878787").style("fill-opacity", 0.5).attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)
        })


    // 24072022 Cloud Cover
    svg_24.select("g").enter(yAxis)

    svg_24.append("text").join(BottomText).attr("y", height + 20)
        .text("24-07-Sunday")

    svg_24.selectAll("BarChart_24")
        .data(CloudByDay.get("24"))
        .join("rect")
        .attr("width", barWidth)
        .attr("height", function (d) { return scaleCloudAmount(d.CloudAmount) })
        .attr("transform", function (d, i) {
            var x = barWidth
            var barHeight = scaleCloudAmount(d.CloudAmount)
            var y = height - barHeight;
            return "translate(" + x + "," + y + ")"
        })
        .attr("x", function (d, i) { return + barWidth * i - barWidth })
        .attr("rx", 10)
        .attr("fill", "#878787").style("fill-opacity", 0.5)
        .attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)

        .on('mouseover', function (event, d) {
            d3.select("#hover_07_24")
                .append("text")
                .attr("id", "hover_text")
                .attr("x", function () { return + barWidth * d.Time + 15 })
                .attr("y", -40)
                .text((d.CloudAmount * 12.5) + "% covered at " + d.Time + " o'clock")
                .style("opacity", 1)
            d3.select('#hover_07_24')
                .append('line')
                .attr("id", "hover_line")
                .attr("x1", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y1", -52)
                .attr("x2", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y2", height)
                .attr("stroke", "black")
                .attr("stroke-width", 0.8)
                .attr("stroke-opacity", 1)
            d3.select(event.target)
                .attr("fill", "black")
                .style("fill-opacity", 1)
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 1)
        })

        .on("mouseout", function () {
            d3.select("#hover_text").remove()
            d3.select("#hover_line").remove()
            d3.select(event.target).attr("fill", "#878787").style("fill-opacity", 0.5).attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)
        })


    // 25072022 Cloud Cover
    svg_25.select("g").enter(yAxis)

    svg_25.append("text").join(BottomText).attr("y", height + 20)
        .text("25-07-Monday")

    svg_25.selectAll("BarChart_25")
        .data(CloudByDay.get("25"))
        .join("rect")
        .attr("width", barWidth)
        .attr("height", function (d) { return scaleCloudAmount(d.CloudAmount) })
        .attr("transform", function (d, i) {
            var x = barWidth
            var barHeight = scaleCloudAmount(d.CloudAmount)
            var y = height - barHeight;
            return "translate(" + x + "," + y + ")"
        })
        .attr("x", function (d, i) { return + barWidth * i - barWidth })
        .attr("rx", 10)
        .attr("fill", "#878787").style("fill-opacity", 0.5)
        .attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)

        .on('mouseover', function (event, d) {
            d3.select("#hover_07_25")
                .append("text")
                .attr("id", "hover_text")
                .attr("x", function () { return + barWidth * d.Time + 15 })
                .attr("y", -40)
                .text((d.CloudAmount * 12.5) + "% covered at " + d.Time + " o'clock")
                .style("opacity", 1)
            d3.select('#hover_07_25')
                .append('line')
                .attr("id", "hover_line")
                .attr("x1", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y1", -52)
                .attr("x2", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y2", height)
                .attr("stroke", "black")
                .attr("stroke-width", 0.8)
                .attr("stroke-opacity", 1)
            d3.select(event.target)
                .attr("fill", "black")
                .style("fill-opacity", 1)
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 1)
        })

        .on("mouseout", function () {
            d3.select("#hover_text").remove()
            d3.select("#hover_line").remove()
            d3.select(event.target).attr("fill", "#878787").style("fill-opacity", 0.5).attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)
        })


    // 26072022 Cloud Cover
    svg_26.select("g").enter(yAxis)

    svg_26.append("text").join(BottomText).attr("y", height + 20)
        .text("26-07-Tuesday")

    svg_26.selectAll("BarChart_26")
        .data(CloudByDay.get("26"))
        .join("rect")
        .attr("width", barWidth)
        .attr("height", function (d) { return scaleCloudAmount(d.CloudAmount) })
        .attr("transform", function (d, i) {
            var x = barWidth
            var barHeight = scaleCloudAmount(d.CloudAmount)
            var y = height - barHeight;
            return "translate(" + x + "," + y + ")"
        })
        .attr("x", function (d, i) { return + barWidth * i - barWidth })
        .attr("rx", 10)
        .attr("fill", "#878787").style("fill-opacity", 0.5)
        .attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)

        .on('mouseover', function (event, d) {
            d3.select("#hover_07_26")
                .append("text")
                .attr("id", "hover_text")
                .attr("x", function () { return + barWidth * d.Time + 15 })
                .attr("y", -40)
                .text((d.CloudAmount * 12.5) + "% covered at " + d.Time + " o'clock")
                .style("opacity", 1)
            d3.select('#hover_07_26')
                .append('line')
                .attr("id", "hover_line")
                .attr("x1", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y1", -52)
                .attr("x2", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y2", height)
                .attr("stroke", "black")
                .attr("stroke-width", 0.8)
                .attr("stroke-opacity", 1)
            d3.select(event.target)
                .attr("fill", "black")
                .style("fill-opacity", 1)
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 1)
        })

        .on("mouseout", function () {
            d3.select("#hover_text").remove()
            d3.select("#hover_line").remove()
            d3.select(event.target).attr("fill", "#878787").style("fill-opacity", 0.5).attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)
        })


    // 27072022 Cloud Cover
    svg_27.select("g").enter(yAxis)

    svg_27.append("text").join(BottomText).attr("y", height + 20)
        .text("27-07-Wednesday")

    svg_27.selectAll("BarChart_27")
        .data(CloudByDay.get("27"))
        .join("rect")
        .attr("width", barWidth)
        .attr("height", function (d) { return scaleCloudAmount(d.CloudAmount) })
        .attr("transform", function (d, i) {
            var x = barWidth
            var barHeight = scaleCloudAmount(d.CloudAmount)
            var y = height - barHeight;
            return "translate(" + x + "," + y + ")"
        })
        .attr("x", function (d, i) { return + barWidth * i - barWidth })
        .attr("rx", 10)
        .attr("fill", "#878787").style("fill-opacity", 0.5)
        .attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)

        .on('mouseover', function (event, d) {
            d3.select("#hover_07_27")
                .append("text")
                .attr("id", "hover_text")
                .attr("x", function () { return + barWidth * d.Time + 15 })
                .attr("y", -40)
                .text((d.CloudAmount * 12.5) + "% covered at " + d.Time + " o'clock")
                .style("opacity", 1)
            d3.select('#hover_07_27')
                .append('line')
                .attr("id", "hover_line")
                .attr("x1", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y1", -52)
                .attr("x2", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y2", height)
                .attr("stroke", "black")
                .attr("stroke-width", 0.8)
                .attr("stroke-opacity", 1)
            d3.select(event.target)
                .attr("fill", "black")
                .style("fill-opacity", 1)
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 1)
        })

        .on("mouseout", function () {
            d3.select("#hover_text").remove()
            d3.select("#hover_line").remove()
            d3.select(event.target).attr("fill", "#878787").style("fill-opacity", 0.5).attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)
        })


    // 28072022 Cloud Cover
    svg_28.select("g").enter(yAxis)

    svg_28.append("text").join(BottomText).attr("y", height + 20)
        .text("28-07-Thursday")

    svg_28.selectAll("BarChart_28")
        .data(CloudByDay.get("28"))
        .join("rect")
        .attr("width", barWidth)
        .attr("height", function (d) { return scaleCloudAmount(d.CloudAmount) })
        .attr("transform", function (d, i) {
            var x = barWidth
            var barHeight = scaleCloudAmount(d.CloudAmount)
            var y = height - barHeight;
            return "translate(" + x + "," + y + ")"
        })
        .attr("x", function (d, i) { return + barWidth * i - barWidth })
        .attr("rx", 10)
        .attr("fill", "#878787").style("fill-opacity", 0.5)
        .attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)

        .on('mouseover', function (event, d) {
            d3.select("#hover_07_28")
                .append("text")
                .attr("id", "hover_text")
                .attr("x", function () { return + barWidth * d.Time + 15 })
                .attr("y", -40)
                .text((d.CloudAmount * 12.5) + "% covered at " + d.Time + " o'clock")
                .style("opacity", 1)
            d3.select('#hover_07_28')
                .append('line')
                .attr("id", "hover_line")
                .attr("x1", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y1", -52)
                .attr("x2", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y2", height)
                .attr("stroke", "black")
                .attr("stroke-width", 0.8)
                .attr("stroke-opacity", 1)
            d3.select(event.target)
                .attr("fill", "black")
                .style("fill-opacity", 1)
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 1)
        })

        .on("mouseout", function () {
            d3.select("#hover_text").remove()
            d3.select("#hover_line").remove()
            d3.select(event.target).attr("fill", "#878787").style("fill-opacity", 0.5).attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)
        })


    // 29072022 Cloud Cover
    svg_29.select("g").enter(yAxis)

    svg_29.append("text").join(BottomText).attr("y", height + 20)
        .text("29-07-Friday")

    svg_29.selectAll("BarChart_29")
        .data(CloudByDay.get("29"))
        .join("rect")
        .attr("width", barWidth)
        .attr("height", function (d) { return scaleCloudAmount(d.CloudAmount) })
        .attr("transform", function (d, i) {
            var x = barWidth
            var barHeight = scaleCloudAmount(d.CloudAmount)
            var y = height - barHeight;
            return "translate(" + x + "," + y + ")"
        })
        .attr("x", function (d, i) { return + barWidth * i - barWidth })
        .attr("rx", 10)
        .attr("fill", "#878787").style("fill-opacity", 0.5)
        .attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)

        .on('mouseover', function (event, d) {
            d3.select("#hover_07_29")
                .append("text")
                .attr("id", "hover_text")
                .attr("x", function () { return + barWidth * d.Time + 15 })
                .attr("y", -40)
                .text((d.CloudAmount * 12.5) + "% covered at " + d.Time + " o'clock")
                .style("opacity", 1)
            d3.select('#hover_07_29')
                .append('line')
                .attr("id", "hover_line")
                .attr("x1", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y1", -52)
                .attr("x2", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y2", height)
                .attr("stroke", "black")
                .attr("stroke-width", 0.8)
                .attr("stroke-opacity", 1)
            d3.select(event.target)
                .attr("fill", "black")
                .style("fill-opacity", 1)
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 1)
        })

        .on("mouseout", function () {
            d3.select("#hover_text").remove()
            d3.select("#hover_line").remove()
            d3.select(event.target).attr("fill", "#878787").style("fill-opacity", 0.5).attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)
        })


    // 30072022 Cloud Cover
    svg_30.select("g").enter(yAxis)

    svg_30.append("text").join(BottomText).attr("y", height + 20)
        .text("30-07-Saturday")

    svg_30.selectAll("BarChart_30")
        .data(CloudByDay.get("30"))
        .join("rect")
        .attr("width", barWidth)
        .attr("height", function (d) { return scaleCloudAmount(d.CloudAmount) })
        .attr("transform", function (d, i) {
            var x = barWidth
            var barHeight = scaleCloudAmount(d.CloudAmount)
            var y = height - barHeight;
            return "translate(" + x + "," + y + ")"
        })
        .attr("x", function (d, i) { return + barWidth * i - barWidth })
        .attr("rx", 10)
        .attr("fill", "#878787").style("fill-opacity", 0.5)
        .attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)

        .on('mouseover', function (event, d) {
            d3.select("#hover_07_30")
                .append("text")
                .attr("id", "hover_text")
                .attr("x", function () { return + barWidth * d.Time + 15 })
                .attr("y", -40)
                .text((d.CloudAmount * 12.5) + "% covered at " + d.Time + " o'clock")
                .style("opacity", 1)
            d3.select('#hover_07_30')
                .append('line')
                .attr("id", "hover_line")
                .attr("x1", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y1", -52)
                .attr("x2", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y2", height)
                .attr("stroke", "black")
                .attr("stroke-width", 0.8)
                .attr("stroke-opacity", 1)
            d3.select(event.target)
                .attr("fill", "black")
                .style("fill-opacity", 1)
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 1)
        })

        .on("mouseout", function () {
            d3.select("#hover_text").remove()
            d3.select("#hover_line").remove()
            d3.select(event.target).attr("fill", "#878787").style("fill-opacity", 0.5).attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)
        })


    // 31072022 Cloud Cover
    svg_31.select("g").enter(yAxis)

    svg_31.append("text").join(BottomText).attr("y", height + 20)
        .text("31-07-Sunday")

    svg_31.selectAll("BarChart_31")
        .data(CloudByDay.get("31"))
        .join("rect")
        .attr("width", barWidth)
        .attr("height", function (d) { return scaleCloudAmount(d.CloudAmount) })
        .attr("transform", function (d, i) {
            var x = barWidth
            var barHeight = scaleCloudAmount(d.CloudAmount)
            var y = height - barHeight;
            return "translate(" + x + "," + y + ")"
        })
        .attr("x", function (d, i) { return + barWidth * i - barWidth })
        .attr("rx", 10)
        .attr("fill", "#878787").style("fill-opacity", 0.5)
        .attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)

        .on('mouseover', function (event, d) {
            d3.select("#hover_07_31")
                .append("text")
                .attr("id", "hover_text")
                .attr("x", function () { return + barWidth * d.Time + 15 })
                .attr("y", -40)
                .text((d.CloudAmount * 12.5) + "% covered at " + d.Time + " o'clock")
                .style("opacity", 1)
            d3.select('#hover_07_31')
                .append('line')
                .attr("id", "hover_line")
                .attr("x1", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y1", -52)
                .attr("x2", function () { return + barWidth * d.Time + barWidth / 2 })
                .attr("y2", height)
                .attr("stroke", "black")
                .attr("stroke-width", 0.8)
                .attr("stroke-opacity", 1)
            d3.select(event.target)
                .attr("fill", "black")
                .style("fill-opacity", 1)
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 1)
        })

        .on("mouseout", function () {
            d3.select("#hover_text").remove()
            d3.select("#hover_line").remove()
            d3.select(event.target).attr("fill", "#878787").style("fill-opacity", 0.5).attr("stroke", "#878787").attr("stroke-width", 1).attr("stroke-opacity", 0)
        })
})
