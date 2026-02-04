<template>
  <div class="app-container">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

const applyTheme = (theme: "system" | "light" | "dark") => {
  if (theme === "system") {
    // Remove attribute to let TDesign/system handle it or implement system detection
    // TDesign might need explicit 'light' or 'dark'
    // For simplicity, let's assume system = light for now or use matchMedia
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.setAttribute(
      "theme-mode",
      isDark ? "dark" : "light",
    );
  } else {
    document.documentElement.setAttribute("theme-mode", theme);
  }
};

onMounted(async () => {
  if (window.electron) {
    try {
      const config = await window.electron.getConfig();
      if (config.theme) {
        applyTheme(config.theme);
      }
    } catch (error) {
      console.error("Failed to load theme config:", error);
    }
  }
});
</script>

<style>
body {
  margin: 0;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
    Arial, sans-serif;
  background-color: var(--td-bg-color-container);
  color: var(--td-text-color-primary);
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-thumb {
  background: var(--td-scrollbar-color);
  border-radius: 3px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
</style>
