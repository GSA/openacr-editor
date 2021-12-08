<script>
  export let percentage = 0;
</script>

<style>
  .progress-bar {
    height: 0.25em;
    width: 100%;
    background-color: var(--cloudy);
    position: relative;
  }
  .progress-bar__progress {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    background: #1e6ad6;
    transition: width 0.2s;
  }
</style>

<div class="progress-bar">
  <span class="progress-bar__progress" style={`width: ${percentage}%`}>
    <span class="visuallyhidden">{percentage} %</span>
  </span>
</div>
