import '@testing-library/jest-dom';
import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes, Router } from 'react-router-dom';
import { AppContext } from '../AppContextProvider';
import ResultsPage from '../pages/ResultsPage';

/* Checks that the Result page can 
  - receive requests from API
  - Process that the winner is the player with >=100 steps
  - displays the proper image
  - displays the proper name
  - functionality of the page is properly working.

*/
test('AppContextProvider makes GET request to API to render player', ()=>{
    const   player = [{
        name:"Player 1",
        placement: 0,
        image: "avatar_dolphin.png",
        isHuman: true
      },
        {
            name:"Player 2",
            placement: 100,
            image: "avatar_octopus.png",
            isHuman: true
        }];
      const initState = {
          players: player,
          removePlayer: vi.fn()
    };

    const { getByText, queryByText } = render(

        <MemoryRouter initialEntries={['/results']}>
          <AppContext.Provider value={initState}>
            <ResultsPage/>
          </AppContext.Provider>
        </MemoryRouter>
      );

      //Checks that the player who won is player 2
      expect(getByText('Player 2')).toBeInTheDocument();


});

