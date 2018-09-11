import React from 'react'

export default function Form({user, userName, handleChange, managerName, users}){

  return (
  	<div>
  	<input type='text' 
  	      		 name={userName} 
  	      		 value={user} 
  	      		 onChange={handleChange}></input>
 		  <select onChange={handleChange} name={managerName}>
 		    <option>--none</option>
 		    {users.map(manager=>{
 		      return (
 		        <option key={manager.id}  
 		                value={manager.name}>{manager.name}</option>
 		      )
 		    })}
 		  </select>
 	</div>
  )
}