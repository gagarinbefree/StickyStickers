export interface IMuiStyles {
    classes: any;
}

export interface IPosition {
    x: number,
    y: number
}

export function getRndPosition(): IPosition {
    return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight
    }
}

export function getCardColor(color: string = ''): string {
    const cardcolors: string[] = ['#ef9a9a', '#a5d6a7', '#fff59d']

    if (color == '')
        return cardcolors[0];

    var ii = cardcolors.indexOf(color);

    return cardcolors[ii < cardcolors.length - 1 ? ii + 1 : 0];
}
