import React, {Component} from 'react'
import {Link, Route} from 'react-router-dom'
import axios from 'axios'
import Users from './Users'
import Managers from './Managers'
import CreateUser from './CreateUser'
import UpdateUser from './UpdateUser'

export default class Home extends Component {
  constructor(){
  	super()
  	this.state = {
  	  users: [],
  	  managers: []
  	}
  	this.allUsers = this.allUsers.bind(this)
  	this.allManagers = this.allManagers.bind(this)
  }

  allManagers() {
  	axios.get('/api/managers')
  	.then(res=>this.setState({managers:res.data}))
  }

  allUsers() {
  	axios.get('/api/users')
  	.then(res=>this.setState({users:res.data}))
  }

  componentDidMount(){
  	this.allUsers()
  }

  render(){
  	const {users, managers} = this.state
  	const {allUsers, allManagers} = this
    return (
      <div>
        <h1>Acme Users Managers</h1>
        <hr />
        <div style={{justifyContent:'space-around', display:'flex'}}>
          <Link to='/users'>Users</Link>
          <Link to='/managers'>Managers</Link>
          <Link to='/users/create'>Create User</Link>
        </div>
        <div>
          <Route path='/users' render={()=><Users users={users} 
          												allUsers={allUsers}/>} />
          <Route path='/managers' render={()=><Managers managers={managers} 
          												allManagers={allManagers}/>} />
          <Route path='/users/create' render={()=><CreateUser users={users} 
          													  managers={managers} 
          													  allUsers={allUsers} 
          													  allManagers={allManagers}/>} />
          <Route path='/users/update/:id' render={()=><UpdateUser />} />
        </div>
      </div>
    )
  }
}