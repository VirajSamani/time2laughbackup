import React from "react";
import styled from "styled-components";
import CustomCard from "../customCard/CustomCard";

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px 0px;
`;

const PostCardGrid = ({ data }) => {
  return (
    <GridContainer>
      {data.map((post) => (
        <CustomCard data={post} type="post" />
      ))}
    </GridContainer>
  );
};

export default PostCardGrid;
