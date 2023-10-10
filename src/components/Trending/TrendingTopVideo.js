import React, { useEffect, useState } from "react";
import { apiCall } from "../../utils/apiCall";
import styled from "styled-components";
import { Link } from "react-router-dom";

const TrendingImage = styled.img`
  height: 500px;
  width: 100%;
  object-fit: cover;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  transition: filter 0.3s, box-shadow 0.3s, transform 0.3s;
  overflow: hidden;

  &:hover {
    transform: scale(1.05); /* Add a slight zoom effect on hover */
  }

  @media (max-width: 768px) {
    height: 60vh;
    width: 100%;
  }

  -webkit-mask-image: linear-gradient(0deg, transparent 5%, #000 60%);
`;

const TrendingWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #0f0f0f;
  height: 100%;
  transition: background-color 0.3s;
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
