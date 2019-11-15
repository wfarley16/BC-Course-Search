import React from 'react';
import './Sidebar.css';
import { Button } from 'semantic-ui-react';
import { Filter, DropDownOptions } from '../helpers/types';
import FilterField from './FilterField';

interface Props {
  updateValue: Function;
  search: Function;
  filters: Map<Filter, Array<DropDownOptions>>;
}

class Sidebar extends React.Component<Props> {
  render() {
    const { filters } = this.props;
    return (
      <div className="sidebar-wrapper">
        <div>
          {Array.from(filters.keys()).map(filter => (
            <FilterField
              key={`filter-field-${filter.id}`}
              field={filter}
              options={filters.get(filter)}
              onValueChange={(id, data) => this.props.updateValue(id, data)}
            />
          ))}
        </div>
        <Button className="filter-button" onClick={() => this.props.search()}>
          Filter
        </Button>
      </div>
    );
  }
}

export default Sidebar;
