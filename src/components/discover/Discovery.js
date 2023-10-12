import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useLoader } from "../../context/LoaderContext";
import Section from "../../styled-common-components/Section";
import CustomContainer from "../../styled-common-components/CustomContainer";
import { apiCall } from "../../utils/apiCall";
import DiscoveryVideoList from "./VideoList";
import DiscoveryPostList from "./DiscoverPostList";
import styled from "styled-components";
import DiscoveryJokeList from "./DiscoveryJokeList";
import { SmileOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";

const DiscoveryContainer = styled.div`
  display: ${(props) => !props.display && "none"};
  background-color: #000;
  padding: 20px;
  border: 1px solid #333;
  border-radius: 8px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.4);
  margin: 10px;
  transition: transform 0.2s, box-shadow 0.2s; /* Added transitions */

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.6);
  }
`;

const DiscoveryHeader = styled.h3`
  font-size: 28px;
  color: #00ffcc;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  transition: color 0.2s; /* Added color transition */

  &:hover {
    color: #ff9900; /* Change color on hover */
  }
`;

const IconWrapper = styled.span`
  font-size: 32px;
  margin-right: 10px;
  transition: transform 0.2s; /* Added transition for icon */

  &:hover {
    transform: scale(1.2); /* Scale the icon on hover */
  }
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
    apiCall("search", "POST", { keyword: search || "" })
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
      <CustomContainer loading={!loading}>
        <Skeleton />
        <br />
        <Skeleton />
        <br />
        <Skeleton />
      </CustomContainer>
      <CustomContainer loading={loading}>
        <DiscoveryContainer display={data?.videos?.length}>
          <DiscoveryHeader>
            <IconWrapper>
              <SmileOutlined />
            </IconWrapper>
            Videos
          </DiscoveryHeader>
          <DiscoveryVideoList data={data.videos} />
        </DiscoveryContainer>
        <DiscoveryContainer display={data?.posts?.length}>
          <DiscoveryHeader>
            <IconWrapper>
              <SmileOutlined />
            </IconWrapper>
            Posts
          </DiscoveryHeader>
          <DiscoveryPostList data={data.posts} />
        </DiscoveryContainer>
        <DiscoveryContainer display={data?.jokes?.length}>
          <DiscoveryHeader>
            <IconWrapper>
              <SmileOutlined />
            </IconWrapper>
            Jokes
          </DiscoveryHeader>
          <DiscoveryJokeList data={data.jokes} />
        </DiscoveryContainer>
      </CustomContainer>
    </Section>
  );
};

export default Discovery;
