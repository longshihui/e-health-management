<template>
  <div class="settings-view">
    <h2 class="view-title">应用设置</h2>
    <t-card title="通用设置" :bordered="false" hover-shadow>
      <t-form :data="formData" label-align="top" @submit="onSubmit">
        <t-form-item label="开机自启动" name="autoLaunch">
          <t-switch v-model="formData.autoLaunch" />
          <span class="tip-text">开启后，应用将在系统启动时自动运行</span>
        </t-form-item>

        <t-form-item label="外观主题" name="theme">
          <t-select v-model="formData.theme">
            <t-option value="system" label="跟随系统" />
            <t-option value="light" label="明亮模式" />
            <t-option value="dark" label="暗黑模式" />
          </t-select>
        </t-form-item>

        <t-form-item>
          <t-button theme="primary" type="submit" block>保存配置</t-button>
        </t-form-item>
      </t-form>
    </t-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { MessagePlugin } from "tdesign-vue-next";

interface AppSettingsConfig {
  autoLaunch: boolean;
  theme: "system" | "light" | "dark";
}

const formData = reactive<AppSettingsConfig>({
  autoLaunch: false,
  theme: "system",
});

onMounted(async () => {
  if (!window.electron) return;
  try {
    const config = await window.electron.getConfig();
    if (config.autoLaunch !== undefined) {
      formData.autoLaunch = config.autoLaunch;
    }
    if (config.theme) {
      formData.theme = config.theme;
    }
  } catch (error) {
    console.error("Failed to load config:", error);
  }
});

const applyTheme = (theme: "system" | "light" | "dark") => {
  if (theme === "system") {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.setAttribute(
      "theme-mode",
      isDark ? "dark" : "light",
    );
  } else {
    document.documentElement.setAttribute("theme-mode", theme);
  }
};

const onSubmit = async () => {
  if (window.electron) {
    try {
      await window.electron.setConfig({
        autoLaunch: formData.autoLaunch,
        theme: formData.theme,
      });
      applyTheme(formData.theme);
      MessagePlugin.success("配置已保存");
    } catch (error) {
      MessagePlugin.error("保存失败");
      console.error(error);
    }
  } else {
    MessagePlugin.success("配置已保存 (预览模式)");
  }
};
</script>

<style scoped>
.settings-view {
  max-width: 600px;
}
.view-title {
  margin-bottom: 24px;
}
.tip-text {
  margin-left: 12px;
  color: var(--td-text-color-secondary);
  font-size: 12px;
}
</style>
