export function cellAlgebraic(file: number, rank: number) {
    return `${String.fromCharCode('a'.charCodeAt(0) + file)}${String.fromCharCode('1'.charCodeAt(0) + rank)}`;
}

export function getPieceAt(chessLogic: any, file: number, rank: number) {
    const pieceValue = chessLogic.get(cellAlgebraic(file, rank));
    return pieceValue;
}

export function isWhitePawnAtCell(chessLogic: any, file: number, rank: number) {
    const piece = getPieceAt(chessLogic, file, rank);
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'p' && piece.color === 'w';
}

export function isWhiteKnightAtCell(chessLogic: any, file: number, rank: number) {
    const piece = getPieceAt(chessLogic, file, rank);
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'n' && piece.color === 'w';
}

export function isWhiteBishopAtCell(chessLogic: any, file: number, rank: number) {
    const piece = getPieceAt(chessLogic, file, rank);
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'b' && piece.color === 'w';
}

export function isWhiteRookAtCell(chessLogic: any, file: number, rank: number) {
    const piece = getPieceAt(chessLogic, file, rank);
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'r' && piece.color === 'w';
}

export function isWhiteQueenAtCell(chessLogic: any, file: number, rank: number) {
    const piece = getPieceAt(chessLogic, file, rank);
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'q' && piece.color === 'w';
}

export function isWhiteKingAtCell(chessLogic: any, file: number, rank: number) {
    const piece = getPieceAt(chessLogic, file, rank);
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'k' && piece.color === 'w';
}

export function isBlackPawnAtCell(chessLogic: any, file: number, rank: number) {
    const piece = getPieceAt(chessLogic, file, rank);
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'p' && piece.color === 'b';
}

export function isBlackKnightAtCell(chessLogic: any, file: number, rank: number) {
    const piece = getPieceAt(chessLogic, file, rank);
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'n' && piece.color === 'b';
}

export function isBlackBishopAtCell(chessLogic: any, file: number, rank: number) {
    const piece = getPieceAt(chessLogic, file, rank);
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'b' && piece.color === 'b';
}

export function isBlackRookAtCell(chessLogic: any, file: number, rank: number) {
    const piece = getPieceAt(chessLogic, file, rank);
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'r' && piece.color === 'b';
}

export function isBlackQueenAtCell(chessLogic: any, file: number, rank: number) {
    const piece = getPieceAt(chessLogic, file, rank);
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'q' && piece.color === 'b';
}

export function isBlackKingAtCell(chessLogic: any, file: number, rank: number) {
    const piece = getPieceAt(chessLogic, file, rank);
    if ([null, undefined].includes(piece)) return false;
    return piece.type === 'k' && piece.color === 'b';
}
