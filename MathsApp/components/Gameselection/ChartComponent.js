import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, Button} from 'react-native';
import {ECharts} from 'react-native-echarts-wrapper';

export default class ChartComponent extends Component {
  updateOption() {
    return {
      xAxis: {
        type: 'category',
        data: this.props.datatoplot.dates,
      },
      yAxis: {
        type: 'value',
      },
      legend: {show: true},
      series: [
        {
          data: this.props.datatoplot.time_taken,
          type: 'line',
          name: 'TimePerProb (sec)',
        },
        {
          data: this.props.datatoplot.mistypes,
          type: 'line',
          name: 'Mistypes',
        },
        {
          data: this.props.datatoplot.score.map(k => k / 10),
          type: 'line',
          name: 'score x 10',
        },
      ],
    };
  }
  option = this.updateOption();
  //   componentWillReceiveProps = nextProps => {

  additionalCode = `
        chart.on('click', function(param) {
            var obj = {
            type: 'event_clicked',
            data: param.data
            };

            sendData(JSON.stringify(obj));
        });
    `;

  onData = param => {
    const obj = JSON.parse(param);
    if (obj.type === 'event_clicked') {
      alert(`you tapped the chart series: ${obj.data}`);
    }
  };

  onRef = ref => {
    if (ref) {
      this.chart = ref;
    }
  };

  onButtonClearPressed = () => {
    this.chart.clear();
  };
  onButtonLoadPressed = () => {
    // this.chart.render();
    this.chart.setOption(this.option);
  };
  componentDidUpdate = () => {
    console.log('in component did update ', this.props.datatoplot.dates);
    // this.option = {
    //   xAxis: {
    //     type: 'category',
    //     data: this.props.datatoplot.dates,
    //   },
    //   yAxis: {
    //     type: 'value',
    //   },
    //   legend: {show: true},
    //   series: [
    //     {
    //       data: this.props.datatoplot.time_taken,
    //       type: 'line',
    //       name: 'TimePerProb (sec)',
    //     },
    //     {
    //       data: this.props.datatoplot.mistypes,
    //       type: 'line',
    //       name: 'Mistypes',
    //     },
    //     {
    //       data: this.props.datatoplot.score.map(k => k / 10),
    //       type: 'line',
    //       name: 'score x 10',
    //     },
    //   ],
    // };
    // console.log('in component did update ', this.option);

    // this.chart.clear();
    // this.option = loption;
    this.chart.setOption(this.updateOption());
    // }
  };

  render() {
    return (
      <SafeAreaView style={styles.chartContainer}>
        {/* <Button title="Clear" onPress={this.onButtonClearPressed} />
        <Button title="Load" onPress={this.onButtonLoadPressed} /> */}
        <ECharts
          ref={this.onRef}
          option={this.option}
          additionalCode={this.additionalCode}
          onData={this.onData}
          onLoadEnd={() => {
            this.chart.setBackgroundColor('rgba(93, 169, 81, 0.1)');
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
