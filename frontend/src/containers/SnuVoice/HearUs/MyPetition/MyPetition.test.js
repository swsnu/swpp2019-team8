import React from 'react';
import { shallow } from 'enzyme';
import { MyPetition, mapDispatchToProps, mapStateToProps } from './MyPetition';

describe('<MyPetition />', () => {
    let props;
    let mock = jest.fn();
    let mockHistory = { push : jest.fn() };
    window.alert = jest.fn();

    beforeEach(()=> {
        props = {
            selectedUser: 1,
            petitionList: [
                {
                    id: 1,
                    title: "1",
                },
                {
                    id: 2,
                    title: "2",
                },
                {
                    id: 3,
                    title: "3",
                }
            ],
            petitionListByComment: [
                {
                    id: 1,
                    title: "1",
                },
                {
                    id: 2,
                    title: "2",
                },
                {
                    id: 3,
                    title: "3",
                }
            ],
            getPetitionByComment: mock,
            getPetitionByUser: mock,
            getCurrentUser: mock,
            signIn: false,
        };
    });

    afterEach(() => jest.clearAllMocks());

    it('should componentDidMount work when signIn is false', async () => {
        const component = shallow(<MyPetition {...props} history={mockHistory} />)
        await component.instance().componentDidMount()
        expect(mockHistory.push).toHaveBeenCalledWith('/hear_us')
    })

    it('should componentDidMount work when signIn is true', async () => {
        const component = shallow(<MyPetition {...props} signIn={true} history={mockHistory}/>)
        await component.instance().componentDidMount()
        expect(mock).toHaveBeenCalledTimes(4)
    })

    it('should onClickDetailButton work', () => {
        const component = shallow(<MyPetition {...props} history={mockHistory} />);
        component.instance().onClickDetailButton( {url : "1"} );
        expect(mockHistory.push).toHaveBeenCalledWith('/hear_us/petition/1');

    })

    it('should ngOnInit work', async () => {
        const component = shallow(<MyPetition {...props} history={mockHistory} />);
        await component.instance().ngOnInit()
        expect(mockHistory.push).toHaveBeenCalledTimes(2)
    })

    it('should get lists well', () => {
        let mocked = jest.fn();
        const component = shallow(<MyPetition {...props} history={mockHistory} />);
        let petition = component.find('Petition').at(0)
        component.instance().onClickDetailButton = mocked;
        petition.simulate('click')
        expect(mocked).toHaveBeenCalledTimes(1);
        petition = component.find('Petition').at(5)
        petition.simulate('click')
        expect(mocked).toHaveBeenCalledTimes(2);
        component.instance().setState({
            selectedNumber : -2
        })
        petition = component.find('Petition')
        expect(petition.length).toBe(0)
    })

    it('should tab buttn works well', () => {
        let mocked = jest.fn();
        const component = shallow(<MyPetition {...props} history={mockHistory}/>);
        component.instance().onClickTabButton = mocked;
        const author = component.find('#author_tab_button');
        const voter = component.find('#voter_tab_button');
        author.simulate('click');
        expect(mocked).toHaveBeenCalledWith('Author');
        voter.simulate('click');
        expect(mocked).toHaveBeenCalledWith('Voter')
    })

    it('should onClickMOreButton works', () => {
        const component = shallow(<MyPetition {...props} history={mockHistory}/>);
        component.instance().onClickMoreButton();
        expect(component.instance().state.selectedNumber).toBe(2);
    })

    it('should onClickTabButton works', () => {
        const component = shallow(<MyPetition {...props} history={mockHistory}/>);
        component.instance().onClickTabButton('1')
        expect(component.instance().state.selectedTab).toBe('1');
    })


    it('should onClickPetiton works', () => {
        const component = shallow(<MyPetition {...props} history={mockHistory} />);
        const petition = component.find('Petition').at(0)
        component.instance().onClickDetailButton = mock
        petition.simulate('click')
        expect(mock).toHaveBeenCalledTimes(2)
    })
    

    it('should render without error when signIn is false', () => {
        const component = shallow(<MyPetition {...props} signIn={false} history={mockHistory}/>)
        const body = component.find('.MyPetition')
        expect(body.length).toBe(1)
    })

    it('should ngOnInIt works when signedIn', () => {
        const component = shallow(<MyPetition {...props} signIn={false} history={mockHistory}/>)
        component.instance().setState({
            signIn : true
        })
        component.instance().ngOnInit();
        expect(mockHistory.push).toHaveBeenCalledWith('/hear_us')

    })
})

describe('mapDispatchToProps', () => {
    let dispatch;

    beforeEach(() => {
        dispatch = jest.fn();
    })

    afterEach(() => jest.clearAllMocks())

    it('test functions', () => {
        mapDispatchToProps(dispatch).getPetitionByUser()
        expect(dispatch).toHaveBeenCalledTimes(1)
        mapDispatchToProps(dispatch).getCurrentUser()
        expect(dispatch).toHaveBeenCalledTimes(2)
        mapDispatchToProps(dispatch).getPetitionByComment()
        expect(dispatch).toHaveBeenCalledTimes(3)
    })
    
})

describe('mapStateToProps', () => {
    it ('test props', () => {
        const initialState = {
            hu : {
                petition_list: 1,
                petition_list_by_comment: 1
            },
            usr : {
                selectedUser: 1
            }
        }
        expect(mapStateToProps(initialState).selectedUser).toBe(1)
        expect(mapStateToProps(initialState).petitionList).toBe(1)
        expect(mapStateToProps(initialState).petitionListByComment).toBe(1)
    })
})