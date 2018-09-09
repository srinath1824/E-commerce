"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getBooks} from '../../actions/booksActions';
import {Carousel, Grid, Col, Row, Button} from 'react-bootstrap';
import BookItem from './bookItem';
import BooksForm from './booksForm'; 
import Cart from './cart';

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
                    images={booksArr.images} 
                    price={booksArr.price}
                />
                </Col>
            )
        })
        return(
            <Grid>
                <Row>
                <Carousel>
                    <Carousel.Item>
                        <img width={900} height={500} alt="900x500" src="/carousel/img1.jpg" />
                        <Carousel.Caption>
                        <h3>First slide label</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img width={900} height={500} alt="900x500" src="/carousel/img2.jpg" />
                        <Carousel.Caption>
                        <h3>Second slide label</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img width={900} height={500} alt="900x500" src="/carousel/img3.jpg" />
                        <Carousel.Caption>
                        <h3>Third slide label</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img width={900} height={500} alt="900x500" src="/carousel/img4.jpg" />
                        <Carousel.Caption>
                        <h3>Fourth slide label</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                </Row>
                <Row>
                    <Cart />
                </Row>
                <Row style={{marginTop: '15px'}}>
                    {booksList}
                </Row>
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