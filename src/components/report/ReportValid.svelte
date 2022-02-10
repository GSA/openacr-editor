<script>
  import { evaluation } from "../../stores/evaluation.js";
  import { validate } from "../../utils/validate.js";

  const valid = validate($evaluation);
</script>

<style>
  /* TODO remove after switching theme to use USWDS */
  *+.usa-alert {
    margin-top: 1rem;
  }
  .usa-alert {
    font-size: 1.06rem;
    line-height: 1.5;
    background-color: #f0f0f0;
    padding-bottom: 1rem;
    padding-top: 1rem;
    position: relative;
    border-left: 0.5rem solid #adadad;
  }
  .usa-alert__heading {
    font-size: 1.33rem;
    line-height: .9;
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
  .usa-alert__body {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }
  .usa-alert__text {
    margin-bottom: 0;
    margin-top: 0;
  }
  .usa-alert--error {
    background-color: #f4e3db;
    border-left-color: #d54309;
    color: #1b1b1b;
  }
  .usa-alert--error:before {
    background: 0 0;
    background-color: #1b1b1b;
    -webkit-mask: url(../images/error.svg) no-repeat center/contain;
    width: 2rem;
    content: "";
    display: block;
    height: 3.5rem;
    left: 0.9166666667rem;
    position: absolute;
    top: 0;
  }
  .usa-alert--success {
    background-color: #ecf3ec;
    border-left-color: #00a91c;
    color: #1b1b1b;
  }
  .usa-alert--success:before {
    background: 0 0;
    background-color: #1b1b1b;
    -webkit-mask: url(../images/check_circle.svg) no-repeat center/contain;
    width: 2rem;
    content: "";
    display: block;
    height: 3.5rem;
    left: 0.9166666667rem;
    position: absolute;
    top: 0;
  }
  .usa-alert--success .usa-alert__body,
  .usa-alert--error .usa-alert__body {
    padding-left: 3.8333333334rem;
  }
</style>

{#if valid.result}
  <div class="usa-alert usa-alert--success">
    <div class="usa-alert__body">
      <h4 class="usa-alert__heading">Valid Report</h4>
      <p class="usa-alert__text">
        Your report has passed validation
      </p>
    </div>
  </div>
{:else}
  <div class="usa-alert usa-alert--error" role="alert">
    <div class="usa-alert__body">
      <h4 class="usa-alert__heading">Error</h4>
      <p class="usa-alert__text">
        {@html valid.message}
      </p>
    </div>
  </div>
{/if}
