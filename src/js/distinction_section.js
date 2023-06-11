let waterfall, gtc
websiteData.sections.forEach((section) => {
    if (section.name == "distinction") {
        waterfall = section.content.waterfall
        gtc = section.content.gtc
    }
})

function updateWaterfall() {
    consol.log("updateWaterfall")
    const waterfallContainer = document.querySelector("#waterfall")
    waterfallContainer.innerHTML = ""
    waterfall.sizes.forEach((size) => {
        const div = document.createElement("div")
        div.id = `size_${size}`

        const desc = document.createElement("p")
        desc.classList.add("waterfall_desc")
        desc.textContent = `${size}rem\n${Math.round(size * rem * 100) / 100}px`

        const textsContainer = document.createElement("div")
        textsContainer.classList.add("waterfall_texts_container")
        waterfall.texts.forEach((text) => {
            const div2 = document.createElement("div")
            const p = document.createElement("p")
            p.classList.add("waterfall_text")
            p.style.fontSize = `${Math.round(size * rem * 100) / 100}px`
            p.textContent = text
            div2.append(p)
            textsContainer.append(div2)
        })
        div.append(desc, textsContainer)

        waterfallContainer.append(div)
    })
}

const gtcForm = document.querySelector("#gtc_form")
const gtcFieldset = document.querySelector("#gtc_form fieldset")

function buildDistinction() {
    consol.log("buildDistinction")
    websiteData.sections.forEach((section) => {
        if (section.name == "distinction") {
            section.content.gtcDifficulties.forEach((difficulty, index) => {
                const div = document.createElement("div")
                const input = document.createElement("input")
                input.type = "radio"
                input.name = "difficulty"
                input.id = `difficulty_${difficulty.name}`
                input.classList.add("gtc_difficulty")
                input.value = difficulty.name
                if (index == 0) {
                    input.setAttribute("checked", "true")
                }
                const label = document.createElement("label")
                label.textContent = difficulty.name
                label.setAttribute("for", `difficulty_${difficulty.name}`)
                div.append(input, label)
                gtcFieldset.append(div)
            })
        }
    })
}

function updateGTC(event, form) {
    consol.log("updateGTC")
    const data = new FormData(form)
    let output = ""
    for (const entry of data) {
        output = `${entry[1]}`
    }
    websiteData.sections.forEach((section) => {
        if (section.name == "distinction") {
            section.content.gtcDifficulties.forEach((difficulty) => {
                if (difficulty.name == output) {
                    setCssVar(["--question-character-size", `${difficulty.size}rem`])
                }
            })
        }
    })

    if (event) event.preventDefault()
}

let answers = []
let score = -1
let currentQuestion = -1
let firstButtons = []
function buildGTC() {
    consol.log("buildGTC")
    const gtcContainer = document.querySelector("#gtc_questions_container")
    gtcContainer.innerHTML = ""
    answers = []
    firstButtons = []
    gtc.forEach((question, index) => {
        const div = document.createElement("div")
        div.classList.add("question_container")
        div.dataset.index = index

        const answer = Math.round(Math.random())
        const wrongAnswer = (answer + 1) % 2
        answers.push(answer)

        const p = document.createElement("p")
        p.classList.add("question_character")
        p.textContent = question.value[answer]
        const pWrong = document.createElement("p")
        pWrong.classList.add("question_character", "wrong_character", "hide_character")
        pWrong.textContent = question.value[wrongAnswer]
        const buttonContainer = document.createElement("div")
        buttonContainer.classList.add("button_container")
        const option0 = document.createElement("button")
        option0.classList.add("question_button")
        option0.textContent = question.options[0]
        option0.dataset.questionIndex = index
        option0.tabIndex = -1
        firstButtons.push(option0)
        const option1 = document.createElement("button")
        option1.classList.add("question_button")
        option1.textContent = question.options[1]
        option1.dataset.questionIndex = index
        option1.tabIndex = -1

        const options = [option0, option1]
        options[answer].addEventListener("click", (e) => nextQuestion(true, answer, wrongAnswer, e.pointerType))
        options[wrongAnswer].addEventListener("click", (e) => nextQuestion(false, answer, wrongAnswer, e.pointerType))

        const answerFeedback = document.createElement("p")
        answerFeedback.classList.add("answer_feedback")

        buttonContainer.append(option0, option1)
        const br = document.createElement("br")
        div.append(answerFeedback, p, buttonContainer, pWrong)
        gtcContainer.append(div)
    })
    const scorePoints = document.createElement("p")
    scorePoints.id = "score_points"
    scorePoints.textContent = `You scored ${score} out of ${gtc.length}`
    gtcContainer.append(scorePoints)
    nextQuestion(true, 0, 1)
}

function nextQuestion(correct, answer, wrongAnswer, pointerType) {
    consol.log(pointerType)
    const scoreTally = document.querySelector("#score_tally")
    const allQuestions = document.querySelectorAll(".question_container")
    let answerFeedback

    if (correct) score++

    allQuestions.forEach((question, index) => {
        const wrongCharacter = question.querySelector(".wrong_character")

        if (index == currentQuestion) {
            question.classList.add("active_question")
            const rightButton = question.querySelector(`.button_container .question_button:nth-child(${answer + 1})`)
            const wrongButton = question.querySelector(
                `.button_container .question_button:nth-child(${wrongAnswer + 1})`
            )
            correct ? rightButton.classList.add("button_choice") : wrongButton.classList.add("button_choice")
            rightButton.classList.add("right_button")
            wrongButton.classList.add("wrong_button")

            answerFeedback = question.querySelector(".answer_feedback")
            answerFeedback.textContent = correct ? "✓" : "✕"

            wrongCharacter.classList.remove("hide_character")
            wrongCharacter.classList.add("show_character")
        } else if (index == currentQuestion + 1) {
            question.classList.add("active_question")
        } else {
            question.classList.remove("active_question")
        }
    })

    currentQuestion++

    allQuestions.forEach((question, index) => {
        if (index == currentQuestion) {
            question.querySelectorAll(".question_button").forEach((button) => (button.tabIndex = 0))
        }
    })
    scoreTally.textContent = `Score: ${score}/${gtc.length}`

    if (currentQuestion < gtc.length) {
        if (!isMobile && pointerType === "") setTimeout(() => firstButtons[currentQuestion]?.focus(), 10)
    } else {
        scoreTally.tabIndex = 0
        setTimeout(() => scoreTally.focus(), 10)
    }
}
