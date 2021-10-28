import axios from "axios";
import React, { useState, useContext } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router";
import { Footer, Navbar, SidePanel } from "./components";
import { AuthenticateUser, CreatePost, HomePage, ShowPost, UserSignup, VerifyEmail } from "./containers";
import { CurrentUserContext } from "./contexts";
import './App.scss';

const App = () => {
  const [user, setUser] = useState({});
  const [query, setQuery] = useState({});
  const [post, setPost] = useState([]);
  const [similarQuery, setSimilarQuery] = useState({});
  const history = useHistory();
  const currentUser = useContext(CurrentUserContext);

  const serverURL = process.env.REACT_APP_BE_URL || '';
  const DeauthUserAPI = process.env.REACT_APP_Deauth_User || '';
  
  const signout = () =>
    axios.post(serverURL + DeauthUserAPI)
      .then(() => setUser({}));

  return (
    <div className="App">
      <Navbar user={user}
        postId={post.id}
        postAuthor={post.author ? post.author.id : ''}
        setUser={() => 'name' in user ? signout() : history.push('/authUser')}
      />

      <div className='App-contents'>
        <SidePanel similarQuery={similarQuery} setQuery={setQuery} />

        <div className='main-contents'>
          <Switch>
            <Route exact path='/' render={() =>
                <HomePage user={'name' in user ? user.name : null} query={query} setPost={setPost} />
              }
            />

            <Route exact path='/viewPost/:id' render={props =>
                <ShowPost
                  id={props.match.params.id}
                  setSimilarQuery={setSimilarQuery}
                  user={user.name}
                  setPost={setPost}
                />
              }
            />

            <Route exact path='/userSignup' component={UserSignup} />

            <Route exact path='/verify/:id' render={props => <VerifyEmail id={props.match.params.id} />} />

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
