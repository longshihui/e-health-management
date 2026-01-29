<template>
  <div class="app-container">
    <Settings v-if="currentView === 'settings'" />
    <Break v-if="currentView === 'break'" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Settings from './components/Settings.vue';
import Break from './components/Break.vue';

const currentView = ref('settings');

onMounted(() => {
  // Simple hash routing
  const updateView = () => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    if (hash === 'break') {
      currentView.value = 'break';
    } else {
      currentView.value = 'settings';
    }
  };
  
  window.addEventListener('hashchange', updateView);
  updateView();
});
</script>

<style>
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}
</style>
