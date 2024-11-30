import { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import RootStore from "./comon/store/store";

interface State {
  store: RootStore,
}

export const store = new RootStore();

export const Context = createContext<State>({
  store,
})
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Context.Provider value={{
    store
  }}>
    <App />
  </Context.Provider>,
);
