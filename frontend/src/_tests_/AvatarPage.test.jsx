import '@testing-library/jest-dom';
import { expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AppContext} from '../AppContextProvider';
import { MemoryRouter } from 'react-router-dom';
import AvatarPage from '../pages/AvatarPage';
import userEvent from '@testing-library/user-event'

test('Renders avatar page correctly', ()=>{
    const   player = [{
        name:"Player 1",
        placement: 0,
        image: "",
        isHuman: true
    }];
    const initState = {
        currentID: 0, 
        maxPlayers:2,
        players: player,
    };
    const {getByText, queryByText} =  render(
        <MemoryRouter initialEntries={['/avatar/0/2']}>
            <AppContext.Provider value={initState}>
                <AvatarPage/>
            </AppContext.Provider>
        </MemoryRouter>
    ); 
    expect(getByText('SELECT AVATAR')).toBeInTheDocument();
});

test('Pufferfish avatar is clicked and yellow border is shown', async ()=>{
    const   player = [{
        name:"Player 1",
        placement: 0,
        image: "",
        isHuman: true
    }];
    const initState = {
        currentID: 0, 
        maxPlayers:2,
        players: player,
    };
     render(
        <MemoryRouter initialEntries={['/avatar/0/2']}>
            <AppContext.Provider value={initState}>
                <AvatarPage/>
            </AppContext.Provider>
        </MemoryRouter>
    ); 
    // find the pufferfish avatar button and click on it
    const avatarButton = screen.getByRole('button',{name:/avatar_pufferfish.png/i});
    await userEvent.click(avatarButton);
    // check it has a yellow border colour
    expect(avatarButton).toHaveStyle('border-color: #F7DA86');
    
});

test('The next button and start game is disabled on render', async ()=>{
    const   player = [{
        name:"Player 1",
        placement: 0,
        image: "",
        isHuman: true
    }, 
    {name:"Player 2",
        placement: 0,
        image: "",
        isHuman: true
    }];
    const initState = {
        currentID: 0, 
        maxPlayers:2,
        players: player,
    };
     render(
        <MemoryRouter initialEntries={['/avatar/0/2']}>
            <AppContext.Provider value={initState}>
                <AvatarPage/>
            </AppContext.Provider>
        </MemoryRouter>
    ); 
    // Check if next button and start button are disabled
    const nextButton = screen.getByRole('button',{name:/nextPlayerAvatarBtn/i});
    expect(nextButton).toBeDisabled();
    const startGameButton = screen.getByRole('button',{name:/startGameBtn/i});
    expect(startGameButton).toBeDisabled();
    
});

test('The next button is disabled and start button is enabled when last player picked avatar', async ()=>{
    const   player = [{
        name:"Player 1",
        placement: 0,
        image: "",
        isHuman: true
    }, 
    {name:"Player 2",
        placement: 0,
        image: "",
        isHuman: true
    }];
    const initState = {
        currentID: 1, 
        maxPlayers:2,
        players: player,
    };
     render(
        <MemoryRouter initialEntries={['/avatar/1/2']}>
            <AppContext.Provider value={initState}>
                <AvatarPage/>
            </AppContext.Provider>
        </MemoryRouter>
    ); 
    // Click on the pufferfish avatar button
    const avatarButton = screen.getByRole('button',{name:/avatar_pufferfish.png/i});
    await userEvent.click(avatarButton);
    expect(avatarButton).toHaveStyle('border-color: #F7DA86'); // Verify it has a yellow border colour

    // Check next button is disbaled and start game button is enabled
    const nextButton = screen.getByRole('button',{name:/nextPlayerAvatarBtn/i});
    expect(nextButton).toBeDisabled();
    const startGameButton = screen.getByRole('button',{name:/startGameBtn/i});
    expect(startGameButton).toBeEnabled();
});

test('the otter avatar button is disabled after player 1 selects it and player 2 is selecting an avatar now', ()=>{
    const   players = [{
        name:"Player 1",
        placement: 0,
        image: "avatar_otter.png", // otter has been chosen
        isHuman: true
    }, 
    {name:"Player 2",
        placement: 0,
        image: "",
        isHuman: true
    }];
    const initState = {
        currentID: 1,
        setCurrentID: vi.fn(), 
        maxPlayers:2,
        players: players,
        editPlayer: vi.fn()
    };
     render(
        <MemoryRouter initialEntries={['/avatar/1/2']}>
            <AppContext.Provider value={initState}>
                <AvatarPage/>
            </AppContext.Provider>
        </MemoryRouter>
    ); 
    const otterButton = screen.getByRole('button',{name:/avatar_otter.png/i}); // should be disabled
    const dolphinBtn = screen.getByRole('button',{name:/avatar_dolphin.png/i}); // should be enabled since it hasn't been chosen yet
    expect(otterButton).toBeDisabled();
    expect(dolphinBtn).toBeEnabled();
});

test('5 avatar buttons should be disabled since they have been chosen before the 6th (last player) has chosen theirs', ()=>{
    const   players = [{
        name:"Player 1",
        placement: 0,
        image: "avatar_otter.png", 
        isHuman: true}, 
        {
        name:"Player 2",
        placement: 0,
        image: "avatar_dolphin.png",
        isHuman: true},
        {
        name:"Player 3",
        placement: 0,
        image: "avatar_shark.png",
        isHuman: true },
        {
        name:"Player 4",
        placement: 0,
        image: "avatar_seal.png",
        isHuman: true },
        {
        name:"Player 5",
        placement: 0,
        image: "avatar_pufferfish.png",
        isHuman: true },
        {
        name:"Player 6",
        placement: 0,
        image: "",
        isHuman: true },

    ];
    const initState = {
        currentID: 5,
        setCurrentID: vi.fn(), 
        maxPlayers:6,
        players: players,
        editPlayer: vi.fn()
    };
        render(
        <MemoryRouter initialEntries={['/avatar/5/6']}>
            <AppContext.Provider value={initState}>
                <AvatarPage/>
            </AppContext.Provider>
        </MemoryRouter>
    ); 
    // These buttons should be disabled
    const otterButton = screen.getByRole('button',{name:/avatar_otter.png/i}); 
    const dolphinBtn = screen.getByRole('button',{name:/avatar_dolphin.png/i}); 
    const sharkBtn = screen.getByRole('button',{name:/avatar_shark.png/i}); 
    const sealBtn = screen.getByRole('button',{name:/avatar_seal.png/i}); 
    const puffBtn = screen.getByRole('button',{name:/avatar_pufferfish.png/i}); 
    expect(otterButton).toBeDisabled();
    expect(dolphinBtn).toBeDisabled();
    expect(sharkBtn).toBeDisabled();
    expect(sealBtn).toBeDisabled();
    expect(puffBtn).toBeDisabled();

    // These 3 buttons should be enabled
    const squidBtn = screen.getByRole('button',{name:/avatar_squid.png/i}); 
    const fishBtn = screen.getByRole('button',{name:/avatar_tropic_fish.png/i}); 
    const octopusBtn = screen.getByRole('button',{name:/avatar_octopus.png/i}); 
    expect(squidBtn).toBeEnabled();
    expect(fishBtn).toBeEnabled();
    expect(octopusBtn).toBeEnabled();
});

test('Entering the nickname "Fishy" updates the subtitle from "Player 1" to "Fishy"', async ()=>{
    const   player = [{
        name:"Player 1",
        placement: 0,
        image: "",
        isHuman: true
    }];
    const initState = {
        currentID: 0, 
        maxPlayers:2,
        players: [player],
    };
    render(
        <MemoryRouter initialEntries={['/avatar/0/2']}>
            <AppContext.Provider value={initState}>
                <AvatarPage/>
            </AppContext.Provider>
        </MemoryRouter>
    ); 
    // Find nickname input and type in a new nickname "Fishy"
    const nicknameInput = screen.getByRole("textbox", {name:/nicknameInput/i});
    await userEvent.type(nicknameInput,"Fishy");
    await userEvent.tab();

    // Find the heading that has the player's name and verify it has changed to Fishy
    const nicknameSubtitle =  screen.getByRole('heading',{name:/nameSubtitle/i});
    expect(nicknameSubtitle).toHaveTextContent("Fishy");
    expect(nicknameSubtitle).not.toHaveTextContent("Player 1");
});