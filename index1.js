let $buttons = $(".buttons > button")
let $slides = $("#slides")
let currentIndex = 0
var timerId

buildFakeSlides()

$slides.css({ transform: 'translateX(-400px)' })

bindEvents()

setTimer()

function setTimer() {
  timerId = setInterval(() => {
    goToSlide(currentIndex + 1)
  }, 2000);
}

function bindEvents() {
  $('.buttons').on('click', 'button', function(event) {
    let $button = $(event.currentTarget)
    let index = $button.index()
    goToSlide(index)
  })

  $("#previous").on('click', function() {
    goToSlide(currentIndex - 1)
  })

  $("#next").on('click', function() {
    goToSlide(currentIndex + 1)
  })

  $(".container").on('mouseenter', function() {
    clearInterval(timerId)
  })

  $(".container").on('mouseleave', function() {
    setTimer()
  })
}

function goToSlide(index) {
  let firstButtonIndex = 0
  let lastButtonIndex = $buttons.length - 1

  if (index > lastButtonIndex) {
    index = firstButtonIndex
  } else if (index < firstButtonIndex) {
    index = lastButtonIndex
  }

  // 从最后一张到第一张
  if (currentIndex === lastButtonIndex && index === firstButtonIndex) {
    $slides.css({ transform: `translateX(-${ (lastButtonIndex + 2) * 400 }px)` })
      .one('transitionend', function() {
        $slides.hide().offset()
        $slides.css({ transform: `translateX(-${ (index + 1) * 400 }px)` }).show()
      })
  } else if (currentIndex === firstButtonIndex && index === lastButtonIndex) { //从第一张到最后一张
    $slides.css({ transform: `translateX(-${ firstButtonIndex * 400 }px)` })
      .one('transitionend', function() {
        $slides.hide().offset()
        $slides.css({ transform: `translateX(-${ (index + 1) * 400 }px)` }).show()
      })
  } else {
    $slides.css({ transform: `translateX(-${ (index + 1) * 400 }px)` })
  }

  currentIndex = index
}

function buildFakeSlides() {
  let $images = $slides.children('img')
  let $firstImg = $images.eq(0).clone(true)
  let $lastImg = $images.eq($images.length - 1).clone(true)

  $slides.append($firstImg)
  $slides.prepend($lastImg)
}
