import classes from "./LoadingSpinner.module.css";
const LoadingSpinner = (props) => {
  return (
    <div>
      <div class={classes.spinner}>
        <div class={classes.bounce1}></div>
        <div class={classes.bounce2}></div>
        <div class={classes.bounce3}></div>
      </div>
      <p class="text-center">{props.loadingMessage}</p>
    </div>
  );
};

export default LoadingSpinner;
