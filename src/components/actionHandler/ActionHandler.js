import React from "react";
import { Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import styled from "styled-components";

const StyledActionHandler = styled.div`
  background-color: #0f0f0f;
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: white;
`;

const EditButton = styled(Button)`
  background-color: #007bff; // Customize the background color
  color: white; // Text color
  margin-right: 10px; // Adjust the spacing
`;

const DeleteButton = styled(Button)`
  background-color: #dc3545; // Customize the background color
  color: white; // Text color
`;

const ActionHandler = ({ onEditClick, onDeleteClick }) => {
  return (
    <StyledActionHandler>
      <div>
        <EditButton
          type="primary"
          icon={<EditOutlined />}
          onClick={onEditClick}
        >
          Edit
        </EditButton>
        <DeleteButton
          type="danger"
          icon={<DeleteOutlined />}
          onClick={onDeleteClick}
        >
          Delete
        </DeleteButton>
      </div>
    </StyledActionHandler>
  );
};

export default ActionHandler;
