<template>
  <div class="break-container">
    <div class="content">
      <h1 class="title">⚠️ 休息提醒</h1>
      <div v-if="timeLeft > 0" class="timer-section">
        <p class="subtitle">已连续使用电脑，请休息一下</p>
        <div class="countdown">{{ formatTime(timeLeft) }}</div>
        <p class="tip">站起来走动走动，眺望远方</p>
      </div>
      <div v-else class="finished-section">
        <p class="subtitle">休息完成！</p>
        <div class="action">
          <t-button size="large" theme="primary" @click="finishBreak"
            >继续使用</t-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const timeLeft = ref(0);
let timer: any = null;

onMounted(() => {
  if (window.electron) {
    window.electron.onBreakConfig((config) => {
      timeLeft.value = config.duration * 60;
      startTimer();
    });
  } else {
    // Browser preview mode
    console.warn("Electron API not found. Using demo duration.");
    timeLeft.value = 5 * 60; // 5 minutes demo
    startTimer();
  }
});

const startTimer = () => {
  if (timer) clearInterval(timer);
  timer = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      clearInterval(timer);
    }
  }, 1000);
};

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const finishBreak = () => {
  if (window.electron) {
    window.electron.stopBreak();
  } else {
    alert("Browser preview: Break finished!");
  }
};

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<style scoped>
.break-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.95);
  color: #fff;
  text-align: center;
  user-select: none;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.title {
  font-size: 3rem;
  margin: 0;
  color: #ff4d4f;
}

.subtitle {
  font-size: 1.5rem;
  margin: 0;
  color: #e6e6e6;
}

.countdown {
  font-size: 8rem;
  font-weight: bold;
  font-family: monospace;
  color: #1890ff;
  margin: 20px 0;
}

.tip {
  font-size: 1.2rem;
  color: #8c8c8c;
}

.action {
  margin-top: 20px;
}
</style>
