import { useState } from "react";
import { Form } from "react-bootstrap";

interface searchQueryProps {
  setSearchQuery: (value: string) => void;
}
const SearchQuery = ({ setSearchQuery }: searchQueryProps) => {
  const [query, setQuery] = useState("");

  // this function will fire when user enter term to search by and click enter it will fire in form
  const querySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchQuery(query);
  };
  return (
    <>
      <div className="mb-3">
        <h5> Search </h5>
        <Form onSubmit={querySubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="enter Your Search Term.."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Form>
      </div>
    </>
  );
};
export default SearchQuery;
