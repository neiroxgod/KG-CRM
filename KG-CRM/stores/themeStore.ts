export const useThemeStore = defineStore("theme", () => {
  const isDark = ref(false);

  function initTheme() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      isDark.value = savedTheme === "dark";
    } else {
      const darkModeMediaQuery = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );
      isDark.value = darkModeMediaQuery.matches;
      localStorage.setItem("theme", isDark.value ? "dark" : "light");
    }

    if (isDark.value) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  function toggleTheme() {
    setDarkMode(!isDark.value);
  }

  function setDarkMode(value: boolean) {
    isDark.value = value;
    localStorage.setItem("theme", value ? "dark" : "light");

    if (value) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  return { isDark, initTheme, toggleTheme, setDarkMode };
});
