import { Col, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import useGetPost from "../hooks/useGetPost";

const Info = () => {
  const [searchParms] = useSearchParams();
  const id = searchParms.get("id") as string;
  const parmType = searchParms.get("type") as string;
  const parmKey = searchParms.get("key") as string;
  const { data, isLoading, isError, error } = useGetPost(id, parmKey, parmType);
  if (isLoading) {
    return <div>Please wait ..</div>;
  }
  if (isError) {
    return <div>Error :{error.message}</div>;
  }

  return (
    <>
      <Row>
        <Col>
          <div>
            <h4>Title:{data?.title}</h4>
            <p>Status:{data?.status}</p>
            <p>TopRate:{data?.topRate ? "true" : "false"}</p>
            <p>Body:{data?.body}</p>
            <hr />
            <h4 className="mb-2">comments:</h4>
            <p>comment1</p>
            <p>comment2</p>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Info;
