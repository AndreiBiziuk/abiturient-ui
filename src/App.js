import React from "react";
import "./App.css";
import "./component/Datetime.css";
import MainMenu from "./component/MainMenu";
import PageBody from "./component/PageBody";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      page: "home",
      host: "https://localhost:3000",
      //host: 'http://35.228.127.63:3000',
      token: ""
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleTokenChange = this.handleTokenChange.bind(this);
    this.saveToStorage = this.saveToStorage.bind(this);
    this.handleEditIdChange = this.handleEditIdChange.bind(this);
    this.handleCurrentEditEntityChange = this.handleCurrentEditEntityChange.bind(
      this
    );
  }

  componentDidMount() {
    this.loadFromStorage();
  }

  loadFromStorage() {
    if (localStorage.getItem("appState")) {
      this.setState(JSON.parse(localStorage.getItem("appState")));
    }
  }

  saveToStorage() {
    localStorage.setItem("appState", JSON.stringify(this.state));
  }

  handleEditIdChange(id) {
    this.setState({ editId: id }, this.saveToStorage);
  }

  handleCurrentEditEntityChange(entity) {
    this.setState({ currentEditEntity: entity }, this.saveToStorage);
  }

  handlePageChange(page) {
    if (this.state.token) {
      this.setState(
        { prevPage: this.state.page, page: page },
        this.saveToStorage
      );
    } else {
      this.setState({ page: "login" }, this.saveToStorage);
    }
  }

  handleTokenChange(token) {
    this.setState({ token: token }, this.saveToStorage);
  }

  render() {
    return (
      <div className="App">
        <MainMenu
          page={this.state.page}
          prevPage={this.state.prevPage}
          handlePageChange={this.handlePageChange}
          host={this.state.host}
        />
        <PageBody
          page={this.state.page}
          prevPage={this.state.prevPage}
          host={this.state.host}
          token={this.state.token}
          editId={this.state.editId}
          currentEditEntity={this.state.currentEditEntity}
          handleTokenChange={this.handleTokenChange}
          handleEditIdChange={this.handleEditIdChange}
          handlePageChange={this.handlePageChange}
          handleCurrentEditEntityChange={this.handleCurrentEditEntityChange}
        ></PageBody>
      </div>
    );
  }
}

export default App;
