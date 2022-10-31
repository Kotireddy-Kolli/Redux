Redux

1. Predictable state container for Javascript Applications.
    We can use redux in react with out the react-redux binding library.
    React <-> React-Redux <-> Redux (Redux Toolkit)
    React-Redux is official Reduc UI binding library for react.
    Redux Toolkit, Servers as an abstraction over redux. It hides the diffecult parts ensureing you have a good developer experience.

Redux Toolkit
    Efficient Redux development.
    Standard way to write Redux logic in your Applications.

    Why?
    1. Configuring redux in an app seems complicated.
    2. A lot of other packages have ti be installed to get reduc to do something useful.
    3. Too much bolierplate code.

    When should I use Redux in App?
    1. Large amount of App state.
    2. State is updated frequently over time.
    3. Logic to update state may be complex
    4. Medium/large code base. worked on by many people.

Redux
    Store   : Hold the state of App
    Action  : Describes what happened in the Applications
    Reducer : Handles action and Describes how to update the state

    Middleware : Is Suggested way to extend Redux with custom functionality. Provides a third-party extension 
                 Point between dispatching an action and moment it reaches the reducer.
                 use Middleware for logging, crash reporting,Performing async tasks etc.

                 1.import middleware you want to use(In our case logger)
                 2.How to use in App? redux provides a function applymiddleware
                 3.Now to the createstore, Pass the 2nd arg as applyMiddleware(Name_of_the_middleware), 
                    We can pass as many middlewares as app reqires

    redux-thunk: To write asyn code.
                 1. import redux-thunk and middleware
                 2. Pass it as arg to createstore
                 3. Write the async action creater, This creator can return function instead of object.
                    This function can also dispatch actions. because it receives the dispath as an arg.
        