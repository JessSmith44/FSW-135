import React, { useEffect, useState } from 'react'
// import IssueList from './IssueList.js'
import Issue from './Issue.js'
import axios from 'axios'

export default function Public(){
    const [issues, setIssues] = useState([])
    useEffect(() => {
        axios.get('/public').then(res => {
            setIssues(res.data)
        })
    }, [])
    
    return(
        <div className='pulic'>
         {issues.map(issue =>{
            return(
                <Issue {...issue} key={issue._id}/>
            )
         })}
        </div>
    )
}