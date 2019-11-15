import { Filter } from '../helpers/types';

const sidebarFilters: Array<Filter> = [
  {
    id: 1,
    label: 'School',
    type: 'single',
    attachedValue: ''
  },
  {
    id: 2,
    label: 'Department',
    type: 'multi',
    attachedValue: []
  },
  {
    id: 3,
    label: 'Core Requirement',
    type: 'single',
    attachedValue: ''
  },
  {
    id: 4,
    label: 'Open',
    type: 'checkbox',
    attachedValue: '1'
  }
];

export default sidebarFilters;
