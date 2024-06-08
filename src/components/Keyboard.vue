<template>
	<div class="keyboard-container">
		<div class="keyboard-row">
			<div
				v-for="key in firstRowKeys"
				:id="key"
				:key="key"
				class="key"
				:class="key === 'erase' || key === 'enter' ? 'bigger-key' : ''"
				@click="pressKey(key)"
			>
				{{ key.toUpperCase() }}
			</div>
		</div>
		<div class="keyboard-row">
			<div
				v-for="key in secondRowKeys"
				:id="key"
				:key="key"
				class="key"
				:class="key === 'erase' || key === 'enter' ? 'bigger-key' : ''"
				@click="pressKey(key)"
			>
				{{ key.toUpperCase() }}
			</div>
		</div>
		<div class="keyboard-row">
			<div
				v-for="key in thirdRowKeys"
				:id="key"
				:key="key"
				class="key"
				:class="key === 'erase' || key === 'enter' ? 'bigger-key' : ''"
				@click="pressKey(key)"
			>
				{{ key.toUpperCase() }}
			</div>
		</div>
	</div>
</template>
<script setup>
	import { ref } from 'vue';
	const firstRowKeys = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
	const secondRowKeys = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
	const thirdRowKeys = ['erase', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'enter'];
	const props = defineProps({
		keyboardState: {
			type: Object,
		},
	});

	// Define the emits
	const emit = defineEmits(['press-key']);

	// At click presskey
	let pressKey = (key) => {
		emit('press-key', key);
	};

	// At physically pressing the key send the key
	window.addEventListener('keydown', (event) => {
		let key = event.key.toLowerCase();
		if (key === 'backspace') key = 'erase';
		// If the key is not in the keyboard, return
		if (!Object.keys(props.keyboardState).includes(key)) return;

		// Find the corresponding key element based on the key pressed
		const keyElement = document.getElementById(key);
		// Activate the css animation
		keyElement.classList.add('animate');
		pressKey(key);
	});

	// At key release remove the animation
	window.addEventListener('keyup', (event) => {
		let key = event.key.toLowerCase();
		if (key === 'backspace') key = 'erase';
		// If the key is not in the keyboard, return
		if (!Object.keys(props.keyboardState).includes(key)) return;

		// Find the corresponding key element based on the key pressed
		const keyElement = document.getElementById(key);
		// Remove the css animation
		keyElement.classList.remove('animate');
	});

	// Return the class of the key
	const returnKeyClass = (key) => {
		if (key === 'erase' || key === 'enter') return 'bigger-key';
		if (props.keyboardState[key] === 'unused') return 'unused-key';
		if (props.keyboardState[key] === 'used') return 'used-key';
		if (props.keyboardState[key] === 'correct') return 'correct-key';
	};

	// Change class of the key from parent when enter is pressed
	const changeClass = (wordObject) => {
		// Get the element of the keys, and change the class with a delay
		Object.keys(wordObject).forEach((index) => {
			setTimeout(() => {
				const keyElement = document.getElementById(wordObject[index].letter);
				if (!keyElement) return;
				keyElement.classList.add(returnKeyClass(wordObject[index].letter));
			}, index * 500);
		});
	};

	// When game is over, block the keyboard
	const blockKeyboard = () => {
		// Override pressKey function to do nothing
		pressKey = () => {};
	};

	// Expose the function to the parent
	defineExpose({
		changeClass,
		blockKeyboard,
	});
</script>

<style scoped>
	.keyboard-row {
		display: flex;
		justify-content: center;
	}

	.key {
		display: inline-block;
		width: 50px;
		height: 50px;
		background: #6f7272;
		color: #f2eaea;
		text-align: center;
		line-height: 50px;
		margin: 5px;
		border-radius: 5px;
		cursor: pointer;
		font-weight: bolder;
	}
	.key:hover {
		background: #444848;
	}
	.key:active {
		transform: translateY(4px);
		transition: transform 0.1s;
	}
	.animate {
		transform: translateY(4px);
		transition: transform 0.1s;
		background: #444848 !important;
	}
	.unused-key {
		background: #6f7272;
		color: #f2eaea;
	}
	.used-key {
		background: #282b2b;
		color: #f2eaea;
	}
	.correct-key {
		background: #63c9c9;
		color: #f2eaea;
	}
	.bigger-key {
		width: 80px;
	}
</style>
