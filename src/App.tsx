import LineChart from "./components/LineChart";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/reactquery'

const queryClient = new QueryClient()

function App() {
  return (
    <div className="App">
      <header>
        <h1>IoT ECG data visualisation</h1>
      </header>
      <QueryClientProvider client={queryClient}>
        <LineChart />
      </QueryClientProvider>
    </div>
  );
}

export default App;