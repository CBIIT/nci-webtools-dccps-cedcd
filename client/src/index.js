import React from 'react';
import ReactDOM from 'react-dom';
import { unregister } from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { getLookupTables } from './reducers/lookupReducer';
import RoutedApp from './components/RoutedApp/RoutedApp';
import './index.scss';


export const UserSessionContext = React.createContext(null);
const store = createStore(rootReducer, compose(
	applyMiddleware(thunk),
	window.__REDUX_DEVTOOLS_EXTENSION__
		? window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
		: e => e
));


(async function main() {
	const response = await fetch('/api/user-session');
	const userSession = await response.json();
	const lookupTables = await getLookupTables();
	store.dispatch({
		type: 'SET_LOOKUP',
		value: lookupTables,
	});

	ReactDOM.render(
		<UserSessionContext.Provider value={userSession}>
			<Provider store={store}>
				<RoutedApp />
			</Provider>
		</UserSessionContext.Provider>,
		document.getElementById('root')
	);

	unregister();
})();



