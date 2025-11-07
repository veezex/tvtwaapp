import TradingViewWidget from "./components/TradingViewWidget";

const App = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const startParam = urlParams.get("tgWebAppStartParam") || undefined;
  const startObject = JSON.parse(startParam ? atob(startParam) : "{}") as {
    symbol?: string;
  };

  return <TradingViewWidget symbol={startObject.symbol} class="w-dvw h-dvh" />;
};

export default App;
