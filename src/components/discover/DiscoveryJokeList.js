import React, { useState } from "react";
import { Button, Row, Col } from "antd";
import styled from "styled-components";
import { color } from "../../utils/color";
import CustomCard from "../customCard/CustomCard";

const JokeListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px;
  gap: 20px;
  .ant-card-body {
    padding: 0 !important;
  }
`;

const LoadMoreButton = styled(Button)`
  margin-top: 20px;
  width: 100%;
  background-color: ${color.primary};
  color: white;
  border: none;
  border-radius: 8px;
  &:hover {
    background-color: ${color.secondary};
  }
`;

const DiscoveryJokeList = ({ data }) => {
  const [visibleJokes, setVisibleJokes] = useState(3);

  const loadMoreJokes = () => {
    setVisibleJokes((prevVisibleJokes) => prevVisibleJokes + 3);
  };

  return (
    <div>
      <JokeListWrapper>
        {data.slice(0, visibleJokes).map((joke) => (
          <CustomCard data={joke} type="joke" />
        ))}
      </JokeListWrapper>
      {visibleJokes < data.length && (
        <Row justify="center">
          <Col span={22} style={{ textAlign: "center" }}>
            <LoadMoreButton onClick={loadMoreJokes}>Load More</LoadMoreButton>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default DiscoveryJokeList;
