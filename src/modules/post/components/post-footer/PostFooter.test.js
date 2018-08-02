import React from "react";
import enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PostFooter from "./PostFooter";

enzyme.configure({ adapter: new Adapter() });

let props = {
  post: {
    _id: 1,
    liked: false,
    likesAmount: 10,
    moreComments: false,
    authorName: "Vitalii Dvorian",
    comments: ["1","2","3","4","5","6","7"]
  }
};

test("PostFooter rendering", () => {
  let component = shallow(<PostFooter {...props} />);
  expect(component.find(".author-name")).toHaveLength(4);
  expect(component.find(".author-comment")).toHaveLength(4);
  expect(component.find(".likes-amount")).toHaveLength(1);
  expect(component.find(".comment-icon")).toHaveLength(1);
  expect(component.find(".date")).toHaveLength(1);
  expect(component.find(".text-field")).toHaveLength(1);
});

test("PostFooter show more comments", () => {
  let component = shallow(<PostFooter {...props} />);
  expect(component.instance().state.moreComments).toEqual(false);
  component.find(".load-comments").simulate("click");
  expect(component.instance().state.moreComments).toEqual(true);
});

test("PostFooter add like", () => {
  let component = mount(<PostFooter {...props} />);
  expect(component.instance().state.likesAmount).toEqual(10);
  component.find(".likeComp").simulate("click");
  expect(component.instance().state.likesAmount).toEqual(11);
})
