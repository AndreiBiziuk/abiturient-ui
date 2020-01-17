import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default class EditGeneric extends React.Component{
    constructor(props){
        super(props);

        this.state = {data:[], fields:[]};

        this.handleUnauthorized = this.handleUnauthorized.bind(this);
        this.saveData = this.saveData.bind(this);
        this.cancel = this.cancel.bind(this);

        this.loadData();
    }

    handleUnauthorized() {
        this.props.handleTokenChange("");
        this.props.handlePageChange("login");
    }

    async getFields() {
        const props = this.props;
        let response = await fetch(`${props.host}/orm/${props.currentEditEntity}/fields`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${props.token}` }
        }).then((response) => {
            if (response.status === 401) {
                this.handleUnauthorized();
            }
            return response;
        })

        let result = await response.json();

        this.setState({ fields: result });
    }

    handleInputChange(event, id){
        let data = [...this.state.data];
        if(!data || !data.length) data = [{}];
        data[0][this.state.fields[id]] = event.target.value;
        this.setState({ data: data });
    }

    async saveData(){
        const props = this.props;
        const state = this.state;
        const body = { "names": state.fields, "values": state.fields.map(f => state.data[0][f]) };
        let response = await fetch(`${props.host}/orm/${props.currentEditEntity}/${props.editId}`, {
            method: "PUT",
            headers: { "Authorization": `Bearer ${props.token}`, "Content-Type": "application/json" },
            body:JSON.stringify(body)
        }).then((response) => {
            if (response.status === 401) {
                this.handleUnauthorized();
            }
            return response;
        })

        let result = await response.json();
        props.handlePageChange(props.prevPage);
    }

    cancel(){
        const props = this.props;
        props.handlePageChange(props.prevPage);
    }

    async loadData() {

        this.getFields();

        const state = this.state;
        const props = this.props;

        let response = await fetch(`${props.host}/orm/${props.currentEditEntity}/${props.editId}`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${props.token}` }
        }).then((response) => {
            if (response.status === 401) {
                this.handleUnauthorized();
            }
            return response;
        })

        let result = await response.json();

        //console.log(result);

        this.setState({ data: result });
    }

    render(){
        return (
            <>
                <h1>{this.props.currentEditEntity}</h1>
                <Container>
                    <Row>
                        <Col><Button variant="outline-primary" onClick={this.saveData}>Сохранить</Button></Col>
                        <Col><Button variant="outline-danger" onClick={this.cancel}>Отмена</Button></Col>
                    </Row>
                    <Row>
                    {
                        this.state.fields.map((field, i)=>{
                            return(
                                <Col xs={12} md={6} lg={4} key={i}>
                                    <Form.Group>
                                        <Form.Label>
                                            <strong>{field}</strong>
                                        </Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            value={this.state.data.length ? this.state.data[0][field] || "" : ""}
                                            onChange={(event)=>this.handleInputChange.call(this, event, i)}
                                        />
                                    </Form.Group>
                                </Col>
                            );
                        })
                    }
                    </Row>
                </Container>
            </>
        )
    }
}