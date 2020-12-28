import { useState, useEffect } from 'react';
import { NUMBER_OF_ROWS, NUMBER_OF_COLUMNS } from '../../constants/numbers';
import MainHeader from '../organisms/MainHeader';
import Main from '../organisms/Main';
import Cell from '../atoms/Cell';
import getRandomCell from '../../utils/getRandomCell';
import createDangerZone from '../../utils/createDangerZone';
import findPath from '../../utils/findPath';

const MainPage = () => {
  const totalNumberOfCells = NUMBER_OF_ROWS * NUMBER_OF_COLUMNS;
  const [dangerZone, setdangerZone]
    = useState<number[]>(createDangerZone(
      getRandomCell(totalNumberOfCells),
      NUMBER_OF_ROWS,
      NUMBER_OF_COLUMNS,
    ));
  const [startingPointIndex, setStartingPointIndex]
    = useState(getRandomCell(totalNumberOfCells, dangerZone));
  const [destinationIndex, setDestinationIndex] = useState(-1);
  const [openIndices, setOpenIndices] = useState<number[]>([]);
  const [closedIndices, setClosedIndices] = useState<number[]>([]);
  const [pathIndices, setPathIndices] = useState<number[]>([]);
  const [cells, setCells] = useState<JSX.Element[]>([]);
  const [isShowingDangerZone, setIsShowingDangerZone] = useState(true);

  function findPathClickHandler() {
    if (destinationIndex === -1) {
      alert('Select destination.');

      return;
    }

    clearClickHandler();

    findPath(
      NUMBER_OF_ROWS,
      NUMBER_OF_COLUMNS,
      startingPointIndex,
      destinationIndex,
      dangerZone,
      setOpenIndices,
      setClosedIndices,
      setPathIndices,
      isShowingDangerZone,
    );
  }

  function cellClickHandler(event: React.MouseEvent) {
    const target = event.target as HTMLDivElement;

    const cellId = Number(target.id);

    if (dangerZone.includes(cellId)) {
      alert('Cannot select danger zone as destination.');

      return;
    }

    if (cellId === destinationIndex) {
      setDestinationIndex(-1);

      return;
    }

    setDestinationIndex(cellId);
  }

  useEffect(() => {
    setCells(Array.from({
      length: totalNumberOfCells,
    }, (x, i) => (
      <Cell
        key={i}
        state={setCellState(i)}
        index={i}
        numberOfRows={NUMBER_OF_ROWS}
        numberOfColumns={NUMBER_OF_COLUMNS}
        onClick={(event: React.MouseEvent) => cellClickHandler(event)}
      />
    )));
  }, [
    startingPointIndex,
    destinationIndex,
    dangerZone,
    isShowingDangerZone,
    openIndices,
    closedIndices,
    pathIndices,
  ]);

  function setCellState(index: number) {
    if (index === startingPointIndex) {
      return 'startingPoint';
    }

    if (index === destinationIndex) {
      return 'destination';
    }

    if (
      isShowingDangerZone
      && dangerZone.includes(index)
    ) {
      return 'danger';
    }

    if (pathIndices.includes(index)) {
      return 'path';
    }

    if (openIndices.includes(index)) {
      return 'open';
    }

    if (closedIndices.includes(index)) {
      return 'closed';
    }

    return 'unvisited';
  }

  function randomClickHandler() {
    const newDangerZone = createDangerZone(
      getRandomCell(totalNumberOfCells),
      NUMBER_OF_ROWS,
      NUMBER_OF_COLUMNS,
    );
    const newStartingPointIndex = getRandomCell(totalNumberOfCells, newDangerZone);

    setdangerZone(newDangerZone);
    setStartingPointIndex(newStartingPointIndex);
    setDestinationIndex(-1);
    clearClickHandler();
  }

  function dangerClickHandler() {
    setIsShowingDangerZone(!isShowingDangerZone);
  }

  function clearClickHandler() {
    setOpenIndices([]);
    setClosedIndices([]);
    setPathIndices([]);
  }

  return (
    <>
      <MainHeader />
      <Main
        cells={cells}
        onDangerButtonClick={dangerClickHandler}
        onRandomButtonClick={randomClickHandler}
        onFindPathClick={findPathClickHandler}
        onClearButtonClick={clearClickHandler}
      />
    </>
  );
};

export default MainPage;
