import { Link } from 'react-router-dom'
import React, { useContext } from 'react'
import { UserContext } from '../context/UserProvider';

export default function Navbar(props){
    const { logout, token } = useContext(UserContext)
    // console.log(token)

    // if condition is going wrong check condition, such as token
    // what is being passed as token? console log 
    
    return(
        <div className='navbar'>
            
            { token && <Link to='/profile'>Profile</Link> }
            <Link to='/public'>Public</Link>
            { token && <button onClick={logout}>Logout</button> }
        </div>
    )
}