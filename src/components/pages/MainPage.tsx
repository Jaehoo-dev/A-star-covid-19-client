import { useState, useEffect } from 'react';
import { NUMBER_OF_ROWS, NUMBER_OF_COLUMNS } from '../../constants/numbers';
import MainHeader from '../organisms/MainHeader';
import Main from '../organisms/Main';
import Cell, { CellProps } from '../atoms/Cell';
import getRandomCell from '../../utils/getRandomCell';
import aggregateDangerZones from '../../utils/aggregateDangerZones';
import findPath from '../../utils/findPath';
import fetchDangerLocations from '../../api/fetchDangerLocations';

const MainPage = (): JSX.Element => {
  const totalNumberOfCells = NUMBER_OF_ROWS * NUMBER_OF_COLUMNS;
  const [dangerLocations, setDangerLocations] = useState<number[]>([]);
  const [dangerZones, setdangerZones] = useState<number[]>([]);
  const [startingPointIndex, setStartingPointIndex] = useState<number>(-1);
  const [destinationIndex, setDestinationIndex] = useState(-1);
  const [openIndices, setOpenIndices] = useState<number[]>([]);
  const [closedIndices, setClosedIndices] = useState<number[]>([]);
  const [pathIndices, setPathIndices] = useState<number[]>([]);
  const [cells, setCells] = useState<JSX.Element[]>([]);
  const [isShowingDangerZones, setIsShowingDangerZones] = useState(true);

  useEffect(() => {
    loadDangerLocations();
  }, []);

  useEffect(() => {
    if (!dangerLocations.length) return;

    setdangerZones(aggregateDangerZones(dangerLocations));
  }, [dangerLocations]);

  useEffect(() => {
    if (!dangerZones.length) return;

    setStartingPointIndex(getRandomCell(totalNumberOfCells, dangerZones));
  }, [dangerZones]);

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
    dangerZones,
    isShowingDangerZones,
    openIndices,
    closedIndices,
    pathIndices,
  ]);

  function cellClickHandler(event: React.MouseEvent): void {
    const target = event.target as HTMLDivElement;

    const cellId = Number(target.id);

    if (dangerZones.includes(cellId)) {
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

  function dangerClickHandler(): void {
    setIsShowingDangerZones(!isShowingDangerZones);
  }

  function randomClickHandler(): void {
    loadDangerLocations();
    setDestinationIndex(-1);
    clearClickHandler();
  }

  function clearClickHandler(): void {
    setOpenIndices([]);
    setClosedIndices([]);
    setPathIndices([]);
  }

  function findPathClickHandler(): void {
    activatePathFinding(false);
  }

  function visualizeClickHandler(): void {
    activatePathFinding(true);
  }

  function activatePathFinding(isVisualizationEnabled: boolean): void {
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
      dangerZones,
      setOpenIndices,
      setClosedIndices,
      setPathIndices,
      isShowingDangerZones,
      isVisualizationEnabled,
    );
  }

  function setCellState(index: number): CellProps['state'] {
    if (index === startingPointIndex) {
      return 'startingPoint';
    }

    if (index === destinationIndex) {
      return 'destination';
    }

    if (
      isShowingDangerZones
      && dangerZones.includes(index)
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
        onClearButtonClick={clearClickHandler}
        onFindPathClick={findPathClickHandler}
        onVisualizeClick={visualizeClickHandler}
      />
    </>
  );
};

export default MainPage;
