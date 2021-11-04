import React from 'react';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import AppRouter, { AppRouterProps } from './AppRouter';
import Storage from '../StorageModel/Storage';
import { JustGraphitStore } from '../JustGraphitTypes';

const initialObject = { 'empty graph': [] } as unknown as JustGraphitStore;

const mockStorage: Partial<Storage> = {
  deleteObject: jest.fn(),
  getAllKeys: jest.fn(() => []),
  getInitialObject: () => initialObject,
  load: jest.fn(),
  save: jest.fn(),
  // persistentStore: mockLocalStorageWrapper,
  store: jest.fn() as unknown as JustGraphitStore,
  getAll: jest.fn(),
  getInitialKey: jest.fn(),
  updatePersistence: jest.fn(),
  isEmpty: jest.fn(),
};

jest.mock('../StorageModel/Storage', () => {
  return {
    Storage: jest.fn().mockImplementation(() => {
      return mockStorage;
    }),
  };
});

let appRouterProps: AppRouterProps;
beforeEach(() => {
  appRouterProps = {
    storage: mockStorage as unknown as Storage,
  };
});

test('deep snapshot', () => {
  const component = renderer.create(<AppRouter {...appRouterProps} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('shallow snapshot', () => {
  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<AppRouter {...appRouterProps} />);
  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
