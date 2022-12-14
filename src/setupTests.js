/* eslint-disable */

import '@testing-library/jest-dom'
import {configure as eConfigure} from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

import {configure} from '@testing-library/react'

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    }
  }

configure({testIdAttribute: 'testid'})

eConfigure({adapter: new Adapter()})
