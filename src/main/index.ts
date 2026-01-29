import {
  app,
  BrowserWindow,
  Tray,
  Menu,
  ipcMain,
  screen,
  nativeImage,
} from "electron";
import path from "path";
import { store, AppConfig } from "./store";

// Set application name
app.setName("E-Health Manager");

let tray: Tray | null = null;
let settingsWindow: BrowserWindow | null = null;
let breakWindow: BrowserWindow | null = null;

let workTimer: NodeJS.Timeout | null = null;
let isWorking = true;
let currentWorkTime = 0; // in seconds

// 1x1 Red Pixel for default icon
const DEFAULT_ICON_BASE64 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

function getIcon() {
  return nativeImage.createFromDataURL(DEFAULT_ICON_BASE64);
}

function createTray() {
  const icon = getIcon();
  tray = new Tray(icon);
  const contextMenu = Menu.buildFromTemplate([
    { label: "打开主界面", click: () => openSettings() },
    { type: "separator" },
    { label: "设置使用时长", click: () => openSettings() },
    { label: "设置休息时长", click: () => openSettings() },
    { label: "立即休息", click: () => startBreak() },
    { type: "separator" },
    {
      label: "退出应用",
      click: () => {
        app.quit();
      },
    },
  ]);
  tray.setToolTip("健康管理助手");
  tray.setContextMenu(contextMenu);
}

function openSettings() {
  if (settingsWindow) {
    if (settingsWindow.isMinimized()) settingsWindow.restore();
    settingsWindow.show();
    settingsWindow.focus();
    return;
  }
  settingsWindow = new BrowserWindow({
    width: 750,
    height: 600,
    title: "设置",
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
    autoHideMenuBar: true,
    icon: getIcon(),
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    settingsWindow.loadURL(`${process.env.VITE_DEV_SERVER_URL}#/settings`);
  } else {
    settingsWindow.loadFile(path.join(__dirname, "../renderer/index.html"), {
      hash: "settings",
    });
  }

  settingsWindow.on("closed", () => {
    settingsWindow = null;
  });
}

function startBreak() {
  if (breakWindow) return; // Already in break

  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.bounds;

  breakWindow = new BrowserWindow({
    width,
    height,
    x: 0,
    y: 0,
    frame: false,
    alwaysOnTop: true,
    fullscreen: true,
    resizable: false,
    movable: false,
    minimizable: false,
    closable: false,
    skipTaskbar: true,
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  breakWindow.setAlwaysOnTop(true, "screen-saver");
  breakWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });

  if (process.env.VITE_DEV_SERVER_URL) {
    breakWindow.loadURL(`${process.env.VITE_DEV_SERVER_URL}#/break`);
  } else {
    breakWindow.loadFile(path.join(__dirname, "../renderer/index.html"), {
      hash: "break",
    });
  }

  breakWindow.webContents.on("did-finish-load", () => {
    breakWindow?.webContents.send("break-config", {
      duration: store.get("breakDuration"),
    });
  });

  isWorking = false;
  currentWorkTime = 0;
}

function stopBreak() {
  if (breakWindow) {
    breakWindow.setClosable(true);
    breakWindow.close();
    breakWindow = null;
  }
  isWorking = true;
  currentWorkTime = 0;
}

function startWorkTimer() {
  if (workTimer) clearInterval(workTimer);
  workTimer = setInterval(() => {
    if (!isWorking) return;

    currentWorkTime++;
    const limit = store.get("workDuration") * 60;

    if (currentWorkTime >= limit) {
      startBreak();
    }
  }, 1000);
}

app.whenReady().then(() => {
  createTray();
  startWorkTimer();

  ipcMain.handle("get-config", () => store.getAll());
  ipcMain.handle("set-config", (_event, config: AppConfig) => {
    store.set("workDuration", config.workDuration);
    store.set("breakDuration", config.breakDuration);

    if (isWorking) {
      const limit = config.workDuration * 60;
      if (currentWorkTime >= limit) {
        startBreak();
      }
    }
    return true;
  });

  ipcMain.on("stop-break", () => stopBreak());
  ipcMain.on("app-quit", () => app.quit());

  if (process.platform === "darwin") {
    app.dock?.hide();
  }

  // Always open settings on launch
  openSettings();
});

app.on("window-all-closed", () => {
  // Keep running
});
