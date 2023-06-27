function updateIntelligent(event, form) {
    // console.log("updateIntelligent")
    const data = new FormData(form)
    let output = ""
    for (const entry of data) {
        output = `${entry[1]}`
    }
    const examples = ["original", "smart_kerning", "before", "after"]
    examples.forEach((example) => {
        const exampleContainer = document.querySelector(`#${example}`)
        if (exampleContainer.id == output) {
            exampleContainer.style.display = "block"
        } else {
            exampleContainer.style.display = "none"
        }
    })
    event.preventDefault()
}
