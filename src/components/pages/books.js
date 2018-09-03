"use strict"
import React from 'react';
import {FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';

class Books extends React.Component{
    render(){
        return(
            <div>
                <FormGroup controlId="formInlineName">
                    <ControlLabel>Name</ControlLabel>{' '}
                    <FormControl type="text" placeholder="Jane Doe" />
                </FormGroup>{' '}
                <FormGroup controlId="formInlineEmail">
                    <ControlLabel>Email</ControlLabel>{' '}
                    <FormControl type="email" placeholder="jane.doe@example.com" />
                </FormGroup>{' '}
                <Button type="submit">Send invitation</Button>
            </div>
        );
    }
}

export default Books;