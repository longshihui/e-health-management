# E-Health Management (健康管理助手)

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Electron](https://img.shields.io/badge/Electron-28.0-blueviolet.svg)
![Vue](https://img.shields.io/badge/Vue-3.0-4FC08D.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6.svg)

## 📖 产品介绍 (Introduction)

**E-Health Management** 是一款轻量级的跨平台电脑健康管理应用。旨在通过科学的番茄工作法理念，管控电脑连续使用时长，强制提醒休息，有效缓解长时间使用电脑带来的视觉疲劳和身体亚健康问题。

## 🎯 核心价值 (Core Value)

- **健康护航**: 强制性的休息机制，防止过度劳累。
- **数据洞察**: 可视化的使用时长统计，提供个性化健康建议。
- **专注提升**: 合理的时间分片，提高工作专注度。
- **极简体验**: 托盘化运行，无侵入式设计，不干扰日常工作流。

## ✨ 主要功能 (Features)

### 📊 仪表盘 (Dashboard)
- **使用统计**: 直观展示每日、每周、每月的使用时长趋势（支持柱状图分析）。
- **健康建议**: 根据您的使用习惯，智能提供健康改善建议。

### ⏰ 智能提醒 (Smart Reminders)
- **多级提醒策略**:
  - **轻强度**: 后台播放提示音。
  - **中强度**: 系统通知推送 (Notification)。
  - **强强度**: 全屏强制休息窗口 (覆盖屏幕，强制休息)。
- **灵活配置**: 自定义工作时长与休息时长。

### ⚙️ 个性化设置 (Settings)
- **应用偏好**: 支持开机自启配置。
- **主题切换**: 支持暗黑模式、明亮模式或跟随系统。
- **系统托盘**: 快速访问常用功能，最小化运行。

## 📖 使用指南 (Usage Guide)

1. **启动应用**: 运行后，应用会自动最小化到系统托盘（Windows右下角/macOS顶部菜单栏）。
2. **查看数据**: 点击托盘图标打开主界面，查看今日使用数据及健康建议。
3. **设置规则**: 
   - 在设置页面调整您的工作时长（默认60分钟）和休息时长（默认10分钟）。
   - 选择适合您的提醒强度（建议开启强提醒以保证效果）。
4. **休息模式**:
   - 当达到设定时长，应用将根据设置触发提醒。
   - 强提醒模式下，屏幕将被锁定，直到倒计时结束。
   - 休息结束后点击“继续使用”恢复工作。

## 🛠️ 技术栈 (Tech Stack)

- **Core**: Electron
- **Frontend**: Vue 3, TypeScript
- **UI Framework**: TDesign Vue Next
- **Visualization**: ECharts
- **Storage**: Local JSON (AppData)

## 🤝 参与开发 (Contributing)

如果您想参与本项目的开发或自行构建，请参阅 [贡献指南 (CONTRIBUTING.md)](CONTRIBUTING.md)。

## 📄 许可证 (License)

本项目采用 [MIT License](LICENSE) 许可证。
