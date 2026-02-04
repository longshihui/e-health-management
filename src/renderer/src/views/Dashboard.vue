<template>
  <div class="dashboard-view">
    <div class="header">
      <h2 class="title">仪表盘</h2>
      <p class="subtitle">您的健康数据概览</p>
    </div>

    <t-row :gutter="16">
      <t-col :span="12">
        <t-card title="使用时长统计" hover-shadow>
          <template #actions>
            <t-radio-group
              v-model="timeRange"
              variant="default-filled"
              size="small"
            >
              <t-radio-button value="day">今日</t-radio-button>
              <t-radio-button value="week">本周</t-radio-button>
              <t-radio-button value="month">本月</t-radio-button>
            </t-radio-group>
          </template>
          <div class="chart-container">
            <v-chart class="chart" :option="chartOption" autoresize />
          </div>
        </t-card>
      </t-col>
    </t-row>

    <t-row :gutter="16" style="margin-top: 16px">
      <t-col :span="12">
        <t-card title="健康建议" hover-shadow>
          <div class="health-tips">
            <t-alert
              theme="success"
              message="您今天的作息非常规律，请继续保持！"
            />
            <ul class="tips-list">
              <li>👀 每工作 60 分钟，建议远眺 5 分钟。</li>
              <li>💧 记得多喝水，促进新陈代谢。</li>
            </ul>
          </div>
        </t-card>
      </t-col>
    </t-row>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, computed } from "vue";
import VChart, { THEME_KEY } from "vue-echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
} from "echarts/components";

use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
]);

provide(THEME_KEY, "light");

const timeRange = ref("day");

const chartData = {
  day: {
    title: "今日使用时段分布",
    xAxis: [
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
    ],
    data: [45, 50, 55, 10, 30, 60, 45, 20],
  },
  week: {
    title: "本周每日使用时长",
    xAxis: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    data: [300, 320, 280, 350, 310, 120, 150],
  },
  month: {
    title: "近30天趋势",
    xAxis: ["1日", "5日", "10日", "15日", "20日", "25日", "30日"],
    data: [300, 320, 280, 350, 310, 330, 340],
  },
};

const chartOption = computed(() => {
  const current = chartData[timeRange.value as keyof typeof chartData];
  return {
    title: {
      text: current.title,
      left: "center",
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: current.xAxis,
    },
    yAxis: {
      type: "value",
      name: "分钟",
    },
    series: [
      {
        data: current.data,
        type: "bar",
        itemStyle: {
          color: "#0052D9",
        },
      },
    ],
  };
});
</script>

<style scoped>
.dashboard-view {
  padding-bottom: 24px;
}

.header {
  margin-bottom: 24px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
}

.subtitle {
  color: var(--td-text-color-secondary);
}

.chart-container {
  height: 300px;
}

.chart {
  height: 100%;
  width: 100%;
}

.health-tips {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.tips-list {
  padding-left: 20px;
  color: var(--td-text-color-primary);
  line-height: 1.8;
}
</style>
