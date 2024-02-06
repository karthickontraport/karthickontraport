import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  DownOutlined,
  UpOutlined,
  CheckOutlined,
  MailOutlined,
  UserSwitchOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

const TaskDropdown = ({
  options,
  placeholder,
  onComplete,
  onEmail,
  onReassign,
  onReschedule,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();
  const itemRef = useRef();

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      const activeItem = itemRef.current.querySelector(".active");
      itemRef.current.scrollTop = activeItem?.offsetTop - 72;
    }
  }, [isOpen]);

  return (
    <DropdownWrapper ref={dropdownRef}>
      <DropdownBtn onClick={() => setIsOpen(!isOpen)}>
        {placeholder}
        {!isOpen ? (
          <DownOutlined style={{ color: "#d9d9d9" }} />
        ) : (
          <UpOutlined style={{ color: "#d9d9d9" }} />
        )}
      </DropdownBtn>
      {isOpen && (
        <DropdownList ref={itemRef}>
          {options.map((opt, index) => (
            <DropdownItem
              key={index}
              onClick={() => {
                switch (opt.text.toLowerCase()) {
                  case "mark complete":
                    onComplete && onComplete();
                    break;
                  case "email":
                    onEmail && onEmail();
                    break;
                  case "reassign":
                    onReassign && onReassign();
                    break;
                  case "reschedule":
                    onReschedule && onReschedule();
                    break;
                  default:
                    break;
                }
                setIsOpen(false);
              }}
            >
              {opt.icon} {opt.text}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownWrapper>
  );
};

const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const DropdownBtn = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 200px;
  height: 35px;
  background-color: #fff;
  color: #000;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-size: 14px;
  padding: 0 10px;
  cursor: pointer;
  svg {
    width: 16px;
  }
  &:focus-within {
    border-color: #1677ff;
  }
`;

const DropdownList = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 4px 5px;
  margin-top: 4px;
  border: 1px solid #eee;
  position: absolute;
  width: 100%;
  margin-top: 36px;
  max-height: 180px;
  overflow-y: auto;
  z-index: 1;
`;

const DropdownItem = styled.button`
  min-height: 36px;
  background: #fff;
  border: none;
  color: #253858;
  text-align: left;
  cursor: pointer;
  padding: 0 14px;
  font-size: 14px;
  display: flex;
  border-radius: 6px;
  align-items: center;
  svg {
    margin-right: 8px;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export default () => (
  <TaskDropdown
    options={[
      {
        text: "Mark Complete",
        icon: <CheckOutlined />,
      },
      {
        text: "Email",
        icon: <MailOutlined />,
      },
      {
        text: "Reassign",
        icon: <UserSwitchOutlined />,
      },
      {
        text: "Reschedule",
        icon: <ReloadOutlined />,
      },
    ]}
    placeholder="Actions"
  />
);
