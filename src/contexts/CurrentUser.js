import axios from "axios";

const serverURL = process.env.REACT_APP_BE_URL || '';
const CheckUserAPI = process.env.REACT_APP_Check_User || '';

class CurrentUser {
  currentUser;

  constructor() {
    axios.get(serverURL + CheckUserAPI, { withCredentials: true })
      .then(response => {
        this.currentUser = response.data.currentUser;
      })
      .catch(() =>  {})
  }
  
  getCurrentUser() {
    return this.currentUser;
  }

  isAuthenticated() {
    return this.currentUser === null;
  }
}

export const currentUser = new CurrentUser();
