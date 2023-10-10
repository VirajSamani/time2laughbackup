import React from "react";
import styled from "styled-components";
import CustomCard from "../customCard/CustomCard";

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px 0px;
`;

const JokeCardGrid = ({ data }) => {
  return (
    <GridContainer>
      {data.map((joke) => (
        <CustomCard data={joke} type="joke" />
      ))}
    </GridContainer>
  );
};

export default JokeCardGrid;
