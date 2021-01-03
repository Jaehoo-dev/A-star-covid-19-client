import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal, { historyModalTheme } from '../atoms/Modal';
import List, { historyListTheme } from '../atoms/List';
import fetchHistories from '../../api/fetchHistories';
import { calculateRowIndex, calculateColumnIndex } from '../../utils/calculateIndex';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { History } from '../../interfaces/';

interface HistoryModalProps {
  onOverlayClick: () => void;
  numberOfColumns: number;
  setStartingPointIndex: React.Dispatch<React.SetStateAction<number>>;
  setDestinationIndex: React.Dispatch<React.SetStateAction<number>>;
  clearMap: () => void;
}

const HistoryModal = ({
  onOverlayClick,
  numberOfColumns,
  setStartingPointIndex,
  setDestinationIndex,
  clearMap,
}: HistoryModalProps): JSX.Element => {
  const [historiesByIndex, setHistoriesByIndex] = useState<History[]>([]);

  useEffect(() => {
    loadHistories();

    async function loadHistories() {
      const historiesByIndex = await fetchHistories();

      if (!historiesByIndex) return;

      const sortedHistories = historiesByIndex.sort((a, b) => {
        const aDate = new Date(a.updatedAt);
        const bDate = new Date(b.updatedAt);
        return bDate.getTime() - aDate.getTime();
      });

      setHistoriesByIndex(sortedHistories);
    }
  }, []);

  function closeModal() {
    onOverlayClick();
  }

  function historyItemClickHandler(event: React.MouseEvent) {
    clearMap();
    const [startingPointIndex, destinationIndex] = JSON.parse(event.currentTarget.id);
    setStartingPointIndex(startingPointIndex);
    setDestinationIndex(destinationIndex);
    closeModal();
  }

  return (
    <Modal
      onOverlayClick={closeModal}
      theme={historyModalTheme}
    >
      <List
        theme={historyListTheme}
        title='Histories'
      >
        {
          historiesByIndex.map(historyByIndex => {
            const [startingPointIndex, destinationIndex] = historyByIndex.coordinates;
            const startingPointCoordinates = [
              calculateRowIndex(startingPointIndex, numberOfColumns),
              calculateColumnIndex(startingPointIndex, numberOfColumns),
            ];
            const destinationCoordinates = [
              calculateRowIndex(destinationIndex, numberOfColumns),
              calculateColumnIndex(destinationIndex, numberOfColumns),
            ];

            return (
              <ItemWrapper
                key={JSON.stringify(historyByIndex.coordinates)}
                id={JSON.stringify(historyByIndex.coordinates)}
                onClick={historyItemClickHandler}
              >
                <span>
                  {`[${startingPointCoordinates[0]}, ${startingPointCoordinates[1]}]`}
                </span>
                <VerticallyCenteredSpan>
                  <ArrowRightAltIcon />
                </VerticallyCenteredSpan>
                <span>
                  {`[${destinationCoordinates[0]}, ${destinationCoordinates[1]}]`}
                </span>
              </ItemWrapper>
            );
          })
        }
      </List>
    </Modal>
  );
};

const ItemWrapper = styled.div<{
  id: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-bottom: 1px solid gray;

  &:hover {
    cursor: pointer;
  }
`;

const VerticallyCenteredSpan = styled.span`
  display: inline-flex;
  justify-content: center;
  margin: 0 12px;
`;

export default HistoryModal;
