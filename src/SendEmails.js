import React, { Component } from 'react';
import './StyleSheet/SendEmails.css';
const databaseGroup = ["Marcetologs", "Engineers", "Programmers", "Dancers", "Singers"];
const databaseTemplate = ["Marcetologs", "Engineers", "Programmers", "Dancers", "Singers"];


class SendEmails extends Component {
    optionGroup(databaseGroup) {
        return databaseGroup.map((option, key) => <option key={key}> {option} </option>);
    }

    optionTemplate(databaseTemplate) {
        return databaseTemplate.map((option, key) => <option key={key}> {option} </option>);
    }
    render() {
        return (
            <div className="wrapper">
                <h3 className="list_head"> Send Email </h3>
                <div className="send_email">
                    <form action="#" method="POST">
                        <div className="mdl-textfield mdl-js-textfield">
                            <input className="mdl-textfield__input" name="email_subject" type="text" id="subject" />
                            <label className="mdl-textfield__label" htmlFor="subject">Subject</label>
                        </div>

                        <div className="option">
                            <select name="list_options" className="list_options">
                                <option value="" disabled selected>Choose Mailing Group</option>
                                {this.optionGroup(databaseGroup)}
                            </select>
                        </div>

                        <div>
                            <select name="list_options" className="list_options">
                                <option value="" disabled selected>Choose Template</option>
                                {this.optionTemplate(databaseTemplate)}
                            </select>

                            <div className="mdl-textfield mdl-js-textfield">
                                <textarea className="mdl-textfield__input" type="text" rows="3" id="message" name="message_send"></textarea>
                                <label className="mdl-textfield__label" htmlFor="message">Message</label>
                            </div>

                            <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored send" type="submit">Send</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default  SendEmails ;