import React, { useState ,useEffect } from "react"
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../App";

const List = ()=>{

    const [contacts,setContacts] = useState([])

    const loadContacts = ()=>{
        axios.get(BASE_URL+'/api/contacts')
        .then(response => response.data)
        .then((response_data)=>{
            let contacts = response_data.data
            setContacts(contacts)
        })
    }

    useEffect(()=>{
        loadContacts();
    },[])

    const handleDelete = (id)=>{
        axios.delete(BASE_URL+'/api/contacts/'+id)
        .then(()=>{
            loadContacts();
        })
    }

    return  (<div>
                <div align="right">
                    <Link to='/create'  className='btn btn-primary mb-2' >Create</Link>
                </div>

                <table className="table table-striped">
                    <thead>
                        <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Small Note</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           contacts.map((post,index)=>{
                            return (
                            <tr key={index}>
                                <td>{post.id}</td>
                                <td>{post.name}</td>
                                <td>{post.email}</td>
                                <td>{post.phone}</td>
                                <td>{post.small_note}</td>
                                <td><Link to={"edit/"+post.id} className='btn btn-warning' >Edit</Link>{'\u00A0'}{'\u00A0'}<a onClick={()=>handleDelete(post.id)} className='btn btn-danger'>Delete</a></td>
                            </tr>)
                           })
                        }

                    </tbody>
                </table>
            </div>)

}

export default List;
