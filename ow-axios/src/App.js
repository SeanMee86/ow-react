import React, {Component} from 'react';
import axios from 'axios';
import Characters from './Characters/Characters';
import Info from './Info/Info';
import Header from './Header/Header';
import './App.css';

class App extends Component {
    state = {
        characters: [],
        characterCache: [],
        isClickable: true
    };

    componentDidMount() {
        this.getCharacters();
    }

    getCharacters = async () => {
        if(this.state.characterCache.length === 0) {
            let response = await axios.get('https://overwatch-api.net/api/v1/hero');
            let {data} = response.data;
            this.setState({
                characters: data,
                characterCache: data,
            });
        }else{
            let data = this.state.characterCache;
            this.setState({
                characters: data,
                isClickable: true
            })
        }
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

    loadCharacter = id => {
        this.setState({
            characters: [this.state.characters[id-1]],
            isClickable: false
        });
    };

    showInfo = () => this.state.characters.length === 1 ? (
      <Info
        click={this.getCharacters}
        content={this.state.characters[0]}/>
    ) : (
      <div className="info">Please select a character...</div>
    );

    render() {
        const style = {
            justifyContent: this.state.characters.length === 1 ? "flex-start" : "center"
        }
        return (
            <div className="App">
                <Header/>
                <hr/>
                <div style={style} className={'characterContainer'}>
                    {this.state.characters.length === 0 ? (
                        <div>Loading...</div>
                    ) : (
                        this.state.characters.map((character, ind) => {
                            return <Characters
                                actionToTake={this.state.isClickable}
                                loadSingleChar={this.loadCharacter}
                                loadAllChars={this.getCharacters}
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
