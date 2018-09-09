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
          <Route exact path='/users' render={()=><Users users={users} />} />
          <Route path='/managers' render={()=><Managers managers={managers}/>} />
          <Route path='/users/create' render={()=><CreateUser />} />
          <Route path='/users/update' render={()=><UpdateUser />} />
        </div>
      </div>
    )
  }
}