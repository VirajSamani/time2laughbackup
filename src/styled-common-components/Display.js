import React from "react";
import styled from "styled-components";

const Flex = ({ children, style, ...props }) => {
  const Flex = styled.div`
    display: flex;
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
    }
  `;

  return (
    <Flex style={style} {...props}>
      {children}
    </Flex>
  );
};

export { Flex };
