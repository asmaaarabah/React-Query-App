import { Link } from "react-router-dom";
import { Table, Form, ButtonGroup, Button } from "react-bootstrap";
import { postSelectedStatustype } from "../types";
import useGetPosts from "../hooks/useGetPosts";
import useSearchQuery from "../hooks/useSearchQuery";
import { useState } from "react";
interface propsPostList {
  selectedPostStatus: postSelectedStatustype;
  searchQuery: string;
}
const PostList = ({ selectedPostStatus, searchQuery }: propsPostList) => {
  const [paginate, setPaginate] = useState(1);
  const { data, isError, isLoading } = useGetPosts(
    selectedPostStatus,
    paginate
  );
  const searchData = useSearchQuery(searchQuery);

  if (isLoading || searchData.isLoading) {
    return <p>Data is loading...</p>;
  }
  if (isError) {
    return <p> an error occuered</p>;
  }
  if (searchData.error) {
    console.error(searchData.error);
    return <p>An error occurred while fetching data.</p>;
  }
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Status</th>
            <th style={{ width: "10%" }}>Top Rate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {searchQuery.length === 0 &&
            data?.map((el, idx) => (
              <tr key={el.id}>
                <td>{++idx}</td>
                <td>
                  {/* <Link to={`/info?id=${el.id}&type=paginate&key=${paginate}`}> */}
                  <Link to={`/info?id=${el.id}&type=paginate&key=${paginate}`}>
                    {el.title}
                  </Link>
                </td>
                <td>{el.status}</td>
                <td style={{ textAlign: "center" }}>
                  <Form.Check // prettier-ignore
                    type="switch"
                    onChange={() => console.log("")}
                    checked={el.topRate}
                  />
                </td>
                <td>
                  <ButtonGroup aria-label="Basic example">
                    <Button variant="danger">Delete</Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}

          {searchQuery.length > 0 &&
            searchData.data?.map((el, idx) => (
              <tr key={el.id}>
                <td>{++idx}</td>
                <td>
                  <Link to={`/info?id=${el.id}&type=search&key=${searchQuery}`}>
                    {el.title}
                  </Link>
                </td>
                <td>{el.status}</td>
                <td style={{ textAlign: "center" }}>
                  <Form.Check // prettier-ignore
                    type="switch"
                    onChange={() => console.log("")}
                    checked={el.topRate}
                  />
                </td>
                <td>
                  <ButtonGroup aria-label="Basic example">
                    <Button variant="danger">Delete</Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {searchQuery.length === 0 && selectedPostStatus === "all" && (
        <ButtonGroup aria-label="Basic example">
          <Button variant="light" onClick={() => setPaginate(1)}>
            1
          </Button>
          <Button variant="light" onClick={() => setPaginate(2)}>
            2
          </Button>
          <Button variant="light" onClick={() => setPaginate(3)}>
            3
          </Button>
        </ButtonGroup>
      )}
    </>
  );
};

export default PostList;
