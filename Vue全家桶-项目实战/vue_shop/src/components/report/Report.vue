<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 报表卡片区域 -->
    <el-card>
      <v-chart :options="areaStackOptions" />
    </el-card>
  </div>
</template>

<script>
// import _ from 'lodash'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/grid'

export default {
  name: '',
  components: {
    'v-chart': ECharts
  },

  data () {
    return {
      areaStackOptions: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false,
            data: []
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: []
      }
    }
  },

  mounted () {
    this.getReportData()
  },

  methods: {
    async getReportData () {
      const { data: res } = await this.axios.get('reports/type/1')
      if (res.meta.status !== 200) {
        return this.$message.error('获取报表数据失败！')
      } else {
        // console.log(res.data)
        // 合并到 areaStackOptions 配置对象上
        /* const newOptions = _.merge(this.areaStackOptions, res.data)
        this.areaStackOptions = newOptions */
        // console.log(this.areaStackOptions)
        /* console.log(res.data.legend)
        console.log(res.data.xAxis)
        console.log(res.data.yAxis)
        console.log(res.data.series) */
        this.areaStackOptions.legend = res.data.legend
        this.areaStackOptions.xAxis[0].data = res.data.xAxis[0].data
        this.areaStackOptions.series = res.data.series
      }
    }
  }
}

</script>

<style lang="less" scoped>
.echarts {
  width: 750px;
  height: 400px;
}
</style>
