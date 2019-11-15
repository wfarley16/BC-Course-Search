import React from 'react';
import './Paginator.css';
import { Button } from 'semantic-ui-react';

interface Props {
  start: number;
  stop: number;
  total: number;
  onClick: Function;
}

export const Paginator: React.FC<Props> = props => {
  return (
    <div className="paginator-wrapper">
      <div className="paginator-container">
        <Button
          id="paginator-minus"
          onClick={() => props.onClick(-1)}
          className="paginator-button"
        >{`<`}</Button>
        <h3 className="paginator-label">{`${props.start + 1} to ${props.stop +
          1} of ${props.total}`}</h3>
        <Button
          id="paginator-plus"
          onClick={() => props.onClick(1)}
          className="paginator-button"
        >{`>`}</Button>
      </div>
    </div>
  );
};
