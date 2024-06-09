<template>
	<v-card rounded="xl" height="100%" width="100%">
		<div class="welcome-container">
			<h1 class="welcome-text">Welcome to Softwordle!</h1>
			<p class="welcome-text">
				Softwordle is a word game where you can test your general knowledge in
				software, while having fun! Just like the classic word game Wordle, you
				have to guess a word in a limited number of attempts.
			</p>
			<p class="welcome-text">
				The key difference is that in Softwordle you have to guess
				software-related words, such as programming languages, frameworks, or
				tools.
			</p>
			<br />
			<v-btn class="button" @click="closeWelcome">Play!</v-btn>
		</div>
	</v-card>
</template>

<script setup>
	const emit = defineEmits(['closeWelcome']);
	const closeWelcome = () => emit('closeWelcome');
</script>

<style>
	.welcome-container {
		padding: 20px 30px;
		font-family: 'Electrolize', sans-serif;
		background: #27363b;
		color: #ebedee;
	}
	.welcome-text {
		text-align: left;
	}
	.button {
		background: #97c9d8;
		color: #101213;
		font-weight: 900 !important;
	}
	@media (max-width: 700px) {
		.welcome-container {
			font-size: 12px;
		}
	}
</style>
