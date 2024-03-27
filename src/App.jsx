import { QuizQ } from './constants'
import './App.css'
import Quiz from './components/Quiz'

function App() {
 

  return (
    <>
     <Quiz questions={QuizQ.questions} />
    </>
  )
}

export default App
