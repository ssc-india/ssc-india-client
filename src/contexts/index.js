import React from 'react';
import { currentUser } from './CurrentUser';

const CurrentUserContext = React.createContext(currentUser);

export { CurrentUserContext };
