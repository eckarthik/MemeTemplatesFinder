import { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import TemplateCard from "../SearchTemplates/SearchResults/TemplateCard";

const TopTemplates = () => {
  const [templates, setTemplates] = useState(null);
  useEffect(() => {
    fetch("http://192.168.0.108:8000/toptemplates")
      .then((response) => response.json())
      .then((response) => {
        const postIds = Object.keys(response.templates);
        const templateDetails = [];
        for (let post of postIds) {
          templateDetails.push(response.templates[post][0]);
        }
        setTemplates(templateDetails);
      });
    console.log("State = ", templates);
  }, [templates]);
  return (
    <Container fluid className="my-4">
      <h3 className="text-center">Top Templates</h3>
      <Row>
        {templates &&
          templates.map((template) => {
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
    </Container>
  );
};

export default TopTemplates;
