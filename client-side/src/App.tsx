import './App.css';
import MainRoutes from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <MainRoutes/>
      <ToastContainer/>
    </>
  );
}

export default App;
