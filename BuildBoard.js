const board = document.querySelector("#Board");

for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        const square = document.createElement("div");
        square.className = "Square";
        square.id = `${i}${j}`;
        let color;
        if ((i + j) % 2 == 0) {
            color = "#ffffff";
        } else color = "#898b8c";
        square.style.backgroundColor = color;
        board.appendChild(square);
    }
}