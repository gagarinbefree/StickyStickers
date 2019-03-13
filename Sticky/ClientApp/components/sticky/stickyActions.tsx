import { Dispatch, Action } from 'redux';
import {
    STICKY_ADD_STICKER,
    STICKY_SET_STICKER_POSITION,
    STICKY_CHANGE_STICKER_COLOR,
    STICKY_DELETE_STICKER,
    STICKY_TITLE_CHANGE,
    STICKY_NOTE_CHANGE,
    STICKY_SAVE_STICKER,
    STICKY_UPDATE_STICKER,
    STICKY_LOAD_STICKERS
} from './stickyConstants';
import { IPosition } from '../common';
import { ISticker } from '../sticker/sticker';

export interface IAddStickerAction extends Action {
}

export interface ISetPositionAction extends Action {
    index: number;
    position: IPosition;
}

export interface IStickerAction extends Action {
    index: number;
}

export interface IChangeTextAction extends Action {
    index: number;
    text: string;
}

export interface IDbStickersAction {
    type: string,
    stickers: ISticker[]
}

export function addSticker(): IAddStickerAction {
    return { type: STICKY_ADD_STICKER }
}

export const setStickerPosition = (index: number, position: IPosition): ISetPositionAction => {
    return {
        type: STICKY_SET_STICKER_POSITION,
        index: index,
        position: position
    }
}

export const changeStickerColor = (index: number): IStickerAction => {
    return {
        type: STICKY_CHANGE_STICKER_COLOR,
        index: index
    }
}

export const changeStickerTitle = (index: number, text: string): IChangeTextAction => {
    return { type: STICKY_TITLE_CHANGE, index: index, text: text }
}

export const changeStickerNote = (index: number, text: string): IChangeTextAction => {
    return { type: STICKY_NOTE_CHANGE, index: index, text: text }
}

export const loadStickers = () => {
    return async (dispatch: Dispatch<IDbStickersAction>): Promise<void> => {
        try {
            let request: any = await fetch('/api/stickers/', { method: 'GET' });
            let res: ISticker[] = await request.json();

            dispatch({ type: STICKY_LOAD_STICKERS, stickers: res });
        }
        catch (e) {
            console.error(e);
        }
    }
}

export const deleteSticker = (index: number, id: number) => {
    return async (dispatch: Dispatch<IStickerAction>): Promise<void> => {
        try {
            if (id == 0) {
                dispatch({ type: STICKY_DELETE_STICKER, index: index });
            }
            else {
                let request: any = await fetch('/api/stickers/' + id, { method: 'DELETE' });
                await request;

                dispatch({ type: STICKY_DELETE_STICKER, index: index });
            }
        }
        catch (e) {
            console.error(e);
        }
    }
}

export const saveSticker = (index: number, sticker: ISticker) => {
    return async (dispatch: Dispatch<IStickerAction>): Promise<void> => {
        try {
            if (sticker.id == 0) {
                let request: any = await fetch('/api/stickers/', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(sticker)
                });
                await request.json();

                dispatch({ type: STICKY_SAVE_STICKER, index: index });
            }
            else {
                let request: any = await fetch('/api/stickers/' + sticker.id, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(sticker)
                });
                await request;

                dispatch({ type: STICKY_UPDATE_STICKER, index: index });
            }
        }
        catch (e) {
            console.error(e);
        }
    }
}