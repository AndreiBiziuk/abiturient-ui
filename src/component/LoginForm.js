import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

function Message(props){
    let type = "primary";
    let message = "";
    if(props.error){
        type = "danger";
        message = props.error;
    }else if(props.message){
        type = "success";
        message = props.message;
    }

    if(message){
        return (
            <Alert variant={type} className={props.className}>
                {message}
            </Alert>
        );
    }else{
        return "";
    }
}

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.tryLogin = this.tryLogin.bind(this);
        this.loginChange = this.loginChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.state = {login:"", password:"", error:"", message:""};
    }

    loginChange(event){
        this.setState({login: event.target.value});
    }

    passwordChange(event){
        this.setState({password: event.target.value});
    }

    async tryLogin(e){
        e.preventDefault();
        let response = await fetch(`${this.props.host}/auth/login`, {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({username:this.state.login, password:this.state.password})
        });

        let result = await response.json();

        if(result.error){
            this.setState({error:result.error, message:""});
        }else{
            this.setState({message:"Успешно!", error:""});
        }

        if(result.access_token){
            this.props.handleTokenChange(result.access_token);
            this.props.handlePageChange("home");
        }
    }

    render() {
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col lg="6">
                        <Card className="m-4">
                            <Card.Body>
                                <Form>
                                    <Form.Group controlId="formLogin">
                                        <Form.Label>Логин</Form.Label>
                                        <Form.Control type="text" placeholder="Логин" onChange={this.loginChange}/>
                                        <Form.Text className="text-muted">
                                            Введите логин для входа
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group controlId="formPassword">
                                        <Form.Label>Пароль</Form.Label>
                                        <Form.Control type="password" placeholder="Password" onChange={this.passwordChange}/>
                                    </Form.Group>
                                    <Button variant="primary" type="submit" onClick={this.tryLogin}>
                                        Войти
                                    </Button>                
                                    <Message message={this.state.message} error={this.state.error} className="mt-3"/>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}
