import React from 'react'

const Button = (props) => {
  return (
    <div>
      <a href="" className={`btn ${props.class}`}>{props.text}</a>
    </div>
  )
}

export default Button
