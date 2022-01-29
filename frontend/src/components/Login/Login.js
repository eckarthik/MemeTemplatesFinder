import { Card, Form, Button } from "react-bootstrap";
import FormGroup from "../UI/FormGroup";
import classes from "./Login.module.css";
const Login = () => {
  return (
    <Card className={classes.login_card}>
      <Card.Header className={classes.login_card_header}>Login</Card.Header>
      <Card.Body>
        <Form>
          <FormGroup
            inputId="username"
            placeholder="Enter username"
            inputLabel="Username"
            inputType="text"
          />
          <FormGroup
            inputId="password"
            placeholder="Enter password"
            inputLabel="Password"
            inputType="password"
            inputHelperText=""
          />

          <div className={classes.login_button}>
            <Button variant="outline-info" type="submit">
              Login
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Login;
