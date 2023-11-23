import ReactDOM from 'react-dom/client';
import App from './App';
import CatApiService from './services/cat-api-service';
import './index.scss';
import { Provider } from 'react-redux';
import store from './store/store';
import { CatApiServiceContext } from './context/cat-api-service-context';

const catApiService = new CatApiService();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <CatApiServiceContext.Provider value={catApiService}>
      <App />
    </CatApiServiceContext.Provider>
  </Provider>
);
