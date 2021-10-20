import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router";
import { AuthenticateUser, BlogUpload } from "./components";
import HomePage from "./container/HomePage";
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
        <Route exact path='/blogUpload' render={() => <BlogUpload user={user.name} />} />
        <Redirect to='/' />
      </Switch>
    </div>
  );
}

export default App;
