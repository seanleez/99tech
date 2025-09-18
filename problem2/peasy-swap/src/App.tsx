import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.scss';
import { Header, ToastComponent } from './components';
import { ToastProvider } from './contexts';
import { CurrencySwapPage } from './pages';

function App() {
  return (
    <ToastProvider>
      <div className="App">
        <Header />
        <CurrencySwapPage />
        <ToastComponent />
      </div>
    </ToastProvider>
  );
}

export default App;
