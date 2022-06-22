import React, { useState, useContext } from 'react'
import { IssueContext } from './../context/IssuesProvider';

const initInputs = {
    title: '',
    description: '',
    imgUrl:''
}

export default function IssueForm(props){
    const [inputs, setInputs] = useState(initInputs)
    // const { addIssue } = props
    const { addIssue } = useContext(IssueContext)

    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSubmit(e){
        e.preventDefault()
        // console.log(addIssue)
        addIssue(inputs)
        setInputs(initInputs)
    }

    const { title, description, imgUrl } = inputs
    return(
        <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="title" 
        value={title} 
        onChange={handleChange} 
        placeholder="Title"/>
      <input 
        type="text" 
        name="description" 
        value={description} 
        onChange={handleChange} 
        placeholder="Description"/>
      <input 
        type="text" 
        name="imgUrl" 
        value={imgUrl} 
        onChange={handleChange} 
        placeholder="Image Url"/>
      <button>Add Issue</button>
    </form>
    )
}