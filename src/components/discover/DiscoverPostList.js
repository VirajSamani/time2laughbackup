import React, { useState } from "react";
import { Card, Button, Row, Col } from "antd";
import styled from "styled-components";
import Rating from "../rating/Rating";
import { color } from "../../utils/color";
import MetaProifile from "../MetaProfile/MetaProifle";
import { EllipsisOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const PostListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px;
  gap: 20px;
  .ant-card-body {
    padding: 0 !important;
  }
`;

const PostCard = styled(Card)`
  width: 100%;
  max-width: 300px;
  border: none;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: scale(1.02);
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
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

const DiscoveryPostList = ({ data }) => {
  const [visiblePosts, setVisiblePosts] = useState(3);

  const loadMorePosts = () => {
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 3);
  };

  return (
    <div>
      <PostListWrapper>
        {data.slice(0, visiblePosts).map((post) => (
          <PostCard
            actions={[
              <Rating key="rating" rate={post.rating || 0} />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
            key={post._id}
          >
            <Thumbnail
              src={
                post.thumbnail ||
                "https://geekflare.com/wp-content/uploads/2023/03/img-placeholder.png"
              }
              alt={post.content}
            />
            <CardContent>
              <Title>{post.content}</Title>
              <MetaProifile username={post.username} nickName={post.nickName} />
            </CardContent>
          </PostCard>
        ))}
      </PostListWrapper>
      {visiblePosts < data.length && (
        <Row justify="center">
          <Col span={22} style={{ textAlign: "center" }}>
            <LoadMoreButton onClick={loadMorePosts}>Load More</LoadMoreButton>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default DiscoveryPostList;
