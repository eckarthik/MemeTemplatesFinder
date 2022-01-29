import { Fragment } from "react";
import MainHeader from "./MainHeader";
const Layout = (props) => {
    return (
        <Fragment>
            <MainHeader/>
            {props.children}
        </Fragment>
    );
}

export default Layout;