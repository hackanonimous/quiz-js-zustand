import "./App.css"
import { Container , Typography , Stack} from "@mui/material"
import {JavaScriptLogo} from "./assets/JavaScriptLogo"
import Home from "./Home"
import {useQuestionsStore} from "./store/questions"
import Game from "./Game"

const App = () => {
  const questions = useQuestionsStore(state=>state.questions)
  return (
    <main>
      <Container maxWidth="sm">
        <Stack direction="row" gap={2} alignItems="center" justifyContent="center">
          <JavaScriptLogo/>
          <Typography variant="h2" component="h1">
            JavaScript Quizz
          </Typography>
        </Stack>
        {
        questions.length === 0 ? <Home/> : <Game/>
        }
      </Container>
    </main>
  )
}

export default App