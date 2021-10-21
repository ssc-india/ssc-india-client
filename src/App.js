import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router";
import { AuthenticateUser, CreatePost, HomePage } from "./containers";
// import DevTest from "./dev_test";

const App = () => {
  const [user, setUser] = useState({});

  return (
    <div className="App">
      {/* <DevTest /> */}
      <Switch>
        {
          !user.name ?
            <AuthenticateUser setUser={setUser} /> :
            null
        }
        <Route exact path='/' component={HomePage} />
        <Route exact path='/createPost' render={() => <CreatePost user={user.name} />} />
        <Redirect to='/' />
      </Switch>
    </div>
  );
}

export default App;
