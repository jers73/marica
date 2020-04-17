import Dashboard from "views/Dashboard/Dashboard.jsx";

let routes = [
  {
    path: "/dashboard/:id",
    name: "Dashboard",
    icon: "now-ui-icons design_app",
    component: Dashboard,
    layout: "/admin"
  }
];

export default routes;
