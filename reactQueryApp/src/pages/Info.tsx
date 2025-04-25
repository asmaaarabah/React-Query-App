import { Button, Col, Form, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

// Custom hooks
import useGetPost from "../hooks/useGetPost";
import useAddComment from "../hooks/useAddComment";
import useGetComments from "../hooks/useGetComments";

const Info = () => {
  //  Get URL query parameters: id, type, key
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") as string;
  const parmType = searchParams.get("type") as string;
  const parmKey = searchParams.get("key") as string;

  //  Fetch the post data based on the parameters
  const { data, isLoading, isError, error } = useGetPost(id, parmKey, parmType);

  // State for comment input
  const [comment, setComment] = useState("");

  //  Custom mutation hook to add a comment
  const addComment = useAddComment();

  //  Fetch all comments related to the post
  const getComment = useGetComments(id);

  // Show loading state while post data is being fetched
  if (isLoading) {
    return <div>Please wait ..</div>;
  }

  //  Show error if fetching post fails
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  // Handle comment form submission
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form behavior (page reload)

    // Send the new comment using the mutation hook
    addComment.mutate(
      { body: comment, post_id: +id },
      {
        onSuccess: () => {
          setComment(""); // Clear textarea after successful comment
        },
      }
    );
  };

  return (
    <Row>
      <Col>
        <div>
          {/*Display post details */}
          <h4>Title: {data?.title}</h4>
          <p>Status: {data?.status}</p>
          <p>TopRate: {data?.topRate ? "true" : "false"}</p>
          <p>Body: {data?.body}</p>

          <hr />

          {/* Comment section */}
          <h4 className="mb-2">Comments:</h4>

          {/* Comment form */}
          <Form className="mb-3" onSubmit={submitHandler}>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>
            <Button
              type="submit"
              variant="primary"
              disabled={addComment.isPending}
            >
              Submit
            </Button>
          </Form>

          {/*Render comments */}
          {getComment.isLoading ? (
            <p>Loading comments, please wait...</p>
          ) : (
            getComment.data?.map((el) => <p key={el.id}>{el.body}</p>)
          )}
        </div>
      </Col>
    </Row>
  );
};

export default Info;
