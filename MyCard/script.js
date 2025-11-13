// script.js (PHIÊN BẢN THIỆP CÓ BÌA HỒNG VÀ HIỆU ỨNG MỞ)

// 1. Lấy các phần tử
const particleBackground = document.getElementById('particle-background');
const animationContainer = document.getElementById('animation-container');
const messageDisplay = document.getElementById('message-display');
const sentMessageElement = document.getElementById('sent-message');
const sentImageElement = document.getElementById('sent-image');
const thankYouMessageElement = document.getElementById('thank-you-message');
const inputArea = document.getElementById('input-area');
const personalMessageInput = document.getElementById('personal-message');
const imageUploadInput = document.getElementById('image-upload');
const sendButton = document.getElementById('send-button');
const errorMessage = document.getElementById('error-message');


// 2. Hàm tạo hạt sao nền (Giữ nguyên)
function createParticles() {
    for (let i = 0; i < 80; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.width = `${Math.random() * 3 + 1}px`;
        particle.style.height = particle.style.width;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.animationDuration = `${Math.random() * 30 + 30}s`;
        particle.style.animationDelay = `${Math.random() * -60}s`;
        particleBackground.appendChild(particle);
    }
}


// 3. Hàm kích hoạt khi trang tải xong
function startScene() {
    createParticles();
    inputArea.classList.add('show');
}


// 4. XỬ LÝ SỰ KIỆN GỬI LỜI CHÚC (Giữ nguyên)
sendButton.addEventListener('click', () => {
    const message = personalMessageInput.value;
    const file = imageUploadInput.files[0];

    if (message.trim() === "") {
        errorMessage.textContent = "Bạn ơi, hãy viết một lời chúc nhé!";
        errorMessage.classList.add('show');
        inputArea.style.animation = "shake 0.3s";
        setTimeout(() => {
            inputArea.style.animation = "";
        }, 300);
        return;
    }

    errorMessage.classList.remove('show');
    sentMessageElement.textContent = `"${message}"`;
    thankYouMessageElement.textContent = "Lời chúc của bạn đã được gửi đi!";

    inputArea.classList.remove('show');

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            sentImageElement.src = e.target.result;
            sentImageElement.classList.add('has-image');
            showCardAndAnimations();
        }
        reader.readAsDataURL(file);
    } else {
        sentImageElement.src = '';
        sentImageElement.classList.remove('has-image');
        showCardAndAnimations();
    }
});

// 5. HÀM HIỆN THIỆP VÀ ANIMATION (Giữ nguyên)
function showCardAndAnimations() {
    setTimeout(() => {
        messageDisplay.classList.add('show');
    }, 800);
    createEndlessAnimations(10, 10);
}


// 6. Hàm tạo các vật thể bay (Giữ nguyên)
function createEndlessAnimations(planeCount, balloonCount) {
    for (let i = 0; i < balloonCount; i++) {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.style.left = `${Math.random() * 90}%`;
        balloon.style.animationDuration = `${Math.random() * 10 + 10}s`;
        balloon.style.animationDelay = `${Math.random() * -10}s`;
        const colors = ['rgba(255,192,203,0.7)', 'rgba(173,216,230,0.7)', 'rgba(255,255,224,0.7)'];
        balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
        animationContainer.appendChild(balloon);
    }
    for (let i = 0; i < planeCount; i++) {
        const plane = document.createElement('div');
        plane.classList.add('paper-airplane');
        plane.style.top = `${Math.random() * 80}%`;
        plane.style.animationDuration = `${Math.random() * 5 + 8}s`;
        plane.style.animationDelay = `${Math.random() * -8}s`;
        animationContainer.appendChild(plane);
    }
}


// 7. Khởi tạo
startScene();