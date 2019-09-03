import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import _ from 'underscore';
import './Graph.css';

am4core.useTheme(am4themes_animated);

class Graph extends React.Component {

  componentDidUpdate(oldProps) {
    if (!_.isEqual(oldProps.data, this.props.data)) {
      this.chart.data = this.props.data;
    }
  }

  componentDidMount() {
    this.generate();
  }

  generate() {
    let chart = am4core.create("amChart", am4charts.XYChart);
    chart.paddingLeft = 0
    chart.paddingLeft = 0

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    // Set date label formatting
    dateAxis.renderer.minGridDistance = 120;
    dateAxis.baseInterval = {timeUnit: "hour", count: 3}
    dateAxis.dateFormats.setKey("hour", "MMMM dd HH:mm");

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";

    series.tooltipText = "{valueY.value} °C";
    chart.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;
    chart.data = this.props.data;
    this.chart = chart;
  }
  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <div className="wm-graph">
        <div className={classNames('wm-graph-wrapper')}>
          <div id="amChart"></div>
        </div>
      </div>
    );
  }
}


function mapStateToProps({form}) {
  return ({
    data: form.data
  });
}

export default connect(mapStateToProps)(Graph);
