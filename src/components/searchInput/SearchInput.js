import { Input } from "antd";
import React, { useRef } from "react";
import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledInput = styled(Input)`
  border: none;
  border-radius: 30px;
  padding: 10px 20px;
  font-size: 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  &:hover,
  &:focus {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const SearchInput = ({ placeholder, onSearch }) => {
  const searchRef = useRef();
  return (
    <>
      <div style={{ padding: "20px" }}>
        <SearchContainer>
          <StyledInput
            ref={searchRef}
            placeholder={placeholder}
            onPressEnter={() => onSearch(searchRef)}
            suffix={<SearchOutlined onClick={() => onSearch(searchRef)} />}
          />
        </SearchContainer>
      </div>
    </>
  );
};

export default SearchInput;
