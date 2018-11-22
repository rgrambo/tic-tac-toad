import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    render() {
        return (
            <button
                className="square"
                onClick={() => this.props.onClick()}
            >
                <Icon i={this.props.player}/>
            </button>
        );
    }
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square
            player={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />;
    }

    render() {
        return (
            <div className="board">
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            players: 2,
            turn: 0,
            gameId: 0,
            history: [{
                squares: Array(9).fill(null),
            }]
        };
    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        let status = <div className="status">
            <h3>Next Player: </h3>
            <Icon i={this.props.turn}/>
        </div>;

        let winner = this.checkVictory();
        if (winner != null) {
            status = <div className="status">
                <h3>WINNER: </h3>
                <Icon i={winner}/>
            </div>;
        }

        return (

            <div className="game">
                <div className="game-header">
                    {status}
                </div>
                <div className="game-board" key={this.state.gameId}>
                    <Board
                        squares={squares}
                        onClick={(i) => this.handleClick(i)}/>
                </div>
                <div className="game-info">
                    <button
                        className="reset-button"
                        onClick={() => this.setState({
                            players: 2,
                            turn: 0,
                            gameId: this.state.gameId + 1,
                            history: [{
                                squares: Array(9).fill(null),
                            }]
                        })}
                    >
                        New 2 Player
                    </button>
                    <button
                        className="reset-button"
                        onClick={() => this.setState({
                            players: 3,
                            turn: 0,
                            gameId: this.state.gameId + 1,
                            history: [{
                                squares: Array(9).fill(null),
                            }]
                        })}
                    >
                        New 3 Player
                    </button>
                    <button
                        className="reset-button"
                        onClick={() => this.setState({
                            players: 4,
                            turn: 0,
                            gameId: this.state.gameId + 1,
                            history: [{
                                squares: Array(9).fill(null),
                            }]
                        })}
                    >
                        New 4 Player
                    </button>
                </div>
            </div>
        );
    }

    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (squares[i] == null && this.checkVictory() == null) {
            squares[i] = this.state.turn;

            let nextTurn = this.state.turn + 1;
            if (nextTurn >= this.state.players) {
                nextTurn = 0;
            }

            this.setState({
                players: this.state.players,
                history: history.concat([{
                    squares: squares,
                }]),
                squares: squares,
                turn: nextTurn
            });
        }
    }

    checkVictory() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        console.log(squares);

        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        console.log("CHECKING");
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            console.log(squares[a] + ' ' + squares[b] + ' ' + squares[c])
            if (squares[a] != null && squares[a] === squares[b] && squares[b] === squares[c]) {
                console.log("Winner");
                return squares[a];
            }
        }

        return null;
    }
}

class Icon extends React.Component {
    render() {
        let source = '';

        switch (this.props.i) {
            case 0:
                source = './images/toad.jpg';
                break;
            case 1:
                source = './images/toad-mario.jpg';
                break;
            case 2:
                source = './images/mr-toad.png';
                break;
            case 3:
                source = './images/green-toad.jpg';
                break;
            default:
                return ('');
        }

        return (<img alt="icon" src={source} style={iconStyle}/>);
    }
}

const iconStyle = {
    width: '25px',
};

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
