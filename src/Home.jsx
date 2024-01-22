import { Button } from "@mui/material"
import {useQuestionsStore} from "./store/questions"
const Home = () => {
  const fetchQuestions=useQuestionsStore(state=>state.fetchQuestions)

  const LIMIT_QUESTIONS=10

  const handleClick=()=>{
    fetchQuestions(LIMIT_QUESTIONS)
  }
  return (
    <Button onClick={handleClick} variant="contained">
        !Empezar
    </Button>
  )
}

export default Home