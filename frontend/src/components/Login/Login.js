import { Card, Form, Button, Alert } from "react-bootstrap";
import FormGroup from "../UI/FormGroup";
import classes from "./Login.module.css";
import AuthContext from "../../store/auth-context";
import { useContext,useRef,useState } from "react";
const Login = () => {
  const authContext = useContext(AuthContext);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [errorMessages,setErrorMessages] = useState(null);
  const [isLoggedInSuccessfully,setIsLoggedInSuccessfully] = useState(false);
  
  const formSubmitHandler = (event) => {
    console.log("FormClicked")
    event.preventDefault();
    const enteredUsername = usernameRef.current.value;
    const enteredPassword = passwordRef.current.value;
    let errorMessagesArray = []
    if(enteredUsername.length < 3) {
      errorMessagesArray.push("Please enter valid username");
      console.log("Inside Username validation")
    }
    if(enteredPassword.length == 0) {
      errorMessagesArray.push("Password cannot be left blank");
      console.log("Inside Password validation")
    }
    setErrorMessages(errorMessagesArray);
    if(errorMessagesArray.length === 0) {
      console.log("Inside If")
      //Make the login request only when there is no errors in the form
      fetch("http://192.168.0.108:8000/login",{
        method: "POST",
        body: JSON.stringify({
          "username":enteredUsername,
          "password":enteredPassword
        }),
        headers:{
          "Content-Type":"application/json"
        }
      })
      .then(response => {
        if(response.ok) {
          return response.json();
        } else {
          return response.json().then(data => {
            let errorMessage = "Authentication Failed!";
            if(data && data.error) {
              errorMessage = data.error;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then(response => {
        console.log("Successful login = ",response)
        authContext.login(response);
        setErrorMessages(null); //Clearing all the error messages on successful login
        setIsLoggedInSuccessfully(true);
      })
      .catch(error => {
        setErrorMessages([error.message]);
        setIsLoggedInSuccessfully(false);
      })
    }
   }
  return (
    <Card className={classes.login_card}>
      <Card.Header className={classes.login_card_header}>Login</Card.Header>
      <Card.Body>
        <Form>
        {isLoggedInSuccessfully && <Alert variant='success'>Logged In Successfully. Redirecting you to homepage</Alert>}
            {errorMessages && errorMessages.length > 0 && <Alert variant='danger'>{errorMessages.map(error => <span>{error}<br/></span>)}</Alert>}
          <FormGroup
            inputId="username"
            placeholder="Enter username"
            inputLabel="Username"
            inputType="text"
            ref={usernameRef}
          />
          <FormGroup
            inputId="password"
            placeholder="Enter password"
            inputLabel="Password"
            inputType="password"
            inputHelperText=""
            ref={passwordRef}
          />

          <div className={classes.login_button}>
            <Button variant="outline-info" type="submit" onClick={formSubmitHandler}>
              Login
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Login;
