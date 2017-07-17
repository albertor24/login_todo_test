# todo_vuejs

> Vuejs Webapp that implements a Todo with a login page

For additional information regarding the coding design decisions, please go to the  [decisions section](#decisions)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

### Decisions

#### Login implementation
The login implementation stores the user information in localStorage, together with a secret, which is created by encoding as a base64, a string made with the id and the login time.

This implementation allows a relatively safe login, and it prevents trivial "attacks" where the user inspects local storage and tries to change the id number in order to access another user's Todo's.

The implementation is still very insecure, and in a real case scenario, JWT with authentication in the backend would be the right way to go

#### Store
Vuex is used in conjuction with localStorage, to allow for both semi-persistent data and reactivity (localStorage cannot be made reactive).

#### Style
Buttons, glyphs, inputs, grid, etc are default from bootstrap. Similarly, several bootstrap classes are being used around the application.

#### Transitions
There are multiple transitions throughout the page. The most notable ones are when the modal shows, when an item is added/removed from the list, and when the user logs in

#### Logo
While the page "logo" resembles the one in gitlab, it was originally made to resemble the low-definition face of dog [https://i.stack.imgur.com/PgZfk.jpg?s=64&g=1].

#### Testing
Currently, unit testing using karma is only done for the login page, and only covers standard rendering and login.

