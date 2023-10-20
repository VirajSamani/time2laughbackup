import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CustomCard from "../customCard/CustomCard";

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px 0px;
`;

const VideoCardGrid = ({ data }) => {
  return (
    <GridContainer>
      {data.map((video) => (
        <CustomCard data={video} type="video" />
      ))}
    </GridContainer>
  );
};

export default VideoCardGrid;
