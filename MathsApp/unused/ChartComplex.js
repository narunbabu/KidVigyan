import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, Button} from 'react-native';
import {ECharts} from 'react-native-echarts-wrapper';

export default class ChartComplex extends Component {
  option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
      },
    ],
  };

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

  render() {
    return (
      <SafeAreaView style={styles.chartContainer}>
        <Button title="Clear" onPress={this.onButtonClearPressed} />
        <Button title="Load" onPress={this.onButtonLoadPressed} />
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
