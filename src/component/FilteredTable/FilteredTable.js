import React from "react";
import Container from "react-bootstrap/Container"
import Table from "react-bootstrap/Table"
import Paginate from "./Pagination"
import TableHeader from "./TableHeader"

export default class FilteredTable extends React.Component {
  constructor(props){
    super(props);
    this.props = props;
    this.state = {sort:"0", filter:"", page:0, pagecount:1, pagesize:10, data:[], fields:[], currentFilter:0};
    this.loadData = this.loadData.bind(this);
    this.getPageCount = this.getPageCount.bind(this);
    this.getFields = this.getFields.bind(this);
    this.handleTablePageChange = this.handleTablePageChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);

    this.getFields();
    this.loadData();
  }

  async getPageCount(){
    const state = this.state;
    const props = this.props;
    let response = await fetch(`${props.host}/orm/${props.entity}/count/${state.filter}`, {
      method: "GET",
      headers: { "Authorization": `Bearer ${props.token}` }
    }).then((response) => {
      if (response.status === 401) {
        this.props.handleUnauthorized();
      }
      return response;
    })

    let result = await response.json();
    const pagecount = Math.ceil(result.linescount / this.state.pagesize);

    this.setState({ pagecount: pagecount, page: this.state.page >= pagecount ? pagecount - 1 : this.state.page });
  }

  async getFields(){
    const props = this.props;
    let response = await fetch(`${props.host}/orm/${props.entity}/fields`, {
      method: "GET",
      headers: { "Authorization": `Bearer ${props.token}` }
    }).then((response) => {
      if (response.status === 401) {
        this.props.handleUnauthorized();
      }
      return response;
    })

    let result = await response.json();

    this.setState({ fields: result });
  }

  async loadData(){

    this.getPageCount();    

    const state = this.state;
    const props = this.props;
    let response = await fetch(`${props.host}/orm/${props.entity}/page/${state.page}/${state.pagesize}/${state.sort}/${state.filter}`, {
      method: "GET",
      headers: { "Authorization": `Bearer ${props.token}` }
    }).then((response)=>{
      if(response.status === 401){
        this.props.handleUnauthorized();
      }
      return response;
    })

    let result = await response.json();

    this.setState({data:result});
  }

  handleTablePageChange(page){
    this.setState({page:page}, this.loadData);
  }

  handleSortChange(field, sort){
    let srt = this.state.sort.split(",")
      .filter(s => Math.abs(s) !== field);

    srt.push(field * sort);

    srt = srt.filter(s => s*1 !== 0);

    if(!srt.length){
      srt.push(0);
    }

    this.setState({ sort: srt.join(',') }, this.loadData);

    //console.log(field, " ", sort, " ", srt);
  }

  handleFilterChange(event){
    let key = event.currentTarget.dataset.index;
    let value = btoa(encodeURIComponent(event.currentTarget.value));
    let found = false;

    //console.log(this.state.filter.split(';'));

    let filter = this.state.filter.split(';').filter(f=>f).map(f => f.split(',')).map(f => f[0] === key ? (f[1]=value, found = true, f) : f);
    if(!found){
      filter.push([key, value]);
    }

    //console.log(filter);

    filter = filter.map(f=>f.join(",")).join(";");

    //console.log(filter);
    
    this.setState({filter:filter, currentFilter:key},this.loadData);
  }

  render(){

    return(
      <Container>
        <Table striped bordered responsive hover size="sm">
          <TableHeader
            fields={this.state.fields}
            handleFilterChange={this.handleFilterChange}
            handleSortChange={this.handleSortChange}
            filter={this.state.filter}
            sort={this.state.sort}
            currentFilter={this.state.currentFilter}
          />
          <tbody>
            {
              this.state.data.map(
                (row, i)=>{
                  return (
                  <tr key={i}>
                    {
                        this.state.fields.map(
                        (name,i)=>{
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
        <Container>
          <Paginate 
            pagecount={this.state.pagecount}
            currentpage={this.state.page} 
            maxpages={this.state.pagesize}
            handleTablePageChange={this.handleTablePageChange}
          />
        </Container>
      </Container>
    );
  }
}