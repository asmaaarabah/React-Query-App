import { Form } from "react-bootstrap";
import { postSelectedStatustype } from "../types";

interface propsFilterPost {
  selectedPostStatus: postSelectedStatustype;
  setSelectedPostStatus: (value: postSelectedStatustype) => void;
}
const FilterPosts = ({
  selectedPostStatus,
  setSelectedPostStatus,
}: propsFilterPost) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPostStatus(e.target.value as postSelectedStatustype);
  };
  return (
    <>
      <h5>Filter By Status</h5>
      <Form.Select value={selectedPostStatus} onChange={onChangeHandler}>
        <option value="all">All</option>
        <option value="publish">Publish</option>
        <option value="draft">Draft</option>
        <option value="block">Block</option>
      </Form.Select>
    </>
  );
};
export default FilterPosts;
