import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router";
import { AuthenticateUser, BlogUpload } from "./components";

const App = () => {
  const [user, setUser] = useState('Sins');

  return (
    <div className="App">
      <Switch>
        {
          !user ?
            <AuthenticateUser setUser={setUser} /> :
            null
        }
        <Route exact path='/' component={() => 'HomePage'} />
        <Route exact path='/blogUpload' render={() => <BlogUpload user={user} />} />
        <Redirect to='/' />
      </Switch>
    </div>
  );
}

export default App;
