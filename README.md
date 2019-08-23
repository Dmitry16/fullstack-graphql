To run the app:

1. If you have omdb api access key, please use it: 
    it has to be set in the docker-compose.yml > backend > environment > OMDb_PERSONAL_ACCESS_TOKEN=your_key

2. Run 'docker-compose up' from the root.

High Level Design overview.

Frontend.

I used this (https://github.com/flexdinesh/react-redux-boilerplate) boilerplate because it has a rather good setup and it has enough stars at github that has to be considered as well. It uses React v16.4 which has a lot of great features such as: fiber under the hood (async rendering of the DOM), PureComponent, better ref and context apis, better error handling with ErrorBoundary, Fragments, Portals etc. It uses react-router v4.3 which has the component api design. Also other popular libraries from the react ecosystem which permit better development and testing according to the best practices such as immutable.js, redux-saga, reselect, lodash, etc. Besides of that I also like the feature-based project structure and TDD approach as well.

The project has feature-based structure, redux for the state management of the app and react-router for routing. Components are devided separating concerns into 2 categories. The containers are concerned with providing the data flow and making things to work, and the components concerned with presentation. External Api calls are performed from redux-saga which design permits better testing and managing of side effects. 
Babel is used as a transpiler in order to use all features of ES6. Webpack is used as a modules, plugins and loaders bundler. Npm as package manager and task runner.
The feature-based approach and redux abstracted data store permits better reusability of the components due to loose coupling design. 

Backend.

I used express-generator boilerplate because it has minimal project structure (role-based) with basic server setup, error handling, routing etc. 

When server recieves a get request to the '/api/search' endpoint. The app performs next main operations: 
1. The request object is parsed to get the search keyword;
2. It looks for the cached data.
3. If there is cached data (with key equal to the search keyword) is sent to the frontend and no api call is made.
4. If there is no cached data then it calls to the omdb api requesting for the data 2 times in order to get 20 movies.
5. When all data is recieved it is checked, set to the cache and sent to the client.
When defining the interface for working with external api I made use of ES6 classes, factory and dependency injection patterns(injecting axios) in order to get the logic abstracted from the http client and be able to better test side effects as well.

############

To make it production ready I would do better testing and error handling (consideriong all the possible cases and providing the UI with clear and user-friendly messaages), I would do cross-browser compatibility testing and better code refactoring.

If I had more time: I would use eslint to have my code more consistent :) I would use TypeScript and do test first (TDD) to have my code less error prone and to help me better organize and structure code especially when the codebase grows significally. In frontend I would use the new hooks api (React v16.7) which permits better reusability of stateful logic and more clear and declarative style of coding.

Time spent on the case study: 20 hours. (I could have 2-3 hours per day as I am working these days).