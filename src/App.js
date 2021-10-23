import axios from "axios";
import React, { useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router";
import { Footer, Navbar, SidePanel } from "./components";
import { AuthenticateUser, CreatePost, HomePage, ShowPost } from "./containers";
import './App.scss';

const App = () => {
  const [user, setUser] = useState({});
  const [query, setQuery] = useState({});
  const [post, setPost] = useState([]);
  const history = useHistory();

  const serverURL = process.env.REACT_APP_BE_URL || '';
  const DeauthUserAPI = process.env.REACT_APP_Deauth_User || '';
  
  const signout = () =>
    axios.post(serverURL + DeauthUserAPI)
      .then(() => setUser({}));

  return (
    <div className="App">
      <Navbar user={user}
        postId={post.id}
        postAuthor={post.author}
        setUser={() => 'name' in user ? signout() : history.push('/authUser')}
      />

      <div className='App-contents'>
        <SidePanel query={query} setQuery={setQuery} />

        <div className='main-contents'>
          <Switch>
            <Route exact path='/' render={() =>
                <HomePage user={'name' in user ? user.name : null} query={query} />
              }
            />

            <Route exact path='/viewPost/:id' render={props =>
                <ShowPost
                  id={props.match.params.id}
                  setQuery={setQuery}
                  user={user.name}
                  setPost={setPost}
                />
              }
            />

            {/* <Route exact path='/authUser' render={() =>
                <AuthenticateUser setUser={setUser} />
              }
            /> */}

            {
              !user.name ?
                <AuthenticateUser setUser={setUser} /> :
                null
            }

            <Route exact path='/createPost' render={() =>
                <CreatePost user={user} setUser={setUser} />
              }
            />

            <Route exact path='/editPost/:id' render={props =>
                <CreatePost
                  edit
                  user={user.id}
                  setUser={setUser}
                  post={post}
                  id={props.match.params.id} />
              }
            />
            <Redirect to='/' />
          </Switch>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
