import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import $ from "jquery";
import Popper from "popper.js";
import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import theme from "./theme/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Admin from "./pages/admin";
import Dashboard from "./pages/dashboard";

const defaultQueryFn = async ({ queryKey }) => {
  const { data } = await axios.get(`http://localhost:4000/${queryKey[0]}`);
  return data;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
