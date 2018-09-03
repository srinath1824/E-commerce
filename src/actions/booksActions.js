"use strict"
import axios from 'axios';

//GET A BOOK
export function getBooks(book){
    return function(dispatch){
        axios.get("/books")
            .then(function(response){
                dispatch({type: "GET_BOOKS",payload:response.data})
            })
            .catch(function(err){
                dispatch({type:"GET_BOOKS_REJECTED",payload: err})
            })
    }
}

// return {
//     type: "GET_BOOKS", 
//     payload: book
// }
//POST A BOOK
export function postBooks(book){
    return function(dispatch){
        axios.post("/books", book)
            .then(function(response){
                dispatch({type:"POST_BOOK", payload: response.data})
            })
            .catch(function(err){
                dispatch({type:"POST_BOOK_REJECTED", payload:"there was an error while posting a new book"})
            })
    }
    // return {
    //     type: "POST_BOOK", 
    //     payload: book
    // }
}

// return {
//     type: "DELETE_BOOK", 
//     payload: id
// }
//DELETE A BOOK
export function deleteBooks(id){
    return function(dispatch){
        axios.delete("/books/"+ id)
            .then(function(response){
                dispatch({type:"DELETE_BOOK",payload:id})
            })
            .catch(function(err){
                dispatch({type: "DELETE_BOOK_REJECTED", payload: err})
            })
    }
}
//UPDATE A BOOK
export function updateBooks(book){
    return {
        type: "UPDATE_BOOK", 
        payload: book
    }
}