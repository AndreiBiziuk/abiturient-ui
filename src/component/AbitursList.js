import React from "react";
import FilteredTable from "./FilteredTable/FilteredTable";

export default class AbiturList extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.handleUnauthorized = this.handleUnauthorized.bind(this);
    }

    handleUnauthorized() {
        this.props.handleTokenChange("");
        this.props.handlePageChange("login");
    }

    render() {
        return (
            <>
                <h1>
                    Список абитуриентов
                </h1>
                <FilteredTable
                    token={this.props.token}
                    entity="abiturs"
                    host={this.props.host}
                    handleUnauthorized={this.handleUnauthorized}
                    handleEditIdChange={this.props.handleEditIdChange}
                />
            </>
        )
    }
}
