const overplayResult = document.getElementById('overlay-result');
const resultIcon = document.getElementById('result-icon');
const resultBadge = document.getElementById('result-badge');
const resultTitle = document.getElementById('result-title');
export function showResult(result) {
    overplayResult.classList.remove('overlay-result--win', 'overlay-result--lose', 'overlay-result--draw');
    switch (result) {
        case 'win':
            overplayResult.classList.add('overlay-result--win')
            resultIcon.src = '/icons/star.png'
            resultBadge.textContent = 'Victory';
            resultTitle.textContent = 'Checkmate. Nice game!';
            break;
        case 'lose':
            overplayResult.classList.add('overlay-result--lose')
            resultIcon.src = '/icons/skull.png'
            resultBadge.textContent = 'Defeat';
            resultTitle.textContent = 'You lost';
            break;
        case 'draw':
            overplayResult.classList.add('overlay-result--draw')
            resultIcon.src = '/icons/handshake.png'
            resultBadge.textContent = 'Draw';
            resultTitle.textContent = 'Game drawn';
            break;
        default:
            break;
    }
    overplayResult.classList.add('show');

}
export function hideResultAndEnableReplay() {

    overplayResult.classList.remove('show');
    document.body.classList.add('is-replay');

}