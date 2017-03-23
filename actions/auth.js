export function refreshToken(dispatch) {

    var freshTokenPromise = fetchJWTToken()
        .then(t => {
            dispatch({
                type: DONE_REFRESHING_TOKEN
            });

            dispatch(saveAppToken(t.token));

            return t.token ? Promise.resolve(t.token) : Promise.reject({
                message: 'could not refresh token'
            });
        })
        .catch(e => {

            console.log('error refreshing token', e);

            dispatch({
                type: DONE_REFRESHING_TOKEN
            });
            return Promise.reject(e);
        });

    dispatch({
        type: REFRESHING_TOKEN,

        // we want to keep track of token promise in the state so that we don't try to refresh
        // the token again while refreshing is in process
        freshTokenPromise
    });

    return freshTokenPromise;
}
