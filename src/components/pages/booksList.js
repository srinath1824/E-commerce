"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getBooks} from '../../actions/booksActions';
import {Grid, Col, Row, Button} from 'react-bootstrap';
import BookItem from './bookItem';
import BooksForm from './booksForm'; 
import Cart from './cart';
import Books from './books';

class BooksList extends React.Component{
    componentDidMount(){
        //Dispatch an action
        this.props.getBooks(
            [{
                id: 1,
                title: 'This is the book title',
                description: 'this is the book description',
                price: 33.33
            },
            {
                id: 2,
                title: 'This is the second book title',
                description: 'this is the second book description',
                price: 58
            }]
        );
    }
    render(){
        const booksList = this.props.books.map(function(booksArr){
            return(
                <Col xs={12} sm={6} md={4} key={booksArr._id}>
                <BookItem 
                    _id={booksArr._id}
                    title={booksArr.title}
                    description={booksArr.description}
                    price={booksArr.price}
                />
                </Col>
            )
        })
        return(
            <Grid>
                <Row>
                    <Cart />
                </Row>
                <Row style={{marginTop: '15px'}}>
                    <Col xs={12} sm={6}>
                        <BooksForm />
                    </Col>
                    <Col xs={12} sm={6}>
                        {booksList}
                    </Col>
                </Row>
                {/* <Row>
                    <Books />
                </Row> */}
            </Grid>
        )
    }
}
function mapStateToProps(state){
    return{
        books: state.books.books
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getBooks:getBooks
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(BooksList);