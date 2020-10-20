import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from 'react-router-dom';
import App from './components/App/App';
import { unregister } from './registerServiceWorker';
import {createBrowserHistory} from 'history';
import {Provider}  from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './reducers';
const history = createBrowserHistory();
const store = createStore(rootReducer);
ReactDOM.render((
	<Provider store={store}>
		<BrowserRouter history={history}>
			<App />
		</BrowserRouter>
	</Provider>), document.getElementById('root'));
	
unregister()