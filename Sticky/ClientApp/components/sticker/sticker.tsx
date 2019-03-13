import * as React from 'react';
import { IPosition } from '../common';
import classNames from 'classnames';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Draggable, { DraggableEventHandler, ControlPosition, DraggableData } from 'react-draggable';
import TextField from '@material-ui/core/TextField';
import { InputAdornment, CardHeader, Avatar, IconButton } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import TextareaAutosize from 'react-textarea-autosize';
import SaveIcon from '@material-ui/icons/Save';
import * as moment from 'moment';

export interface ISticker {
    num: number;
    id: number;
    date: Date;
    x: number,
    y: number,
    title: string;
    note: string;
    color: string;
    isnotsaved: boolean;
}

const styles = (theme: Theme) => createStyles({
    card: {
        width: 275,
        margin: 10
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    draggable: {
        position: 'absolute' as 'absolute'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 230,
    },
    avatar: {
        backgroundColor: '#000000',
        cursor: 'pointer'
    },
    actions: {
        display: 'flex',
    },
    expand: {
        marginLeft: 'auto'
    },
    area: {
        marginLeft: 8,
        marginTop: 30,
        width: 224,
        resize: 'vertical',
        border: '1px solid #b3adad',
        borderRadius: 3
    },
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    }
});

export interface IStickerProps {
    classes: any,
    index: number
    sticker: ISticker,
    setPosition(index: number, pos: IPosition): void;      
    changeColor(index: number): void;
    delete(index: number, id: number): void;
    changeTitle(index: number, text: string): void;
    changeNote(index: number, text: string): void;
    save(index: number, sticker: ISticker): void;
}

const Sticker: React.SFC<IStickerProps> = (props) => {
    const { classes } = props;
    const sticker: ISticker = props.sticker;
    const position: IPosition = {
        x: sticker.x, y: sticker.y
    }

    return <Draggable defaultClassName={classes.draggable}
        defaultPosition={position}
        onStop={(e: any, pos: DraggableData): void => {
            if (sticker.x != pos.x || sticker.y != pos.y)
                props.setPosition(props.index, { x: pos.x, y: pos.y })
        }}
        handle=".card-handle"
    >
        <Card id={'sticker-' + props.index.toString()} className={classes.card}>
            <CardHeader className="card-handle" style={{ backgroundColor: sticker.color, cursor: 'move' }}
                avatar={
                    <Avatar aria-label="Recipe" className={classes.avatar}
                        onClick={(): void => props.changeColor(props.index) }
                    >
                        {sticker.num}
                    </Avatar>
                }
                title={moment(sticker.date).format('DD.MM.YYYY HH:mm')}
            />
            <CardContent>
                <Typography component="p">
                    <TextField
                        id="outlined-static"
                        label="title"
                        className={classes.textField}
                        margin="normal"
                        InputProps={{
                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                        }}
                        autoFocus={true}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => props.changeTitle(props.index, e.target.value)}
                        defaultValue={sticker.title}
                    />
                </Typography>
                <Typography component="p">
                    <TextareaAutosize minRows={5}
                        className={classes.area}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => props.changeNote(props.index, e.target.value)}
                        defaultValue={sticker.note}
                    />
                </Typography>
            </CardContent>
            <CardActions className={classes.actions} disableActionSpacing>
                <Button variant="contained" size="small" className={classes.button}
                    onClick={(): void => props.save(props.index, sticker)}
                    disabled={!sticker.isnotsaved}
                >
                    <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                    Save
                </Button>
                <IconButton aria-label="Delete" className={classes.expand}
                    onClick={(): void => props.delete(props.index, sticker.id)}
                >
                    <Delete />
                </IconButton>
            </CardActions>
        </Card>
    </Draggable>
}

export default withStyles(styles)(Sticker)
