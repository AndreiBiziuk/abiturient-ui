import React from "react";
import Form from "react-bootstrap/Form";

export default class Combo extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = { filter: "", fields: [], data: [], dataList: [] };

    this.loadData = this.loadData.bind(this);
    this.getFields = this.getFields.bind(this);
    this.updateDataList = this.updateDataList.bind(this);

    this.loadData();
  }

  handleUnauthorized() {
    this.props.handleTokenChange("");
    this.props.handlePageChange("login");
  }

  updateDataList() {
    const dataList = [];
    const props = this.props;
    const state = this.state;
    this.state.data.forEach(row => {
      //console.log(row);
      dataList.push({
        value: row[state.fields[props.filterCol - 1]],
        text: row[state.fields[props.displayCol]]
      });
    });
    this.setState({ dataList: [...dataList] });
  }

  async getFields() {
    const props = this.props;
    let response = await fetch(`${props.host}/orm/${props.entity}/fields`, {
      method: "GET",
      headers: { Authorization: `Bearer ${props.token}` }
    }).then(response => {
      if (response.status === 401) {
        this.handleUnauthorized();
      }
      return response;
    });

    let result = await response.json();

    this.setState({ fields: result }, this.updateDataList);
  }

  async loadData() {
    const state = this.state;
    const props = this.props;
    let response = await fetch(
      `${props.host}/orm/${props.entity}/page/0/${props.maxItems}/${props.sortCol}/${state.filter}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${props.token}` }
      }
    ).then(response => {
      if (response.status === 401) {
        this.handleUnauthorized();
      }
      return response;
    });

    let result = await response.json();

    this.setState({ data: result }, this.getFields);
  }

  handleValueChange(event) {
    const value = btoa(encodeURIComponent(event.currentTarget.value));
    this.setState(
      { filter: `${this.props.filterCol},${value}` },
      this.loadData
    );
  }

  render() {
    return (
      <>
        <Form.Group>
          <Form.Label>{this.props.label}</Form.Label>
          <Form.Control
            type="text"
            list={`${this.props.id}_dataset`}
            id={this.props.id}
            onChange={this.handleValueChange.bind(this)}
            autoComplete="off"
            style={{}}
          />
          <datalist id={`${this.props.id}_dataset`}>
            {this.state.dataList.map((row, i) => {
              //console.log(row);
              return (
                <option key={i} index={i} value={row.value} style={{}}>
                  {row.text}
                </option>
              );
            })}
          </datalist>
        </Form.Group>
      </>
    );
  }
}
