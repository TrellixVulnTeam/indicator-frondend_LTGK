
declare global {
    interface Number {
        isDefined(): boolean;
    }
}

Number.prototype.isDefined = function (): boolean {
    let hasValue: boolean = true;

    if (Number(this) == null || Number(this) == undefined || Number(this) == 0) {
        hasValue = false;
    }

    return hasValue;
}

export { };