<template>
	<div id="app" class="mrf-app">
		<transition name="fade">
			<router-view />
		</transition>
	</div>
</template>

<script>

export default {
	name: 'App'
};
</script>
