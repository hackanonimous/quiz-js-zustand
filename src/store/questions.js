import {create} from "zustand"
import confetti from "canvas-confetti"
import {persist} from "zustand/middleware"

export const useQuestionsStore = create(persist((set,get)=>(
    {
        questions:[],
        currentQuestion:0,
        fetchQuestions: async (limit)=>{
            const res = await fetch("http://localhost:5173/data.json")
            const json = await res.json()
            const questions = json.sort(()=>Math.random()-0.5).slice(0,limit)
            set({questions})
        },
        selectAnswer: (questionId,answerIndex)=>{
            const {questions} = get()
        // usando el structureCLone para clonar objetos
            const newQuestions = structuredClone(questions)
            //recuperamos el indice de la pregunta
            const questionIndex = newQuestions.findIndex((el)=> el.id==questionId)
            //recuperamos la informacion de la pregunta
            const questionInfo = newQuestions[questionIndex]
            //comparamos si la respuesta es correcta
            const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex
            //mostramos confeti si es correcta
            if (isCorrectUserAnswer) confetti()
            //cambiamos la informacion en la copia de la pregunta
            newQuestions[questionIndex]={
                ...questionInfo,
                isCorrectUserAnswer,
                userSelectedAnswer: answerIndex
            }
            
            //actualizamos el estado
            set({questions:newQuestions})
        },
        goNextQuestion: ()=>{
            const {currentQuestion,questions} = get()
            const nextQuestion = currentQuestion + 1

            if (nextQuestion < questions.length){
                set({currentQuestion:nextQuestion})
            }
        },
        goPreviousQuestion: ()=>{
            const {currentQuestion,questions} = get()
            const previousQuestion = currentQuestion - 1

            if (previousQuestion >= 0){
                set({currentQuestion:previousQuestion})
            }
        },
        reset:()=>{
            set({
                currentQuestion:0,
                questions:[]
            })
        }
    }
),{
    name:"questions"
}))