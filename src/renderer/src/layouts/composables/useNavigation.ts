import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

export function useNavigation() {
  const router = useRouter();
  const route = useRoute();
  const activeValue = ref("dashboard");

  watch(
    () => route.path,
    (path) => {
      if (path.includes("dashboard")) activeValue.value = "dashboard";
      else if (path.includes("reminder")) activeValue.value = "reminder";
      else if (path.includes("app")) activeValue.value = "app";
    },
    { immediate: true },
  );

  const handleMenuChange = (value: string | number) => {
    switch (value) {
      case "dashboard":
        router.push("/dashboard");
        break;
      case "reminder":
        router.push("/settings/reminder");
        break;
      case "app":
        router.push("/settings/app");
        break;
    }
  };

  return {
    activeValue,
    handleMenuChange
  };
}
