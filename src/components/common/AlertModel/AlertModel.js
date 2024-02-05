import React, { useRef, useEffect } from "react";
import { Button, Modal } from "antd";

const AlertModel = ({
  title,
  centered,
  top,
  children,
  onLogout,
  onCancel,
  visible,
}) => {
  const okButtonRef = useRef();

  useEffect(() => {
    if (visible) {
      okButtonRef.current?.focus();
    }
  }, [visible]);

  const handleOk = () => {
    if (onLogout) {
      onLogout();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <>
      <Modal
        title={<span style={{ fontSize: "24px" }}>{title}</span>}
        centered={centered}
        style={{ top }}
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Logout"
        okButtonProps={{ type: "primary", danger: true, ref: okButtonRef }}
        cancelButtonProps={{ type: "default" }}
        titleStyle={{ fontSize: "20px" }}
        autoFocusButton="Logout"
        maskClosable={false}
      >
        {children}
      </Modal>
    </>
  );
};

export default AlertModel;
