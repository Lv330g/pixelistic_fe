import React from "react";
import enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { SignUp } from "./SignUp";

enzyme.configure({ adapter: new Adapter() });

let props = {
        nickname: '',
        email: '',
        password: '',
        passwordConf: ''
};

test("SignUp rendering", () => {
  let component = shallow(<SignUp {...props} />);
  expect(component.find(".sign-up")).toHaveLength(1);
  expect(component.find(".intro-text")).toHaveLength(1);
  expect(component.find("#inp-nickname")).toHaveLength(1);
  expect(component.find('#inp-email')).toHaveLength(1);
  expect(component.find('#inp-confirm')).toHaveLength(1);
  expect(component.find('.submit-btn')).toHaveLength(1);
  expect(component.find('Link [to="/sign-in"]')).toHaveLength(1);
});

//
// there will be validation tests
//
