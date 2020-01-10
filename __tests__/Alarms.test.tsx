import React  from 'react';
import TestRenderer, { ReactTestInstance } from 'react-test-renderer';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import Alarms from '../src/Alarms';
import BottomSheet from '../src/BottomSheet';

describe('bottom sheet', function () {

    let instance: ReactTestInstance;
    beforeEach(() => {
        instance = TestRenderer.create(
          <Alarms/>
        ).root;
      });

      it ('should display overlay when menu icon clicked', () => {
        
        expect(instance.findAll(x => x.props.testID === 'overlay')).toHaveLength(0);

        const actionItem1 = instance.find(x => x.props.testID === 'header-action-item0');
        actionItem1.props.onPress();
        expect(instance.findAll(x=>x.props.testID === 'overlay')).not.toHaveLength(0);
    });

    it ('should close overlay when cancel button clicked', () => {
        
        expect(instance.findAll(x => x.props.testID === 'overlay')).toHaveLength(0);

        const actionItem1 = instance.find(x => x.props.testID === 'header-action-item0');
        actionItem1.props.onPress();
        expect(instance.findAll(x=>x.props.testID === 'overlay')).not.toHaveLength(0);

        const cancelItem = instance.find(x => x.props.testID === 'cancel-button');
        cancelItem.props.onPress();
        expect(instance.findAll(x=>x.props.testID === 'overlay')).toHaveLength(0);
    });

    it('should close overlay when overlay pressed', () => {

        const actionItem1 = instance.find(x => x.props.testID === 'header-action-item0');
        actionItem1.props.onPress();
        expect(instance.findAll(x=>x.props.testID === 'overlay')).not.toHaveLength(0);

        const overlayItem = instance.find(x => x.props.testID === 'overlay');
        overlayItem.props.onTouchStart();

        expect(instance.findAll(x=>x.props.testID === 'overlay')).toHaveLength(0);

    });

    it('should update bottomsheet state accordingly', () => {
        const wrapper = shallow(<Alarms />);
        expect(wrapper.instance().state.showBottomSheet).toEqual(false);
        expect(wrapper.find(BottomSheet).props().show).toEqual(false);

        wrapper.instance().setState({ showBottomSheet: true });
        expect(wrapper.find(BottomSheet).props().show).toEqual(true);

        wrapper.instance().setState({ showBottomSheet: false });
        expect(wrapper.find(BottomSheet).props().show).toEqual(false);
    });
});