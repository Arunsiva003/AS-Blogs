import React, { useContext } from "react"
import { Footer } from "./components/footer/Footer"
import { Header } from "./components/header/Header"
import { Home } from "./pages/home/Home"
import { Login } from "./pages/login/Login"
import { Regsiter } from "./pages/login/Regsiter"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { DetailsPages } from "./pages/details/DetailsPages"
import { Account } from "./pages/account/Account"
import { Create } from "./components/create/Create"
import { Context } from "./context/Context"
import { Contact } from "./pages/contact/Contact"
import {Quiz} from "./pages/Quiz/Quiz";
import { XoGame } from "./pages/Xo-Game/Xo-Game"
const App = () => {
  //after login
  const { user } = useContext(Context)
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Regsiter} />
          <Route exact path='/post/:id' component={DetailsPages} />
          <Route exact path='/account' component={Account} />
          <Route exact path='/create' component={Create} />
          <Route exact path='/contact' component={Contact} />
          <Route exact path='/quiz' component={Quiz} />
          <Route exact path='/bubbleshooter' component={XoGame} />


        </Switch>
        <Footer />
      </Router>
    </>
  )
}
export default App
