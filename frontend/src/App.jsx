import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
function App() {
  const [currentPage, setCurrentPage] = useState("Home")
  //the 3 below are for the create word form
  const [term, setTerm] = useState("")
  const [definition, setDefinition] = useState("")
  const [example, setExample] = useState("")

  //and this one is for the create wordset form
  const [wordsetName, setWordsetName] = useState("")

  const [wordsets, setWordsets] = useState([])

  const [words, setWords] = useState([]) //will have to be separated by wordset

  const CreateWord = (e) =>{
    e.preventDefault();
    useEffect(()=>{
        axios.post("http://localhost:8080/words", {term, definition, example})
    }, [])
  };
  const CreateWordset = (e) =>{
    e.preventDefault();
    useEffect(()=>{
        axios.post("http://localhost:8080/wordsets", {term, definition, example})
    }, [])
  }
  useEffect(()=>{
    axios.get("http://localhost:8080/wordsets").then((response) =>{
      setWordsets(response.data)
      console.log(response.data)
    })
  }, [])
  useEffect(()=>{ //get the data from the db
    async () => {
      const response = await axios.get("http://localhost:8080/words")
      setWords(response.data)
    }
  },[words]);
  function MenuButton(props) {
  
    return(
      <button onClick={
        (e)=>{setCurrentPage(e.target.value)}
      } value={props.siteName} className="btn btn-primary">{props.siteName}</button>
  )
  }
  function NavMenu(){
    return(
      <nav>
              <MenuButton siteName="Home"></MenuButton>
              <MenuButton siteName="Learn"></MenuButton>
              <MenuButton siteName="Statistics"></MenuButton>
      
      </nav>
    )
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
  function startQuiz(e) {
    e.preventDefault();
    //first, make the form disappear, then reuse the code from physics quiz assignment
    
  }
  const wordsetOptions = wordsets.map(wordset => <option value={wordset.Name}>{wordset.Name}</option>)

  switch (currentPage) { //return the right content based on the pagename (we always return the nav menu, avoid the repetition)
    case "Home":
      
      return (
        <>
          <NavMenu/>
          
          <h2>Create a new word</h2>
          <form onSubmit={CreateWord}>
            <div className='form-group'>
              <label htmlFor="wordsetSelect">Wordset:</label>
              <select id='wordsetSelect' className='form-control'>
                {wordsetOptions}
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor='terminput'>Term:</label>
              <input id='terminput' value={term} onChange={handleChange} className='form-control'/>
            </div>
            

            <div className='form-group'>
              <label htmlFor='definitioninput'>Definition:</label>
              <input id='definitioninput' value={definition} onChange={handleChange} className='form-control'/>
            </div>
            

            <div className='form-group'>
              <label htmlFor='exampleinput'>Example sentence:</label>
              <input id='exampleinput' value={example} onChange={handleChange} className='form-control'/>
            </div>
            
            
            <input type="submit" value='Add word' className='form-control'/>
          </form> {/*a form to create a new word*/}
          <h2>Create a new wordset</h2>
          <form onSubmit={CreateWordset}>
            <div className='form-group'>
              <label htmlFor='nameinput'>Name</label>
              <input id='nameinput' type="text" className='form-control' value={wordsetName} onChange={
                (e)=>{setWordsetName(e.target.value)}
              }/>
            </div>
            
            <input type="submit" value="Create wordset" className='form-control' />
          </form>
        </>
      )
    case "Learn":
      return(
        <>
          <NavMenu/>
          {/*the user will select a wordset they want to be tested on, then they'll be given a random definition and a selection of four random words, one will match the definition*/}
          <form onSubmit={startQuiz}>
            <div className='form-group'>
              <label htmlFor="wordsetSelectQuiz">Wordset:</label>
              <select id='wordsetSelectQuiz' className='form-control'>
                {wordsetOptions}
              </select> 
            </div>
            
            <input type="submit" value="Start" className='form-control'/>
          </form>
          <div id='quizDiv'>

          </div>
        </>
      )
    case "Statistics":
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
          <NavMenu></NavMenu>
          <h1>Oops - page not found!</h1>
          <p>Whatever langauge you're trying to learn, it likely lacks words for how lost you are.</p> 
        </>
        
      )
  }
  
}

export default App
