import init, * as wasm from "./pkg/life_game_web.js";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const rangeReduction = document.getElementById("rangeReduction");
const rangeReductionValue = document.getElementById("rangeReductionValue");
const buttonStart = document.getElementById("buttonStart");
class DrawingInfo {
    game;
    width;
    board;
    constructor(game, width, board) {
        this.game = game;
        this.width = width;
        this.board = board;
    }
    async next(ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const board = this.game.board();
        ctx.fillStyle = "black";
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.width; j++) {
                if (board[i * this.width + j] !== 0) {
                    ctx.fillRect(j, i, 1, 1);
                }
            }
        }
        this.game.step();
    }
}
let drawingInfo = null;
init()
    .then(async () => {
    main();
});
async function main() {
    initEventListeners();
    drawingLoop(ctx);
}
async function start(reduction) {
    const width = canvas.width = Math.floor(canvas.clientWidth / reduction);
    const height = canvas.height = Math.floor(canvas.clientHeight / reduction);
    const game = new wasm.GameWrapper(width, height, true);
    drawingInfo = new DrawingInfo(game, width, game.board());
}
function initEventListeners() {
    rangeReduction.addEventListener("input", () => {
        rangeReductionValue.textContent = rangeReduction.valueAsNumber.toString();
    });
    buttonStart.addEventListener("click", () => {
        start(rangeReduction.valueAsNumber);
    });
}
async function drawingLoop(ctx) {
    while (true) {
        if (drawingInfo == null) {
            await new Promise(resolve => setTimeout(resolve, 100));
            continue;
        }
        drawingInfo.next(ctx);
        await new Promise(resolve => setTimeout(resolve, 1));
    }
}
