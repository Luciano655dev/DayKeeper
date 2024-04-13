require('dotenv').config()
const dailyQuestionsJson = require('../dailyQuestions.json')
const bf = require('better-format')

const getQuestion = async(req, res)=>{
    const { date } = req.params

    try{
        const dateRegexFormat = /^\d{2}-\d{2}-\d{4}/

        if(!dateRegexFormat.test(date))
            return res.status(400).json({ msg: "Coloque uma data no formato correto" })
    
        const questionDay = date.split('-')[0]
        const questionMonth = date.split('-')[1]
        const questionYear = date.split('-')[2]

        const resetTime = process.env.RESET_TIME
        let todayDate = bf.FormatDate(Date.now())
        if(todayDate.hour < resetTime) todayDate.day -= 1

        const newDateToday = new Date(todayDate.year, todayDate.month-1, todayDate.day)
        const newDateSearched = new Date(questionYear, questionMonth-1, questionDay)

        let question = dailyQuestionsJson.questions.filter( el => el.day == `${questionDay}-${questionMonth}` )[0]

        if(newDateSearched > newDateToday)
            question = dailyQuestionsJson.questions.filter( el => el.day == `${questionDay-1}-${questionMonth}` )[0]

        if(!question) return res.status(404).json({ msg: "A pergunta deste dia não foi encontrada" })
    
        return res.status(200).json(question)
    }catch(err){
        return res.status(500).json({ msg: `${err}` })
    }
}

module.exports = {
    getQuestion
}