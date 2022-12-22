/**
 * email template
 */

'use strict';

const template = {
	//contact us email template
	email_contact: "<p>This is an automated email generated from the CEDCD Website.</p><p>Researcher:  <%= firstname %>  <%= lastname %></p>"
					+"<p>Organization: <%= organization %>, Phone Number: <%= phone %></p>"
					+"<p>Email: <%= email %></p>"
					+"<p>Topic: <%= topic %></p>"
					+"<p>Message: <%= message %></p>",
	email_contact_recieved:"<pre>This is an automated email generated from the CEDCD Website. </pre><br>"
							+"<pre>Thank you.  We received your email message and someone will get back to you within two business days.\n"
							+"If you have other questions, please contact the CEDCD Support Team at CEDCDWebAdmin@mail.nih.gov.</pre><br>"  
							+"<pre>Thank you,</pre><br>"
							+"<pre>The CEDCD Support Team</pre>"
};

export default template;