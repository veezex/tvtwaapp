import { useEffect, useMemo } from "preact/hooks";

interface TradingViewWidgetProps {
  symbol?: string;
  class?: string;
}

const TradingViewWidget = (props: TradingViewWidgetProps) => {
  const containerId = useMemo(
    () => `tradingview_widget_${Math.random().toString(36).substr(2, 9)}`,
    [],
  );

  const widgetOptions = useMemo(
    () => ({
      autosize: true,
      symbol: props.symbol || "NASDAQ:AAPL",
      interval: "60",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      enable_publishing: false,
      allow_symbol_change: true,
      container_id: containerId,
    }),
    [props.symbol, containerId],
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

export default TradingViewWidget;
