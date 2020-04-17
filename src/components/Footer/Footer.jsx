import React from "react";
import { Container } from "reactstrap";

const Footer = (...props) => {
    return (
      <footer
        className={"footer" + (props.default ? " footer-default" : "")}
      >
        <Container fluid={props.fluid}>
          <div className="copyright">
            &copy; {1900 + new Date().getYear()}, Designed by{" Ricardo Alvarez "}
            . Coded by{" Ricardo Alvarez "}
          </div>
        </Container>
      </footer>
  )
}

export default Footer;
