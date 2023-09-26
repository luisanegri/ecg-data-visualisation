import LineChart from "./components/LineChart/LineChart";
import './config/chartConfig';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/reactquery'
import TopBar from "./components/TopBar";
import ThemeProvider from "./contexts/ThemeProvider";

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TopBar />
        <LineChart />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;