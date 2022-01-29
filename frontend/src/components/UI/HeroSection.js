import { Button, Form } from "react-bootstrap";
import classes from "./HeroSection.module.css";
import { useRef } from "react";

const HeroSection = (props) => {
  const userSearchInputRef = useRef();
  const userSearchInputSubmitHandler = () => {
    props.userSearchInputChangeHandler(userSearchInputRef.current.value);
  };
  return (
    <div>
      <div className={classes.hero_container}>
        <h3 className="text-center">Search Meme Templates</h3>
        <Form className="my-3">
          <Form.Group className="my-2 text-center mx-auto" controlId="search">
            <Form.Control
              type="text"
              className="d-block text-center w-50 m-auto"
              placeholder="Search by dialogue or movie name"
              ref={userSearchInputRef}
            />
          </Form.Group>
          <div className="text-center">
            <Button onClick={userSearchInputSubmitHandler}>Search</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default HeroSection;
