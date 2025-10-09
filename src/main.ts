import "./style.css";

document.body.innerHTML = `
  <h1> Roachfiestation </h1>
  <button id="button">🪳</button>
  <button id="upgrade" disabled>Buy Upgrade (+1/sec) — Cost: 10</button>
  <div id="output">Roaches invited: 0</div>
`;

const button = document.getElementById("button");
const upgrade = document.getElementById("upgrade") as HTMLButtonElement | null;
const output = document.getElementById("output");

let roaches = 0;
// start at 0/sec and increase with purchases
let growth = 0;

function refreshUI() {
  if (output) output.textContent = `Roaches invited: ${roaches}`;
  if (upgrade) upgrade.toggleAttribute("disabled", roaches < 10);
}

if (button && output) {
  button.addEventListener("click", () => {
    roaches++;
    refreshUI();
  });
}

if (upgrade && output) {
  upgrade.addEventListener("click", () => {
    if (roaches >= 10) {
      roaches -= 10;
      growth += 1; // each purchase adds +1/sec
      refreshUI();
    }
  });
}

let lastTime = 0;
function update(currentTime: number) {
  if (lastTime === 0) lastTime = currentTime;
  const elapsed = currentTime - lastTime;

  if (elapsed >= 1000) {
    // catch up in case multiple seconds passed
    const ticks = Math.floor(elapsed / 1000);
    roaches += growth * ticks;
    lastTime += ticks * 1000;
    refreshUI();
  }

  requestAnimationFrame(update);
}
requestAnimationFrame(update);
