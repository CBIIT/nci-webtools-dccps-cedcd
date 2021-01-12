import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { initializeLookup } from './reducers/lookupReducer';
import { fetchUser } from './reducers/user';
import RoutedApp from './components/RoutedApp/RoutedApp';
import './index.scss';

(async function main() {
	const store = configureStore({
		reducer,
		middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: true,
			serializableCheck: false,
			immutableCheck: false,
		}),
	});
	await store.dispatch(initializeLookup());
	await store.dispatch(fetchUser());
	ReactDOM.render(
		<Provider store={store}>
			<RoutedApp />
		</Provider>,
		document.getElementById('root')
	);
})();