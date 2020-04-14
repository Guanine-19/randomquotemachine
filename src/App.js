import React from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

class QuoteBox extends React.Component {
  render(){
    return(
      <div id="quoteTainer">
        <hr />
        <h2 id="text">{this.props.quote.quote}</h2>
        <h3 id="author">{this.props.quote.author}</h3>
        <hr />
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      randQuote: [],
      readQuotes: [],
      isLoading: true,
      randIndex: 0,
      error: null
    }

    this.nextQuote = this.nextQuote.bind(this);
    this.previousQuote = this.previousQuote.bind(this);
  }

  fetchQuotes() {
    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
    .then(response=> response.json())
    .then(response => this.setState({randQuote: response.quotes, isLoading: false}))
    .then(()=>this.nextQuote())
    .catch(error => this.setState({error, isLoading: false}))
  }
  
  nextQuote() {
    this.setState({
      readQuotes: this.state.readQuotes.concat(this.state.randIndex),
      randIndex: Math.floor(Math.random()*this.state.randQuote.length)
    })
    window["changeBackground"]();
  }

  previousQuote() {
    if (this.state.readQuotes.length>1){
      this.setState({
        randIndex: this.state.readQuotes.pop()
      })
    }
    window["changeBackground"]();
  }

  componentDidMount() {
    this.fetchQuotes();
  }

  render(){
    const {randQuote, randIndex, isLoading, error} = this.state;
    return(
        <div id="quote-box" class="jumbotron animated fadeIn mx-auto justify-content-center">
        <div class="row">
            <h1 class="display-4">Here's a Random Quote:</h1>
            <hr />
            {error? <p>{error.message}</p>: null}
            {!isLoading? 
            <QuoteBox quote={randQuote[randIndex]} class="lead"/>
            : <Spinner animation="border" variant="dark" />
          }
        </div>
        <div class="row">
          <div class="col-7">
            <Button variant="light" onClick={this.previousQuote}><i class="fas fa-arrow-alt-circle-left"></i> Previous</Button>
            <Button id="new-quote" variant="dark" onClick={this.nextQuote}><i class="far fa-arrow-alt-circle-right"></i> Next</Button>
          </div>
          <div class="col-5"><p>Share on Twitter <a id="tweet-quote" href="twitter.com/intent/tweet"><i class="fab fa-twitter"></i></a></p></div>
        </div>
      </div>
    )
  }
}

export default App;
