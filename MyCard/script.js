// script.js

// 1. Lấy các phần tử (elements) từ HTML
const envelope = document.getElementById('envelope');
const card = document.getElementById('card');
const sendButton = document.getElementById('send-button');
const effectsContainer = document.getElementById('effects-container');

// 2. Xử lý sự kiện MỞ THIỆP
envelope.addEventListener('click', () => {
    // Thêm class 'open' để kích hoạt animation CSS
    envelope.classList.add('open');
    card.classList.add('open');
});

// 3. Xử lý sự kiện GỬI LỜI CHÚC (Hiệu ứng VÀ Hiển thị lời chúc)
sendButton.addEventListener('click', () => {
    // Lấy phần tử textarea
    const personalMessageInput = document.getElementById('personal-message');

    // Lấy lời chúc từ textarea
    const message = personalMessageInput.value;

    // --- PHẦN CẬP NHẬT ---

    // 1. Kiểm tra xem người dùng đã viết gì chưa
    if (message.trim() === "") {
        alert("Bạn ơi, hãy viết một lời chúc nhé!");
        return; // Dừng lại, không làm gì cả
    }

    // 2. Tạo một phần tử mới để hiển thị lời chúc
    const messageElement = document.createElement('blockquote');
    messageElement.classList.add('sent-message'); // Thêm class 'sent-message'

    // Gán nội dung lời chúc vào (dùng textContent để an toàn)
    messageElement.textContent = `"${message}"`;

    // 3. Lấy cha của nút "Gửi" (là div.card-content)
    const cardContent = sendButton.parentElement;

    // 4. Thêm lời chúc vào thiệp (chèn vào trước nút Gửi)
    cardContent.insertBefore(messageElement, sendButton);

    // 5. Ẩn textarea và nút "Gửi" đi
    personalMessageInput.style.display = 'none';
    sendButton.style.display = 'none';

    // 6. (Tùy chọn) Thêm một lời cảm ơn
    const thankYou = document.createElement('p');
    thankYou.classList.add('thank-you-message');
    thankYou.textContent = "Đã gửi lời chúc!";
    cardContent.appendChild(thankYou);

    // --- KẾT THÚC PHẦN CẬP NHẬT ---

    // 7. Kích hoạt hiệu ứng! (Giữ nguyên như cũ)
    createParticles();
});

// 4. Hàm tạo hiệu ứng
function createParticles() {
    // Tạo 30 hạt hiệu ứng
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // --- Tạo sự ngẫu nhiên ---

        // Vị trí chiều ngang (từ 0% đến 100% màn hình)
        particle.style.left = `${Math.random() * 100}vw`;

        // Kích thước (từ 5px đến 15px)
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Màu sắc (ngẫu nhiên trong các màu ấm)
        const colors = ['#e74c3c', '#f7a072', '#f9c0aa', '#fdeeee', '#f1c40f'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];

        // Tốc độ (thời gian bay từ 3s đến 6s)
        const duration = Math.random() * 3 + 3;
        particle.style.animationDuration = `${duration}s`;

        // Độ trễ (để chúng không bay lên cùng lúc)
        const delay = Math.random() * 1;
        particle.style.animationDelay = `${delay}s`;

        // Biến CSS để animation 'fly-up' di chuyển ngẫu nhiên
        particle.style.setProperty('--random-x', `${(Math.random() - 0.5) * 200}px`);

        // Thêm hạt vào container
        effectsContainer.appendChild(particle);

        // Tự động xóa hạt khỏi DOM sau khi bay xong
        // (Thời gian animation + độ trễ + 1s dự phòng)
        setTimeout(() => {
            particle.remove();
        }, (duration + delay + 1) * 1000);
    }
}