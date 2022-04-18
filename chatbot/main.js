const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");
const BOT_IMG = "bot.png";
const PERSON_IMG = "user.png";
const BOT_NAME = "BOT";
const PERSON_NAME = "Mine";
const prompts = [
  ["hai", "hey", "hallo", "pagi", "sore"],
  ["gimana kabarmu", "bagaimana kabarmu", "bagaimana keseharianmu", "bagaimana keadaanmu"],
  ["apa yang kamu lakukan?", "apa yang terjadi", "ada apa", "ngapain lu"],
  ["berapa umurmu"],
  ["siapa kamu", "kamu manusia", "apa kamu robot", "kamu manusia apa robot"],
  ["siapa yang membuatmu", "siapa yang merancangmu"],
  [
    "your name please",
    "your name",
    "may i know your name",
    "what is your name",
    "what call yourself"
  ],
  ["i love you"],
  ["happy", "good", "fun", "wonderful", "fantastic", "cool"],
  ["bad", "bored", "tired"],
  ["help me", "tell me story", "tell me joke"],
  ["ah", "yes", "ok", "okay", "nice"],
  ["bye", "good bye", "goodbye", "see you later"],
  ["what should i eat today"],
  ["bro"],
  ["what", "why", "how", "where", "when"],
  ["no", "not sure", "maybe", "no thanks"],
  ["haha", "ha", "lol", "hehe", "funny", "joke"]
]
const replies = [
  ["Oyy!", "Haii", "Heeyy", "Hai kamuu", "Heyheyy"],
  [
    "Baikk... kamu gimana?",
    "Pretty well, how are you?",
    "Luar biasa, kamu gimanaa?"
  ],
  [
    "Sedikitt",
    "Tidur aja yukk",
    "Coba tebak?",
    "Aku gatau persis"
  ],
  ["Aku limited edition"],
  ["Cuma bot", "Aku robot, kalau kamu?"],
  ["The one true God, JavaScript"],
  ["Gapunya namaa 😭", "Aku pacarmu"],
  ["Lebihhh", "Aku jugaa"],
  ["Have you ever felt bad?", "Glad to hear it"],
  ["Kenapaaa?", "Why? You shouldn't!", "Scroll chat kira di wa 😊"],
  ["Tentang apa?", "Pada jaman dahuluuuuuuuuuuuu..."],
  ["Ceritain sesuatu dong", "Kasih candaan manja dongg", "Kepribadianmu gimana sih?"],
  ["Byeee", "Seee ya", "Dadaaaa"],
  ["Mie ayam protocol 3M", "Jangkrik goreng"],
  ["Bro!"],
  ["Nice question 👍"],
  ["Gapapaa", "Aku paham kokk", "Mau cerita apa nihh?"],
  ["Ngomong dongg"],
  ["Hahhahaa 😆", "Good one!"]
];
const alternative = [
  "Apa...",
  "Aku robot, aku diam",
  "Coba lagi",
  "Aku dengerin",
  "Gak paham :/"
];
const robot = ["How do you do, fellow human", "I am not a bot"];
msgerForm.addEventListener("submit", event => {
  event.preventDefault();
  const msgText = msgerInput.value;
  if (!msgText) return;
  msgerInput.value = "";
  addChat(PERSON_NAME, PERSON_IMG, "right", msgText);
  output(msgText);
});
function output(input) {
  let product;
  let text = input.toLowerCase().replace(/[^\w\s]/gi, "").replace(/[\d]/gi, "").trim();
  text = text
    .replace(/ a /g, " ")  
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "")
    .replace(/r u/g, "are you");
  if (compare(prompts, replies, text)) {
    product = compare(prompts, replies, text);
  } else if (text.match(/thank/gi)) {
    product = "You're welcome!"
  } else if (text.match(/(robot|bot|robo)/gi)) {
    product = robot[Math.floor(Math.random() * robot.length)];
  } else {
    product = alternative[Math.floor(Math.random() * alternative.length)];
  }
  const delay = input.split(" ").length * 100;
  setTimeout(() => {
    addChat(BOT_NAME, BOT_IMG, "left", product);
  }, delay);
}
function compare(promptsArray, repliesArray, string) {
  let reply;
  let replyFound = false;
  for (let x = 0; x < promptsArray.length; x++) {
    for (let y = 0; y < promptsArray[x].length; y++) {
      if (promptsArray[x][y] === string) {
        let replies = repliesArray[x];
        reply = replies[Math.floor(Math.random() * replies.length)];
        replyFound = true;
        break;
      }
    }
    if (replyFound) {
      break;
    }
  }
  return reply;
}
function addChat(name, img, side, text) {
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>
      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>
        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;
  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}
function get(selector, root = document) {
  return root.querySelector(selector);
}
function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();
  return `${h.slice(-2)}:${m.slice(-2)}`;
}
function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
