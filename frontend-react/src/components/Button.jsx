import React from 'react'
import {Link} from 'react-router-dom'

const Button = (props) => {
  return (
    <div>
      <Link to={props.url} className={`btn ${props.class}`}>{props.text}</Link>
    </div>
  )
}

export default Button
