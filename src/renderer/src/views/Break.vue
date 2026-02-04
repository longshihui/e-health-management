<template>
  <div class="break-container">
    <div class="content">
      <div class="icon-wrapper">
        <t-icon name="cafe" size="64px" />
      </div>

      <h1 v-if="timeLeft > 0" class="title">休息一下</h1>
      <h1 v-else class="title success">休息完成</h1>

      <div class="timer" :class="{ finished: timeLeft <= 0 }">
        {{ formatTime(timeLeft) }}
      </div>

      <p v-if="timeLeft > 0" class="message">
        您已经工作了一段时间，请放松眼睛，伸展身体。
      </p>
      <p v-else class="message success">精力已恢复，准备好继续工作了吗？</p>

      <div class="actions">
        <t-button
          theme="primary"
          size="large"
          :disabled="timeLeft > 0"
          @click="stopBreak"
        >
          继续工作
        </t-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const timeLeft = ref(0); // seconds
let timer: ReturnType<typeof setInterval> | null = null;

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};

const startTimer = () => {
  if (timer) clearInterval(timer);
  timer = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      if (timer) clearInterval(timer);
    }
  }, 1000);
};

const stopBreak = () => {
  if (window.electron) {
    window.electron.stopBreak();
  } else {
    console.warn("Electron API not available");
  }
};

onMounted(() => {
  if (window.electron) {
    window.electron.onBreakConfig((config) => {
      timeLeft.value = config.duration * 60;
      startTimer();
    });
  } else {
    // Dev fallback
    timeLeft.value = 5; // 5 seconds for test
    startTimer();
  }
});

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
  background: linear-gradient(135deg, #e6f7ff 0%, #f0f2f5 100%);
  user-select: none;
}

.content {
  text-align: center;
  padding: 48px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  width: 400px;
}

.icon-wrapper {
  color: var(--td-brand-color);
  margin-bottom: 24px;
}

.title {
  font-size: 28px;
  margin-bottom: 16px;
  color: var(--td-text-color-primary);
}

.title.success {
  color: var(--td-success-color);
}

.timer {
  font-size: 64px;
  font-family: "Courier New", Courier, monospace;
  font-weight: bold;
  color: var(--td-brand-color);
  margin: 32px 0;
  transition: all 0.3s ease;
}

.timer.finished {
  color: var(--td-success-color);
  transform: scale(1.1);
}

.message {
  font-size: 16px;
  color: var(--td-text-color-secondary);
  margin-bottom: 40px;
  line-height: 1.5;
}

.actions {
  display: flex;
  justify-content: center;
}
</style>
