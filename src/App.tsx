import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </HashRouter>
  </QueryClientProvider>
);

export default App;