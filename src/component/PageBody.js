import React from "react";
import Home from "./Home";
import LoginForm from "./LoginForm";
import AbitursList from "./AbitursList";
import Groups from "./Groups";
import Users from "./Users";
import Specialities from "./Specialities";

export default class PageBody extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        switch (this.props.page){
            case 'home':{
                return (
                    <Home 
                        {...this.props}
                    />
                );
            }
            case 'login': {
                return (
                    <LoginForm
                        {...this.props}
                    />
                );
            }
            case 'abiturs': {
                return (
                    <AbitursList
                        {...this.props}
                    />
                );
            }
            case 'groups': {
                return (
                    <Groups
                        {...this.props}
                    />
                );
            }
            case 'specs': {
                return (
                    <Specialities
                        {...this.props}
                    />
                );
            }
            case 'users': {
                return (
                    <Users
                        {...this.props}
                    />
                );
            }
            default:{
                return (
                    <Home
                        {...this.props}
                    />
                );
            }
        }
    }
}
