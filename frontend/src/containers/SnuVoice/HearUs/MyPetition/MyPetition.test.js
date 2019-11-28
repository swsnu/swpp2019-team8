import React from 'react';
import { shallow } from 'enzyme';
import { MyPetition, mapDispatchToProps, mapStateToProps } from './MyPetition';

describe('<MyPetition />', () => {
    let props;
    let mock = jest.fn();
    let mockHistory = { push : jest.fn() };

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
        expect(mock).toHaveBeenCalledTimes(2)
    })

    it('should onClickDetailButton work', () => {
        const component = shallow(<MyPetition {...props} history={mockHistory} />);
        component.instance().onClickDetailButton( { target : { value: "1"}} );
        expect(mockHistory.push).toHaveBeenCalledWith('/hear_us/1');

    })

    it('should render without error when signIn is true', () => {
        const component = shallow(<MyPetition {...props} history={mockHistory}/>)
        component.instance().componentDidMount()
        expect(mockHistory.push).toHaveBeenCalledWith('/hear_us')
    })

    it('should render without error when signIn is false', () => {
        const component = shallow(<MyPetition {...props} signIn={false}/>)
        const body = component.find('.MyPetition')
        expect(body.length).toBe(1)
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
    })
    
})

describe('mapStateToProps', () => {
    it ('test props', () => {
        const initialState = {
            hu : {
                petition_list: 1,
            },
            usr : {
                selectedUser: 1
            }
        }
        expect(mapStateToProps(initialState).selectedUser).toBe(1)
        expect(mapStateToProps(initialState).petitionList).toBe(1)
    })
})