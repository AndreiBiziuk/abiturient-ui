import React from "react";
import TableFiltered from "./Table";

export default class Users extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <>
                <h1>
                    Пользователи
                </h1>
                <TableFiltered 
                    token={this.props.token}
                    entity="users"
                    host={this.props.host}
                />
            </>
        )
    }
}
