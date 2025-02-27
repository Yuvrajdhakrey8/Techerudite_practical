import ThemeProvider from "./components/ThemeProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import CustomerRegister from "./components/Register/CustomerRegister";
import AdminRegister from "./components/Register/AdminRegister";
import { Toaster } from "react-hot-toast";
import NotFound from "./components/NotFound/NotFound";
import Home from "./components/Home/Home";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/register/customer", element: <CustomerRegister /> },
  { path: "/register/admin", element: <AdminRegister /> },
  { path: "/home", element: <Home /> },
  { path: "*", element: <NotFound /> },
]);

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
