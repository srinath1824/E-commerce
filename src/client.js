"use strict"

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import BookList from './components/pages/booksList';
import { applyMiddleware,createStore } from 'redux';
import logger from 'redux-logger';
import reducers from './reducers/index';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import Cart from './components/pages/cart';
import BooksForm from './components/pages/booksForm';
import Main from './main';
import BooksList from './components/pages/booksList';
import thunk from 'redux-thunk';
//step 1 create store
const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducers, middleware);

const Routes = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Main}>
                <IndexRoute component={BooksList}/>
                <Route path="/admin" component={BooksForm} />
                <Route path="/cart" component={Cart} />
            </Route>
        </Router>
    </Provider>
)
render(
    Routes , document.getElementById('app')
);

//step 2 create dispatch actions
// store.dispatch(postBooks(
//     [{
//         id: 1,
//         title: 'this is the book title',
//         description: 'this is the book description',
//         price: 33.33
//     },
//     {
//         id: 2,
//         title: 'this is the second book title',
//         description: 'this is the second book description',
//         price: 58
//     }]
// ))

// //DELETE a book

// store.dispatch(deleteBooks(
//     {id: 1}
// ))

// //UPDATE a book
// store.dispatch(updateBooks(
//     {
//         id: 2,
//         title: 'Creating CRUD operations'
//     }
// ))

// //CART ACTIONS
// store.dispatch(addToCart([{id:1}]))