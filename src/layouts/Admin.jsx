import React, {useEffect, useRef, useState} from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
// react plugin for creating notifications
import NotificationAlert from "react-notification-alert";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

import routes from "routes.js";

let ps;

const Admin = (...props) => {
  const [sidebarMini, setSidebarMini] = useState(true);
  const backgroundColor = "blue";
  useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(mainPanel.current);
    }
    return () => {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.className += " perfect-scrollbar-off";
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
    }
  }, []);
  const notificationAlert = useRef();
  const mainPanel = useRef();

  const minimizeSidebar = () => {
    if (document.body.classList.contains("sidebar-mini")) {
      setSidebarMini(false);
    } else {
      setSidebarMini(true);
    }
    document.body.classList.toggle("sidebar-mini");
  };
  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  const getActiveRoute = routes => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        if (
          window.location.pathname.indexOf(
            routes[i].layout + routes[i].path
          ) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };

  return (
    <div className="wrapper">
      <NotificationAlert ref={notificationAlert} />
      <Sidebar
        {...props}
        routes={routes}
        minimizeSidebar={minimizeSidebar}
        backgroundColor={backgroundColor}
      />
      <div className="main-panel" ref={mainPanel}>
        <AdminNavbar
          {...props}
          brandText={getActiveRoute(routes)}
        />
        <Switch>
          {getRoutes(routes)}
          <Redirect from="/admin" to="/admin/dashboard" />
        </Switch>
        <Footer fluid />
      </div>
    </div>
  );
}

export default Admin;
