import React, { Component } from 'react';
//import our service
import JeopardyService from "../../services/JeopardyService";
class Jeopardy extends Component {
  //set our initial state and set up our service as this.client on this component
  constructor(props){
    super(props);
    this.client = new JeopardyService();
    this.state = {
      data: {},
      score: 0
    }
  }
  //get a new random question from the API and add it to the data object in state
  getNewQuestion() {
    return this.client.getQuestion().then(result => {
      this.setState({
        data: result.data[0]
      })
    })
  }
  //when the component mounts, get a the first question
  componentDidMount() {
    this.getNewQuestion();
  }
  updateScore(){
      let userAnswer=this.state.answer.toLowerCase();
      let dataAnswer = this.state.data.answer.toLowerCase();
      if (dataAnswer===userAnswer){
          this.setState((state,props)=>({
              score : state.score + state.data.value,
          }));
      }
      else {
          this.setState((state,props)=>({
            score : state.score - state.data.value,  
          }) )
      }
      this.getNewQuestion();
  }
  //display the results on the screen
  handleChange = (event)=> {
      let answer = event.target.value;
      this.setState({
          answer
      })
  }
  render() {
      let category = '';
      if (this.state.data.category){
          category = this.state.data.category.title
      }
    return (
      <div>
        <div>{JSON.stringify(this.state.data)}</div>
        <div>{JSON.stringify(this.state.data.category)}
        </div>
    <h6>{this.state.data.question}</h6>
    <h6>{this.state.data.value}</h6>
    <h6> {category}</h6>
        </div>

      
      
    );
  }
}
export default Jeopardy;