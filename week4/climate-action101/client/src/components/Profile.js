import React, { useContext } from 'react'
import IssueForm from './IssueForm.js'
import IssueList from './IssueList'
import Issue from './Issue'
import { UserContext } from '../context/UserProvider.js'

export default function Profile(){
    const {
        user: {
            username
        },
        // addIssue,
        // issues
    } = useContext(UserContext)
   
    return(
        <div className='profile'>
            <h1>Welcome @{username}!</h1>
            <h3>Add an issue</h3>
            <IssueForm 
                // addIssue={addIssue}
            />
            <h3>Your Issues</h3>
            <IssueList 
                // issues={issues}
            />
        </div>
    )
}