/*!

=========================================================
* Now UI Dashboard PRO React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard/Dashboard.jsx";
import Charts from "views/Charts/Charts.jsx";

let routes = [
  {
    path: "/dashboard",
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
