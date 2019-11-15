import React from 'react';
import './FilterField.css';
import { DropDownOptions, Filter } from '../helpers/types';
import { Input, Radio, Dropdown } from 'semantic-ui-react';

interface Props {
  field: Filter;
  options?: Array<DropDownOptions>;
  onValueChange: Function;
}

export default (props: Props) => {
  const { field, onValueChange, options } = props;

  const renderByType = () => {
    const { id, label, type, attachedValue } = field;

    switch (type) {
      case 'input':
        return (
          <Input
            onChange={event => onValueChange(id, event)}
            placeholder={label}
          />
        );
      case 'checkbox':
        return (
          <Radio
            key={`form-field-${id}`}
            toggle
            label={label}
            defaultChecked={attachedValue === '1'}
            onChange={value => onValueChange(id, value)}
          />
        );
      case 'single':
        return (
          options && (
            <Dropdown
              key={`form-field-${id}`}
              placeholder={label}
              selection
              fluid
              options={options}
              onChange={(ev, data) => onValueChange(id, data)}
            />
          )
        );
      case 'multi':
        return (
          options && (
            <Dropdown
              key={`form-field-${id}`}
              placeholder={label}
              selection
              multiple
              fluid
              options={options}
              onChange={(ev, data) => onValueChange(id, data)}
            />
          )
        );
      default:
        return null;
    }
  };

  return <div className="filter-field">{renderByType()}</div>;
};
