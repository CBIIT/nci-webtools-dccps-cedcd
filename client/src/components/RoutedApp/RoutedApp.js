import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import App from '../App/App';
import Modal from '../controls/modal/modal';

export default function RoutedApp() {
	const [modal, setModal] = useState({
		show: false,
		title: <span>Leaving Page</span>,
		body: <div className="py-4">You may have unsaved changes. Please confirm that you wish to navigate away from the current page.</div>,
		footer: <div>
			<Button className="col-lg-2 col-md-6" variant="primary">Confirm</Button>
			<Button className="col-lg-2 col-md-6" variant="secondary">Cancel</Button>
		</div>
	});
	const mergeModal = obj => setModal({...modal, ...obj});

	return <BrowserRouter 
		getUserConfirmation={(message, callback) => {
			if (!message) {
				callback(true);
			}
			
			else {
				mergeModal({
					show: true,
					body: message,
					footer: <div>
						<Button 
							variant="secondary"
							className="col-lg-2 col-md-6"
							onClick={e => {
								callback(false);
								mergeModal({show: false});
							}}>
							Cancel
						</Button>
						<Button 
							variant="primary"
							className="col-lg-2 col-md-6"
							onClick={e => {
								callback(true);
								mergeModal({show: false});
							}}>
							Confirm
						</Button>
					</div>
				})
			}
		}}>
		<Modal {...modal} />
		<App />
	</BrowserRouter>
}