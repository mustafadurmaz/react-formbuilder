import { useRoutes, Navigate } from "react-router-dom";

//layouts
import AppLayout from "./layouts/App/App";

//pages
import Dashboard from "./layouts/App/components/Dashboard";
import { NotFound } from "./layouts/App/pages/NotFound";
import FormBuilder from "./pages/FormBuilder/FormBuilder";
import FormGenerateGeneral from "./pages/FormGenerateGeneral/FormGenerateGeneral";
import SetFormTree from "./pages/FormTree/SetFormTree";
// import Main from './pages/Main';

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: "", element: <Dashboard /> },
        { path: "formbuilder", element: <FormBuilder /> },
      ],
    },
    {
      path: "/formtree",
      element: <AppLayout />,
      children: [{ path: "create", element: <FormBuilder/> }],
    },
    {
      path: "/formbuilder",
      element: <AppLayout />,
      children: [{ path: ":id", element: <FormBuilder/> }],
    },
    {
      path: "/formgenerate",
      element: <AppLayout />,
      children: [{ path: ":id", element: <FormGenerateGeneral/> }],
    },
    {
      path: "/404",
      element: <NotFound />,
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
