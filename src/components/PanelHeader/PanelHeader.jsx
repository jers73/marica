import React from "react";
import PropTypes from "prop-types";

class PanelHeader extends React.Component {
  render() {
    return (
      <div
        className={
          "panel-header " +
          (this.props.size !== undefined
            ? "panel-header-" + this.props.size
            : "")
        }
      >
        {this.props.content}
      </div>
    );
  }
}

PanelHeader.defaultProps = {
  size: undefined,
  content: null
};

PanelHeader.propTypes = {
  // size of the panel header
  size: PropTypes.oneOf(["sm", "lg", undefined]),
  // content
  content: PropTypes.node
};

export default PanelHeader;
