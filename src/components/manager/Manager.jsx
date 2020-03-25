import React, { Component } from 'react';
import { toast } from 'react-toastify';
import SummaryCard from './SummaryCard';
import ManagerControls from './ManagerControls';
import Banner from './DeckGrid/Banner';
import DeckGridSelector from './DeckGrid/DeckGridSelector';

import newDeckObj from '../../models/deck';
import { getDate } from '../../utils/date';
import auth from '../../services/auth';
import './Manager.scss'
import NameEdit from './NameEdit';

/**
 * Two column layout page, highlights a selected deck with a summary
 * while also displaying a small gallery to view additional decks.
 */
class Manager extends Component {
    state = {  
        user: {
            _id: "5e71024f43cd5d06a0421d4c",
            iat: 1584464463,
            nickname: "testuser1",
            email: "testuseremail",
            decks: [
                {
                    info: {
                        name: "test",
                        format: "casual",
                        colorIdentity: "mono-test"
                    }
                },
                {
                    info: {
                        name: "test2",
                        format: "casual",
                        colorIdentity: "mono-test"
                    }
                },
                {
                    info: {
                        name: "test3",
                        format: "casual",
                        colorIdentity: "mono-test"
                    }
                },
            ]
        }, 
        deck: newDeckObj(),
    }

    componentDidMount() {
        //Load a saved deck from local storage
        const data = localStorage.getItem('deck');
        const deck = JSON.parse(data);
        const user = auth.getCurrentUser();

        if(deck) this.setState({ deck });
        if(user) this.setState({ user });
    }

    onNameChange = (e) => {
        e.preventDefault();
        const name = e.currentTarget.value;
        const deck = this.state.deck;
        deck.info.name = name;
        this.setState({ deck });
    }

    onSaveHandler = () => {
        const deck = this.state.deck;
        deck.info.lastUpdated = getDate(); //Get date of update
        localStorage.setItem("deck", JSON.stringify(deck));
        toast.success("Deck Successfully Saved");
    }

    onDeleteHandler = () => {
        const shouldDelete = window.confirm("This is a destructive action, are you sure you want to delete your deck?");
        if(shouldDelete) {
            localStorage.removeItem('deck');
            toast.warn("Deck Was Deleted")
        }
    }

    onFormatChange = (e) => {
        e.preventDefault();
        const deck = this.state.deck;
        deck.info.format = e.currentTarget.value;
        this.setState({ deck })
    }
    
    onPlayStyleChange = (e) => {
        e.preventDefault();
        const deck = this.state.deck;
        deck.info.playstyle = e.currentTarget.value;
        this.setState({ deck })
    }

    onDeckSelectedHandler = (deck) => {
        console.log(deck)
    }

    render() { 
        return (  
            <React.Fragment>
                <div className = "alert alert-warning p-0 m-0" role="alert">
                    ~The current component is under construction, some features may be unavailable~
                </div>

                <div className = "container-fluid p-0">
                    <div className = "row no-gutters manager">
                        <div className = "col-6 white-overlay">
                            <div className = "row justify-content-center mt-2 mb-1 pl-5 pr-5">
                                <ManagerControls 
                                    history = {this.props.history}
                                    onSave = {this.onSaveHandler}
                                    onDelete = {this.onDeleteHandler}
                                />
                            </div>

                            <div className = "row justify-content-center m-0">
                                <NameEdit name = {this.state.deck.info.name} 
                                    onNameChange = {this.onNameChange}/>
                            </div>

                            <div className = "row ml-0 mr-0 mb-5">
                                <SummaryCard 
                                    deckInfo = {this.state.deck.info}
                                    onFormatChange = {this.onFormatChange}
                                    onPlayStyleChange = {this.onPlayStyleChange}
                                 />
                            </div>
                        </div>
    
                        <div className = "col-6">
                            <div className = "row manager-heading m-0 p-4">
                                <Banner 
                                    user = {this.state.user}
                                />
                            </div>

                            <div className = "row ml-0 mr-0 mt-5 mb-2">
                                <DeckGridSelector 
                                    decks = { this.state.user.decks }
                                    onDeckSelected = {this.onDeckSelectedHandler}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Manager;
