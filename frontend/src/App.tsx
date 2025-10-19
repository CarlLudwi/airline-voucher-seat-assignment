import { VoucherProvider } from "./contexts/VoucherContext";
import Home from "./pages/Home";

function App() {
  return (
    <VoucherProvider>
      <Home />
    </VoucherProvider>
  );
}

export default App;
