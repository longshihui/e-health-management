<template>
  <div class="settings-view">
    <h2 class="view-title">提醒设置</h2>

    <t-form
      ref="formRef"
      :data="formData"
      :rules="rules"
      label-align="top"
      @submit="onSubmit"
    >
      <!-- 基础配置 -->
      <t-card
        title="基础配置"
        :bordered="false"
        hover-shadow
        class="section-card"
      >
        <t-row :gutter="24">
          <t-col :span="6">
            <t-form-item label="使用时长 (分钟)" name="workDuration">
              <t-input-number
                v-model="formData.workDuration"
                :min="1"
                theme="column"
                style="width: 100%"
              />
            </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item label="休息时长 (分钟)" name="breakDuration">
              <t-input-number
                v-model="formData.breakDuration"
                :min="1"
                theme="column"
                style="width: 100%"
              />
            </t-form-item>
          </t-col>
        </t-row>

        <t-form-item label="提醒强度" name="reminderType" class="mt-4">
          <t-radio-group
            v-model="formData.reminderType"
            variant="default-filled"
          >
            <t-radio-button value="light">轻度 (声音)</t-radio-button>
            <t-radio-button value="medium">中度 (通知)</t-radio-button>
            <t-radio-button value="strong">强力 (全屏锁)</t-radio-button>
          </t-radio-group>
        </t-form-item>
      </t-card>

      <!-- 详细配置 (根据类型显示) -->
      <t-card
        v-if="formData.reminderType === 'light'"
        title="轻度提醒配置"
        :bordered="false"
        hover-shadow
        class="section-card"
      >
        <t-form-item label="提示音效" name="reminderSound">
          <t-select v-model="formData.reminderSound">
            <t-option value="default" label="默认提示音" />
            <t-option value="bird" label="清脆鸟鸣" />
            <t-option value="water" label="流水声" />
          </t-select>
        </t-form-item>
      </t-card>

      <t-card
        v-if="formData.reminderType === 'medium'"
        title="中度提醒配置"
        :bordered="false"
        hover-shadow
        class="section-card"
      >
        <t-form-item label="通知标题" name="reminderTitle">
          <t-input
            v-model="formData.reminderTitle"
            placeholder="请输入通知标题"
          />
        </t-form-item>
        <t-form-item label="通知内容" name="reminderMessage">
          <t-textarea
            v-model="formData.reminderMessage"
            placeholder="请输入通知内容"
          />
        </t-form-item>
      </t-card>

      <t-card
        v-if="formData.reminderType === 'strong'"
        title="强力提醒配置"
        :bordered="false"
        hover-shadow
        class="section-card"
      >
        <t-row :gutter="24">
          <t-col :span="6">
            <t-form-item label="提示标题" name="reminderTitle">
              <t-input
                v-model="formData.reminderTitle"
                placeholder="请输入提示标题"
              />
            </t-form-item>
            <t-form-item label="提示内容" name="reminderMessage">
              <t-textarea
                v-model="formData.reminderMessage"
                placeholder="请输入提示内容"
              />
            </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item label="文字颜色" name="popupTextColor">
              <t-color-picker v-model="formData.popupTextColor" format="HEX" />
            </t-form-item>
            <t-form-item label="背景颜色" name="popupBackgroundColor">
              <t-color-picker
                v-model="formData.popupBackgroundColor"
                format="HEX"
              />
            </t-form-item>
          </t-col>
        </t-row>
      </t-card>

      <!-- 效果预览 -->
      <t-card
        title="效果预览"
        :bordered="false"
        hover-shadow
        class="section-card preview-card"
      >
        <div class="preview-container">
          <!-- Light Preview -->
          <div
            v-if="formData.reminderType === 'light'"
            class="preview-box preview-light"
          >
            <div class="sound-wave">
              <t-icon name="sound" size="48px" />
              <div class="wave"></div>
            </div>
            <p class="preview-text">
              正在播放: {{ getSoundLabel(formData.reminderSound) }}
            </p>
            <p class="preview-subtext">
              将在后台播放此提示音，不打断当前工作。
            </p>
          </div>

          <!-- Medium Preview (Notification Style) -->
          <div
            v-if="formData.reminderType === 'medium'"
            class="preview-box preview-medium"
          >
            <div class="notification-mock">
              <div class="notif-icon">
                <t-icon
                  name="heart"
                  size="20px"
                  style="color: var(--td-brand-color)"
                />
              </div>
              <div class="notif-content">
                <div class="notif-header">
                  <span class="app-name">E-Health Management</span>
                  <span class="time">现在</span>
                </div>
                <div class="notif-title">
                  {{ formData.reminderTitle || "休息时间到！" }}
                </div>
                <div class="notif-body">
                  {{
                    formData.reminderMessage || "工作辛苦了，站起来活动一下吧~"
                  }}
                </div>
              </div>
            </div>
            <p class="preview-subtext">
              将在系统通知中心弹出通知，点击可进行操作。
            </p>
          </div>

          <!-- Strong Preview (Overlay Style) -->
          <div
            v-if="formData.reminderType === 'strong'"
            class="preview-box preview-strong"
          >
            <div
              class="screen-mock"
              :style="{
                backgroundColor: formData.popupBackgroundColor || '#fff',
              }"
            >
              <div
                class="strong-content"
                :style="{ color: formData.popupTextColor || '#000' }"
              >
                <h1>{{ formData.reminderTitle || "休息时间到！" }}</h1>
                <p>
                  {{
                    formData.reminderMessage || "工作辛苦了，站起来活动一下吧~"
                  }}
                </p>
                <div class="strong-actions">
                  <t-button theme="primary">现在休息</t-button>
                  <t-button
                    theme="default"
                    variant="text"
                    :style="{ color: formData.popupTextColor || '#000' }"
                    >继续工作</t-button
                  >
                </div>
              </div>
            </div>
            <p class="preview-subtext">将全屏覆盖当前屏幕，强制提醒休息。</p>
          </div>
        </div>
      </t-card>

      <div class="form-actions">
        <t-button theme="primary" type="submit" size="large" block
          >保存配置</t-button
        >
      </div>
    </t-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { MessagePlugin } from "tdesign-vue-next";

interface ReminderConfig {
  workDuration: number;
  breakDuration: number;
  reminderType: "light" | "medium" | "strong";
  reminderSound?: string;
  reminderTitle?: string;
  reminderMessage?: string;
  popupTextColor?: string;
  popupBackgroundColor?: string;
  popupBackgroundImage?: string;
}

const formData = reactive<ReminderConfig>({
  workDuration: 60,
  breakDuration: 10,
  reminderType: "strong",
  reminderSound: "default",
  reminderTitle: "休息时间到！",
  reminderMessage: "工作辛苦了，站起来活动一下吧~",
  popupTextColor: "#000000",
  popupBackgroundColor: "#ffffff",
  popupBackgroundImage: "",
});

const rules = {
  workDuration: [{ required: true, message: "请输入使用时长", type: "error" }],
  breakDuration: [{ required: true, message: "请输入休息时长", type: "error" }],
  reminderTitle: [{ required: true, message: "请输入标题", type: "error" }],
  reminderMessage: [{ required: true, message: "请输入内容", type: "error" }],
};

const getSoundLabel = (val?: string) => {
  const map: Record<string, string> = {
    default: "默认提示音",
    bird: "清脆鸟鸣",
    water: "流水声",
  };
  return val ? map[val] || val : "默认提示音";
};

onMounted(async () => {
  if (!window.electron) return;
  try {
    const config = await window.electron.getConfig();
    formData.workDuration = config.workDuration;
    formData.breakDuration = config.breakDuration;
    if (config.reminderType) {
      formData.reminderType = config.reminderType;
    }
    // Load new fields if they exist
    if (config.reminderSound) formData.reminderSound = config.reminderSound;
    if (config.reminderTitle) formData.reminderTitle = config.reminderTitle;
    if (config.reminderMessage)
      formData.reminderMessage = config.reminderMessage;
    if (config.popupTextColor) formData.popupTextColor = config.popupTextColor;
    if (config.popupBackgroundColor)
      formData.popupBackgroundColor = config.popupBackgroundColor;
  } catch (error) {
    console.error("Failed to load config:", error);
  }
});

const onSubmit = async ({ validateResult }: { validateResult: boolean }) => {
  if (validateResult === true) {
    if (window.electron) {
      try {
        await window.electron.setConfig({
          ...formData,
        });
        MessagePlugin.success("配置已保存");
      } catch (error) {
        MessagePlugin.error("保存失败");
        console.error(error);
      }
    } else {
      MessagePlugin.success("配置已保存 (预览模式)");
    }
  }
};
</script>

<style scoped>
.settings-view {
  width: 100%;
  /* No max-width */
}

.view-title {
  margin-bottom: 24px;
}

.section-card {
  margin-bottom: 24px;
}

.mt-4 {
  margin-top: 16px;
}

.preview-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  background-color: var(--td-bg-color-secondarycontainer);
  border-radius: 8px;
  min-height: 200px;
}

.preview-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 480px;
}

.preview-subtext {
  margin-top: 12px;
  color: var(--td-text-color-secondary);
  font-size: 12px;
}

/* Light Preview */
.preview-light {
  text-align: center;
}
.preview-text {
  margin-top: 16px;
  font-weight: bold;
}

/* Medium Preview - Mac/Windows Notification Style Mock */
.notification-mock {
  width: 320px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  padding: 12px;
  border: 1px solid var(--td-border-level-1-color);
}
.notif-icon {
  margin-right: 12px;
  display: flex;
  align-items: flex-start;
  padding-top: 2px;
}
.notif-content {
  flex: 1;
}
.notif-header {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--td-text-color-secondary);
  margin-bottom: 4px;
}
.notif-title {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 4px;
}
.notif-body {
  font-size: 13px;
  color: var(--td-text-color-primary);
  line-height: 1.4;
}

/* Strong Preview - Screen Mock */
.screen-mock {
  width: 100%;
  aspect-ratio: 16/9;
  border: 4px solid #333;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
.strong-content {
  text-align: center;
  padding: 24px;
  z-index: 1;
}
.strong-content h1 {
  font-size: 24px;
  margin-bottom: 12px;
}
.strong-content p {
  font-size: 14px;
  opacity: 0.8;
  margin-bottom: 24px;
}
.strong-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.form-actions {
  margin-top: 24px;
}
</style>
