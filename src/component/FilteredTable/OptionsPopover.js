import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Overlay from 'react-bootstrap/Overlay'
import Popover from 'react-bootstrap/Popover'

const UpdatingPopover = React.forwardRef(
    ({ scheduleUpdate, children, ...props }, ref) => {
        useEffect(() => {
            //console.log('updating!');
            scheduleUpdate();
        }, [children, scheduleUpdate]);
        return (
            <Popover ref={ref} {...props}>
                {children}
            </Popover>
        );
    },
);

export default class OptionsPopover extends React.Component {
    constructor(props) {
        super(props);
        this.state = {show:false, target:null};
        this.setShow = this.setShow.bind(this);
        this.setTarget = this.setTarget.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);

        this.ref = React.createRef();
        this.filterInput = React.createRef();

    }

    setShow(show){
        this.setState({show:show});
    }

    setTarget(target){
        this.setState({target:target});
    }

    handleClick(event){
        this.setShow(!this.state.show);
        this.setTarget(event.target);
    }

    handleShow(event){
        this.filterInput.current.focus();
    }

    handleHide(event){
        this.setShow(false);
    }

    render() {
        const popover = (
            <UpdatingPopover id="popover-basic">
                <Popover.Title as="h3">Фильтр и сортировка</Popover.Title>
                <Popover.Content>
                    <Form.Control 
                        ref={this.filterInput} 
                        size="sm" 
                        type="text" 
                        placeholder="Фильтр" 
                        data-index={this.props.num} 
                        onChange={this.props.handleFilterChange} 
                        value={this.props.filter}
                    />
                </Popover.Content>
            </UpdatingPopover>
        );

        return (
            <>
                <Button ref={this.ref} variant="light" size="sm" onClick={this.handleClick}>...</Button>
                <Overlay
                    show={this.state.show}
                    target={this.state.target}
                    placement="bottom"
                    rootClose={true}
                    //container={this.ref.current}
                    onEntered={this.handleShow}
                    onHide={this.handleHide}
                >
                    {popover}
                </Overlay>
            </>
        );
    }
}