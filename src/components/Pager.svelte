<script>
  export let label = "";
</script>

<style>
	.pager{
	border:1px solid #ddd;
	}
</style>
<nav class="pager" aria-label={label}>
  <ul class="display-flex">
    <slot />
  </ul>
</nav>
