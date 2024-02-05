// ReusableDrawer.js

import React from "react";
import PropTypes from "prop-types";
import { Drawer } from "antd";
const CustomDrawer = (props) => {
  const { title, children, onClose, visible, placement, extra, width } = props;
  return (
    <Drawer
      title={title}
      placement={placement}
      closable={false}
      onClose={onClose}
      open={visible}
      extra={extra}
      width={width}
    >
      {children}
    </Drawer>
  );
};

CustomDrawer.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  placement: PropTypes.oneOf(["top", "right", "bottom", "left"]).isRequired,
};
CustomDrawer.defaultProps = {
  placement: "right",
};

export default CustomDrawer;
