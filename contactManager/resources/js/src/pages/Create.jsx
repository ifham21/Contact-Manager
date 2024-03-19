import React from "react";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../App";
import { useNavigate,Link } from "react-router-dom";


const Create = ()=>{

    const navigate = useNavigate();

    const [inputs,setInputs] = useState({name:"",email:"",phone:"",small_note:""})
    const [error,setError] = useState(null);

    const handleChange = (event)=>{
        setInputs({...inputs,[event.target.name]:event.target.value})
    }

    const handleFormsubmit = (event)=>{
        event.preventDefault();

        let data = {name:inputs.name, email:inputs.email, phone:inputs.phone, small_note:inputs.small_note}
        axios.post(BASE_URL+'/api/contacts',data).then(()=>{
            navigate('/')
        }).catch(()=>{
            setError('Unable to create contacts. Please check the database connection.')
        })


    }


    return (<div className="container">
                <h3>Create contacts</h3>
                <Link to='/'>Back</Link>
                <form action="" onSubmit={handleFormsubmit}>
                    <div className="form-group">
                        <label htmlFor="">Name</label>
                        <input className="form-control" type="text" onChange={handleChange} name="name" id="" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Email</label>
                        <input className="form-control" type="text" onChange={handleChange} name="email" id="" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Phone Number</label>
                        <input className="form-control" type="text" onChange={handleChange} name="phone" id="" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Small Notes</label>
                        <textarea className="form-control" onChange={handleChange} name="small_note" id=""rows="5"></textarea>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-success mt-2">Save</button>
                        {error?(<p className="text-danger mt-2">{error}</p>):''}
                    </div>
                </form>
            </div>)

}

export default Create;
