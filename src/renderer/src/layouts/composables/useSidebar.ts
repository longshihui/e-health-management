import { ref, onMounted, onUnmounted } from "vue";

export function useSidebar() {
  const collapsed = ref(false);

  const checkWidth = () => {
    if (window.innerWidth < 768) {
      collapsed.value = true;
    } else {
      collapsed.value = false;
    }
  };

  onMounted(() => {
    checkWidth();
    window.addEventListener("resize", checkWidth);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", checkWidth);
  });

  return {
    collapsed
  };
}
