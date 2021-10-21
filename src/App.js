import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router";
import { AuthenticateUser, CreatePost, HomePage, ShowPost } from "./containers";
// import DevTest from "./dev_test";

const App = () => {
  const [user, setUser] = useState({});

  return (
    <div className="App">
      {/* <DevTest /> */}
      <Switch>
        <Route exact path='/' render={() => <HomePage user={'name' in user ? user.name : null} />} />
        <Route exact path='/viewPost/:id' render={props => <ShowPost id={props.match.params.id} />} />
        {
          !user.name ?
            <AuthenticateUser setUser={setUser} /> :
            null
        }
        <Route exact path='/createPost' render={() => <CreatePost user={user.name} />} />
        <Redirect to='/' />
      </Switch>
    </div>
  );
}

export default App;
