import React, {Component} from 'react';
import axios from 'axios';
import CharacterSelect from './Characters/CharacterSelect/CharacterSelect'
import CharacterInfo from './Characters/CharacterInfo/CharacterInfo'
import Header from './Header/Header';
import './App.scss';

class App extends Component {
    state = {
        characters: [],
        loadFailed: false,
        characterSelected: {
            selected: false,
            character: null
        }
    };

    async componentDidMount() {
        await this.getCharacters();
    }

    getCharacters = async () => {
        try{
            const response = await axios.get('/heroes');
            const {data} = response;
            this.setState({
                characters: data,
            });
        }catch(error) {
            this.setState({loadFailed: true});
            console.log(JSON.stringify(error));
        }
    };

    toSelectScreen = () => {
        this.setState({characterSelected: {selected: false}})
    };

    characterSelect = (character) => {
        this.setState({
            characterSelected: {
                selected: true,
                character
            }
        })
    };

    render() {
        const style = {
            justifyContent: "center"
        };
        const marginLeft = {
            marginLeft: "20px"
        };

        return (
            <div className="App">
                <Header/>
                <hr/>
                {
                    !this.state.characterSelected.selected ?
                        <div className={'charSelect'}>select your hero...</div> :
                        null
                }

                <div style={style} className={'characterContainer'}>
                    {
                        this.state.loadFailed ?
                            <div style={marginLeft}>The hourly limit has been reached please try back later.</div> :
                            null
                    }

                    {
                        this.state.characters.length === 0 && !this.state.loadFailed ?
                            <div style={marginLeft}>Loading...</div> :
                        !this.state.characterSelected.selected ?
                            <CharacterSelect
                                characters={this.state.characters}
                                selectCharacter={this.characterSelect}/> :
                            <CharacterInfo
                                returnToSelect={this.toSelectScreen}
                                character={this.state.characterSelected.character}/>
                    }
                </div>
                {
                    this.state.characterSelected.selected ?
                        <button
                            style={marginLeft}
                            onClick={() => this.toSelectScreen()}
                            className="btn btn-outline-primary">Return to Character Select</button> :
                        null
                }
            </div>
        );
    }
}

export default App;
