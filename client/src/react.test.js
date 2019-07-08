import React from 'react';
import { shallow } from 'enzyme';
import PersonnelCarousel from 'components/PersonnelCarousel.jsx';

describe('PersonnelCarousel component', () => {

  test('should render without throwing an error', () => {
    shallow(<PersonnelCarousel />)
  })

})

