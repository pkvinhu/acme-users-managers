import React from 'react'
import ReactDOM, {render} from 'react-dom'
import Home from './components/Home'
import {HashRouter} from 'react-router-dom'

function App (){
  	return (
  	<div>
  	  <HashRouter>
  	    <Home />
  	  </HashRouter>
  	</div>
  	)
}

render(<App />, document.getElementById('app'))