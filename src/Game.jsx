import { Card, IconButton,List,ListItem,ListItemButton,ListItemText,Stack, Typography } from "@mui/material"
import SyntaxHighlighter from "react-syntax-highlighter"
import {gradientDark} from "react-syntax-highlighter/dist/esm/styles/hljs"
import {useQuestionsStore} from "./store/questions"
import { ArrowBackIosNew } from "@mui/icons-material"
import { ArrowForwardIos } from "@mui/icons-material"
import Footer from "./Footer"

const getBackgroundColor=(info,index)=>{
  const {userSelectedAnswer,correctAnswer} = info
  //si el usuario no ha seleccionado nada
  if (userSelectedAnswer==null) return "transparent"
  //si ya seleccionno pero la solucion es incorrecta
  if (index !== correctAnswer && index !== userSelectedAnswer) return "transparent"
  //si la solucion es correcta
  if (index === correctAnswer) return "green"
  //si es la seleccion del usuario pero no es la correcta
  if(index === userSelectedAnswer) return "red"
  //si no es ninguna de las anteriores
  return "transparent"
}


const Question=({info})=>{
  const selectAnswer = useQuestionsStore(state=>state.selectAnswer)

  const handleClick=(index)=>()=>{
    selectAnswer(info.id,index)
  }

  return(
    <Card variant="outlined" sx={{bgcolor:"#222",p:2,textAlign:"left", mt:4}}>
      <Typography variant="h5">
        {info.question}
      </Typography>

      <SyntaxHighlighter language="javascript" style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>

      <List sx={{bgcolor:"#333"}} disablePadding>
        {info.answers.map((answer,index)=>(
          <ListItem key={index} disablePadding divider>
            <ListItemButton disabled={info.userSelectedAnswer != null} onClick={handleClick(index)} sx={{backgroundColor:getBackgroundColor(info,index)}}>
              <ListItemText primary={answer} sx={{textAlign:"center"}}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}


const Game = () => {
  const questions = useQuestionsStore(state=>state.questions)
  const currentQuestion = useQuestionsStore(state=>state.currentQuestion)
  const goNextQuestion = useQuestionsStore(state=>state.goNextQuestion)
  const goPreviousQuestion = useQuestionsStore(state=>state.goPreviousQuestion)

  const questionInfo = questions[currentQuestion]
  return (
    <>
      <Stack direction="row" gap={2} alignItems="center">
        <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
          <ArrowBackIosNew/>
        </IconButton>
        <Typography>{currentQuestion+1}/{questions.length}</Typography>
        <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length-1}>
          <ArrowForwardIos/>
        </IconButton>
      </Stack>
      <Question info={questionInfo}/>
      <Footer/>
    </>
  )
}

export default Game 