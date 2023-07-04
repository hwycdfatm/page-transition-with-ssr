let nextLink

$('.content').addClass('first')

$('.nav-list a:not(.active)').on('click', function (e) {
	e.preventDefault()
	nextLink = this.href
	$.ajax({
		url: this.href,
		success: function (data) {
			let el = $(data).find('.content').addClass('sec')
			$('.wrapper').append(el)
		},
		complete: function () {
			pageTransition()
		},
	})
})

function pageTransition() {
	$('html').addClass('transition')
	let tl = gsap.timeline({
		onComplete: updatePage,
	})
	tl.from('.content.sec', {
		y: '110vh',
		delay: 0.2,
		duration: 0.8,
		ease: 'power4.out',
	})
	tl.to(
		'.overlay',
		{
			opacity: 1,
			duration: 0.3,
			ease: 'power1.out',
		},
		0
	)
	tl.to(
		'.content.first',
		{
			scale: 0.95,
			duration: 0.3,
			ease: 'power1.out',
		},
		0
	)
}

function updatePage() {
	window.location = nextLink
}
