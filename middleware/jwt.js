import { refreshToken } from '../actions/auth';
import jwtDecode from 'jwt-decode';
import moment from 'moment'
import {CALL_API} from './api'

export default function jwt({ dispatch, getState }) {

    return (next) => (action) => {

        const callAPI = action[CALL_API]

        // So the middleware doesn't get applied to every single action
        if (typeof callAPI === 'undefined' || !callAPI.authenticated) {
          return next(action)
        }

        return;

        if (getState().auth && getState().auth.token) {

            // decode jwt so that we know if and when it expires
            var token = jwtDecode(getState().auth.token);
            var tokenExpiration = token.exp;
            console.log(token)

            if (tokenExpiration && (moment(tokenExpiration) - moment(Date.now()) < 5000)) {

                // make sure we are not already refreshing the token
                if (!getState().auth.freshTokenPromise) {
                    return refreshToken().then(() => next(action));
                } else {
                    return getState().auth.freshTokenPromise.then(() => next(action));
                }
            }
        }

        return next(action);
    };
}
