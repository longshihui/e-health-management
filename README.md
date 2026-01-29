# E-Health Management (健康管理助手)

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Electron](https://img.shields.io/badge/Electron-28.0-blueviolet.svg)
![Vue](https://img.shields.io/badge/Vue-3.0-4FC08D.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6.svg)

## 📖 项目简介 (Introduction)

**E-Health Management** 是一款轻量级的跨平台电脑健康管理应用。旨在通过科学的番茄工作法理念，管控电脑连续使用时长，强制提醒休息，有效缓解长时间使用电脑带来的视觉疲劳和身体亚健康问题。

本项目采用 **Electron + Vue 3 + TypeScript** 技术栈开发，具有启动速度快、资源占用少、无侵入性等特点。

## 🎯 核心价值 (Core Value)

- **健康护航**: 强制性的休息机制，防止过度劳累。
- **专注提升**: 合理的时间分片，提高工作专注度。
- **极简体验**: 托盘化运行，不干扰日常工作流。

## ✨ 主要特性 (Features)

- **🕒 智能计时**: 后台自动累计使用时间，精确控制工作/休息节奏。
- **🛑 强制休息**: 达到设定时长后弹出置顶、不可关闭的全屏休息窗口。
- **⚙️ 灵活配置**: 支持自定义工作时长（默认60分钟）和休息时长（默认10分钟），修改即时生效。
- **🖥️ 系统托盘**: 应用启动后自动最小化至托盘，提供快捷菜单操作。
- **💻 跨平台**: 完美适配 Windows 10/11 和 macOS 系统。

## 🚀 快速开始 (Quick Start)

### 环境要求
- Node.js >= 16.0.0
- pnpm >= 8.0.0

### 安装与运行

```bash
# 1. 克隆项目
git clone https://github.com/your-username/e-health-management.git
cd e-health-management

# 2. 安装依赖
pnpm install

# 3. 启动开发模式
pnpm dev

# 4. 构建生产包
pnpm build
```

## 📖 使用指南 (Usage Guide)

1. **启动应用**: 运行后，应用会自动最小化到系统托盘（Windows右下角/macOS顶部菜单栏）。
2. **设置时长**:
   - 右键点击托盘图标，选择「设置使用时长」或「设置休息时长」。
   - 在弹出的设置窗口中输入期望的分钟数并保存。
3. **休息提醒**:
   - 当工作时间达到设定值，屏幕将被全屏休息窗口覆盖。
   - 此时无法操作其他软件，直到倒计时结束。
   - 倒计时结束后，点击「继续使用」即可恢复工作。
4. **手动休息**: 右键托盘图标选择「立即休息」可手动触发休息模式。

## 🛠️ 技术栈 (Tech Stack)

- **Core**: Electron 28
- **Frontend**: Vue 3, TypeScript, Vite
- **UI Framework**: TDesign Vue Next
- **Build Tool**: Electron Builder

## 📄 许可证 (License)

本项目采用 [MIT License](LICENSE) 许可证。
