# CampusSociety

## server.js

Sends app.html in the dist folder, and also routes requests from the app to the Campus Society server. Keeps the authentication token a secret.

## dist

Contains the actual page that presents the app, as well as a global style sheet, image assets and a javascript file bundled by webpack.

## src

Contains all the React code that makes the site function. Components contains React components, each with its own style sheet. Resources contains files that export JSON data for use around the app. Services contains files that export useful functions for things like communication. index.js is the entry point for webpack.