import React from "react";
import FilteredTable from "./FilteredTable/FilteredTable";

export default class Users extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.handleUnauthorized = this.handleUnauthorized.bind(this);
    }

    handleUnauthorized(){
        this.props.handleTokenChange("");
        this.props.handlePageChange("login");
    }

    render() {
        return (
            <>
                <h1>
                    Пользователи
                </h1>
                <FilteredTable 
                    token={this.props.token}
                    entity="users"
                    host={this.props.host}
                    handleUnauthorized={this.handleUnauthorized}
                />
            </>
        )
    }
}
