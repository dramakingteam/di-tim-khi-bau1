// =========================================================
// 1. CHỐNG DEBUG & SOI CODE (BẬT KHI MỞ F12)
// =========================================================
(function() {
    const antiDebug = function() {
        (function() {
            return false;
        }['constructor']('debugger')['call']());
    };
    setInterval(antiDebug, 100);
})();

// =========================================================
// 2. DỮ LIỆU CÂU HỎI (ĐÃ GỘP TỪ JSON VÀO ĐÂY)
// =========================================================
const questionsData = [
  { "question": "Hành tinh nào gần Mặt Trời nhất?", "options": ["Sao Kim", "Sao Hỏa", "Sao Thủy", "Sao Mộc"], "answer": "Sao Thủy" },
  { "question": "1 + 1 bằng bao nhiêu?", "options": ["1", "2", "3", "11"], "answer": "2" },
  { "question": "Thủ đô của Việt Nam là gì?", "options": ["TP.HCM", "Huế", "Đà Nẵng", "Hà Nội"], "answer": "Hà Nội" },
  { "question": "Việt Nam có bao nhiêu dân tộc anh em?", "options": ["52", "53", "54", "55"], "answer": "54" },
  { "question": "Họ nào nhiều nhất ở Việt Nam?", "options": ["Họ Trần", "Họ Lê", "Họ Phạm", "Họ Nguyễn"], "answer": "Họ Nguyễn" },
  { "question": "Môn nào càng chơi càng ra nước?", "options": ["Bóng đá", "Cờ vua", "Chơi cờ", "Bơi lội"], "answer": "Chơi cờ" },
  { "question": "Hành tinh chúng ta đang sống tên là gì?", "options": ["Sao Hỏa", "Sao Kim", "Mặt Trăng", "Trái Đất"], "answer": "Trái Đất" },
  { "question": "Cái gì đi thì nằm, đứng thì nằm nhưng nằm thì lại đứng?", "options": ["Cái ghế", "Bàn chân", "Cái bàn", "Con người"], "answer": "Bàn chân" },
  { "question": "Vị tướng quốc dân trong Liên Minh Huyền Thoại là ai?", "options": ["Zed", "Lee Sin", "Yasuo", "Garen"], "answer": "Yasuo" },
  { "question": "AD của page có đẹp trai không?", "options": ["Không", "Bình thường", "Có", "Rất xấu"], "answer": "Có" },
  { "question": "Nhân vật chính của truyện 'Làm Siêu Sao Từ 0 Tuổi' là ai?", "options": ["Min Jae", "Seo Jun", "Ji Hoon", "Hyun Woo"], "answer": "Seo Jun" },
  { "question": "Bạn sẽ tìm thấy gì ở giữa 'Hà Nội'?", "options": ["Chữ H", "Chữ N", "Dấu cách", "Không có gì"], "answer": "Chữ N" },
  { "question": "Bạn sẽ cảm thấy gì sau khi leo lên đỉnh núi?", "options": ["Vui vẻ", "Khỏe mạnh", "Thấy mệt", "Muốn leo tiếp"], "answer": "Thấy mệt" },
  { "question": "Bệnh gì bác sĩ cũng bó tay?", "options": ["Cảm cúm", "Đau đầu", "Gãy tay", "Đau bụng"], "answer": "Gãy tay" },
  { "question": "Cái gì ở giữa 'Tớ và bạn'?", "options": ["Chữ T", "Chữ B", "Chữ Và", "Khoảng trắng"], "answer": "Chữ Và" },
  { "question": "Thầy bói phán con sau này sẽ cầm đầu thiên hạ, hỏi con làm nghề gì?", "options": ["Vua", "Tướng quân", "Thợ cắt tóc", "Chủ tịch"], "answer": "Thợ cắt tóc" },
  { "question": "Thầy phán con sau này sẽ đi Hàn, hỏi con làm nghề gì?", "options": ["Du lịch", "Phi công", "Thợ Hàn", "Ca sĩ"], "answer": "Thợ Hàn" },
  { "question": "Cái gì người mua biết, người bán biết nhưng người dùng không biết?", "options": ["Thuốc", "Quan tài", "Bí mật", "Đồ ăn"], "answer": "Quan tài" },
  { "question": "Lịch nào dài nhất?", "options": ["Lịch treo tường", "Lịch để bàn", "Lịch sử", "Lịch âm"], "answer": "Lịch sử" },
  { "question": "Nhà Trắng nằm ở đâu?", "options": ["Anh", "Pháp", "Mỹ", "Canada"], "answer": "Mỹ" },
  { "question": "Từ gì mà 100% người Việt phát âm sai?", "options": ["Sai", "Đúng", "Không", "Việt Nam"], "answer": "Sai" },
  { "question": "Cái gì tay trái cầm được mà tay phải không cầm được?", "options": ["Bút", "Cốc nước", "Tay phải", "Điện thoại"], "answer": "Tay phải" },
  { "question": "Môn gì càng thắng thì càng thua?", "options": ["Bóng đá", "Cờ vua", "Đua xe", "Đấu kiếm"], "answer": "Đua xe" },
  { "question": "Cái gì Adam có 2 mà Eva chỉ có 1?", "options": ["Con mắt", "Chữ A", "Bàn tay", "Đôi chân"], "answer": "Chữ A" },
  { "question": "Thứ gì của chồng mà vợ thích cầm?", "options": ["Tay", "Điện thoại", "Tiền", "Chìa khóa"], "answer": "Tiền" }
];

// =========================================================
// 3. LOGIC XỬ LÝ GAME
// =========================================================
let questions = questionsData; // Gán dữ liệu trực tiếp thay vì fetch
let usedIndexes = [];
let currentQuestion = null;
let openedCells = 0;
let treasureIndex = null;

const grid = document.getElementById("grid");
const questionBox = document.getElementById("questionBox");
const qEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const progressEl = document.getElementById("progress");
const startBtn = document.getElementById("startBtn");

const bgm = document.getElementById("bgm");
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");

// Nút Start luôn sẵn sàng vì dữ liệu đã có sẵn
startBtn.disabled = false;

function rollTreasure() {
  treasureIndex = Math.floor(Math.random() * 25); 
}

function createGrid() {
  grid.innerHTML = "";
  openedCells = 0;
  usedIndexes = [];

  for (let i = 0; i < 25; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.innerText = "?";
    cell.dataset.index = i;
    cell.onclick = () => openCell(cell);
    grid.appendChild(cell);
  }
}

function openCell(cell) {
  if (cell.classList.contains("opened")) return;
  const index = Number(cell.dataset.index);
  cell.classList.add("opened");
  openedCells++;

  if (index === treasureIndex) {
    cell.innerText = "💰";
    qEl.innerHTML = `
      🎉 Bạn đã tìm thấy KHO BÁU!
      <br><br>
      <span class="treasure-contact">
        Chụp ảnh màn hình lại và liên hệ tại:
        <br>
        <a href="https://m.me/DramaKingTeam" target="_blank" style="color: #ffce00; font-weight: bold;">
          m.me/DramaKingTeam
        </a> 
      </span>
    `;
    answersEl.innerHTML = "";
    progressEl.innerText = "";
    questionBox.classList.add("show");
    return;
  }

  cell.innerText = "🧭";
  showQuestion();
}

function getRandomQuestion() {
  if (usedIndexes.length >= questions.length) usedIndexes = []; // Reset nếu hết câu hỏi
  let idx;
  do {
    idx = Math.floor(Math.random() * questions.length);
  } while (usedIndexes.includes(idx));

  usedIndexes.push(idx);
  return questions[idx];
}

function showQuestion() {
  currentQuestion = getRandomQuestion();
  progressEl.innerText = `Ô đã mở: ${openedCells}/25`;
  qEl.innerText = currentQuestion.question;
  answersEl.innerHTML = "";

  currentQuestion.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(opt);
    answersEl.appendChild(btn);
  });
  questionBox.classList.add("show");
}

function checkAnswer(answer) {
  if (answer === currentQuestion.answer) {
    if(correctSound) correctSound.play();
    questionBox.classList.remove("show");
    questionBox.classList.add("hide");
    setTimeout(() => {
      questionBox.classList.remove("hide");
    }, 450);
  } else {
    if(wrongSound) wrongSound.play();
    setTimeout(resetGame, 600);
  }
}

function resetGame() {
  questionBox.classList.remove("show");
  createGrid();
  rollTreasure();
}

startBtn.onclick = () => {
  startBtn.style.display = "none";
  if(bgm) bgm.play();
  rollTreasure();
  createGrid();
};
