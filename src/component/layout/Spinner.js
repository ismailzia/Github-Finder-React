import React from 'react'
import spinner from './spinner.gif'

const Spinner = ()  =>{
    return (
        <div>
            <img src={spinner} alt='loading...' style={userStyle} />
        </div>
    )
}
const userStyle ={
   width : '150px',
   display: 'block',
   margin:'auto'
}

export default Spinner
