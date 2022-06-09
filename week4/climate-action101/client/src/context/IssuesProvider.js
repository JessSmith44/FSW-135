import React, { useState, useContext } from 'react'
import axios from 'axios'
import { UserContext } from './UserProvider';

export const IssueContext = React.createContext()

export default function IssueProvider(props) {

    const initState = {
         issues: []
        }
    const { token } = useContext(UserContext)
    const [issueState, setIssueState] = useState(initState)


    const axiosInstance = axios.create({
        baseURL: '/issues/',
        headers: {'Authorization': token}
    });

    // function to add an issue
    // function to get all USER issues
    
    // function to upvote issue -- remember to set up in backend
    // function to downvote issue -- remember to set up in backend
    // function to delete an issue -- optional
    
    // function to get all issues
    

    
    return (
        <IssueContext.Provider value ={ {
             ...issueState,
             } }>
            { props.children }
        </IssueContext.Provider>
    )
}