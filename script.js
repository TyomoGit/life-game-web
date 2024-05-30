import init, * as wasm from "./pkg/life_game_web.js";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const rangeReduction = document.getElementById("rangeReduction");
const rangeReductionValue = document.getElementById("rangeReductionValue");
const rangeInterval = document.getElementById("rangeInterval");
const rangeIntervalValue = document.getElementById("rangeIntervalValue");
const buttonStart = document.getElementById("buttonStart");
class DrawingInfo {
    game;
    width;
    interval;
    board;
    constructor(game, width, interval, board) {
        this.game = game;
        this.width = width;
        this.interval = interval;
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
    rangeReductionValue.textContent = rangeReduction.valueAsNumber.toString();
    rangeIntervalValue.textContent = rangeInterval.valueAsNumber.toString();
    drawingLoop(ctx);
}
async function start(reduction, interval) {
    const width = canvas.width = Math.floor(canvas.clientWidth / reduction);
    const height = canvas.height = Math.floor(canvas.clientHeight / reduction);
    const game = new wasm.GameWrapper(width, height, true);
    drawingInfo = new DrawingInfo(game, width, interval, game.board());
}
function initEventListeners() {
    rangeReduction.addEventListener("input", () => {
        rangeReductionValue.textContent = rangeReduction.valueAsNumber.toString();
    });
    rangeInterval.addEventListener("input", () => {
        rangeIntervalValue.textContent = rangeInterval.valueAsNumber.toString();
    });
    buttonStart.addEventListener("click", () => {
        start(rangeReduction.valueAsNumber, rangeInterval.valueAsNumber);
    });
}
async function drawingLoop(ctx) {
    while (true) {
        if (drawingInfo == null) {
            await new Promise(resolve => setTimeout(resolve, 100));
            continue;
        }
        drawingInfo.next(ctx);
        await new Promise(resolve => setTimeout(resolve, drawingInfo?.interval ?? 100));
    }
}
