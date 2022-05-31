import React from 'react'
import { useEffect,useState } from 'react'
import api from "../api/config"
import {FaTrashAlt} from 'react-icons/fa'
import { ToastContainer, Toast, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const ListBook = () => {
        const [bookList, setBookList ] = useState([]);
        useEffect (()=> {
        async function getBooks(){
            
        const response = await api.get("/book");
        console.log(response.data);
        if(response.data){
            setBookList(response.data);
        }
        }
        getBooks();
    }, []);

    const deleteBook = async (id, idx) => {
        const data = window.confirm("Are you sure you want to delete this book?");
        if(data){
            try{
                const response = await api.delete(`/book/delete/${id}`);
                console.log(response);
                if(response.data.success) {
                    const newBookList = bookList.filter((book, idx) =>book.id!==idx)
                    setBookList(newBookList);
                    // console.log("Book Deleted !");
                    toast.success("Book Deleted !");
                }
                else{
                    // console.log("Unable to delete book."); 
                    toast.error("Unable to delete book.");
                   
                }
        }
        catch(error){
            console.log(error.message);
            toast.error(error.message); 
        }
    }
    }

    return (
        <center>
            <ToastContainer />
            {bookList.length > 0 ?
            bookList.map((book,index) => {
                return <div key={index} style={{

                    boxShadow:"0px 0px 5px #ccc", 
                    padding: "10px", 
                    margin:"10px", 
                    color:"green",
                    width: "45%",
                    textAlign:"start",
                    display: "flex",
                    justifyContent: "space-between",
                
                }}>{book.name}
                <FaTrashAlt 
                  color='red' 
                  style={{cursor: "pointer"}} 
                  onClick={()=> deleteBook(book.id, index)}
                />
                </div>;
            }): "No Books"}
        </center>
    )
        }
