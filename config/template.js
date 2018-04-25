/**
 * email template
 */

'use strict';

module.exports = {
	//contact us email template
	email_contact: "<p>This is an automated email generated from the CEDCD Website.</p><p>Researcher:  <%= firstname %>  <%= lastname %></p>"
					+"<p>Organization: <%= organization %>, Phone Number: <%= phone %></p>"
					+"<p>Email: <%= email %></p>"
					+"<p>Topic: <%= topic %></p>"
					+"<p>Message: <%= message %></p>"
};