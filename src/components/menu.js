"use strict"
import React from 'react';
import {Nav, NavItem,Navbar, Badge} from 'react-bootstrap';

class Menu extends React.Component{
    render(){
        return(
            <Navbar inverse staticTop>
                <Navbar.Header>
                    <Navbar.Brand>
                    <a href="/">React-Bootstrap</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullLeft>
                        <NavItem eventKey={1} href="/about">About</NavItem>
                    </Nav>
                    <Nav bsStyle="pills">
                        <NavItem eventKey={1} href="/contacts">Contact Us</NavItem>
                    </Nav>
                    <Nav bsStyle="pills" pullRight>
                        <NavItem eventKey={1} href="/admin">Admin</NavItem>
                    </Nav>
                    <Nav bsStyle="pills" pullRight>
                        <NavItem eventKey={1} href="/cart">Your Cart
                            { (this.props.cartItemsNumber>0) ?(<Badge className="badge">{this.props.cartItemsNumber}</Badge>): ("")}
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
     );  
}
}
 export default Menu;