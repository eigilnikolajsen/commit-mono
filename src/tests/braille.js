function brailleRecipes() {
    // 1 4
    // 2 5
    // 3 6
    // 7 8
    const positionOf1 = [190, 570]
    const offset = 220
    const positions = {
        1: [0, 0],
        2: [0, "bd1"],
        3: [0, "bd2"],
        4: ["bd1", 0],
        5: ["bd1", "bd1"],
        6: ["bd1", "bd2"],
        7: [0, "bd3"],
        8: ["bd1", "bd3"],
    }

    for (let i = 1; i < 256; i++) {
        const name =
            "dots" +
            i
                .toString(2)
                .split("")
                .reverse()
                .map((n, i) => (n == 1 ? i + 1 : undefined))
                .filter((n) => n)
                .join("")
        const recipe =
            "=" +
            i
                .toString(2)
                .split("")
                .reverse()
                .map((n, i) => (n == 1 ? i + 1 : undefined))
                .filter((n) => n)
                .map((dotNumber) => positions[dotNumber])
                .map(
                    ([x, y]) =>
                        `_bdot@${x ? `${"`"}origin+${x}${"`"}` : "origin"},${y ? `${"`"}origin-${y}${"`"}` : "origin"}`
                )
                .join("+")
        // console.log(i.toString(2), dots, dotPositions)
        console.log(name, recipe)
    }
    console.log(positions)
}
brailleRecipes()
