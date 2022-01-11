import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.css';
import { Route, Router, Switch } from 'react-router-dom'
import { useStore, Ctx, Store } from './store/use-store';
import { history } from './utils/history'
import { observer } from "mobx-react-lite"
import { Home } from './pages/home';
import { Login } from './pages/login';

const App = observer(() => {
  const store = useStore()
  
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