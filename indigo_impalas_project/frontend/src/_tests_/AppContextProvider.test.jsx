import '@testing-library/jest-dom';
import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { AppContextProvider } from '../AppContextProvider';
let axiosMock;

beforeAll(() => {
    axiosMock = new MockAdapter(axios);
});

afterEach(() => {
    axiosMock.reset();
});

test('AppContextProvider makes GET request to API to render player', ()=>{
    const   player = [{
        name:"Player 1",
        placement: 0,
        image: "",
        isHuman: true
    }]
    axiosMock.onGet("/player").reply(200, player);
    const {} = render(<AppContextProvider/>);
    expect(axiosMock.history.get.length).toBe(1);
    expect(axiosMock.history.get[0].url).toEqual("/player");

});

