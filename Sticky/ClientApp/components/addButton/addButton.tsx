import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

const styles = (theme: any) => ({
    fab: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
});

const AddButton: React.SFC<any> = (props) => {
    const { classes } = props;

    return <Fab color="primary" aria-label="Add" className={classes.fab} onClick={props.clickHandler}>
        <AddIcon />
    </Fab>;
}

export default withStyles(styles)(AddButton)