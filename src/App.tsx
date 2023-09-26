import LineChart from "./components/LineChart";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <div className="App">
      <header>
        <h1>Idoven.ai Coding Challenge</h1>
      </header>
      <QueryClientProvider client={queryClient}>
        <LineChart />
      </QueryClientProvider>
    </div>
  );
}

export default App;