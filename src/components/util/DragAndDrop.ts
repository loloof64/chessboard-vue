import { getPieceAt, cellAlgebraic } from "./PiecesTest";
import { Chess } from "chess.js";

export interface Cell {
  file: number;
  rank: number;
}

export interface DndPieceData {
  originCell: Cell;
  targetCell: Cell;
}

function getCell(x: number, y: number, cellsSize: number, reversed: boolean) {
  const cellX = Math.floor((x - cellsSize * 0.5) / cellsSize);
  const cellY = Math.floor((y - cellsSize * 0.5) / cellsSize);

  const file = [true, "true"].includes(reversed) ? 7 - cellX : cellX;
  const rank = [true, "true"].includes(reversed) ? cellY : 7 - cellY;

  return [file, rank];
}

function getLocalCoordinates(
  event: any,
  rootElement: HTMLElement
): Array<number> {
  if (!rootElement) return [];

  const thisComponentLocation = rootElement.getBoundingClientRect();
  const localX = event.clientX - thisComponentLocation.x;
  const localY = event.clientY - thisComponentLocation.y;

  return [localX, localY];
}

export function handleMouseDown(
  event: any,
  cellsSize: number,
  reversed: boolean,
  rootElement: HTMLElement,
  logic: any,
  setupDnd: Function,
  gameInProgress: boolean,
  waitingForExternalMove: boolean,
  playerHuman: boolean
) {
  if (!gameInProgress) return;
  if (waitingForExternalMove) return;
  if (!playerHuman) return;
  const [x, y] = getLocalCoordinates(event, rootElement);
  const [file, rank] = getCell(x, y, cellsSize, reversed);

  const piece = getPieceAt(logic, file, rank);
  if ([null, undefined].includes(piece)) return;

  const isWhiteTurn = logic.turn() === "w";
  const isWhitePiece = piece.color === "w";
  const isNotPieceOfCurrentPlayerInTurn = isWhiteTurn !== isWhitePiece;

  if (isNotPieceOfCurrentPlayerInTurn) return;

  setupDnd({ x, y, file, rank, piece });
}

export function handleMouseMove(
  event: any,
  dragAndDropInProgress: false,
  updateDndLocation: Function,
  rootElement: HTMLElement,
  cancelDnd: Function,
  cellsSize: number,
  reversed: boolean,
  promotionPending: boolean,
  gameInProgress: boolean,
  waitingForExternalMove: boolean,
  playerHuman: boolean
) {
  if (!gameInProgress) return;
  if (waitingForExternalMove) return;
  if (!dragAndDropInProgress) return;
  if (promotionPending) return;
  if (!playerHuman) return;

  const [x, y] = getLocalCoordinates(event, rootElement);
  const [file, rank] = getCell(x, y, cellsSize, reversed);

  const thisComponentLocation = rootElement.getBoundingClientRect();
  const inBounds =
    x >= 0 &&
    x <= thisComponentLocation.width &&
    y >= 0 &&
    y <= thisComponentLocation.height;

  if (!inBounds) {
    cancelDnd();
    return;
  }

  updateDndLocation(x, y, file, rank);
}

export function handleMouseUp(
  event: any,
  cellsSize: number,
  reversed: boolean,
  rootElement: HTMLElement,
  logic: any,
  dragAndDropInProgress: boolean,
  dndPieceData: DndPieceData,
  cancelDnd: Function,
  updateLogic: Function,
  updateAndEmitLastMove: Function,
  promotionPending: boolean,
  setPromotionPending: Function,
  gameInProgress: boolean,
  handleGameEndedStatus: Function,
  updateWaitingForExternalMove: Function,
  waitingForExternalMove: boolean,
  playerHuman: boolean
) {
  if (!gameInProgress) return;
  if (waitingForExternalMove) return;
  if (!dragAndDropInProgress) return;
  if (promotionPending) return;
  if (!playerHuman) return;

  const [x, y] = getLocalCoordinates(event, rootElement);
  const [file, rank] = getCell(x, y, cellsSize, reversed);

  const originCell = dndPieceData.originCell;

  const inBounds =
    originCell.file >= 0 &&
    originCell.file <= 7 &&
    originCell.rank >= 0 &&
    originCell.rank <= 7 &&
    file >= 0 &&
    file <= 7 &&
    rank >= 0 &&
    rank <= 7;

  if (!inBounds) {
    cancelDnd();
    return;
  }

  const testMoveObject = buildMoveObject(
    originCell.file,
    originCell.rank,
    file,
    rank
  );
  const logicClone = new Chess(logic.fen());
  let isPromotion = false;
  try {
    logicClone.move(testMoveObject);
  } catch (ex: any) {
    isPromotion = true;
  }

  const pieceAtOriginCell = logic.get(
    cellAlgebraic(originCell.file, originCell.rank)
  );
  const isPawnMoving = pieceAtOriginCell && pieceAtOriginCell.type === "p";
  const targetOnFirstOrLastRank = rank === 0 || rank === 7;

  const isPromotionMove =
    isPromotion && isPawnMoving && targetOnFirstOrLastRank;

  if (isPromotionMove) {
    setPromotionPending({
      startFile: originCell.file,
      startRank: originCell.rank,
      endFile: file,
      endRank: rank,
    });
    return;
  }

  const moveObject = buildMoveObject(
    originCell.file,
    originCell.rank,
    file,
    rank
  );

  const logicBeforeMove = new Chess(logic.fen());
  const result = logic.move(moveObject);

  if ([null, undefined].includes(result)) {
    cancelDnd();
    return;
  }

  updateLogic();
  cancelDnd();

  handleGameEndedStatus();

  updateAndEmitLastMove({
    startFile: originCell.file,
    startRank: originCell.rank,
    endFile: file,
    endRank: rank,
    logicBeforeMove,
    logicAfterMove: logic,
  });

  updateWaitingForExternalMove();
}

export function handleMouseExited(
  event: any,
  cancelDnd: Function,
  promotionPending: false,
  gameInProgress: false,
  waitingForExternalMove: false,
  playerHuman: false
) {
  if (!gameInProgress) return;
  if (waitingForExternalMove) return;
  if (promotionPending) return;
  if (!playerHuman) return;
  cancelDnd();
}

function buildMoveObject(
  startFile: number,
  startRank: number,
  endFile: number,
  endRank: number,
  promotion: string = "q"
) {
  const startAlgebraic = cellAlgebraic(startFile, startRank);
  const endAlgebraic = cellAlgebraic(endFile, endRank);

  return {
    from: startAlgebraic,
    to: endAlgebraic,
    promotion,
  };
}

export function isDnDOriginCell(file: number, rank: number, dndPieceData: any) {
  if ([undefined, null].includes(dndPieceData)) return undefined;

  const originCell = dndPieceData.originCell;
  if ([undefined, null].includes(originCell)) return undefined;

  return originCell.file === file && originCell.rank === rank;
}

export function isWhitePawnDragged(dndPieceData: any) {
  if ([undefined, null].includes(dndPieceData)) return false;
  return dndPieceData.type === "p" && dndPieceData.color === "w";
}

export function isWhiteKnightDragged(dndPieceData: any) {
  if ([undefined, null].includes(dndPieceData)) return false;
  return dndPieceData.type === "n" && dndPieceData.color === "w";
}

export function isWhiteBishopDragged(dndPieceData: any) {
  if ([undefined, null].includes(dndPieceData)) return false;
  return dndPieceData.type === "b" && dndPieceData.color === "w";
}

export function isWhiteRookDragged(dndPieceData: any) {
  if ([undefined, null].includes(dndPieceData)) return false;
  return dndPieceData.type === "r" && dndPieceData.color === "w";
}

export function isWhiteQueenDragged(dndPieceData: any) {
  if ([undefined, null].includes(dndPieceData)) return false;
  return dndPieceData.type === "q" && dndPieceData.color === "w";
}

export function isWhiteKingDragged(dndPieceData: any) {
  if ([undefined, null].includes(dndPieceData)) return false;
  return dndPieceData.type === "k" && dndPieceData.color === "w";
}

export function isBlackPawnDragged(dndPieceData: any) {
  if ([undefined, null].includes(dndPieceData)) return false;
  return dndPieceData.type === "p" && dndPieceData.color === "b";
}

export function isBlackKnightDragged(dndPieceData: any) {
  if ([undefined, null].includes(dndPieceData)) return false;
  return dndPieceData.type === "n" && dndPieceData.color === "b";
}

export function isBlackBishopDragged(dndPieceData: any) {
  if ([undefined, null].includes(dndPieceData)) return false;
  return dndPieceData.type === "b" && dndPieceData.color === "b";
}

export function isBlackRookDragged(dndPieceData: any) {
  if ([undefined, null].includes(dndPieceData)) return false;
  return dndPieceData.type === "r" && dndPieceData.color === "b";
}

export function isBlackQueenDragged(dndPieceData: any) {
  if ([undefined, null].includes(dndPieceData)) return false;
  return dndPieceData.type === "q" && dndPieceData.color === "b";
}

export function isBlackKingDragged(dndPieceData: any) {
  if ([undefined, null].includes(dndPieceData)) return false;
  return dndPieceData.type === "k" && dndPieceData.color === "b";
}
