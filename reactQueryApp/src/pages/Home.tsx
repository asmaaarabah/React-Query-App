import { Row, Col } from "react-bootstrap";
import PostList from "../components/PostList";
import FilterPosts from "../components/FilterPosts";
import { useState } from "react";
import { postSelectedStatustype } from "../types";
import SearchQuery from "../components/SearchQuery";

const Home = () => {
  //state for handle the update state
  const [selectedPostStatus, setSelectedPostStatus] =
    useState<postSelectedStatustype>("all");
  // i will pass the state to the two selectors
  console.log(selectedPostStatus);
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <Row>
      <Col xs={9}>
        {" "}
        <PostList
          selectedPostStatus={selectedPostStatus}
          searchQuery={searchQuery}
        />
      </Col>

      <Col>
        <SearchQuery setSearchQuery={setSearchQuery} />
        {searchQuery.length === 0 && (
          <FilterPosts
            selectedPostStatus={selectedPostStatus}
            setSelectedPostStatus={setSelectedPostStatus}
          />
        )}
      </Col>
    </Row>
  );
};

export default Home;
