import React from "react"
import { useNavigate, Link, useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../App";

const Edit = ()=>{
    const {id} = useParams()
    const navigate = useNavigate();

    const [inputs,setInputs] = useState({name:"",email:"",phone:"",small_note:""})
    const [error,setError] = useState(null);

    const handleChange = (event)=>{
        setInputs({...inputs,[event.target.name]:event.target.value})
    }

    const handleFormsubmit = (event)=>{
        event.preventDefault();

        let data = {name:inputs.name, email:inputs.email, phone:inputs.phone, small_note:inputs.small_note}
        axios.put(BASE_URL+'/api/contacts/'+id,data).then(()=>{
            navigate('/')
        }).catch(()=>{
            setError('Unable to update contacts. Please check the database connection.')
        })
    }


    const getEditContacts  = ()=>{
        axios.get(BASE_URL+'/api/contacts/'+id+'/edit')
        .then((response)=>response.data)
        .then((response_data)=>{
            let post = response_data.data;
            setInputs({name:post.name, email:post.email, phone:post.phone, small_note:post.small_note})
        })
    }
    useEffect(()=>{
        getEditContacts();
    },[])


    return (<div className="container">
                <h3>Edit Contacts</h3>
                <Link to='/'>Back</Link>
                <form action="" onSubmit={handleFormsubmit}>
                    <div className="form-group">
                        <label htmlFor="">Name</label>
                        <input className="form-control" type="text" onChange={handleChange} name="name" value={inputs.name} id="" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Email</label>
                        <input className="form-control" type="text" onChange={handleChange} name="email" value={inputs.email} id="" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Phone Number</label>
                        <input className="form-control" type="text" onChange={handleChange} name="phone" value={inputs.phone} id="" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Small Notes</label>
                        <textarea className="form-control" onChange={handleChange} name="small_note" value={inputs.small_note} id=""rows="5"></textarea>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-success mt-2">Save</button>
                        {error?(<p className="text-danger mt-2">{error}</p>):''}
                    </div>
                </form>
            </div>)

}

export default Edit;
