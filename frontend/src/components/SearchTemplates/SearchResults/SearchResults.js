import TemplateCard from "./TemplateCard";
import { Row, Col, Container } from "react-bootstrap";
import { Pagination } from "react-bootstrap";
import classes from "./SearchResults.module.css";

const SearchResults = (props) => {
  let active = props.currentPage;
  let items = [];
  for (let number = 1; number <= props.searchItemsCount / 10 + 1; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => props.pageChangeHandler(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  const paginationBasic = (
    <div className={classes.pagination}>
      <Pagination>{items}</Pagination>
      <br />
    </div>
  );

  return (
    <Container fluid className="my-4">
      <Row>
        <p className="text-center">Found {props.searchItemsCount} templates</p>
        {props.templates.map((template) => {
          return (
            <Col md="4">
              <TemplateCard
                title={template.hashtag}
                templateUrl={template.display_url}
                caption={template.caption}
                key={template.post_id}
                postId={template.post_id}
                image_b64={template.image_b64}
              />
            </Col>
          );
        })}
      </Row>
      {paginationBasic}
    </Container>
  );
};

export default SearchResults;
