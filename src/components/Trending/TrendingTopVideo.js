import React, { useEffect, useState } from "react";
import { apiCall } from "../../utils/apiCall";
import styled from "styled-components";
import { Link } from "react-router-dom";

const TrendingImage = styled.img`
  height: 500px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  @media (max-width: 768px) {
    height: 100%;
    width: 100%;
  }
`;

const TrendingWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #0f0f0f;
  height: 100%;
`;

const TrendingTopVideo = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchTrendingVideo = () => {
    apiCall("feed/trending/video").then((response) => {
      setData(response.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchTrendingVideo();
  }, []);

  console.log(loading, data);

  return (
    !loading && (
      <Link to={`/video/${data._id}`}>
        <TrendingWrapper>
          <TrendingImage src={data.thumbnail} />
        </TrendingWrapper>
      </Link>
    )
  );
};

export default TrendingTopVideo;
