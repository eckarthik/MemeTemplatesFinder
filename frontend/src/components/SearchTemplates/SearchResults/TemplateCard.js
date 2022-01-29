import { Card } from "react-bootstrap";
import { downloadImage } from "../../../utils";
import { faTags, faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./TemplateCard.module.css";
const TemplateCard = (props) => {
  const tagLinks = props.title.split(",").map((tag, idx) => {
    const tagUrl = `tag?=${tag}`;
    const tagMark = idx !== props.title.split(",").length - 1 ? "," : null;
    return (
      <span key={idx}>
        <a href={tagUrl} className={classes.tagUrl}>
          {tag.toUpperCase()}
        </a>
        {tagMark}
      </span>
    );
  });
  return (
    <Card className={classes.template_card}>
      <Card.Img
        className={classes.template_image}
        variant="top"
        src={props.image_b64}
      />
      <Card.Title className={classes.tags}>
        <FontAwesomeIcon className={classes.icon} icon={faTags} /> {tagLinks}
      </Card.Title>
      <div className={classes.template_caption}>{props.caption}</div>
      <div
        variant="primary"
        className={classes.template_download}
        onClick={() => downloadImage(props.image_b64, "template.png")}
      >
        Download <FontAwesomeIcon className={classes.icon} icon={faDownload} />
      </div>
    </Card>
  );
};

export default TemplateCard;
