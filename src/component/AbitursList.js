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
                    entity="abiturs"
                    editEntity="abitursFull"
                    handleUnauthorized={this.handleUnauthorized}
                    {...this.props}
                />
            </>
        )
    }
}
