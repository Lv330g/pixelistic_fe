import React from "react";
import enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { SignIn } from "./SignIn";

enzyme.configure({ adapter: new Adapter() });

let props = {
  user: null,
  error: null,
  errMsg: null,
  onSignIn: jest.fn()
};

test("SignIn rendering", () => {
  let component = shallow(<SignIn {...props} />);
  expect(component.find(".sign-in")).toHaveLength(1);
  expect(component.find(".signin-container")).toHaveLength(1);
  expect(component.find(".submit-btn")).toHaveLength(1);
  expect(component.find('Link [to="/sign-up"]')).toHaveLength(1);
});

//
// there will be validation tests
//
