import { configure, shallow, render, mount } from "enzyme";
import { jsdom } from "../node_modules/jsdom";
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

global.shallow = shallow;
global.render = render;
global.mount = mount;
global.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
};
