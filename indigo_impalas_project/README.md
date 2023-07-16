# SE 750 Project Implementation  

Snakes and ladder is a recreation of the original board game implemented into a web-based version. The thematic used is ocean and with snakes being replaced as seaweed and ladders with bubbles.


## Table of Contents
1. [Installation](#setup)
    -[Backend](#backend)
    -[Frontend](#frontend)
2. [Documentation](#documentation)
    - [Instructions](#file-structure)
    - [Components](#components)
    - [Routing](#routing)
3. [References](#references)

## Installation
Make sure you have the latest version of `node.js` and `npm` installed. This can be found on the official NodeJS

website: https://nodejs.org/.

Open up two terminals, one for launching the front and one for the backend.
1. Backend terminal

```shell
cd backend
npm install
npm start
```
Correct installation and run should display a link to localhost:
```shell
> App server listening on port 3000!
> Cleared database (removed 0 players).
```
2. Frontend terminal

```shell
cd frontend
npm install
npm run dev
```
Correct installation and run should display the following with a link to localhost:
```shell
> snakes-and-ladders@0.0.0 dev
> vite
```

## Instructions
The game follows the standardize rules of snakes and ladders,rolling a dice between 1-6 when it is your turn and moving in a 100 square grid.
Landing on the base of a bubble stream will take you to the top and seaweed down, both are colour coded to match start and end position.
The game ends when a player lands on 100.

1. Click the Play button.
2. Select number of human players and number of computer players.
3. Select the avatar that you wish to be represented as on the board.
4. Roll the dice when your turn comes.
5. Press the swim button to make your avatar move.
6. Reach 100 to win !

### Backend
The backend is connected to [MongoDB](https://www.mongodb.com/), and is written with **Express** and **Mongoose** database driver.
For our server, or backend, to run, we need a MongoDB database. We have purposefully included .env file to our database, for anyone to access and use the database that we have dedicated to the game. However, you are welcome to use your own database, by replacing our connection string with your connection string.

### Frontend Components
1. AvatarPage
Frontend page that handles the selection of avatars and assigning it to a specific player id with given name.
The images are rendered through a grid array of existing named images called `avatarImageFiles`.The selection indication is through rerendering the grid avatars every time the confirmation button in the bottom left hand corner is clicked and an avatar has been selected. Once all avatars have been chosen a play button directly below the avatar grid would appear and take you to the `Tutorial popup`

2. BackToHomePopup
Frontend Page that acts as a safety net for those wanting to exit the current game instance. Makes sure that the user will understand if they leave this window the game state would not be saved and activates as a popup when trying to return to the home page. Returns to `Homepage` or hitting resume will take you back to the `GamePage`

3. GamePage
Frontend Page that handles the core game visuals. This includes rendering the board image and the invisible grid layout behind the board as well as classifying each board box as a individual id. Upon winning, takes you to the `ResultsPage.`

4. Homepage
Frontend Page that acts as the landing page for the game when first accessing the game website. This page introduces the thematic and topic which is a representation of snakes and ladders in an ocean theme. Play button takes you to the `NumPlayersPage.`

5. NumPlayersPage
Frontend Page that handles the amount of players that want to play the game.The logic behind the page is that there can not be less than 2 players and no more than 6. Buttons on the right of the bubble increase the number and on the left decrease. When the player requirement is not met, the button at the bottom right hand side will not light up. Upon clicking the bottom right hand indicator when lit, will take you to the `AvatarSelectionPage`

6. ResultsPage
Frontend Page that handles showing who the winner was. This also handles the clearing of data from the database as the game is over and the players no longer needed to be stored. After existing, will take you back to the `HomePage`

7. TutorialPopup
Frontend Page that appears before game starts to  introduce the game mechanics, controls and rules to the player. The tutorial popup provides instructions and guidance to how to play the game, so that the player can understand the objectives and how to achieve them. The tutorial popup is accessible as a button on the right hand side of the game page, making it easy for users to find and access.

### Routing
Routing in our game is achieved with the `react-router-dom"` library. The Browse Router 
is stored in App.jsx and specify routes that can be accessed in the game as a `route`.

When routing throughout the pages we utilise `link` and the appropriate page name that its assigned to in App.jsx.

## Credits
This project was designed and created by project-group-indigo-impalas:
- Hayoon Seo
- Juwon Jung
- Julie Kim
- Min Sun Kim
- Rachel Nataatmadja
- Shou Miyamoto
