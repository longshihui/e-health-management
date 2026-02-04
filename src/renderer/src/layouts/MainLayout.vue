<template>
  <t-layout class="main-layout">
    <t-aside :width="collapsed ? '64px' : '200px'" class="main-aside">
      <t-menu
        v-model="activeValue"
        theme="light"
        :collapsed="collapsed"
        :width="['200px', '64px']"
        class="main-menu"
        @change="handleMenuChange"
      >
        <template #logo>
          <div class="logo">
            <span v-if="!collapsed">E-Health</span>
            <t-icon v-else name="heart" size="large" />
          </div>
        </template>
        <t-menu-item value="dashboard" to="/dashboard">
          <template #icon>
            <t-icon name="dashboard" />
          </template>
          仪表盘
        </t-menu-item>
        <t-menu-item value="reminder" to="/settings/reminder">
          <template #icon>
            <t-icon name="time" />
          </template>
          提醒设置
        </t-menu-item>
        <t-menu-item value="app" to="/settings/app">
          <template #icon>
            <t-icon name="setting" />
          </template>
          应用设置
        </t-menu-item>
      </t-menu>
    </t-aside>
    <t-layout>
      <t-content class="content-container">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </t-content>
    </t-layout>
  </t-layout>
</template>

<script setup lang="ts">
import { useSidebar } from "./composables/useSidebar";
import { useNavigation } from "./composables/useNavigation";

const { collapsed } = useSidebar();
const { activeValue, handleMenuChange } = useNavigation();
</script>

<style scoped>
.main-layout {
  height: 100vh;
  width: 100vw;
}

.main-aside {
  overflow: hidden;
  transition: width 0.3s;
}

.main-menu {
  width: 100%;
}

.logo {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  color: var(--td-brand-color);
  white-space: nowrap;
  overflow: hidden;
}

.content-container {
  padding: 24px;
  background-color: var(--td-bg-color-secondarycontainer);
  overflow-y: auto;
  box-sizing: border-box;
}

/* Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
