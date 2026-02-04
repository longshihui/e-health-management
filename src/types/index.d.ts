export interface AppConfig {
  workDuration: number; // in minutes
  breakDuration: number; // in minutes
  reminderType: 'light' | 'medium' | 'strong';
  theme: 'system' | 'light' | 'dark';
  autoLaunch: boolean;
  firstRun: boolean;
  // New reminder settings
  reminderSound?: string;
  reminderTitle?: string;
  reminderMessage?: string;
  popupTextColor?: string;
  popupBackgroundColor?: string;
  popupBackgroundImage?: string;
}
