import React from "react";
import styled from "styled-components";

const Flex = ({ children, style, ...props }) => {
  const Flex = styled.div`
    display: flex;
  `;

  return (
    <Flex style={style} {...props}>
      {children}
    </Flex>
  );
};

export { Flex };
