import TradingViewWidget from "./components/TradingViewWidget.tsx";

const App = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const startParam = urlParams.get("tgWebAppStartParam") || undefined;
  const startObject = JSON.parse(startParam ? atob(startParam) : "{}") as {
    symbol?: string;
  };

  return (
    <TradingViewWidget
      symbol={startObject.symbol}
      class="w-dvw h-dvh bg-gray-700"
    />
  );
};

export default App;
