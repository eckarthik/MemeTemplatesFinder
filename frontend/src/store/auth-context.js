import React, {useEffect, useState} from 'react';

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    firstName:null,
    lastName: null,
    username: null,
    login: (token) => {},
    logout: () => {}
})


export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token') || null;
    const [token,setToken] = useState(initialToken);
    const [username,setUsername] = useState(null);
    const [email,setEmail] = useState(null);
    const [firstName,setFirstName] = useState(null);
    const [lastName,setLastName] = useState(null);
    const userIsLoggedIn = token ? true : false;

    useEffect(() => {
        if(token) {
            fetch("http://192.168.0.108:8000/getuser",{
                method:"GET",
                headers: {
                    "Authorization":"Token "+token
                }
            })
            .then(response => response.json())
            .then(response => {
                setUsername(response.username);
                setFirstName(response.first_name);
                setLastName(response.last_name);
                setEmail(response.email);
            })
        }
    },[token]);

    const loginHandler = (loginData) => {
        console.log("Login Handler was called with = ",loginData);
        setToken(loginData.token);
        
        localStorage.setItem('token',loginData.token);
    }
    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
    }
    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        firstName: firstName,
        lastName: lastName,
        username: username,
        login: loginHandler,
        logout: logoutHandler
    }
    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;