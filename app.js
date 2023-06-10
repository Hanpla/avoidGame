// DOM

const wrap = document.getElementById('wrap');
const player = document.querySelector('.player');

// 변수

let position = 0;
let speed = 4;
let time = 100;
let x = 400;
let moveSpeed = 15;
let interval;
let isGameover = false;

init();

// 키보드 조작
control();

// 함수

function init() {
    interval = setInterval(create, time);
}

function create() {
    const object = document.createElement('div');
    const randomX = Math.floor(Math.random() * (wrap.offsetWidth - 30));
    object.style.left = `${randomX}px`;
    object.className = 'object';
    wrap.appendChild(object);
    drop(object);
}

function drop(object) {
    let position = 0;
    const animationId = requestAnimationFrame(function animate() {
        position += speed;
        object.style.top = `${position}px`;

        const playerRect = player.getBoundingClientRect();
        const objectRect = object.getBoundingClientRect();

        if (
            playerRect.top < objectRect.bottom &&
            playerRect.bottom > objectRect.top &&
            playerRect.left < objectRect.right &&
            playerRect.right > objectRect.left
        ) {
            showGameover();
        }

        if (position >= wrap.offsetHeight - object.offsetHeight) {
            wrap.removeChild(object);
            cancelAnimationFrame(animationId);
        } else {
            requestAnimationFrame(animate);
        }
    });
}

function updatePlayerPosition() {
    const playerWidth = player.offsetWidth;
    const wrapWidth = wrap.offsetWidth;

    if (x < 0) {
        x = 0;
    } else if (x + playerWidth > wrapWidth) {
        x = wrapWidth - playerWidth;
    }
    player.style.left = x + 'px';
}

function showGameover() {
    const over = document.querySelector('.over');
    over.style.display = 'block';
    clearInterval(interval);
    isGameover = true;
    document.removeEventListener('keydown', control);
}

function control() {
    document.addEventListener('keydown', e => {
        if (isGameover) {
            return; // 게임이 종료된 경우 동작하지 않음
        }

        let key = event.keyCode || event.which;
        if (key === 37) {
            x -= moveSpeed;
        } else if (key === 39) {
            x += moveSpeed;
        }
        updatePlayerPosition(); // 플레이어 위치 업데이트
    });
}
