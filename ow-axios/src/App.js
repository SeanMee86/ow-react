import React, {Component} from 'react';
import axios from 'axios';
import Characters from './Characters/Characters';
import Info from './Info/Info';
import Header from './Header/Header';
import './App.css';

class App extends Component {
    state = {
        characters: [],
        characterSelect: {}
    };

    componentDidMount() {
        this.getCharacters();
    }

    getCharacters = async () => {
        let response = await axios.get('https://overwatch-api.net/api/v1/hero');
        let { data } = response.data;
        this.setState({characters: data});
    };

    fixCharacterName = (characterName) => {
        switch(characterName){
            case 'lcio':
                return 'lucio';
            case 'torbjrn':
                return 'torbjorn';
            case 'soldier76':
                return 'soldier-76';
            default:
                return characterName;
        }
    };

    loadCharacter = id => this.setState({characterSelect: this.state.characters[id-1]});

    showInfo = () => {
        if(this.state.characters.length > 0){
            return (
                Object.entries(this.state.characterSelect).length === 0
                &&
                this.state.characterSelect.constructor === Object ?
                (
                    <div className={'info'}>Please select a character...</div>
                ) :
                (
                    <Info content={this.state.characterSelect}/>
                )
            )
        }
    };

    render() {
        return (
            <div className="App">
                <Header/>
                <hr/>
                <div className={'characterContainer'}>
                    {this.state.characters.length === 0 ? (
                        <div>Loading...</div>
                    ) : (
                        this.state.characters.map((character, ind) => {
                            return <Characters
                                click={this.loadCharacter}
                                hero={character.id}
                                key={ind}
                                content={this.fixCharacterName(character.name.replace(/[^\w-]/g, '').toLowerCase())}/>
                        })
                    )}
                </div>
                {this.showInfo()}
            </div>
        );
    }
}

export default App;
