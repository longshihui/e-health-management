<template>
  <div class="main-layout">
    <t-layout class="layout-container">
      <t-aside width="200px">
        <t-menu v-model="activeMenu" theme="light" class="side-menu">
          <t-menu-item value="general">
            <template #icon>
              <setting-icon />
            </template>
            常规设置
          </t-menu-item>
          <t-menu-item value="about">
            <template #icon>
              <info-circle-icon />
            </template>
            关于软件
          </t-menu-item>
        </t-menu>
      </t-aside>
      <t-layout>
        <t-content class="content-container">
          <!-- General Settings View -->
          <div v-if="activeMenu === 'general'" class="settings-view">
            <h2 class="view-title">常规设置</h2>
            <t-form
              :data="formData"
              :rules="rules"
              label-align="top"
              @submit="onSubmit"
            >
              <t-form-item label="使用时长 (分钟)" name="workDuration">
                <t-input-number
                  v-model="formData.workDuration"
                  :min="1"
                  theme="column"
                  style="width: 100%"
                />
              </t-form-item>
              <t-form-item label="休息时长 (分钟)" name="breakDuration">
                <t-input-number
                  v-model="formData.breakDuration"
                  :min="1"
                  theme="column"
                  style="width: 100%"
                />
              </t-form-item>
              <t-form-item>
                <t-button theme="primary" type="submit" block
                  >保存配置</t-button
                >
              </t-form-item>
            </t-form>
          </div>

          <!-- About View -->
          <div v-if="activeMenu === 'about'" class="about-view">
            <h2 class="view-title">关于软件</h2>
            <div class="about-content">
              <div class="app-logo">
                <desktop-icon size="64px" />
              </div>
              <h3>健康管理助手</h3>
              <p>版本: 1.0.0</p>
              <p>一个轻量级的桌面健康管理工具，帮助您保持健康的工作习惯。</p>
            </div>
          </div>
        </t-content>
      </t-layout>
    </t-layout>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from "vue";
import { MessagePlugin, FormProps } from "tdesign-vue-next";
import {
  SettingIcon,
  InfoCircleIcon,
  DesktopIcon,
} from "tdesign-icons-vue-next";

const activeMenu = ref("general");

const formData = reactive({
  workDuration: 60,
  breakDuration: 10,
});

const rules = {
  workDuration: [{ required: true, message: "请输入使用时长", type: "error" }],
  breakDuration: [{ required: true, message: "请输入休息时长", type: "error" }],
};

onMounted(async () => {
  if (!window.electron) {
    console.warn("Electron API not found. Running in browser mode?");
    return;
  }
  try {
    const config = await window.electron.getConfig();
    formData.workDuration = config.workDuration;
    formData.breakDuration = config.breakDuration;
  } catch (e) {
    console.error("Failed to load config", e);
  }
});

const onSubmit: FormProps["onSubmit"] = async ({ validateResult }) => {
  if (validateResult === true) {
    if (window.electron) {
      await window.electron.setConfig({
        workDuration: formData.workDuration,
        breakDuration: formData.breakDuration,
      });
      MessagePlugin.success("配置已保存，即时生效");
    } else {
      MessagePlugin.warning("浏览器模式下无法保存配置");
    }
  }
};
</script>

<style scoped>
.main-layout {
  height: 100vh;
  background-color: var(--td-bg-color-container);
}

.layout-container {
  height: 100%;
}

.side-menu {
  height: 100%;
}

.content-container {
  padding: 24px;
  overflow-y: auto;
}

.view-title {
  margin-top: 0;
  margin-bottom: 24px;
  font-size: 20px;
  font-weight: 600;
  color: var(--td-text-color-primary);
}

.settings-view {
  max-width: 500px;
}

.about-view {
  text-align: center;
  padding-top: 48px;
}

.about-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  color: var(--td-text-color-secondary);
}

.app-logo {
  color: var(--td-brand-color);
  margin-bottom: 16px;
}
</style>
