<template>
  <div id="test_app">
    <!--折线图容器-->
    <div class="chart-container">
      <div v-for="(data, index) in chartData" :key="index" :id="'chart_'+index" class="chart-item"></div>
    </div>
  </div>
</template>
 
<script>
import * as echarts from 'echarts'
export default {
  name: 'ContractDataVisualization.vue',
  data() {
    return {
      charts: '',
      chartData: [
        ["155", "400", "900", "800", "300", "900", "1100"],
        ["155", "300", "600", "500", "200", "700", "170"],
        // ["100", "250", "800", "700", "400", "1000", "370"]
      ]
    }
  },
  methods: {
    drawLine(id, data,titleText) {
      this.charts = echarts.init(document.getElementById(id))
      this.charts.setOption({
        title:{
          left:'3%',
          top:'5%',
          text: titleText, // 设置标题文本,//标题文本，支持使用 \n 换行。
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          align:'right',//文字在前图标在后
          left:'3%',
          top:'15%',
          data: ['']
        },
        grid: {
          top:'30%',
          left: '5%',
          right: '5%',
          bottom: '5%',
          containLabel: true
        },
 
        toolbox: {
          feature: {
            saveAsImage: {} //保存为图片
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap:true,
          axisTick:{
            alignWithLabel:true //保证刻度线和标签对齐
          },
          data: ["1","2","3","4","5","6","7"] //x坐标的名称
          
        },
        yAxis: {
          type: 'value',
          boundaryGap: true,
          splitNumber:4, //纵坐标数
          interval:250 //强制设置坐标轴分割间隔
        },
 
        series: [{
          name: '近一周',
          type: 'line', //折线图line;柱形图bar;饼图pie
          stack: '总量',
          areaStyle: {
            //显示区域颜色---渐变效果
            color:{
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'rgb(255,200,213)' // 0% 处的颜色
              }, {
                offset: 1, color: '#ffffff' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          },
          itemStyle: {
            color: 'rgb(255,96,64)', //改变折线点的颜色
            lineStyle: {
          color: 'rgb(255,96,64)' //改变折线颜色
        }
      },
      data: data
    }]
  })
}
},
mounted() {
  this.$nextTick(() => {
    const id1 = 'chart_0'
    const titleText1 = 'InvestmentAmount'
    this.drawLine(id1, this.chartData[0], titleText1)

    const id2 = 'chart_1'
    const titleText2 = 'EarningCalculated'
    this.drawLine(id2, this.chartData[1], titleText2)
  })
}
}
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  
  .chart-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 20px 0;
  }
  
  .chart-item {
  width: 400px;
  height: 300px;
}
  
  .chart-item:last-child {
    margin-right: 0;
  }
</style>
