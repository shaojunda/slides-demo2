

var n
init()
setInterval(() => {
  makeLeave(getImage(n))
    .one('transitionend', (event) => {
      makeEnter($(event.currentTarget))
    })
    makeCurrent(getImage(n + 1))
  n += 1
}, 2000);

function validN(n) {
  if(n > 4) {
    n = n % 4
    if(n === 0) {
      n = 4
    }
  }
  return n
}

function getImage(n) {
  return $(`.images > img:nth-child(${validN(n)})`)
}

function init() {
  n = 1
  $(`.images > img:nth-child(${n})`).addClass('current').siblings().addClass('enter')
}

function makeEnter($node) {
  return $node.removeClass('leave current').addClass('enter')
}

function makeLeave($node) {
  return $node.removeClass('current enter').addClass('leave')
}

function makeCurrent($node) {
  return $node.removeClass('leave enter').addClass('current')
}

