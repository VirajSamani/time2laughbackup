// JokeList.js
import React, { useEffect, useState } from "react";
import { Card } from "antd";
import styled from "styled-components";
import { apiCall } from "../../utils/apiCall";
import Rating from "../rating/Rating";

const JokeListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  margin: 0 auto;
`;

const JokeItem = styled(Card)`
  width: 100%;
  .ant-card-body {
    display: flex;
    flex-direction: column;
  }
  img {
    max-width: 100%;
    height: auto;
  }
  h3 {
    margin: 10px 0;
  }
`;

const JokeList = () => {
  const [jokes, setJokes] = useState([]);

  const getJokeList = () => {
    apiCall("/jokes/").then((response) => {
      setJokes(response);
    });
  };

  useEffect(() => {
    getJokeList();
  }, []);

  return (
    <JokeListWrapper>
      {jokes.map((joke) => (
        <JokeItem key={joke._id}>
          {joke.url && (
            <img
              src={
                joke.url ||
                "https://geekflare.com/wp-content/uploads/2023/03/img-placeholder.png"
              }
              alt={joke.content}
            />
          )}
          <h3>{joke.content}</h3>
          <Rating rate={joke.rating} />
        </JokeItem>
      ))}
    </JokeListWrapper>
  );
};

export default JokeList;
