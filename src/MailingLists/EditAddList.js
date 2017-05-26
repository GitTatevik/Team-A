import React, { Component } from 'react';


class EditAddList extends Component {
    constructor(props) {
        super(props);
        this.autoOffer = this.autoOffer.bind(this);
        this.putMail = this.putMail.bind(this);
        this.deleteEmails = this.deleteEmails.bind(this);
        this.renderPuttingMails = this.renderPuttingMails.bind(this);
        this.renderOptions = this.renderOptions.bind(this);
        this.state = { mydata: [], putmails: [], save: false };

    };

    saving() {
        this.setState({ save: true })
    }

    componentDidMount() {
        if (this.props.editMode) {
            this.setState({ putmails: this.props.database.emails })
        }
    }

    componentWillUnmount(){
        if(!this.props.editMode){
            this.setState({ putmails: [] })
        }
    }
    // Searching and autoComplete the database
    autoOffer(e) {
        const database = this.props.database.emails
        const stores = [];
        database.forEach(function (value, key) {
            if (value.indexOf(e.target.value) !== -1 && e.target.value.length > 1) {
                stores.push(value);
            }
            else {
                return 0;
            };
        })
        this.setState({ mydata: stores });
        console.log(this.state.mydata);
    };


    // Inserting email to list and deleting the added email from Offerred list  
    putMail(e) {
        const temporary = [];
        temporary.push(e.target.innerHTML);
        const con = temporary.concat(this.state.putmails)
        this.setState({ putmails: con });
        const partIndex = this.state.mydata.indexOf(e.target.innerHTML);
        this.state.mydata.splice(partIndex, 1);
        this.setState({ mydata: this.state.mydata });
    };

    deleteEmails(e) {
        const valuesof = this.state.putmails.filter((value) => { return value !== e.target.parentNode.previousSibling.innerHTML });
        this.setState({ putmails: valuesof });
    };

    renderOptions(value, key) {
        return (<div className="searchRes" id={key} onClick={this.putMail} key={key}>{value}</div>);
    };

    renderPuttingMails(value, key) {
        return (
            <span key={key}>
                <span className="mdl-chip mdl-chip--deletable">
                    <span className="mdl-chip__text">{value}</span>
                    <span onClick={this.deleteEmails} type="button" className="mdl-chip__action"><i className="material-icons">cancel</i></span>
                </span>
            </span>)
    };

    render() {
        return (
            <div>
                <div className="menuListWrap">

                    <div className="add_list">
                        <form action="#" method="POST">
                            <div>
                                <input className="list_input" type="text" id="list_name" required name="listname" placeholder="Mailing List Name" />
                            </div>
                            <div>
                                <input className="list_input" onChange={this.autoOffer} type="email" name="emails" placeholder="Add Emails to List" />
                                <div className="searchMail">{this.state.mydata.map(this.renderOptions.bind(this))}</div>
                            </div>
                            <div className="mail_area" name="all_emails">
                                {this.state.putmails.map(this.renderPuttingMails)}
                            </div>
                            <button onClick={this.props.closeMode} className="listbut save_list" name="submit" type="submit">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    };
};
export { EditAddList };


