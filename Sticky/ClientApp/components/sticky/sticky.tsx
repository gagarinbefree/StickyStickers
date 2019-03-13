import * as React from 'react';
import AddButton from '../addButton/addButton';
import { connect } from 'react-redux';
import * as Actions from './stickyActions';
import * as _ from "lodash";
import { ISticker } from '../sticker/sticker';
import Sticker from '../sticker/sticker';
import { IPosition } from '../common';

export interface IStickyState {
    type: string;
    payload: ISticky;
}

export interface ISticky {    
    lastnum: number,
    stickers: ISticker[]
}

export interface IStickyProps {
    addSticker(): void;
    setStickerPosition(index: number, pos: IPosition): void;
    changeStickerColor(index: number): void;
    deleteSticker(index: number, id: number): void;
    changeStickerTitle(index: number, text: string): void;
    changeStickerNote(index: number, text: string): void;
    saveSticker(index: number, sticker: ISticker): void;
    loadStickers(): void;
}

export class Sticky extends React.Component<ISticky & IStickyProps> {
    constructor(props: ISticky & IStickyProps) {
        super(props);        
    }
    
    render(): JSX.Element {
        return <div>
            <AddButton clickHandler={this.addButtonClickHandler.bind(this)} />
            {                
                this.props.stickers.map((sticker: ISticker, ii: number) => {
                    return <Sticker
                        index={ii}
                        sticker={sticker}
                        key={sticker.num}
                        setPosition={this.props.setStickerPosition}
                        changeColor={this.props.changeStickerColor}
                        delete={this.props.deleteSticker}
                        changeTitle={this.props.changeStickerTitle}
                        changeNote={this.props.changeStickerNote}
                        save={this.props.saveSticker}
                    />
                })
            }
        </div>
    }

    async componentDidMount(): Promise<void> {
        await this.props.loadStickers();
    }

    addButtonClickHandler(): void {
        this.props.addSticker();
    }    
}

let mapDispatchToProps = (dispatch: any): IStickyProps => {
    return {
        addSticker: (): void => dispatch(Actions.addSticker()),
        setStickerPosition: (index: number, pos: IPosition): void => dispatch(Actions.setStickerPosition(index, pos)),
        changeStickerColor: (index: number): void => dispatch(Actions.changeStickerColor(index)),
        deleteSticker: async (index: number, id: number): Promise<void> => dispatch(Actions.deleteSticker(index, id)),
        changeStickerTitle: (index: number, text: string): void => dispatch(Actions.changeStickerTitle(index, text)),
        changeStickerNote: (index: number, text: string): void => dispatch(Actions.changeStickerNote(index, text)),
        saveSticker: async (index: number, sticker: ISticker): Promise<void> => dispatch(Actions.saveSticker(index, sticker)),
        loadStickers: async (): Promise<void> => dispatch(Actions.loadStickers())
    }
}

let mapStateToProps = (state: any): ISticky => {
    return {
        lastnum: state.stickyReducer.payload.lastnum,
        stickers: state.stickyReducer.payload.stickers
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sticky)