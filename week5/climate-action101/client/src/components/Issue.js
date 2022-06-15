import React from 'react'

export default function Issue(props){
    const { title, description, imgUrl, _id } = props
    return(
        <div className='issue'>
            <h1 className='h1Title'> { title } </h1>
            <h3 className='desc'> { description } </h3>
            <img src={imgUrl} alt={imgUrl} width={300}/>
        </div>
    )
}