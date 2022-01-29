import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faDownload,
  faImages,
} from "@fortawesome/free-solid-svg-icons";

import { Row, Col, Container } from "react-bootstrap";

const ABOUT_CARDS = [
  {
    fontAwesomeIcon: faSearch,
    summary: "Search for based on movie names or dialgues",
  },
  {
    fontAwesomeIcon: faDownload,
    summary: "Download your favorite templates",
  },
  {
    fontAwesomeIcon: faImages,
    summary: "Search for based on movie names or dialgues",
  },
];
const About = () => {
  return (
    <Container>
      <Row className="mx-5 my-5">
        {ABOUT_CARDS.map((card) => (
          <Col md={12} lg={4}>
            <div className="text-center">
              <FontAwesomeIcon
                icon={card.fontAwesomeIcon}
                style={{
                  fontSize: "50px",
                }}
              />
            </div>
            <div className="text-center">
              <p>{card.summary}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
export default About;
