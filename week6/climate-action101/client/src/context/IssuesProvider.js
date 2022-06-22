import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { UserContext } from './UserProvider';

export const IssueContext = React.createContext()

export default function IssueProvider(props) {

    const initState = {
         issues: []
        }
    const { token } = useContext(UserContext)
    const [issueState, setIssueState] = useState(initState)

    const userAxios = axios.create()
    userAxios.interceptors.request.use(config => {
        const token = localStorage.getItem('token')
        config.headers.Authorization = `Bearer ${token}`
        return config
    })
    // const axiosInstance = axios.create({
    //     baseURL: '/issues/',
    //     headers: {'Authorization': `Bearer ${token}`}
    // });


    // function to add an issue

    function addIssue(newIssue){
        // const userAxios = axios.create()
        userAxios.post('/api/issues', newIssue) //issue or issues, check first if error
        .then(res => 
            //console.log(res)
            setIssueState(prevState => ({
                ...prevState,
                issues: [...prevState.issues, res.data]
            })))
        .catch(err => console.log(err.response.data.errMsg))
    }

    // function to get all USER issues

    function getUserIssues(){
        userAxios.get('/api/issues/user')
        .then(res => {
           // console.log(res.data)
            setIssueState(prevState => ({
                ...prevState,
                issues: res.data
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }
    
    // function to upvote issue -- remember to set up in backend


    // function to downvote issue -- remember to set up in backend


    
    // function to get all issues

    // function getAllIssues(){
    //     userAxios.get('/api/issues')
    //     .then(res => {
    //         console.log(res.data)
    //         setIssueState(prevState => ({
    //             ...prevState,
    //             issues: res.data
    //         }))
    //     })
    //     .catch(err => console.log(err.response.data.errMsg))
    // }

    
useEffect(() => {
    if(token){
        getUserIssues()
    }
}, [])
    
    return (
        <IssueContext.Provider value ={ {
             ...issueState, 
             addIssue
             } }>
            { props.children }
        </IssueContext.Provider>
    )
}