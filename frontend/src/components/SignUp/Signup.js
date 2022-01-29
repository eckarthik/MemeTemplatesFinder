import { useState, useRef } from "react";
import { Card, Form, Button, Alert} from "react-bootstrap";
import FormGroup from "../UI/FormGroup";
import classes from "./Signup.module.css";
const Signup = () => {
    const emailRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const [registerSuccess,setRegisterSuccess] = useState(false);
    const [errorMessages,setErrorMessages] = useState(null);

    const formSubmitHandler = (event) => {
        event.preventDefault();
        setRegisterSuccess(false);
        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;
        const enteredConfirmPassword = confirmPasswordRef.current.value;
        const enteredUsername = usernameRef.current.value;
        const enteredFirstName = firstNameRef.current.value;
        const enteredLastName = lastNameRef.current.value;
        const errorMessagesArray = [];
        if(!enteredEmail.includes('@') || !(enteredEmail.length > 3)) {
            errorMessagesArray.push("Email is invalid!");
        }
        if(!(enteredFirstName.length > 3)) {
            errorMessagesArray.push("First Name should be atleast three characters");
        }
        if(!(enteredLastName.length > 3)) {
            errorMessagesArray.push("Last Name should be atleast three characters");
        }
        if(!(enteredPassword.length > 3) || !(enteredConfirmPassword.length > 3)) {
            errorMessagesArray.push("Passwords should be atleast 8 characters in length");
        }
        if(!(enteredPassword === enteredConfirmPassword)) {
            errorMessagesArray.push("Passwords do not match");
        }
        if(!(enteredUsername.length > 3)) {
            errorMessagesArray.push("Username should be atleast 3 characters in length");
        }
        fetch("http://192.168.0.108:8000/signup",{
            method: 'POST',
            body:JSON.stringify({
                "username":enteredUsername,
                "email":enteredEmail,
                "first_name":enteredPassword,
                "last_name":enteredLastName,
                "password":enteredPassword
            }),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(response => response.json())
        .then(response => {
            if(Object.keys(response).includes("email")) {
                if(response.email === enteredEmail) {
                    setErrorMessages(null);
                    setRegisterSuccess(true);
                }
                else {
                    let backendErrorMessages = []
                    Object.keys(response).map(errorField => backendErrorMessages.push(response[errorField][0]))
                   setErrorMessages(backendErrorMessages);
                }
                console.log("Inside response.ok")
            }
            else {
                let backendErrorMessages = []
                Object.keys(response).map(errorField => backendErrorMessages.push(response[errorField][0]))
               setErrorMessages(backendErrorMessages);
               console.log("Inside else response.ok")
            }
        })
        .catch(error => {
            console.log(error)
            console.log("Inside error")
        })
    }
  return (
    <Card className={classes.signup_card}>
      <Card.Header className={classes.signup_card_header}>Register</Card.Header>
      <Card.Body>
        <Form>
            {registerSuccess && <Alert variant='success'>Registered successfully. You can now login</Alert>}
            {errorMessages && errorMessages.length > 0 && <Alert variant='danger'>{errorMessages.map(error => <span>{error}<br/></span>)}</Alert>}
          <div className={classes.inline_form_inputs}>
            <FormGroup
              inputId="firstName"
              placeholder="Enter first name"
              inputLabel="First Name"
              inputType="text"
              inputHelperText=""
              ref={firstNameRef}
            />
            <FormGroup
              inputId="lastName"
              placeholder="Enter last name"
              inputLabel="Last Name"
              inputType="text"
              inputHelperText=""
              ref={lastNameRef}
            />
          </div>
          <FormGroup
            inputId="email"
            placeholder="Enter email"
            inputLabel="Email"
            inputType="text"
            inputHelperText="We'll never share your email with anyone else."
            ref={emailRef}
          />
          <FormGroup
            inputId="username"
            placeholder="Enter username"
            inputLabel="Username"
            inputType="text"
            ref={usernameRef}

          />

          <div className={classes.inline_form_inputs}>
            <FormGroup
              inputId="password"
              placeholder="Enter password"
              inputLabel="Password"
              inputType="password"
              inputHelperText=""
              ref={passwordRef}
            />
            <FormGroup
              inputId="confirmpassword"
              placeholder="Enter password again"
              inputLabel="Confirm Password"
              inputType="password"
              inputHelperText=""
              ref={confirmPasswordRef}
            />
          </div>

          <div className={classes.signup_button}>
            <Button variant="outline-danger" type="submit" onClick={formSubmitHandler}>
              Register
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Signup;
