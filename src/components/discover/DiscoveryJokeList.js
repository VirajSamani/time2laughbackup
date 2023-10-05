import React, { useState } from "react";
import { Card, Button, Row, Col } from "antd";
import styled from "styled-components";
import Rating from "../rating/Rating";
import { color } from "../../utils/color";
import MetaProifile from "../MetaProfile/MetaProifle";
import { EllipsisOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const JokeListWrapper = styled.div`
  padding: 20px;
  gap: 20px;
  .ant-card-body {
    padding: 0 !important;
  }
`;

const JokeCard = styled(Card)`
  width: 100%;
  border: none;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin: 10px 0px;
  &:hover {
    transform: scale(1.02);
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const CardContent = styled.div`
  padding: 16px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  color: ${color.primary};
  margin-bottom: 8px;
`;

const Description = styled.p`
  margin: 0;
  font-size: 14px;
  color: #333;
  line-height: 1.4;
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
          <JokeCard
            actions={[
              <Rating key="rating" rate={joke.rating || 0} />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
            key={joke._id}
          >
            <CardContent>
              <Title>{joke.content}</Title>
              <Description>{joke.description}</Description>
              <MetaProifile username={joke.username} nickName={joke.username} />
            </CardContent>
          </JokeCard>
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
