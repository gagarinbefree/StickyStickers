import { IStickyState } from './sticky';
import {
    STICKY_ADD_STICKER,
    STICKY_SET_STICKER_POSITION,
    STICKY_CHANGE_STICKER_COLOR,
    STICKY_DELETE_STICKER,
    STICKY_TITLE_CHANGE,
    STICKY_NOTE_CHANGE,
    STICKY_SAVE_STICKER,
    STICKY_UPDATE_STICKER,    STICKY_LOAD_STICKERS} from "./stickyConstants";
import { getCardColor } from '../common';
import produce from 'immer';
import * as _ from 'lodash';
import { Action } from 'redux';
import { ISticker } from "../sticker/sticker";
import { ISetPositionAction, IStickerAction, IChangeTextAction, IDbStickersAction } from './stickyActions';

export const initSticky: IStickyState = {
    type: '',
    payload: {
        lastnum: 0,
        stickers: [] as ISticker[]
    }
}

// immer - immutable state (https://github.com/mweststrate/immer)
const stickyReducer = (state: IStickyState = initSticky, action: Action) => produce(state, draft => {
    if (action.type == STICKY_ADD_STICKER) {
        draft.payload.lastnum++;
        draft.payload.stickers.push({
            num: draft.payload.lastnum,
            id: 0,
            date: new Date(),
            x: 0,
            y: getHeight(state.payload.stickers),
            title: '',
            note: '',
            color: getCardColor(),
            isnotsaved: true
        })
    }
    else if (action.type == STICKY_SET_STICKER_POSITION) {
        const act = action as ISetPositionAction;

        draft.payload.stickers[act.index].x = act.position.x;
        draft.payload.stickers[act.index].y = act.position.y;
        draft.payload.stickers[act.index].isnotsaved = true;
    }
    else if (action.type == STICKY_CHANGE_STICKER_COLOR) {
        const act = action as IStickerAction;

        draft.payload.stickers[act.index].color = getCardColor(draft.payload.stickers[act.index].color);
        draft.payload.stickers[act.index].isnotsaved = true;
    }
    else if (action.type == STICKY_TITLE_CHANGE) {
        const act = action as IChangeTextAction;

        draft.payload.stickers[act.index].title = act.text;
        draft.payload.stickers[act.index].isnotsaved = true;
    }
    else if (action.type == STICKY_NOTE_CHANGE) {
        const act = action as IChangeTextAction;

        draft.payload.stickers[act.index].note = act.text;
        draft.payload.stickers[act.index].isnotsaved = true;
    }
    else if (action.type == STICKY_DELETE_STICKER) {
        const act = action as IStickerAction;

        draft.payload.stickers.splice(act.index, 1);
    }
    else if (action.type == STICKY_SAVE_STICKER) {
        const act = action as IStickerAction;

        draft.payload.stickers[act.index].isnotsaved = false;
    }
    else if (action.type == STICKY_UPDATE_STICKER) {
        const act = action as IStickerAction;

        draft.payload.stickers[act.index].isnotsaved = false;
    }
    else if (action.type == STICKY_LOAD_STICKERS) {
        const act = action as IDbStickersAction;

        draft.payload.lastnum = getNum(act.stickers);
        draft.payload.stickers = act.stickers;
    }
})

const getHeight = (stickers: ISticker[]): number => {
    let max: ISticker | undefined = _.maxBy(stickers, 'y');
    return max ? max.y + 200 : 0;
}

const getNum = (stickers: ISticker[]): number => {
    return stickers.length != 0 ? stickers[stickers.length - 1].num : 0;
}

export default stickyReducer