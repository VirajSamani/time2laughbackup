import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Section from "../../styled-common-components/Section";
import CustomContainer from "../../styled-common-components/CustomContainer";
import VideoPlayer from "../../components/videoPlayer/VideoPlayer";
import { useLoader } from "../../context/LoaderContext";
import { apiCall } from "../../utils/apiCall";
import styled from "styled-components";
import Rating from "../../components/rating/Rating";
import ProfileAvatar from "../../components/badges/ProfileAvatar";
import MetaProifile from "../../components/MetaProfile/MetaProifle";

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.5;
`;

const VideoWatcher = () => {
  const { id } = useParams();
  const { hideLoader } = useLoader();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const getVideoData = () => {
    apiCall(`videos/${id}`)
      .then((response) => {
        setData(response);
        setLoading(false);
        hideLoader();
      })
      .catch((error) => {
        console.error("Error fetching video data:", error);
        setLoading(false);
        hideLoader();
      });
  };

  useEffect(() => {
    getVideoData();
  }, [id]);

  return (
    <Section>
      <VideoPlayer
        center={true}
        height="450px"
        thumbnail={
          data.thumbnail ||
          "https://geekflare.com/wp-content/uploads/2023/03/img-placeholder.png"
        }
        src={
          data.url ||
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        }
      />
      <CustomContainer loading={loading}>
        <DetailWrapper>
          <Title>{data.title}</Title>
          <Rating rate={data.rating} />
          <MetaProifile username={data.username} nickName={data.nickName} />
          <Description>{data.description}</Description>
        </DetailWrapper>
        <br />
        <br />
        <br />
        <br />
        <br />
      </CustomContainer>
    </Section>
  );
};

export default VideoWatcher;
