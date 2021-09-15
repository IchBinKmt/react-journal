import { signInWithEmailAndPassword, updateProfile } from "@firebase/auth";
import { auth, signInWithPopup, googleAuthProvider, createUserWithEmailAndPassword, signOut } from "../firebase/firebaseConfig";
import { types } from "../types/types"
import { finishLoading, startLoading } from "./ui";
import Swal from 'sweetalert2'

export const startLoginEmailPassword = (email, password) => {
    return async (dispatch) => {
        dispatch(startLoading());
        try {
            let {user} = await signInWithEmailAndPassword(auth, email, password);
            dispatch(login(user.uid, user.displayName));
            dispatch(finishLoading());
        }
        catch (error) {
            dispatch(finishLoading());
            Swal.fire('Error', error.message, 'error');
        }
    }
}

export const startRegisterWithUserData = (name, email, password) => {
    return (dispatch) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(async({user}) => {
                
                await updateProfile(user, {displayName: name})
                dispatch(
                    login(user.uid, user.displayName)
                )
            })
            .catch(e => {
                Swal.fire('Error', e.message, 'error');
            })
        }
}

export const startGoogleLogin = () => {
    return (dispatch) => {
        signInWithPopup(auth, googleAuthProvider)
            .then(async({user}) => {
                dispatch(
                    login(user.uid, user.displayName)
                );
            });
    }
}

export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}

export const startLogout = () => {
    return async (dispatch) => {
        await signOut(auth);
        dispatch(logout());
    }
}

export const logout = () => ({
    type: types.logout
})