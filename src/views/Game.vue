<template>
	<div class="game-container">
		<h1 class="game-title">Softwordle</h1>
		<div class="board-container">
			<div class="winning-message">You won</div>
			<Board ref="boardRef" :board-state="boardState" />
			<Keyboard
				ref="keyboardRef"
				:keyboard-state="keyboardState"
				@press-key="updateBoard"
			/>
		</div>
		<!-- help icon -->
		<v-icon class="help-icon" @click="showHelp = true" size="30"
			>mdi-help-circle</v-icon
		>
	</div>
	<v-dialog
		persistent
		v-model="showWelcome"
		:width="windowWidth > 500 ? 500 : windowWidth - 100"
	>
		<Welcome @closeWelcome="showWelcome = false" />
	</v-dialog>
	<v-dialog
		v-model="showHelp"
		:width="windowWidth > 500 ? 500 : windowWidth - 100"
	>
		<Help @closeHelp="showHelp = false" />
	</v-dialog>
	<v-dialog
		persistent
		v-model="showGameOver"
		:width="windowWidth > 500 ? 500 : windowWidth - 100"
	>
		<GameOver :word="randomWord" @refresh="refreshGame" />
	</v-dialog>
</template>

<script setup>
	import Welcome from '../components/Welcome.vue';
	import Help from '../components/Help.vue';
	import GameOver from '../components/GameOver.vue';
	import Board from '../components/Board.vue';
	import Keyboard from '../components/Keyboard.vue';
	import WordList from '../assets/words.json';
	import { ref, watch } from 'vue';
	import { useRouter } from 'vue-router';

	// Check window width
	const windowWidth = ref(window.innerWidth);

	// Define the board and keyboard state
	const keyboardState = ref({
		q: 'unused',
		w: 'unused',
		e: 'unused',
		r: 'unused',
		t: 'unused',
		y: 'unused',
		u: 'unused',
		i: 'unused',
		o: 'unused',
		p: 'unused',
		a: 'unused',
		s: 'unused',
		d: 'unused',
		f: 'unused',
		g: 'unused',
		h: 'unused',
		j: 'unused',
		k: 'unused',
		l: 'unused',
		z: 'unused',
		x: 'unused',
		c: 'unused',
		v: 'unused',
		b: 'unused',
		n: 'unused',
		m: 'unused',
		erase: 'unused',
		enter: 'unused',
	});
	const boardState = ref([
		{
			0: {
				letter: ' ',
				status: 'unused',
			},
			1: {
				letter: ' ',
				status: 'unused',
			},
			2: {
				letter: ' ',
				status: 'unused',
			},
			3: {
				letter: ' ',
				status: 'unused',
			},
			4: {
				letter: ' ',
				status: 'unused',
			},
		},
		{
			0: {
				letter: ' ',
				status: 'unused',
			},
			1: {
				letter: ' ',
				status: 'unused',
			},
			2: {
				letter: ' ',
				status: 'unused',
			},
			3: {
				letter: ' ',
				status: 'unused',
			},
			4: {
				letter: ' ',
				status: 'unused',
			},
		},
		{
			0: {
				letter: ' ',
				status: 'unused',
			},
			1: {
				letter: ' ',
				status: 'unused',
			},
			2: {
				letter: ' ',
				status: 'unused',
			},
			3: {
				letter: ' ',
				status: 'unused',
			},
			4: {
				letter: ' ',
				status: 'unused',
			},
		},
		{
			0: {
				letter: ' ',
				status: 'unused',
			},
			1: {
				letter: ' ',
				status: 'unused',
			},
			2: {
				letter: ' ',
				status: 'unused',
			},
			3: {
				letter: ' ',
				status: 'unused',
			},
			4: {
				letter: ' ',
				status: 'unused',
			},
		},
		{
			0: {
				letter: ' ',
				status: 'unused',
			},
			1: {
				letter: ' ',
				status: 'unused',
			},
			2: {
				letter: ' ',
				status: 'unused',
			},
			3: {
				letter: ' ',
				status: 'unused',
			},
			4: {
				letter: ' ',
				status: 'unused',
			},
		},
		{
			0: {
				letter: ' ',
				status: 'unused',
			},
			1: {
				letter: ' ',
				status: 'unused',
			},
			2: {
				letter: ' ',
				status: 'unused',
			},
			3: {
				letter: ' ',
				status: 'unused',
			},
			4: {
				letter: ' ',
				status: 'unused',
			},
		},
	]);
	const currentBoardRow = ref(0);
	const currentBoardColumn = ref(0);
	const gameState = ref('playing');
	const displayError = ref(false);
	const errorType = ref('none');
	const showWelcome = ref(true);
	const showHelp = ref(false);
	const showGameOver = ref(false);

	const randomWord =
		WordList['words'][Math.floor(Math.random() * WordList['words'].length)];

	// Update the board
	const updateBoard = (key) => {
		if (key === 'erase') {
			if (currentBoardColumn.value > 0) {
				currentBoardColumn.value--;
				boardState.value[currentBoardRow.value][
					currentBoardColumn.value
				].letter = ' ';
				boardState.value[currentBoardRow.value][
					currentBoardColumn.value
				].status = 'unused';
			} /* else {
				displayError.value = true;
				errorType.value = 'erase';
				setTimeout(() => {
					displayError.value = false;
					errorType.value = 'none';
				}, 2000);
			}*/
		} else if (key === 'enter') {
			if (currentBoardRow.value <= 5 && currentBoardColumn.value === 5) {
				checkWord(boardState.value[currentBoardRow.value]);
				currentBoardRow.value++;
				currentBoardColumn.value = 0;
			}
			/*
			if (currentBoardColumn.value < 5) {
				displayError.value = true;
				errorType.value = 'enter';
				setTimeout(() => {
					displayError.value = false;
					errorType.value = 'none';
				}, 2000);
			}
			*/
		} else {
			if (currentBoardColumn.value < 5) {
				boardState.value[currentBoardRow.value][
					currentBoardColumn.value
				].letter = key;
				currentBoardColumn.value++;
			}
		}
	};

	// Check if the letter is almost correct
	const checkAlmost = (index, correctWord, guessWord) => {
		// Create an object to count appearances of each letter in the correctWord
		const correctCount = {};
		for (let letter of correctWord) {
			correctCount[letter] = (correctCount[letter] || 0) + 1;
		}

		// Track the actual use of each letter in the guess for 'correct' and 'almost' statuses
		const actualUseCount = {};
		for (let i = 0; i < guessWord.length; i++) {
			if (correctWord[i] === guessWord[i]) {
				// Increase count for correctly placed letters
				actualUseCount[guessWord[i]] = (actualUseCount[guessWord[i]] || 0) + 1;
			}
		}

		// Calculate the potential uses for 'almost' considering only letters before the current index
		for (let i = 0; i < index; i++) {
			if (
				correctWord.includes(guessWord[i]) &&
				correctWord[i] !== guessWord[i]
			) {
				if ((actualUseCount[guessWord[i]] || 0) < correctCount[guessWord[i]]) {
					actualUseCount[guessWord[i]] =
						(actualUseCount[guessWord[i]] || 0) + 1;
				}
			}
		}

		// Now check for the 'almost' status of the current letter at the current index
		const currentLetter = guessWord[index];
		if (
			correctWord.includes(currentLetter) &&
			correctWord[index] !== currentLetter
		) {
			if ((actualUseCount[currentLetter] || 0) < correctCount[currentLetter]) {
				// If we haven't used up all instances of this letter, it's almost correct
				return true;
			}
		}

		return false;
	};

	// Check the word
	const boardRef = ref(null);
	const keyboardRef = ref(null);
	const checkWord = (row) => {
		boardRef.value.changeClass(currentBoardRow.value);
		let word = '';
		for (let i = 0; i < 5; i++) {
			word += row[i].letter;
		}
		keyboardRef.value.changeClass(row);
		// Change board state
		for (let i = 0; i < 5; i++) {
			if (word[i] === randomWord[i]) {
				row[i].status = 'correct';
			} else if (checkAlmost(i, randomWord, word)) {
				row[i].status = 'almost';
			} else {
				row[i].status = 'incorrect';
			}
		}

		// Change keyboard state
		for (let i = 0; i < 5; i++) {
			if (row[i].status === 'correct' || row[i].status === 'almost') {
				keyboardState.value[row[i].letter] = 'correct';
			} else {
				keyboardState.value[row[i].letter] = 'used';
			}
		}

		// Check if the player has won
		let won = true;
		for (let i = 0; i < 5; i++) {
			if (row[i].status !== 'correct') {
				won = false;
				break;
			}
		}
		if (won) {
			gameState.value = 'won';
		} else if (currentBoardRow.value === 5) {
			gameState.value = 'over';
		}
	};

	const router = useRouter();
	// Refresh the game
	const refreshGame = () => {
		// redirect to /
		router.push('/');
	};

	// If the game is won console log it
	watch(gameState, (newGameState) => {
		if (newGameState === 'won') {
			boardRef.value.dance(currentBoardRow.value - 1);
			keyboardRef.value.blockKeyboard();
			console.log('You won!');
			// Animates the winning message, shows letter by letter
			const winningMessage = document.querySelector('.winning-message');
			// Wait one second
			setTimeout(() => {
				winningMessage.style.animation = 'fadeIn 2s forwards';
			}, 1000);
		}
		if (newGameState === 'over') {
			keyboardRef.value.blockKeyboard();
			console.log('Game over!');
			showGameOver.value = true;
		}
	});
</script>
<style>
	.game-title {
		font-size: 4rem;
	}
	.game-container {
		padding: 2rem;
		background: #0c1214;
		height: 100vh;
		display: flex;
		flex-direction: column;
		/* center horizontally and vertically */
		align-items: center;
		justify-content: center;
		gap: 3rem;
	}
	.board-container {
		align-self: center;
		background: #121b1e;
		border-radius: 15px;
		padding: 40px 30px;
	}
	.help-icon {
		position: absolute;
		bottom: 10px;
		right: 10px;
		color: #cdd1d6;
		cursor: pointer;
	}
	.winning-message {
		font-size: 2rem;
		color: #97c9d8;
		opacity: 0;
	}
	@media (max-width: 700px) {
		.game-title {
			font-size: 1.5rem;
		}
		.game-container {
			gap: 1rem;
		}
		.board-container {
			padding: 20px 15px;
		}
		.help-icon {
			top: 5px;
			right: 5px;
		}
		.winning-message {
			font-size: 1rem;
		}
	}
	/* animation for winning message, show letter by letter */

	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>
