import Dashboard from "views/Dashboard/Dashboard.jsx";
import Charts from "views/Charts/Charts.jsx";

let routes = [
  {
    path: "/dashboard/:id",
    name: "Dashboard",
    icon: "now-ui-icons design_app",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/charts",
    name: "Charts",
    icon: "now-ui-icons business_chart-pie-36",
    component: Charts,
    layout: "/admin"
  }
];

export default routes;
