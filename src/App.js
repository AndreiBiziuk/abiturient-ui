import React from 'react';
import './App.css';
import MainMenu from './component/MainMenu'
import PageBody from './component/PageBody'

class App extends React.Component {
  constructor(props){
    super(props);
    this.props = props;
    this.state = {
      page:'home',
      //host:'http://localhost:3000',
      host: 'http://35.228.127.63:3000',
      token:""
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleTokenChange = this.handleTokenChange.bind(this);
    this.saveToStorage = this.saveToStorage.bind(this);
    this.handleEditIdChange = this.handleEditIdChange.bind(this);
    this.handleCurrentEntityChange = this.handleCurrentEntityChange.bind(this);
  }

  componentDidMount() {
    this.loadFromStorage();
  }

  loadFromStorage(){
    if(localStorage.getItem("appState")){
      this.setState(JSON.parse(localStorage.getItem("appState")));
    }
  }

  saveToStorage(){
    localStorage.setItem("appState", JSON.stringify(this.state));
  }

  handleEditIdChange(id){
    this.setState({ editId: id }, this.saveToStorage);
  }

  handleCurrentEntityChange(entity){
    this.setState({ currentEntity: entity }, this.saveToStorage);
  }

  handlePageChange(page){
    if(this.state.token){
      this.setState({page:page}, this.saveToStorage);
    }else{
      this.setState({ page: "login" }, this.saveToStorage);
    }
  }

  handleTokenChange(token){
    this.setState({ token: token }, this.saveToStorage);
  }

  render(){
    return (
      <div className="App">
        <MainMenu 
          page={this.state.page}
          handlePageChange={this.handlePageChange}
          host={this.state.host} />
        <PageBody
          page={this.state.page}
          host={this.state.host}
          token={this.state.token}
          handleTokenChange={this.handleTokenChange}
          handleEditIdChange={this.handleEditIdChange}
          handlePageChange={this.handlePageChange}
          handleCurrentEntityChange={this.handleCurrentEntityChange}
        >
        </PageBody>
      </div>
    );
  }
}

export default App;
