// PostList.js
import React, { useEffect, useState } from "react";
import { Card } from "antd";
import styled from "styled-components";
import { apiCall } from "../../utils/apiCall";
import Rating from "../rating/Rating";

const PostListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
`;

const PostItem = styled(Card)`
  width: 300px;
  .ant-card-body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  img {
    max-width: 100%;
    height: auto;
  }
  h3 {
    margin: 10px 0;
  }
`;

const PostList = () => {
  const [posts, setPosts] = useState([]);

  const getPostList = () => {
    apiCall("/posts/").then((response) => {
      setPosts(response);
    });
  };

  useEffect(() => {
    getPostList();
  }, []);

  return (
    <PostListWrapper>
      {posts.map((post) => (
        <PostItem key={post._id}>
          {post.url && (
            <img
              src={
                post.url ||
                "https://geekflare.com/wp-content/uploads/2023/03/img-placeholder.png"
              }
              alt={post.content}
            />
          )}
          <h3>{post.content}</h3>
          <Rating rate={post.rating} />
        </PostItem>
      ))}
    </PostListWrapper>
  );
};

export default PostList;
