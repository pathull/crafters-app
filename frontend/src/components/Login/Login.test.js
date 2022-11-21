import Login from './Login';
import { render, screen } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
//import { mocked } from "ts-jest/utils";
import jestConfig from '../../../jest.config';

// jestConfig.mock('@auth0/auth0-react');
// const mockedUseAuth0 = mocked(useAuth0, true);

describe('Login component', () => {

  test('should render component if user is not authenticated', () => {

  })

});