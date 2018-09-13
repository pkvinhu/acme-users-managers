import React, {Component, Fragment} from 'react'

export default class Managers extends Component {
  constructor(props){
  	super(props)
  	this.state = {}
  }

  componentDidMount(){
    this.props.allManagers()
  }

  render() {
    const {managers} = this.props
  	return (
  	  <div>
  	    <h1>All Managers</h1>
  	    <hr />
        {managers.map(manager=>{
          return (
            <div className='container' key={manager.id}>
            <div style={{display: 'flex', flex: '3'}} className='col-3'>
            <img src={manager.img}/>
            <h2>{manager.name}</h2>
            </div>
            </div>
          )
        })}
  	  </div>
  	)
  }
}