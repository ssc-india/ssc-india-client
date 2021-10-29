import axios from "axios";
import React, { useState, useEffect } from "react";
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
  const [draftId, setDraftId] = useState(null);
  const history = useHistory();

  const serverURL = process.env.REACT_APP_BE_URL || '';
  const DeauthUserAPI = process.env.REACT_APP_Deauth_User || '';
  const CheckUserAPI = process.env.REACT_APP_Check_User || '';
  console.log(user);
  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(serverURL + CheckUserAPI, { withCredentials: true });
      setUser(response.data.currentUser === null ? {} : response.data.currentUser);
    }

    getUser();
  }, [serverURL, CheckUserAPI]);

  const signout = () =>
    axios.post(serverURL + DeauthUserAPI, {}, { withCredentials: true })
      .then(() => setUser({}));

  return (
    <CurrentUserContext.Provider value={user}>
      <div className="App">
        <Navbar user={user}
          postId={post.id}
          postAuthor={post.author ? post.author.id : ''}
          setUser={() => 'name' in user ? signout() : history.push('/authUser')}
          setDraftId={setDraftId}
        />

        <div className='App-contents'>
          <SidePanel similarQuery={similarQuery} setQuery={setQuery} setDraftId={setDraftId} />

          <div className='main-contents'>
            <Switch>
              <Route exact path='/' render={() =>
                  <HomePage query={query} setPost={setPost} />
                }
              />

              <Route exact path='/viewPost/:id' render={props =>
                  <ShowPost
                    id={props.match.params.id}
                    setSimilarQuery={setSimilarQuery}
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
                !user.username ?
                  <AuthenticateUser setUser={setUser} /> :
                  null
              }

              <Route exact path='/createPost' render={() =>
                  <CreatePost user={user} setUser={setUser} draftId={draftId} setDraftId={setDraftId} />
                }
              />

              <Route exact path='/editPost/:id' render={props =>
                  <CreatePost
                    edit
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
    </CurrentUserContext.Provider>
  );
}

export default App;
