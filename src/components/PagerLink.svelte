<script>
  import { Link } from "svelte-navigator";
  import vars from "../../config/__buildEnv__.json";

  export let to = "";
  export let direction = "";
</script>

<style>
	.li{
	list-style:none;
	margin:0;
	display:flex;
	flex:0 1 50%;
	text-transform: capitalize;
	}
</style>

<li class={`li ${direction}`}>
  <Link {to} class="display-flex">
	  {#if direction === 'previous'}
	  <i class="fa fa-arrow-left"></i>
    {:else if direction === 'next'}
      <i class="fa fa-arrow-right"></i>
    {/if}
    <span style="display:flex;width:100%;flex-direction:column;margin-left:10px;margin-top:-10px">
      <span class="pager--item-text-direction">
        {`${direction.toLowerCase()}:`}
      </span>
      <span class="pager--item-text-target">
        <slot />
      </span>
    </span>
  </Link>
</li>
