<template>
	<v-card rounded="lg" height="100%" width="100%">
		<div class="game-over-container">
			<h1 class="game-over-text">Game Over</h1>
			<p class="game-over-text">
				The word was: <b>{{ word }}</b> <br />Better luck next time!
			</p>
			<v-btn class="button" @click="emit('refresh')">Play Again</v-btn>
		</div>
	</v-card>
</template>

<script setup>
	const props = defineProps({
		word: {
			type: String,
		},
	});
	const emit = defineEmits(['refresh']);
</script>

<style>
	.game-over-container {
		padding: 20px 30px;
		font-family: 'Electrolize', sans-serif;
		background: #27363b;
		color: #ebedee;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}
	.game-over-text {
		text-align: center;
	}
	.button {
		background: #97c9d8;
		color: #101213;
		font-weight: 900 !important;
	}
</style>
