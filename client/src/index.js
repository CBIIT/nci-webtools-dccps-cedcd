import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from 'react-router-dom';
import App from './components/App/App';
import { unregister } from './registerServiceWorker';
import {createBrowserHistory} from 'history';
import {Provider}  from 'react-redux';
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { initializeLookup } from './reducers/lookupReducer';
import './main.scss';


const history = createBrowserHistory();
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
	store.dispatch(initializeLookup());

	ReactDOM.render(
		<UserSessionContext.Provider value={userSession}>
			<Provider store={store}>
				<BrowserRouter history={history}>
					<App />
				</BrowserRouter>
			</Provider>
		</UserSessionContext.Provider>, 
		document.getElementById('root')
	);
		
	unregister();
})();



