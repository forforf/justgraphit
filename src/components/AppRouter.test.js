import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import AppRouter from './AppRouter';


let appRouterProps = null;
beforeEach(() => {
  const plainObj = {'empty graph': []};

  const mockStorage = {
    deleteObject: jest.fn(),
    getAllKeys: jest.fn(() => []),
    getLastKey: jest.fn(),
    getLastStorageObject: jest.fn(() => plainObj),
    load: jest.fn(),
    save: jest.fn()
  }

  appRouterProps = {
    storage: mockStorage
  }
})

test('deep snapshot', () => {
  const component = renderer.create(<AppRouter {...appRouterProps}/>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('shallow snapshot', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<AppRouter {...appRouterProps}/>);
  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot()
});
