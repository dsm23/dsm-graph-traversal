// Thanks Lagden! https://svelte.dev/repl/61d9178d2b9944f2aa2bfe31612ab09f?version=3.6.7

function _removeCircle() {
	this.removeEventListener('animationend', _removeCircle)
	this.remove()
}

function rippleAnimation(rippleClasses = []) {
	return event => {
		const target = event.currentTarget
		const d = Math.max(target.offsetWidth, target.offsetHeight)
		const dpx = `${d}px`
		const circle = document.createElement('div')
		circle.style.width = dpx
		circle.style.height = dpx
		circle.style.left = `${event.offsetX - (d / 2)}px`
		circle.style.top = `${event.offsetY - (d / 2)}px`
		circle.classList.add(...rippleClasses)
		circle.addEventListener('animationend', _removeCircle)
		target.append(circle)
	}
}

export default rippleAnimation
