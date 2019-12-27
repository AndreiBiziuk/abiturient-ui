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
  }

  handlePageChange(page){
    if(this.state.token){
      this.setState({page:page});
    }else{
      this.setState({ page: "login" });
    }
  }

  handleTokenChange(token){
    this.setState({ token: token });
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
          handleTokenChange={this.handleTokenChange}
          handlePageChange={this.handlePageChange} >
        </PageBody>
      </div>
    );
  }
}

export default App;
