import React from "react";
import { useParams } from "react-router-dom";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios";
import ReactMarkdown from "react-markdown";

export const FullPost = () => {
  const [data , setData] = React.useState();
  const [isLoading , setLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    axios.get(`/posts/${id}`).then((res) => {
        setData(res.data);
        setLoading(false);
    }).catch(err => {
        console.warn(err);
        setLoading(false);
        alert('An error occurred while receiving post');
    });
}, []);


if (isLoading) {
  return <Post isLoading={isLoading} isFullPost />
}

  return (
    <>
      <Post
              id={data._id}
              title={data.title}
              imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''}
              user={data.user}
              createdAt={data.createdAt}
              viewsCount={data.viewsCount}
              commentsCount={3}
              tags={data.tags}
              isFullPost >
        <ReactMarkdown children={data.text} ></ReactMarkdown>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Vasya Pupkin",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "This is a test comment",
          },
          {
            user: {
              fullName: "Ivan Ivanov",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
