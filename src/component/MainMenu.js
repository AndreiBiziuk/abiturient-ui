import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

export default class MainMenu extends React.Component{
    constructor(props){
        super(props);
        this.props = props;
        this.handleHomeLink = this.handleHomeLink.bind(this);
        this.handleMenuSelect = this.handleMenuSelect.bind(this);
    }

    handleHomeLink(){
        this.props.handlePageChange('home');
    }

    handleMenuSelect(eventKey){
        this.props.handlePageChange(eventKey);
    }

    render(){
        return (<Navbar bg="dark" variant="dark">
            <Navbar.Brand>
                Регистрация<br />Абитуриентов
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto" onSelect={this.handleMenuSelect}>
                    <Nav.Link eventKey="home">
                        Домой
                    </Nav.Link>
                    <Nav.Link eventKey="login">
                        Вход
                    </Nav.Link>
                    <Nav.Link eventKey="abiturs">
                        Абитуриенты
                    </Nav.Link>
                    <NavDropdown title="Справочники" id="basic-nav-dropdown">
                        <NavDropdown.Item eventKey="specs">
                            Специальности
                        </NavDropdown.Item>
                        <NavDropdown.Item eventKey="groups">
                            Группы
                            </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item eventKey="users">
                            Пользователи
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>                
            </Navbar.Collapse>
        </Navbar>);
    }    
}
