import { useState, useEffect } from 'react';
import { NUMBER_OF_ROWS, NUMBER_OF_COLUMNS } from '../../constants/numbers';
import MainHeader from '../organisms/MainHeader';
import Main from '../organisms/Main';
import Cell, { CellProps } from '../atoms/Cell';
import getRandomCell from '../../utils/getRandomCell';
import aggregateDangerZones from '../../utils/aggregateDangerZones';
import findPath from '../../utils/findPath';
import fetchDangerLocations from '../../api/fetchDangerLocations';
import { User } from '../../interfaces';

interface MainPageProps {
  onAuthButtonClick: () => void;
  currentUser: User | null;
}

const MainPage = ({
  onAuthButtonClick,
  currentUser,
}: MainPageProps): JSX.Element => {
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
  const [currentCellIndex, setCurrentCellIndex] = useState<number>(-1);
  const [isFindingPath, setIsFindingPath] = useState<boolean>(false);

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
    currentCellIndex,
  ]);

  function cellClickHandler(event: React.MouseEvent): void {
    const target = event.target as HTMLDivElement;

    const cellId = Number(target.id);

    if (dangerZones.includes(cellId)) {
      alert('Cannot select danger zone as destination.');

      return;
    }

    clearMap();

    if (cellId === destinationIndex) {
      setDestinationIndex(-1);

      return;
    }

    setDestinationIndex(cellId);
  }

  function dangerClickHandler(): void {
    clearMap();
    setIsShowingDangerZones(!isShowingDangerZones);
  }

  function randomClickHandler(): void {
    clearMap();
    loadDangerLocations();
    setDestinationIndex(-1);
    setIsShowingDangerZones(true);
  }

  function clearClickHandler(): void {
    clearMap();
  }

  function findPathClickHandler(): void {
    activatePathFinding(false);
  }

  function visualizeClickHandler(): void {
    activatePathFinding(true);
  }

  function clearMap(): void {
    setOpenIndices([]);
    setClosedIndices([]);
    setPathIndices([]);
    setCurrentCellIndex(-1);
  }

  function activatePathFinding(isVisualizationEnabled: boolean): void {
    if (destinationIndex === -1) {
      alert('Select destination.');

      return;
    }

    clearMap();

    findPath(
      NUMBER_OF_ROWS,
      NUMBER_OF_COLUMNS,
      startingPointIndex,
      destinationIndex,
      dangerZones,
      setOpenIndices,
      setClosedIndices,
      setPathIndices,
      setCurrentCellIndex,
      isShowingDangerZones,
      isVisualizationEnabled,
      setIsFindingPath,
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

    if (
      pathIndices.includes(index)
      || index === currentCellIndex
    ) {
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
      <MainHeader
        onAuthButtonClick={onAuthButtonClick}
        currentUser={currentUser}
      />
      <Main
        cells={cells}
        onDangerButtonClick={dangerClickHandler}
        onRandomButtonClick={randomClickHandler}
        onClearButtonClick={clearClickHandler}
        onFindPathClick={findPathClickHandler}
        onVisualizeClick={visualizeClickHandler}
        isFindingPath={isFindingPath}
      />
    </>
  );
};

export default MainPage;
