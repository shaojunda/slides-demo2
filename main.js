var n
init()
setInterval(() => {
  getImage(n).makeLeave()
    .one('transitionend', (event) => {
      $(event.currentTarget).makeEnter()
    })
  getImage(n + 1).makeCurrent()
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
  addStateFunctionToJquery()
}

function addStateFunctionToJquery() {
  $.prototype.makeCurrent = function() {
    return this.removeClass('leave enter').addClass('current')
  }

  $.prototype.makeLeave = function() {
    return this.removeClass('current enter').addClass('leave')
  }

  $.prototype.makeEnter = function() {
    return this.removeClass('leave current').addClass('enter')
  }
}
