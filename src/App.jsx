import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard';

import { QlikContextProvider } from './utils/qlik/qlikContext';

function App() {
  return (
    <QlikContextProvider>
      <Dashboard />
    </QlikContextProvider>
  );
}

export default App;

