import React, { useState } from 'react'
import axios from 'axios'
export const UserContext = React.createContext()


export default function UserProvider(props) {
    const initState = {
         user: JSON.parse(localStorage.getItem("user")) || {},
         token: localStorage.getItem("token") || "", 
         issues: [],
         errMsg: ''
        }
    const [userState, setUserState] = useState(initState)

    function handleAuthErr(errMsg){
        setUserState(prevState => ({
            ...prevState,
            errMsg
        }))
    }

    function resetAuthErr(){
        setUserState(prevState => ({
            ...prevState,
            errMsg: ''
        }))
    }

    function signup(credentials) {
        console.log("testing")
        axios.post('/auth/signup', credentials)
        .then (res => {
            console.log(res)
            localStorage.setItem("user",JSON.stringify(res.data.user))
            localStorage.setItem("token",res.data.token)
            setUserState(prevState=>({
               ...prevState,
               token: res.data.token,
               user: res.data.user 
            }))
        })
        .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    function login(credentials){
        // console.log(credentials)
        axios.post('/auth/login', credentials)
        .then(res => {
            // console.log(res)
            localStorage.setItem("user",JSON.stringify(res.data.user))
            localStorage.setItem("token",res.data.token)
            setUserState(prevState=>({
               ...prevState,
               token: res.data.token,
               user: res.data.user 
            }))
            })
        // getUserIssues()
        .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    function logout (){
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        setUserState({
            user:  {},
            token: "", 
            issues: []
        })
    }
    return (
        <UserContext.Provider value ={ {
             ...userState, signup, login, logout, resetAuthErr 
             } }>
            { props.children }
        </UserContext.Provider>
    )
}