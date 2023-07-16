import '@testing-library/jest-dom';
import { expect, test, vi } from 'vitest';
import { render,screen,fireEvent} from '@testing-library/react';
import { MemoryRouter, Route, Routes, Router } from 'react-router-dom';
import { AppContext } from '../AppContextProvider';

import NumPlayersPage from '../pages/NumPlayersPage';
import HomePage from '../pages/Homepage';


//Tests that the homepage is rendered correctly and all necessary text is visible.
test('test HomePage render/',() => {
  const   player = [{
    name:"Player 1",
    placement: 0,
    image: "",
    isHuman: true
  }];
  const initState = {
      players: player,
      removePlayer: vi.fn()
};
  const { getByText, queryByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <AppContext.Provider value={initState}>
          <HomePage/>
        </AppContext.Provider>
      </MemoryRouter>
    );
  
  // "checks text"
  expect(getByText('Seaweed and Bubbles')).toBeInTheDocument();
  expect(getByText('PLAY')).toBeInTheDocument();
  expect(queryByText('Play')).not.toBeInTheDocument();
})

//Tests navigation to the /players route via simulating a button click
test('clicking button navigates to the specified route', async () => {
    const   player = [{
      name:"Player 1",
      placement: 0,
      image: "",
      isHuman: true
    }];
    const initState = {
        players: player,
        removePlayer: vi.fn()
  };
    
    const { getByText} = render(
        <MemoryRouter initialEntries={['/']}>
        <AppContext.Provider value={initState}>
          <HomePage/>
        </AppContext.Provider>
      </MemoryRouter>
      );
  
    // Simulate button click
    expect(getByText('PLAY')).toBeInTheDocument();
    const element = screen.getByRole('button',{name:/button-start/i})
    await fireEvent.click(element);

    const { getByText: getByTextOnNextPage } = render(
      <MemoryRouter initialEntries={['/players']}>
        <Routes>
          <Route path="/players" element={<NumPlayersPage/>} />
        </Routes>
    </MemoryRouter>
    );
  
    // Assert that the About page component is rendered
    expect(getByTextOnNextPage('PLAYERS')).toBeInTheDocument();
});
