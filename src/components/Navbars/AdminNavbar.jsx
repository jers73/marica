import React, {useEffect, useRef, useState} from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Container,
} from "reactstrap";

import Select from "react-select";

const AdminNavbar = (...props) => {
  const countries = [
    {
      "value": "US",
      "label": "United States of America"
    },
    {
      "value": "MX",
      "label": "Mexico"
    },
    {
      "value": "CA",
      "label": "Canada"
    },
    {
      "value": "AR",
      "label": "Argentina"
    },
  ];
  let { id } = useParams();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [color, setColor] = useState("transparent");
  const [country, setCountry] = useState(id);

  const sidebarToggle = useRef();
  const toggle = () => {
    if (isOpen) {
      setColor("transparent");
    } else {
      setColor("white");
    }
    setIsOpen(!isOpen);
  };
  const dropdownToggle = () => {
    setDropdownOpen(dropdownOpen);
  };
  const openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    sidebarToggle.current.classList.toggle("toggled");
  };
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && isOpen) {
      setColor("white");
    } else {
      setColor("transparent")
    }
  };

  useEffect(() => {
    window.addEventListener("resize", updateColor);
  }, [updateColor]);

  useEffect(() => {
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      sidebarToggle.current.classList.toggle("toggled");
    }
  });

  const updateCountry = (selection) => {
    setCountry(selection.value);
    history.push(`/admin/dashboard/${selection.value}`)
  }


    return (
      // add or remove classes depending if we are on full-screen-maps page or not
      <Navbar
        color={
          window.location.href.indexOf("full-screen-maps") !== -1
            ? "white"
            : color
        }
        expand="lg"
        className={
          window.location.href.indexOf("full-screen-maps") !== -1
            ? "navbar-absolute "
            : "navbar-absolute " +
              (color === "transparent" ? "navbar-transparent " : "")
        }
      >
        <Container fluid>
          <div className="navbar-wrapper">
            <div className="navbar-toggle">
              <button
                type="button"
                ref={sidebarToggle}
                className="navbar-toggler"
                onClick={() => openSidebar()}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <NavbarBrand href="/">{props.brandText}</NavbarBrand>
          </div>
          <NavbarToggler onClick={toggle}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse
            isOpen={isOpen}
            navbar
            className="justify-content-end"
          >
            <div style={{minWidth: "400px"}}>
              <Select
                className="react-select primary"
                classNamePrefix="react-select"
                placeholder="Country"
                name="singleSelect"
                value={country}
                options={countries}
                onChange={updateCountry}
              />
            </div>

            <Nav navbar>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
}

export default AdminNavbar;
