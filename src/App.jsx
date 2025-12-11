import { useState } from 'react'
import './App.css'

function MenuButton(props) {
  let filename = props.pagename.toLowerCase() + ".html"
  return(
    <a href= {filename}>{props.pagename}</a>
  )
}
function App(props) {
  const [count, setCount] = useState(0)
  switch (props.pagename) { //return the right content based on the pagename (we always return the nav menu, avoid the repetition)
    case "main":
      return (
        <>
          <nav>
            <MenuButton pagename="Home"></MenuButton>
            <MenuButton pagename="Learn"></MenuButton>
            <MenuButton pagename="Statistics"></MenuButton>
            
          </nav>
        </>
      )
    case "learn":
      return(
        <>
          <nav>
            <MenuButton pagename="Home"></MenuButton>
            <MenuButton pagename="Learn"></MenuButton>
            <MenuButton pagename="Statistics"></MenuButton>
    
          </nav>
        </>
      )
    case "statistics":
      return(
        <>
          <nav>
            <MenuButton pagename="Home"></MenuButton>
            <MenuButton pagename="Learn"></MenuButton>
            <MenuButton pagename="Statistics"></MenuButton>

            <h2>Number of words learned:</h2>
            <h2>Quiz score:</h2>
          </nav>
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
