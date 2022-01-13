import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.css';
import { Route, Router, Switch } from 'react-router-dom'
import { useStore, Ctx, Store } from './store/use-store';
import { history } from './utils/history'
import { observer } from "mobx-react-lite"
import { Home } from './pages/home';
import { Login } from './pages/login';
import { api } from './utils/api';

const App = observer(() => {
  const store = useStore()

  useEffect(() => {
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    if(user && token){
      const userObj = JSON.parse(user)
      store.setLogin(true)
      api.getContacts(userObj.id, token)
    }else{
      store.setLogin(false)
    }
  },[store.login])
  
  return (
    <Ctx.Provider value={Store}>
      <Router history={history}>
        {!store.login ? <Login /> : 
        <Switch>
          <Route exact path='/' component={Home} />
        </Switch>}
      </Router>
    </Ctx.Provider>
  )
})

ReactDOM.render(<App />, document.getElementById('root'));