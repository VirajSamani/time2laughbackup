import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useLoader } from "../../context/LoaderContext";
import Section from "../../styled-common-components/Section";
import CustomContainer from "../../styled-common-components/CustomContainer";
import { apiCall } from "../../utils/apiCall";
import DiscoveryVideoList from "./VideoList";
import DiscoveryPostList from "./DiscoverPostList";
import styled from "styled-components"; // Import styled-components
import DiscoveryJokeList from "./DiscoveryJokeList";

const DiscoveryContainer = styled.div`
  display: ${(props) => !props.display && "none"};
  background-color: #ffffff;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 10px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
  }
`;

const DiscoveryHeader = styled.h3`
  font-size: 24px;
  color: #333;
`;

const Discovery = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const { hideLoader } = useLoader();

  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get("search");
  const category = queryParams.get("category");

  const callSearchAPI = () => {
    setLoading(true);
    apiCall("search", "POST", { keyword: search })
      .then((response) => {
        setData(response);
        setLoading(false);
      })
      .finally(hideLoader);
  };

  useEffect(() => {
    callSearchAPI();
  }, []);

  return (
    <Section>
      <CustomContainer loading={loading}>
        <DiscoveryContainer display={data?.videos?.length}>
          <DiscoveryHeader>Video</DiscoveryHeader>
          <DiscoveryVideoList data={data.videos} />
        </DiscoveryContainer>
        <DiscoveryContainer display={data?.posts?.length}>
          <DiscoveryHeader>Post</DiscoveryHeader>
          <DiscoveryPostList data={data.posts} />
        </DiscoveryContainer>
        <DiscoveryContainer display={data?.jokes?.length}>
          <DiscoveryHeader>Joke</DiscoveryHeader>
          <DiscoveryJokeList data={data.jokes} />
        </DiscoveryContainer>
      </CustomContainer>
    </Section>
  );
};

export default Discovery;
