import React from 'react';
// Helpers
import { calcTime, convertMoney } from '../../utils/helpers';
// Styles
import { Wrapper, Content } from './MovieInfoBar.styles';
// Types
import type { MovieInfoBarProps } from '../../types/types';

const MovieInfoBar: React.FC<MovieInfoBarProps> = ({ time, budget, revenue }) => (
  <Wrapper>
    <Content>
      <div className='column'>
        <p>Длительность: {calcTime(time)}</p>
      </div>
      <div className='column'>
        <p>Бюджет: {convertMoney(budget)}</p>
      </div>
      <div className='column'>
        <p>Сборы: {convertMoney(revenue)}</p>
      </div>
    </Content>
  </Wrapper>
);

export default MovieInfoBar;
