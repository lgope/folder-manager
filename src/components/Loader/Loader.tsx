import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";

const styles = (theme: any) => ({
  progress: {
    margin: theme.spacing.unit * 10,
  },
});

const Loader = (props: any) => {
  const { classes } = props;
  return (
    <Grid container justifyContent="center">
      <CircularProgress className={classes.progress} color="secondary" />
    </Grid>
  );
};

Loader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loader);
