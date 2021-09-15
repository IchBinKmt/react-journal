import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { 
    BrowserRouter as Router,
    Redirect,
    Switch
} from 'react-router-dom';
import { login } from '../actions/auth';
import { JournalScreen } from '../components/journal/JournalScreen'
import { auth, onAuthStateChanged } from '../firebase/firebaseConfig'
import { AuthRouter } from './AuthRouter'
import { PrivateRouter } from './PrivateRouter';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
            setChecking(false) ;
        })
    }, [dispatch, setChecking, setIsLoggedIn]);

    if (checking) {
        return (
            <h1>
                Wait...
            </h1>
        )
    }
    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        path="/auth" 
                        isAuth={isLoggedIn}
                        component={AuthRouter} 
                    />
                    <PrivateRouter 
                        exact
                        isAuth={isLoggedIn}
                        path="/" 
                        component={JournalScreen} 
                    />
                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    )
}
