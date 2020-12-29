import { useState, useEffect } from 'react';
import { NUMBER_OF_ROWS, NUMBER_OF_COLUMNS } from '../../constants/numbers';
import MainHeader from '../organisms/MainHeader';
import Main from '../organisms/Main';
import Cell, { CellProps } from '../atoms/Cell';
import getRandomCell from '../../utils/getRandomCell';
import createDangerZone from '../../utils/createDangerZone';
import findPath from '../../utils/findPath';
import fetchDangerLocations from '../../api/fetchDangerLocations';

const MainPage = (): JSX.Element => {
  const totalNumberOfCells = NUMBER_OF_ROWS * NUMBER_OF_COLUMNS;
  const [dangerLocations, setDangerLocations] = useState<number[]>([]);
  const [dangerZone, setdangerZone] = useState<number[]>([]);
  const [startingPointIndex, setStartingPointIndex] = useState<number>(-1);
  const [destinationIndex, setDestinationIndex] = useState(-1);
  const [openIndices, setOpenIndices] = useState<number[]>([]);
  const [closedIndices, setClosedIndices] = useState<number[]>([]);
  const [pathIndices, setPathIndices] = useState<number[]>([]);
  const [cells, setCells] = useState<JSX.Element[]>([]);
  const [isShowingDangerZone, setIsShowingDangerZone] = useState(true);

  useEffect(() => {
    loadDangerLocations();
  }, []);

  useEffect(() => {
    if (!dangerLocations.length) return;

    setdangerZone([
      ...createDangerZone(
        dangerLocations[0],
        NUMBER_OF_ROWS,
        NUMBER_OF_COLUMNS,
      ),
      ...createDangerZone(
        dangerLocations[1],
        NUMBER_OF_ROWS,
        NUMBER_OF_COLUMNS,
      ),
    ]);
  }, [dangerLocations]);

  useEffect(() => {
    if (!dangerZone.length) return;

    setStartingPointIndex(getRandomCell(totalNumberOfCells, dangerZone));
  }, [dangerZone]);

  function findPathClickHandler(): void {
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

  function cellClickHandler(event: React.MouseEvent): void {
    const target = event.target as HTMLDivElement;

    const cellId = Number(target.id);

    if (dangerZone.includes(cellId)) {
      alert('Cannot select danger zone as destination.');

      return;
    }

    clearClickHandler();

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

  function setCellState(index: number): CellProps['state'] {
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

  function randomClickHandler(): void {
    loadDangerLocations();
    setDestinationIndex(-1);
    clearClickHandler();
  }

  function dangerClickHandler(): void {
    setIsShowingDangerZone(!isShowingDangerZone);
  }

  function clearClickHandler(): void {
    setOpenIndices([]);
    setClosedIndices([]);
    setPathIndices([]);
  }

  async function loadDangerLocations(): Promise<void> {
    const dangerLocations = await fetchDangerLocations();

    if (!dangerLocations || !dangerLocations.length) return;

    setDangerLocations(dangerLocations);
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
