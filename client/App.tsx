import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store, persistor } from '../src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Routing from './routing';
import { BrowserRouter } from 'react-router-dom';
import api from './apis/axios';

export const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        cacheTime: 1000 * 60 * 60,
        retry: false,
      },
    },
  });

  useEffect(() => {
    api.interceptors.request.use(
      async (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    api.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <React.Fragment>
            <BrowserRouter>
              <Routing />
            </BrowserRouter>
            <Toaster />
          </React.Fragment>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
