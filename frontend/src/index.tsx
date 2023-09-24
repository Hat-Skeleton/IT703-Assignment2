import * as React from "react"
import * as ReactDOM from "react-dom/client"
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ChakraProvider } from "@chakra-ui/react";
import { Home } from "./pages/Home";



const container = document.getElementById("root")
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container)

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "contact",
        element: <Home />,
      },
      {
        path: "",
        element: <Outlet />,
        children: [
          {
            path: "about",
            element: <Home />,
          },
        ],
      },
      {
        path: "signup",
        element: <Home />,
      },
      {
        path: "login",
        element: <Home />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);



