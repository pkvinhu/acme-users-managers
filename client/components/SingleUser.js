import React, {Component} from 'react'
import {Link} from 'react-router-dom'


export default function SingleUser({user, deleteUser}){
  const manager = user.manager ? user.manager : ''
  return (
  	<div>
  	  <Link to='/users/update/${user.id}'>{user.name}</Link>
  	    {manager !== '' &&
  	    	<strong>Managed by {manager.name}</strong>}
  	  <button onClick={()=>deleteUser(user)}>remove user</button>
  	</div>
  )
}