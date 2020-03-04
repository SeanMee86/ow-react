import React, {Component} from 'react';
import axios from 'axios';
import Characters from './Characters/Characters';
import Info from './Info/Info';
import Header from './Header/Header';
import './App.scss';

class App extends Component {
    state = {
        characters: [],
        characterCache: [],
        isClickable: true,
        limitReached: false
    };

    componentDidMount() {
        this.getCharacters();
    }

    getCharacters = async () => {
        if(this.state.characterCache.length === 0) {
            try{
                let response = await axios.get('/heroes');
                let {data} = response;
                this.setState({
                    characters: data,
                    characterCache: data,
                });
            }catch(error) {
                this.setState({limitReached: true});
                console.log(JSON.stringify(error));
            }
        }else{
            let data = this.state.characterCache;
            this.setState({
                characters: data,
                isClickable: true
            })
        }
    };

    checkServer = async () => {
        const response = await axios.get("/api");
        console.log(response);
    };

    getHeroes = async () => {
        const response = await axios.get("/heroes");
        console.log(response);
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

    loadCharacter = async index => {
        const id = index-1;
        if(!this.state.characterCache[id].data) {
            let response = await axios.get(this.state.characters[id].url);
            let characterCache = [...this.state.characterCache];
            characterCache[id].data = response.data;
            this.setState({characterCache});
        }
        this.setState({
            characters: [this.state.characters[id]],
            isClickable: false
        });
        window.scrollTo(0,0);
    };

    showInfo = () => this.state.characters.length === 1 ? (
      <Info
        click={this.getCharacters}
        content={this.state.characters[0]}/>
    ) : null;

    render() {
        const style = {
            justifyContent: this.state.characters.length === 1 ? "flex-start" : "center"
        };
        const marginLeft = {
            marginLeft: "20px"
        };
        return (
            <div className="App">
                <Header/>
                <hr/>
                {this.state.isClickable ? <div className={'charSelect'}>select your hero...</div> : null}
                <div style={style} className={'characterContainer'}>
                    {this.state.limitReached ? (<div style={marginLeft}>The hourly limit has been reached please try back later.</div>) : null}
                    {this.state.characters.length === 0 && !this.state.limitReached ? (
                        <div style={marginLeft}>Loading...</div>
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
                {!this.state.isClickable ? <button style={marginLeft} onClick={() => this.getCharacters()} className="btn btn-outline-primary">Return to Character Select</button> : null}
                <button onClick={() => this.checkServer()}>Check Server</button>
                <button onClick={() => this.getHeroes()}>Log Heroes</button>
            </div>
        );
    }
}

export default App;
