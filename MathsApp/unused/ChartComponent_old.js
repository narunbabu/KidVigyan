import React, {useState, useEffect, onRef} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ECharts} from 'react-native-echarts-wrapper';
const initoption = {
  xAxis: {
    type: 'category',
    //   data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    data: [1, 2, 3, 4, 5, 6, 7],
  },
  yAxis: {
    type: 'value',
  },
  legend: {show: true},

  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      name: 'score',

      // labelLine: 'Arun',
    },
    {
      data: [1920, 632, 601, 634, 990, 1030, 1020],
      type: 'bar',
      name: 'car',

      // labelLine: 'Arun',
    },
  ],
};
export const ChartComponent = data2plot => {
  // dates: dates.map(k => new Date(k).toLocaleDateString()),
  const [option, setOption] = useState(initoption);
  const [chart, setChart] = useState();

  onRef = ref => {
    if (ref) {
      //   chart = ref;
      setChart(ref);
    }
  };
  useEffect(() => {
    data2plot ? console.log('data2plot.dates ', data2plot.dates) : null;
    var loption = {
      xAxis: {
        type: 'category',
        //   data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: data2plot.dates,
      },
      yAxis: {
        type: 'value',
      },
      legend: {show: true},

      series: [
        {
          data: data2plot.time_taken,
          type: 'line',
          name: 'Time Taken',

          // labelLine: 'Arun',
        },
        {
          data: data2plot.mistypes,
          type: 'line',
          name: 'Mistypes',

          // labelLine: 'Arun',
        },
        {
          data: data2plot.score,
          type: 'line',
          name: 'score',

          // labelLine: 'Arun',
        },
      ],
    };
    // setOption(loption);
    // chart.
    chart.clear();
    chart.setOption(loption);
  }, [data2plot]);

  return (
    <View style={styles.chartContainer}>
      <ECharts
        ref={onRef}
        option={option}
        backgroundColor="rgba(93, 169, 81, 0.1)"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    borderRadius: 20,
  },
});
