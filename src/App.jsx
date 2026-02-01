import { useState } from 'react'
import './App.css'
import axios from 'axios';
function MenuButton(props) {
  let filename = props.pagename.toLowerCase() + ".html"
  return(
    <a href= {filename}>{props.pagename}</a>
  )
}
function NavMenu(){
  return(
    <nav>
            <MenuButton pagename="Home"></MenuButton>
            <MenuButton pagename="Learn"></MenuButton>
            <MenuButton pagename="Statistics"></MenuButton>
    
    </nav>
  )
}
function CreateWordset(params) {
  fetch()
}
function App(props) {
  const [count, setCount] = useState(0)
  switch (props.pagename) { //return the right content based on the pagename (we always return the nav menu, avoid the repetition)
    case "main":
      return (
        <>
          <NavMenu/>
          <select> //select the vocab set to operate on
            
          </select>
          <form onSubmit={CreateWordset}>
            <label htmlFor='terminput'>Term</label>
            <input id='terminput'></input>
            <label htmlFor='definitioninput'>Definition</label>
            <input id='terminput'></input>
            <label htmlFor='exampleinput'>Example sentence</label>
            <input id='exampleinput'></input>
          </form> //a form to create a new word
        </>
      )
    case "learn":
      return(
        <>
          <NavMenu/>

        </>
      )
    case "statistics":
      return(
        <>
          
          <NavMenu/>
          <h2>Number of words learned:</h2>
          <h2>Quiz score:</h2>
          
        </>
      )
    default:
      return(
        <>
          <h1>Oops - page not found!</h1>
          <p>Whatever langauge you're trying to learn, it likely lacks words for how lost you are.</p> 
        </>
        
      )
  }
  
}

export default App
