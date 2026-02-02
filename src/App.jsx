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


function App(props) {
  
  const [term, setTerm] = useState("")
  const [definition, setDefinition] = useState("")
  const [example, setExample] = useState("")
  const [wordsets, setWordsets] = useState([]) //will have to be separated by wordset

  const [words, setWords] = useState([]) //will have to be separated by wordset
  function CreateWord(e) {
    e.preventDefault()
    axios.post("http://localhost:5000/words", {term, definition, example}).then
  }
  function handleChange(e) {
    switch (e.target.id) { //this is either brilliant or stupid, we'll see
      case 'terminput':
        setTerm(e.target.value)
        break;
      case 'definitioninput':
        setDefinition(e.target.value)
        break
      case 'exampleinput':
        setExample(e.target.value)
        break
      default:
        console.log("Form submit error!")
        break;
    }
  }
  switch (props.pagename) { //return the right content based on the pagename (we always return the nav menu, avoid the repetition)
    case "main":
      return (
        <>
          <NavMenu/>
          <select> //select the vocab set to operate on
            
          </select>
          <form onSubmit={CreateWord}>
            <label htmlFor='terminput'>Term</label>
            <input id='terminput' value={term} onChange={handleChange}/>
            <label htmlFor='definitioninput'>Definition</label>
            <input id='definitioninput' value={definition} onChange={handleChange}/>
            <label htmlFor='exampleinput'>Example sentence</label>
            <input id='exampleinput' value={example} onChange={handleChange}/>
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
