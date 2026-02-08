//the git repo was only in the fronted folder, so important changes aren't in it
import { useEffect, useState } from 'react'
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
  //the 3 below are for the form
  const [term, setTerm] = useState("")
  const [definition, setDefinition] = useState("")
  const [example, setExample] = useState("")

  const [wordsets, setWordsets] = useState([])

  const [words, setWords] = useState([]) //will have to be separated by wordset
  useEffect(()=>{ //get the data from the db
    async () =>{
      const response = await axios.get("http://localhost:8080/wordsets")
      setWordsets(response.data)
    }
  },[wordsets])
  
  useEffect(()=>{ //get the data from the db
    async () => {
      const response = await axios.get("http://localhost:8080/words")
      setWords(response.data)
    }
  },[words])

  function CreateWord(e) {
    e.preventDefault()
    useEffect(()=>{
          axios.post("http://localhost:8080/words", {term, definition, example}).then //THIS IS NOT COMPLETE
    }, [])
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
      const wordsetOptions = []
      for (let i = 0; i < wordsets.length; i++) {
        console.log(wordsets[i])
        wordsetOptions.push(
          () =>{return <option value={wordsets[i]}></option> }
        );
      }
      return (
        <>
          <NavMenu/>
          <select>
            {wordsetOptions}
          </select>
          <form onSubmit={CreateWord}>
            <label htmlFor='terminput'>Term</label>
            <input id='terminput' value={term} onChange={handleChange}/> <br />
            <label htmlFor='definitioninput'>Definition</label>
            <input id='definitioninput' value={definition} onChange={handleChange}/> <br />
            <label htmlFor='exampleinput'>Example sentence</label>
            <input id='exampleinput' value={example} onChange={handleChange}/> <br />
            <input type="submit" value='Add word'/>
          </form> {/*a form to create a new word*/}
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
