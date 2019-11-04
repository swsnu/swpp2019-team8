import axios from 'axios';

import * as actionCreators from './hearus';
import store from '../store';

const stubPetition = {
    id: 0,
    title: 'title 1',
    content: 'content 1',
};

describe('ActionCreators', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it(`'getPetition' should fetch petition correctly`, (done) => {
        const spy = jest.spyOn(axios, 'get')
            .mockImplementation(url => {
                return new Promise((resolve, reject) => {
                    const result = {
                        status: 200,
                        data: stubPetition,
                    };
                    resolve(result);
                });
            });

        store.dispatch(actionCreators.getPetition()).then(() => {
            const newState = store.getState();
            expect(newState.hu.selectedPetition).toBe(stubPetition);
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });
});