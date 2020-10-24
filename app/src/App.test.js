import { shallow, configure } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import toJson from 'enzyme-to-json'
import App from './App.js'; // The component being tested
import PhotoContainer from './components/PhotoContainer'
import Photo from "./components/Photo.js"

configure({ adapter: new Adapter() });

it('renders an photo', () => {
  const match = { params : { } }
  const wrapper = shallow(<PhotoContainer  match={match}/>);
  expect(wrapper.find('.photo-list').exists()).toBe(true)
});

it("App renders correctly", () => {
  const tree = shallow(<App />);
  expect(toJson(tree)).toMatchSnapshot();
});

it("Photo renders correctly", () => {
  const tree = shallow(<Photo url="" />);
  expect(toJson(tree)).toMatchSnapshot();
});
