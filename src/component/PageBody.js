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
                        handlePageChange={this.props.handlePageChange}
                        host={this.props.host}
                    />
                );
            }
            case 'login': {
                return (
                    <LoginForm
                        handlePageChange={this.props.handlePageChange}
                        host={this.props.host}
                    />
                );
            }
            case 'abiturs': {
                return (
                    <AbitursList
                        handlePageChange={this.props.handlePageChange}
                        host={this.props.host}
                    />
                );
            }
            case 'groups': {
                return (
                    <Groups
                        handlePageChange={this.props.handlePageChange}
                        host={this.props.host}
                    />
                );
            }
            case 'specs': {
                return (
                    <Specialities
                        handlePageChange={this.props.handlePageChange}
                        host={this.props.host}
                    />
                );
            }
            case 'users': {
                return (
                    <Users
                        handlePageChange={this.props.handlePageChange}
                        host={this.props.host}
                    />
                );
            }
            default:{
                return (
                    <Home
                        handlePageChange={this.props.handlePageChange}
                        host={this.props.host}
                    />
                );
            }
        }
    }
}
