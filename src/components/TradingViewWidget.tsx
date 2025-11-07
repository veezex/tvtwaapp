import { useEffect, useMemo, useState } from "preact/hooks";

interface TradingViewWidgetProps {
  symbol?: string;
  class?: string;
}

const TradingViewWidget = (props: TradingViewWidgetProps) => {
  const containerId = useMemo(
    () => `tradingview_widget_${Math.random().toString(36).substr(2, 9)}`,
    [],
  );

  // Определяем тему браузера
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light"; // По умолчанию светлая тема
  });

  // Отслеживаем изменения темы браузера
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const widgetOptions = useMemo(
    () => ({
      autosize: true,
      symbol: props.symbol || "NASDAQ:AAPL",
      interval: "60",
      timezone: getTimezone(),
      theme: theme,
      style: "1",
      locale: "ru",
      enable_publishing: false,
      allow_symbol_change: true,
      container_id: containerId,
    }),
    [props.symbol, containerId, theme],
  );

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = ""; // Clear previous widget

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.innerHTML = JSON.stringify(widgetOptions);
    container.appendChild(script);
  }, [widgetOptions, containerId]);

  return (
    <div class={props.class}>
      <div id={containerId} class="w-full h-full"></div>
    </div>
  );
};

function getTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (error) {
    console.error(error);
  }
  return "Etc/UTC";
}

export default TradingViewWidget;
