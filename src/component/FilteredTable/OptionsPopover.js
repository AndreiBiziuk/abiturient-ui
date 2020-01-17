import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
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
        this.handleClear = this.handleClear.bind(this);

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

    handleClear(event){

        function setNativeValue(element, value) {
            const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
            const prototype = Object.getPrototypeOf(element);
            const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;

            if (valueSetter && valueSetter !== prototypeValueSetter) {
                prototypeValueSetter.call(element, value);
            } else {
                valueSetter.call(element, value);
            }
        }

        setNativeValue(this.filterInput.current,"");
        this.filterInput.current.dispatchEvent(new Event('input', { 'bubbles': true }));
    }

    render() {
        const popover = (
            <UpdatingPopover id="popover-basic">
                <Popover.Title as="h3">Фильтр и сортировка</Popover.Title>
                <Popover.Content>
                    <InputGroup>
                        <Form.Control
                            ref={this.filterInput}
                            size="sm"
                            type="text"
                            placeholder="Фильтр"
                            data-index={this.props.num}
                            onChange={this.props.handleFilterChange}
                            value={this.props.filter}
                        />
                        <InputGroup.Append>
                            <Button variant="outline-danger" style={{ minWidth: "2rem", padding: "0px" }} onClick={this.handleClear}>✘</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    <InputGroup className="mt-2">
                        <Button variant="outline-primary" className="mr-1" style={{ minWidth: "2rem", padding: "0px" }} size="lg" active={this.props.sort === 1} title="По возрастанию" onClick={() => this.props.handleSortChange(this.props.num, 1)}>⤋</Button>
                        <Button variant="outline-primary" className="mr-1" style={{ minWidth: "2rem", padding: "0px" }} size="lg" active={this.props.sort === -1} title="По убыванию" onClick={() => this.props.handleSortChange(this.props.num, -1)}>⤊</Button>
                        <Button variant="outline-primary" className="mr-1" style={{ minWidth: "2rem", padding: "0px" }} size="lg" active={this.props.sort === 0} title="Без сортировки" onClick={() => this.props.handleSortChange(this.props.num, 0)}>⇋</Button>
                    </InputGroup>
                </Popover.Content>
            </UpdatingPopover>
        );

        return (
            <>
                <Button ref={this.ref} title="Фильтр и сортировка" variant="light" size="sm" active={this.props.filter || this.props.sort} onClick={this.handleClick}>🔧</Button>
                <Overlay
                    popperConfig={{ modifiers: { hide: { enabled: false}, preventOverflow: { enabled: false } } }}
                    target={this.state.target}
                    placement="bottom"
                    rootClose={true}
                    onEntering={this.handleShow}
                    onHide={this.handleHide}
                    show={this.state.show}
                >
                    {popover}
                </Overlay>
            </>
        );
    }
}