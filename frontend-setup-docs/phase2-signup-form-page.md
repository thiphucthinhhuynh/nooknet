# Phase 2: Signup Form Page

The Signup Form Page is the second page that you will add to your frontend application. The flow will be very similar to what you did for the Login Form Page. Can you remember all the steps to implement it? If so, try doing this on your own before looking below for help!

Signup action
You will use the POST /api/users backend route to sign up a user.

In the session store file, add a signup thunk action that will hit the signup backend route with username, firstName, lastName, email, and password inputs. After the response from the AJAX call comes back, parse the JSON body of the response, and dispatch the action for setting the session user to the user in the response's body.

Export the signup thunk action.

Test the signup action
Test the signup thunk action.

Navigate to http://localhost:5173. If there is a token cookie, remove it and refresh. In the browser's DevTools console, try dispatching the signup thunk action with a new username, new firstName, lastName, email, and password.

The previous state in the console should look like this:

{
  session: {
    user: null
  }
}

The next state in the console should look something like this:

{
  session: {
    user: {
      email: "<new email>",
      firstName: "<new first name>",
      id: "<new id>",
      lastName: "<new last name>",
      username: "<new password>"
    }
  }
}

If there is an error or if the previous or next state does not look like this, then check the logic in your signup action.

Commit your code for the signup actions!

Example signup action
Again, there is no absolute "right" way of doing this. As long as your signup action is displaying the expected initial state and states after each dispatched action, then your setup is fine.

Here's an example of the signup thunk action:

// frontend/src/store/session.js

// ...
export const signup = (user) => async (dispatch) => {
  const { username, firstName, lastName, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      firstName,
      lastName,
      email,
      password
    })
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};
// ...

Here's an example of the signup thunk action test in the browser's DevTools console:

store.dispatch(
  sessionActions.signup({
    username: "NewUser",
    firstName: "New",
    lastName: "User",
    email: "new@user.io",
    password: "password",
  })
)

SignupFormPage component
