import '@testing-library/jest-dom';
import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AppContext} from '../AppContextProvider';
import { MemoryRouter } from 'react-router-dom';
import GamePage from '../pages/GamePage';
import userEvent from '@testing-library/user-event'

let players;
beforeEach(async ()=>{
    players = [
        {name:"Player 1",
        placement: 12,
        image: "avatar_pufferfish.png",
        isHuman: true},
        {name:"Player 2",
        placement: 0,
        image: "avatar_seal.png",
        isHuman: true}
    ];
    const initState = {
        currentID: 0, 
        players: players,
        nextID:1,
    };
    const {getByText, queryByText} =  render(
        <MemoryRouter initialEntries={['/game']}>
            <AppContext.Provider value={initState}>
                <GamePage/>
            </AppContext.Provider>
        </MemoryRouter>
    );
    // expect to see tutorial pop-up on initial load of game page
    expect(screen.getByText('HOW TO PLAY')).toBeInTheDocument();
    const tutorialCloseBtn = screen.getByRole('button',{name:/closeTutorialBtn/i});
    await userEvent.click(tutorialCloseBtn); // exit pop up and go back to game Page
})

test('Renders the game page correctly', async ()=>{
    // expect to see current player: player 1 after closing tutorial button & player 1 and player 2's images
    const currentPlayerText = screen.getByText(`Current Player: ${players[0]['name']}`);
    const currentPlayerImg = screen.getByAltText("Current Player");
    const nextPlayerImg = screen.getByAltText("Next Player");
    expect(currentPlayerText).toBeInTheDocument();
    expect(currentPlayerImg).toHaveAttribute('src',`/src/assets/selectable_avatars/${players[0]['image']}`);
    expect(nextPlayerImg).toHaveAttribute('src',`/src/assets/selectable_avatars/${players[1]['image']}`);
});

test('Renders Back to Home pop up on Home button click', async ()=>{
    // expect to see current player: player 1 text since we went back to the game page
    const currentPlayerText = screen.getByText(`Current Player: ${players[0]['name']}`);
    expect(currentPlayerText).toBeInTheDocument();

    // click on home button
    const homeButton = screen.getByRole('button',{name:/home-btn/i});
    await userEvent.click(homeButton);

    // expect to see back to home confirmation popup by checking if resume and quit buttons are there
    const resumeGameBtn = screen.getByRole('button', {name:/resumeGameBtn/i});
    const quitGameBtn =  screen.getByRole('button',{name:/quiteGameBtn/i});
    expect(resumeGameBtn).toBeInTheDocument();
    expect(quitGameBtn).toBeInTheDocument();
});

test('Player 1 is placed in the 12th spot', ()=>{
    // Find the table and the cell (9,8) for the 12th square
    const gameBoard = screen.getByRole('table');
    const cell = gameBoard.querySelector('tr:nth-child(9) td:nth-child(8)');
    // Expect the avatar image of player 1 to occupy that square
    expect(cell).toHaveStyle(`background-image: /src/assets/selectable_avatars/${players[0]['image']}`);
});
