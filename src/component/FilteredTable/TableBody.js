import React from "react";
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Table from "react-bootstrap/Table"
import Paginate from "./Pagination"
import TableHeader from "./TableHeader"

export default class TableBody extends React.Component {
    constructor(props) {
        super(props);

        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleEdit(event){
        const rowNum = event.currentTarget.dataset.index;
        const id = this.props.data[rowNum][this.props.fields[0]];
        this.props.handleEditIdChange(id);
        this.props.handleCurrentEditEntityChange(this.props.editEntity)
        this.props.handlePageChange(this.props.editPage);
        //console.log(id);
    }

    handleDelete(event){
        const rowNum = event.currentTarget.dataset.index;
        const id = this.props.data[rowNum][this.props.fields[0]];
        this.props.handleEditIdChange(id);
        this.props.handleCurrentEditEntityChange(this.props.editEntity)
        //console.log(id);
    }

    render() {

        return (
        <tbody>
            {
                this.props.data.map(
                    (row, i) => {
                        return (
                            <tr key={i}>
                                <td key={0} className="align-middle">
                                    <div className="d-flex flex-row">
                                    <Button variant="outline-primary" size="sm" data-index={i} onClick={this.handleEdit}>
                                        ✎
                                    </Button>
                                    <Button variant="outline-danger" size="sm" data-index={i} onClick={this.handleDelete}>
                                        ✘
                                    </Button>
                                    </div>
                                </td>
                                {
                                    this.props.fields.map(
                                        (name, i) => {
                                            return <td key={i+1} className="align-middle">{row[name]}</td>
                                        }
                                    )
                                }
                            </tr>
                        )
                    }
                )
            }
        </tbody>
        );
    }
}