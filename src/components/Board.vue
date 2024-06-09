<template>
	<div class="board-container">
		<div class="board-row" v-for="row in boardState">
			<div class="letter" v-for="element in row">
				{{ element.letter.toUpperCase() }}
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, watch, nextTick } from 'vue';
	const props = defineProps({
		boardState: {
			type: Array,
		},
	});

	// Watching boardState just for logging
	watch(props.boardState, (newBoardState) => {
		//console.log('Board state updated:', newBoardState);
	});

	const returnLetterClass = (element) => {
		if (element.status === 'correct') {
			return 'letter-correct-all';
		} else if (element.status === 'almost') {
			return 'letter-correct-almost';
		} else if (element.status === 'incorrect') {
			return 'letter-incorrect';
		}
	};

	// Change class when the word is checked (enter is pressed)
	const changeClass = async (rowToAnimate) => {
		await nextTick(); // Ensure the DOM is updated

		const row = document.querySelectorAll('.board-row')[rowToAnimate];
		if (!row) {
			console.error('Row not found:', rowToAnimate);
			return;
		}

		// Filter out non-element nodes and apply animation to element nodes only
		const elements = Array.from(row.childNodes).filter(
			(el) => el.nodeType === Node.ELEMENT_NODE
		);

		elements.forEach((element, index) => {
			setTimeout(() => {
				element.classList.add('animate');

				// ReturnLetterClass at the middle of the animation
				setTimeout(() => {
					element.classList.add(
						returnLetterClass(props.boardState[rowToAnimate][index])
					);
				}, 500);

				setTimeout(() => {
					element.classList.remove('animate');
				}, 1000);
			}, index * 500); // Incremental delay
		});
	};

	// Make a little dance animation when the word is correct
	const dance = async (winningRowIndex) => {
		setTimeout(async () => {
			await nextTick(); // Ensure the DOM is updated

			const row = document.querySelectorAll('.board-row')[winningRowIndex];
			if (!row) {
				console.error('Winning row not found:', winningRowIndex);
				return;
			}

			// Apply animation to all elements in the winning row
			const elements = Array.from(row.childNodes).filter(
				(el) => el.nodeType === Node.ELEMENT_NODE
			);

			elements.forEach((element, index) => {
				setTimeout(() => {
					element.classList.add('dance');
				}, index * 200); // Reduced delay for more immediate effect
			});
		}, 5 * 500);
	};

	// Expose the function to the parent
	defineExpose({
		changeClass,
		dance,
	});
</script>
<style scoped>
	.board-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.board-row {
		display: flex;
	}
	.letter {
		width: 50px;
		height: 50px;
		background: #27363b;
		color: #ebedee;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 5px;
		font-size: 1.2rem;
		font-weight: bolder;
		border-radius: 5px;
	}
	.letter-correct-all {
		background: #97c9d8;
		color: #101213;
	}
	.letter-correct-almost {
		background: #c7b06a;
		color: #101213;
	}
	.letter-incorrect {
		background: #4b4d4d;
	}
	.animate {
		animation: animate 1s;
	}
	@media (max-width: 700px) {
		.letter {
			width: 40px;
			height: 40px;
			font-size: 1rem;
		}
	}
	/* animation with flip */
	@keyframes animate {
		0% {
			transform: rotateX(0deg);
		}
		50% {
			transform: rotateX(90deg);
		}
		100% {
			transform: rotateX(0deg);
		}
	}
	.dance {
		animation: dance 1.5s infinite;
	}

	@keyframes dance {
		0%,
		100% {
			transform: translateX(0) scale(1);
		}
		25% {
			transform: rotate(360deg) translateY(-10px) scale(1.2);
		}
		50% {
			transform: translateX(10px) scale(0.8);
		}
		75% {
			transform: rotate(-360deg) translateY(10px) scale(1.2);
		}
	}
</style>
