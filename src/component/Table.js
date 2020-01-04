import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Table from "react-bootstrap/Table"

export default class TableFiltered extends React.Component {
  constructor(props){
    super(props);
    this.props = props;
    this.state = {sort:1, filter:"", page:0, pagesize:10, data:[]};
    this.loadData();
  }

  async loadData(){
    const state = this.state;
    const props = this.props;
    let response = await fetch(`${props.host}/orm/${props.entity}/page/${state.page}/${state.pagesize}/${state.sort}/${state.filter}`, {
      method: "GET",
      headers: { "Authorization": `Bearer ${props.token}` }
    });

    let result = await response.json();

    //console.log(result);

    this.setState({data:result});
  }

  render(){
    let colNames = [];
    if (this.state.data.length) {
      colNames = Object.keys(colNames = this.state.data[0])
    }

    return(
      <Container>
        <Table striped bordered hover size="sm" responsive>
          <thead>
            <tr>
              {
                colNames.map(function(name, i){
                return <th key={i}>{name}</th>
                })
              }
            </tr>
          </thead>
          <tbody>
            {
              this.state.data.map(
                function(row, i){
                  return (
                  <tr key={i}>
                    {
                      colNames.map(
                        function(name,i){
                          return <td key={i}>{row[name]}</td>
                        }
                      )
                    }
                  </tr>
                  )
                }
              )
            }
          </tbody>
        </Table>
      </Container>
    );
  }
}