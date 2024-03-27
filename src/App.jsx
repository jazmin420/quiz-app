import { QuizQ } from './constants'
import Quiz from './components/Quiz'

function App() {
 

  return (
    <>
     <Quiz questions={QuizQ.questions} />
    </>
  )
}

export default App
