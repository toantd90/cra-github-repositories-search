import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import HomePage from 'pages/HomePage';

import './App.css';

const App = () => {
  const routes = useRoutes([{ path: '/', element: <HomePage /> }]);

  return routes;
};

const AppWrapper = () => {
  const queryClient = new QueryClient();

  return (
    <Router>
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ChakraProvider>
    </Router>
  );
};

export default AppWrapper;
