import { getPieceAt, cellAlgebraic } from "./PiecesTest";
import { Chess } from "chess.js";

export interface Cell {
  file: number;
  rank: number;
}

export interface DndPieceData {
  piece: string;
  originCell: Cell;
  targetCell: Cell;
}

export interface DndLocation {
  x: number;
  y: number;
}

function getCell(x: number, y: number, cellsSize: number, reversed: boolean) {
  const cellX = Math.floor((x - cellsSize * 0.5) / cellsSize);
  const cellY = Math.floor((y - cellsSize * 0.5) / cellsSize);

  const file = [true, "true"].includes(reversed) ? 7 - cellX : cellX;
  const rank = [true, "true"].includes(reversed) ? cellY : 7 - cellY;

  return [file, rank];
}

function getLocalCoordinates(
  event: MouseEvent,
  rootElement: HTMLElement
): Array<number> {
  if (!rootElement) return [];

  const thisComponentLocation = rootElement.getBoundingClientRect();
  const localX = event.clientX - thisComponentLocation.x;
  const localY = event.clientY - thisComponentLocation.y;

  return [localX, localY];
}

export function handleMouseDown(
  event: MouseEvent,
  cellsSize: number,
  reversed: boolean,
  rootElement: HTMLElement | undefined,
  positionFen: string,
  setupDnd: (
    x: number,
    y: number,
    file: number,
    rank: number,
    piece: string
  ) => void,
  gameInProgress: boolean,
  waitingForExternalMove: boolean,
  playerHuman: boolean
) {
  if (!rootElement) return;
  if (!gameInProgress) return;
  if (waitingForExternalMove) return;
  if (!playerHuman) return;
  const [x, y] = getLocalCoordinates(event, rootElement);
  const [file, rank] = getCell(x, y, cellsSize, reversed);

  const piece = getPieceAt(positionFen, file, rank);
  if (piece === undefined) return;

  const isWhiteTurn = positionFen.split(" ")[1] === "w";
  const isWhitePiece = "PNRBQK".includes(piece);
  const isNotPieceOfCurrentPlayerInTurn = isWhiteTurn !== isWhitePiece;

  if (isNotPieceOfCurrentPlayerInTurn) return;

  setupDnd(x, y, file, rank, piece);
}

export function handleMouseMove(
  event: MouseEvent,
  dragAndDropInProgress: boolean,
  updateDndLocation: (x: number, y: number, file: number, rank: number) => void,
  rootElement: HTMLElement | undefined,
  cancelDnd: Function,
  cellsSize: number,
  reversed: boolean,
  promotionPending: boolean,
  gameInProgress: boolean,
  waitingForExternalMove: boolean,
  playerHuman: boolean
) {
  if (!rootElement) return;
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
  event: MouseEvent,
  cellsSize: number,
  reversed: boolean,
  rootElement: HTMLElement | undefined,
  logic: Chess,
  dragAndDropInProgress: boolean,
  dndPieceData: DndPieceData,
  cancelDnd: () => void,
  updateLogic: () => void,
  updateAndEmitLastMove: (
    startFile: number,
    startRank: number,
    endFile: number,
    endRank: number,
    logicBeforeMove: Chess,
    logicAfterMove: Chess
  ) => void,
  promotionPending: boolean,
  setPromotionPending: (
    startFile: number,
    startRank: number,
    endFile: number,
    endRank: number
  ) => void,
  gameInProgress: boolean,
  handleGameEndedStatus: () => void,
  updateWaitingForExternalMove: () => void,
  waitingForExternalMove: boolean,
  playerHuman: boolean
) {
  if (!rootElement) return;
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

  const pieceAtOriginCell = getPieceAt(logic.fen(), file, rank);
  const isPawnMoving = ["P", "p"].includes(pieceAtOriginCell);
  const targetOnFirstOrLastRank = rank === 0 || rank === 7;

  const isPromotionMove =
    isPromotion && isPawnMoving && targetOnFirstOrLastRank;

  if (isPromotionMove) {
    setPromotionPending(originCell.file, originCell.rank, file, rank);
    return;
  }

  const moveObject = buildMoveObject(
    originCell.file,
    originCell.rank,
    file,
    rank
  );

  const logicBeforeMove = new Chess(logic.fen());
  try {
    logic.move(moveObject);
  } catch (ex: any) {
    cancelDnd();
    return;
  }

  updateLogic();
  cancelDnd();

  handleGameEndedStatus();

  updateAndEmitLastMove(
    originCell.file,
    originCell.rank,
    file,
    rank,
    logicBeforeMove,
    logic
  );

  updateWaitingForExternalMove();
}

export function handleMouseExited(
  event: MouseEvent,
  cancelDnd: () => void,
  promotionPending: boolean,
  gameInProgress: boolean,
  waitingForExternalMove: boolean,
  playerHuman: boolean
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

export function isDnDOriginCell(
  file: number,
  rank: number,
  dndPieceData: DndPieceData
) {
  const originCell = dndPieceData.originCell;
  return originCell.file === file && originCell.rank === rank;
}

export function isDnDTargetCell(
  file: number,
  rank: number,
  dndPieceData: DndPieceData
) {
  const targetCell = dndPieceData.targetCell;
  return targetCell.file === file && targetCell.rank === rank;
}

export function isDnDCrossCell(
  file: number,
  rank: number,
  dndPieceData: DndPieceData
) {
  const targetCell = dndPieceData.targetCell;
  return targetCell.file === file || targetCell.rank === rank;
}

export function isWhitePawnDragged(dndPieceData: DndPieceData) {
  return dndPieceData.piece === "P";
}

export function isWhiteKnightDragged(dndPieceData: DndPieceData) {
  return dndPieceData.piece === "N";
}

export function isWhiteBishopDragged(dndPieceData: DndPieceData) {
  return dndPieceData.piece === "B";
}

export function isWhiteRookDragged(dndPieceData: DndPieceData) {
  return dndPieceData.piece === "R";
}

export function isWhiteQueenDragged(dndPieceData: DndPieceData) {
  return dndPieceData.piece === "Q";
}

export function isWhiteKingDragged(dndPieceData: DndPieceData) {
  return dndPieceData.piece === "K";
}

export function isBlackPawnDragged(dndPieceData: DndPieceData) {
  return dndPieceData.piece === "p";
}

export function isBlackKnightDragged(dndPieceData: DndPieceData) {
  return dndPieceData.piece === "n";
}

export function isBlackBishopDragged(dndPieceData: DndPieceData) {
  return dndPieceData.piece === "b";
}

export function isBlackRookDragged(dndPieceData: DndPieceData) {
  return dndPieceData.piece === "r";
}

export function isBlackQueenDragged(dndPieceData: DndPieceData) {
  return dndPieceData.piece === "q";
}

export function isBlackKingDragged(dndPieceData: DndPieceData) {
  return dndPieceData.piece === "k";
}
