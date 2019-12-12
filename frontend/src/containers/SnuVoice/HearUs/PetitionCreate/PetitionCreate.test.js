import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import PetitionCreate from './PetitionCreate';
import { getMockStore } from '../../../../test-utils/mocks';
import { history } from '../../../../store/store';
import * as actionCreators from '../../../../store/actions/hearus';
import * as usrActions from '../../../../store/actions/user';

const stubInitialState = {
    signIn : true
}

const mockStore = getMockStore(stubInitialState);

describe('<PetitionCreate />', () => {
    let petitioncreate;
    let spyCheckSignIn;
    let spyHistoryPush;

    window.alert = jest.fn();
    beforeEach(() => {
        petitioncreate = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact component={PetitionCreate} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        spyCheckSignIn = jest.spyOn(usrActions, 'checkSignIn')
            .mockImplementation(() => { return dispatch => {}} );
        spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(() => {})            
    });

    it('should render PetitionCreate', () => {
        const component = mount(petitioncreate);
        const wrapper = component.find('.PetitionCreate');
        expect(wrapper.length).toBe(1);
    });

    it('should set state properly on inputs', () => {
        const testtitle = "test";
        const testcontent = "content";

        const component = mount(petitioncreate);
        const petitionCreateInstance = component.find(PetitionCreate.WrappedComponent).instance();
        let wrapper = component.find('#petition_title_input').at(0);
        wrapper.simulate('change', { target: { value: testtitle } });
        expect(petitionCreateInstance.state.petitionTitle).toEqual(testtitle);
        wrapper = component.find('#petition_content_textarea').at(0);
        wrapper.simulate('change', { target: { value: testcontent } });
        expect(petitionCreateInstance.state.petitionContent).toEqual(testcontent);
    });

    it('should handle properly with links/tags', () => {
        const testlink = "link";
        const testtag = "tag";
        const component = mount(petitioncreate);
        const petitionCreateInstance = component.find(PetitionCreate.WrappedComponent).instance();
        let wrapper = component.find('#petition_link_input').at(0);
        wrapper.simulate('change', { target: { value: testlink } });
        expect(petitionCreateInstance.state.petitionLink).toEqual(testlink);
        wrapper = component.find('#petition_tag_input').at(0);
        // wrapper.simulate('change', { target: { value: testtag } });
        // expect(petitionCreateInstance.state.petitionTag).toEqual(testtag);
        wrapper = component.find('#petition_link_add_button').at(0);
        wrapper.simulate('click');
        expect(petitionCreateInstance.state.petitionLinkList).toEqual([testlink]);
        wrapper = component.find('#petition_tag_add_button').at(0);
        // wrapper.simulate('click');
        // expect(petitionCreateInstance.state.petitionTagList).toEqual([testtag]);
        wrapper = component.find('#petition_link_delete_button').at(0);
        wrapper.simulate('click');
        expect(petitionCreateInstance.state.petitionLinkList).toEqual([]);
        wrapper = component.find('#petition_tag_delete_button').at(0);
        // wrapper.simulate('click');
        expect(petitionCreateInstance.state.petitionTagList).toEqual([]);
        wrapper = component.find('#petition_category_select').at(0);
        wrapper.simulate('change',{ target: {value: "human rights" }  });
        expect(petitionCreateInstance.state.selectedCategory).toEqual("human rights");
        wrapper = component.find('#agree_to_terms_checkbox').at(0);
        wrapper.simulate('change');
        expect(petitionCreateInstance.state.agreeToTerms).toEqual(true);
    })

    
    it('should expect cancelbutton', () => {
        const spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(path => { });
        const component = mount(petitioncreate);
        let wrapper = component.find('#petition_cancel_button').at(0);
        wrapper.simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledWith('/hear_us');
    });

    it('should confirm successfully', () => {
        const spyPostPetition = jest.spyOn(actionCreators, 'postPetition')
            .mockImplementation(petition => { return dispatch => { }; });
        const component = mount(petitioncreate);
        const petitionCreateInstance = component.find(PetitionCreate.WrappedComponent).instance()
        petitionCreateInstance.setState({
            agreeToTerms: true,
            petitionTitle: 'testtitle',
            petitionContent: 'testcontent',
            selectedCategory: 'human rights',
            petitionLinkList: ['testlink'],
            petitionTagList: ['testtag'],
        });
        const wrapper = component.find('#petition_confirm_button').at(0);
        wrapper.simulate('click');
        expect(spyPostPetition).toHaveBeenCalledTimes(1);
    });

    it('should ngOnInit works', async () => {
        let inState = {
            signIn : false
        };
        let reMockStore = getMockStore(inState);
        petitioncreate = (
            <Provider store={reMockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact component={PetitionCreate} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        const component = await mount(petitioncreate);
        const petitionCreateInstance = component.find(PetitionCreate.WrappedComponent).instance();
        expect(spyHistoryPush).toHaveBeenCalledTimes(2);
        petitionCreateInstance.setState({ 
            signIn: true
        })
        await petitionCreateInstance.ngOnInit();
        expect(spyHistoryPush).toHaveBeenCalledTimes(4);
    })

})