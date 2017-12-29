// @flow
import React from 'react';
import styled from 'styled-components';
import VolumeOff from 'react-icons/lib/md/volume-off';
import VolumeOn from 'react-icons/lib/md/volume-up';

import { COLORS } from '../../constants';
import { range } from '../../utils';

type Props = {
  blockSize?: number,
  currentVolume: number,
  steps?: number,
  isMuted?: boolean,
  onAdjustVolume: (volume: number) => void,
  onToggleMute: () => void,
};

const VolumeAdjuster = ({
  blockSize = 16,
  currentVolume,
  steps = 10,
  isMuted = false,
  onAdjustVolume,
  onToggleMute,
}: Props) => {
  const isAudible = !isMuted && currentVolume > 0;
  const VolumeIcon = isAudible ? VolumeOn : VolumeOff;

  return (
    <Wrapper>
      <Header>
        <Label>Volume</Label>
        <MuteButton onClick={() => onToggleMute()}>
          <VolumeIcon
            color={isAudible ? COLORS.primary[500] : COLORS.gray[300]}
          />
        </MuteButton>
      </Header>

      <VolumeBlocks>
        {range(1, steps).map(index => (
          <VolumeBlock
            key={index}
            size={blockSize}
            onClick={() => onAdjustVolume(index / steps)}
          >
            <VolumeBlockFill
              isFilled={index / steps <= currentVolume}
              isEnabled={!isMuted}
            />
          </VolumeBlock>
        ))}
      </VolumeBlocks>
    </Wrapper>
  );
};

const BORDER_WIDTH = 2;

const Wrapper = styled.div`
  display: inline-block;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

const Label = styled.span`
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 400;
  color: ${COLORS.gray[500]};
`;

const MuteButton = styled.button`
  background: transparent;
  border: none;
  padding: 5px;
  font-size: 17px;
  cursor: pointer;
`;

const VolumeBlocks = styled.div`
  display: flex;
`;

const VolumeBlock = styled.button`
  position: relative;
  width: ${props => props.size + 'px'};
  height: ${props => props.size + 'px'};
  background: #fff;
  border: ${BORDER_WIDTH + 'px'} solid ${COLORS.gray[300]};
  border-radius: 0;
  margin-right: 2px;
  outline: none;
`;

const VolumeBlockFill = styled.div`
  position: absolute;
  top: ${-BORDER_WIDTH + 'px'};
  left: ${-BORDER_WIDTH + 'px'};
  right: ${-BORDER_WIDTH + 'px'};
  bottom: ${-BORDER_WIDTH + 'px'};
  background: ${props =>
    props.isEnabled ? COLORS.primary[500] : COLORS.gray[500]};
  opacity: ${props => (props.isFilled ? 1 : 0)};
  transition: opacity 250ms;
`;

export default VolumeAdjuster;
