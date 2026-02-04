import { app } from "electron";
import path from "path";
import fs from "fs";
import { AppConfig } from "../types";

const defaultConfig: AppConfig = {
  workDuration: 60,
  breakDuration: 10,
  reminderType: "strong",
  theme: "system",
  autoLaunch: false,
  firstRun: true,
  reminderSound: "default",
  reminderTitle: "休息时间到！",
  reminderMessage: "工作辛苦了，站起来活动一下吧~",
  popupTextColor: "#000000",
  popupBackgroundColor: "#ffffff",
  popupBackgroundImage: "",
};

export class Store {
  private path: string;
  private data: AppConfig;

  constructor() {
    // Ensure userData path exists (it should by default)
    const userDataPath = app.getPath("userData");
    if (!fs.existsSync(userDataPath)) {
      fs.mkdirSync(userDataPath, { recursive: true });
    }
    this.path = path.join(userDataPath, "config.json");
    this.data = this.parseDataFile(this.path, defaultConfig);
  }

  private parseDataFile(filePath: string, defaults: AppConfig): AppConfig {
    try {
      if (!fs.existsSync(filePath)) {
        return defaults;
      }
      const fileContent = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(fileContent);
    } catch (error) {
      console.error("Error reading config file:", error);
      return defaults;
    }
  }

  public get<K extends keyof AppConfig>(key: K): AppConfig[K] {
    return this.data[key];
  }

  public set<K extends keyof AppConfig>(key: K, val: AppConfig[K]): void {
    this.data[key] = val;
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.data, null, 2));
    } catch (error) {
      console.error("Error writing config file:", error);
    }
  }

  public getAll(): AppConfig {
    return { ...this.data };
  }
}

export const store = new Store();
