# React Notes App

## About

This React app was created by [Tim](https://timtech.blog/about) ([@ziir on GitHub](https://github.com/ziir), [@tpillard on Twitter](https://twitter.com/tpillard)) as an exercise for a Senior Front-End Developer hiring process.

Read the [~live-tweeted process for building this app](https://twitter.com/tpillard/status/1305889708430553088).

View the [screenshots (unsorted, uncommented) illustrating the different steps of the development process](/screenshots).

## Main Product Features

- Viewing the list notes (title only)
- Create notes with a plaintext title, markdown content
- View a note, with the markdown content parsed and rendered
- Edit a note
- Delete a note

## Main React Features

- [React](https://reactjs.org/)
- [React.useEffect](https://reactjs.org/docs/hooks-effect.html)
- [React.useState](https://reactjs.org/docs/hooks-state.html)
- [React.useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer)
- [Lifting State Up](https://reactjs.org/docs/lifting-state-up.html)
- [React Context API](https://reactjs.org/docs/context.html)
- [Uncontrolled Components](https://reactjs.org/docs/uncontrolled-components.html)
- [Render Props](https://reactjs.org/docs/render-props.html)

## Persistence

Notes are persisted to [local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

## Routing

The app uses a custom Router for React apps, built on [a-route](https://github.com/WebReflection/a-route).

[See App.js](src/components/App.js) for an example of routes definition & rendering.

[See Router module](src/modules/Router) for more information.

## Markdown

Markdown content is parsed & rendered using [snarkdown, a minimal Markdown parser](https://github.com/developit/snarkdown).

## Philosophy

This project was developped with the goal of having few, light & fast dependencies - outside of the ones provided by the bootstrapping.

## Files structure

### App's components

This project presents a [src/components directory](/src/components), it contains mostly single-use components used in the app.

### 1st Party Modules

This project presents a [src/modules directory](/src/modules), it contains re-usable logic, utilities & components, some of which could hypothetically be useful in other projects and be extracted, maintained, distributed as their own packages.

## Bootstrap

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm ci`

Install dependencies from `package-lock.json.

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.
