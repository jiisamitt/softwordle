<template>
	<v-card rounded="lg" height="100%" width="100%">
		<div class="help-container">
			<h1 class="help-text">How to Play</h1>
			<p class="help-text">
				You need to type a five letter word and press enter to check it.
			</p>
			<br />
			<p>
				If the letter is part of the word, but on the wrong position it will be
				displayed with a yellow color:
				<b class="letter yellow-letter">A</b>
			</p>
			<br />

			<p>
				If the letter is part of the word and on the correct position it will be
				displayed with a blue color:<b class="letter blue-letter">A</b>
			</p>
			<br />
			<p class="help-text">
				Once you have guessed the word correctly, you win the game! If you run
				out of attempts, game over!
			</p>
			<br />
			<v-btn class="button" @click="emit('closeHelp')">Got it!</v-btn>
		</div>
	</v-card>
</template>
<script setup>
	const emit = defineEmits(['closeHelp']);
</script>

<style>
	.help-container {
		padding: 20px 30px;
		font-family: 'Electrolize', sans-serif;
		background: #27363b;
		color: #ebedee;
	}
	.help-text {
		text-align: left;
	}
	.button {
		background: #97c9d8;
		color: #101213;
		font-weight: 900 !important;
	}
	.letter {
		align-items: center;
		margin: 5px;
		padding: 4px 6px;
		font-size: 1rem;
		font-weight: bolder;
		border-radius: 4px;
	}
	.yellow-letter {
		background: #c7b06a;
		color: #101213;
	}
	.blue-letter {
		background: #97c9d8;
		color: #101213;
	}
	@media (max-width: 700px) {
		.help-container {
			font-size: 12px;
		}
		.letter {
			width: 30px;
			height: 30px;
			font-size: 0.8rem;
		}
	}
</style>
