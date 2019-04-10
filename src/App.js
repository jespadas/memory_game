import React, {Component} from 'react'
import './App.css'
import Card from './Card'
import GuessCount from './GuessCount'
import HallOfFame, {FAKE_HOF} from "./HallOfFame";
import shuffle from 'lodash.shuffle'
import './App.css'

const SIDE = 6;
const SYMBOLS = '😀🎉💖🎩🐶🐱🦄🐬🌍🌛🌞💫🍎🍌🍓🍐🍟🍿';

class App extends Component {

    state = {
        cards: this.generateCards(),
        currentPair: [],
        guesses: 0,
        matchedCardIndices: [],
    };

    generateCards() {
        const result = [];
        const size = SIDE * SIDE;
        const candidates = shuffle(SYMBOLS);
        while (result.length < size) {
            const card = candidates.pop();
            result.push(card, card)
        }
        return shuffle(result)
    }

    handleCardClick = index => {
        const {currentPair} = this.state;
        if (currentPair.length === 2) {
            return;
        }
        if (currentPair.length === 0) {
            this.setState({currentPair: [index]})
            return;
        }
        this.handleNewPairClosedBy(index);

    };

    getFeedbackforCard(index) {
        const {currentPair, matchedCardIndices} = this.state;
        const indexMatched = matchedCardIndices.includes(index);
        if (currentPair.length < 2) {
            return indexMatched || index === currentPair[0] ? 'visible' : 'hidden'
        }
        if (currentPair.includes(index)) {
            return indexMatched ? 'justMatched' : 'justMismatched'
        }
        return indexMatched ? 'visible' : 'hidden'
    }

    render() {
        const {cards, guesses, matchedCardIndices} = this.state;
        const won = matchedCardIndices.length === cards.length;
        return <div className="memory">
            <div className="memory">
                <GuessCount guesses={guesses}/>
                {cards.map((card, index) => (
                    <Card
                        card={card}
                        feedback={this.getFeedbackforCard(index)}
                        index={index}
                        key={index}
                        onClick={this.handleCardClick}
                    />
                ))
                }
                {won && <p><HallOfFame entries={FAKE_HOF}/> !</p>}
            </div>
        </div>
    }
}

export default App;
