import React, { useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router";
import { Navbar } from "./components";
import { AuthenticateUser, CreatePost, HomePage, ShowPost } from "./containers";
// import DevTest from "./dev_test";

const App = () => {
  const [user, setUser] = useState({});
  const history = useHistory();

  return (
    <div className="App">
      <Navbar user={user.name}
        setUser={() => 'name' in user ? setUser({}) : history.push('/authUser')}
      />
      {/* <DevTest /> */}
      <Switch>
        <Route exact path='/' render={() => <HomePage user={'name' in user ? user.name : null} />} />
        <Route exact path='/viewPost/:id' render={props => <ShowPost id={props.match.params.id} />} />
        <Route exact path='/authUser' render={() => <AuthenticateUser setUser={setUser} />} />
        {
          !user.name ?
            <AuthenticateUser setUser={setUser} /> :
            null
        }
        <Route exact path='/createPost' render={() => <CreatePost user={user.name} setUser={setUser} />} />
        <Redirect to='/' />
      </Switch>
    </div>
  );
}

export default App;
