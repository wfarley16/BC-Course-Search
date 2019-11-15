import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

import './SearchCourses.css';
import Sidebar from '../components/Sidebar';

import { Paginator } from '../components/Paginator';
import { CourseCard } from '../components/CourseCard';
import { Course, School, Filter, DropDownOptions } from '../helpers/types';
import { Navigation } from '../components/Navigation';
import API from '../helpers/api';
import sidebarFilters from '../components/filters';
import { CourseModal } from '../components/CourseModal';

interface Props {}

interface State {
  schools: Array<School>;
  courses: Array<Course>;
  course: Course;
  open: boolean;
  filters: Map<Filter, Array<DropDownOptions>>;
  start: number;
  stop: number;
  step: number;
}

class SearchCourses extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      schools: [],
      courses: [],
      course: {
        title: '',
        code: ''
      },
      open: false,
      filters: new Map<Filter, Array<DropDownOptions>>(),
      start: 0,
      stop: 0,
      step: 5
    };
    this.updateValue = this.updateValue.bind(this);
    this.selectCourse = this.selectCourse.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  async componentDidMount() {
    await this.getSchools();
    this.updateRange(0);
    this.configureFilters();
  }

  getSchools = async () => {
    try {
      const schools = await API.getSchools();
      this.setState({ schools });
    } catch (e) {
      console.log(e);
    }
  };

  searchCourses = async (filters: Array<Filter>) => {
    const department = filters.filter(filter => filter.id === 2)[0]
      .attachedValue;
    const open = filters.filter(filter => filter.id === 4)[0].attachedValue;
    const core = filters.filter(filter => filter.id === 3)[0].attachedValue;

    if (core) {
      if (core === 'History') {
        const res = await API.getCourses('HIST');
        const subjectList = res['subjectList'];
        const courses = subjectList.filter(subject => {
          const isCore = subject.description.includes(
            'Satisfies Core requirement for:'
          );
          const is3Credits = subject.credits > 2;
          if (open === '1') {
            return isCore && is3Credits && subject['alert'] === 'OPEN';
          } else {
            return isCore && is3Credits;
          }
        });
        this.setState({ courses }, () => this.updateRange(0));
      }
      if (core === 'Natural Science') {
        const departments = ['BIOL', 'CHEM', 'EESC'];
        await departments.map(async subject => {
          const res = await API.getCourses(subject);
          const subjectList = res['subjectList'];
          const courses = subjectList.filter(subject => {
            const isCore = subject.description.includes(
              'Satisfies Core requirement for:'
            );
            const is3Credits = subject.credits > 2;
            if (open === '1') {
              return isCore && is3Credits && subject['alert'] === 'OPEN';
            } else {
              return isCore && is3Credits;
            }
          });
          this.setState({ courses }, () => this.updateRange(0));
        });
      }
    } else {
      if (typeof department === 'object') {
        await department.map(async subject => {
          const res = await API.getCourses(subject);
          const subjectList = res['subjectList'];
          const courses = subjectList.filter(subject => {
            const is3Credits = subject.credits > 2;
            if (open === '1') {
              return is3Credits && subject['alert'] === 'OPEN';
            } else {
              return is3Credits;
            }
          });
          this.setState({ courses }, () => this.updateRange(0));
        });
      }
    }
  };

  selectCourse = course => {
    this.setState({ course, open: true });
  };

  updateRange = add => {
    const { courses, start, step } = this.state;

    const mod = add * step;
    let newStart = 0;
    const lastIndex = courses.length - 1;
    if (add === 1) {
      newStart = start + mod > lastIndex ? 0 : start + mod;
    } else {
      newStart = start + mod < 0 ? lastIndex - mod : start + mod;
    }

    const newStop =
      newStart + step > lastIndex ? lastIndex : newStart + step - 1;

    this.setState({ start: newStart, stop: newStop });
  };

  configureFilters() {
    const { filters } = this.state;
    sidebarFilters.forEach(filter => {
      filters.set(filter, []);
    });
    this.populateDropDownOptions();
  }

  populateDropDownOptions() {
    const { schools, filters } = this.state;
    const schoolFilter = Array.from(filters.keys()).filter(
      filter => filter.id === 1
    )[0];
    const schoolOptions: Array<DropDownOptions> = schools.map(
      (school, index) => {
        return {
          id: index,
          value: school.schoolCode,
          text: school.schoolName
        };
      }
    );
    filters.set(schoolFilter, schoolOptions);

    const departmentsFilter = Array.from(filters.keys()).filter(
      filter => filter.id === 2
    )[0];
    const departmentOptions: Array<DropDownOptions> = [];
    schools.forEach((school, index) => {
      school.subjectList.forEach(subject => {
        const option: DropDownOptions = {
          id: index,
          value: subject.subjectCode,
          text: subject.subjectName
        };
        departmentOptions.push(option);
      });
    });
    filters.set(departmentsFilter, departmentOptions);

    const coreFilter = Array.from(filters.keys()).filter(
      filter => filter.id === 3
    )[0];
    const coreOptions: Array<DropDownOptions> = [
      {
        id: 0,
        value: 'Natural Science',
        text: 'Natural Science'
      },
      {
        id: 1,
        value: 'History',
        text: 'History'
      }
    ];
    filters.set(coreFilter, coreOptions);

    this.setState({ filters });
  }

  filterDepartment() {
    const { schools, filters } = this.state;
    const schoolFilter = Array.from(filters.keys()).filter(
      filter => filter.id === 1
    )[0];
    const selectedSchool = schoolFilter.attachedValue;
    const departmentsFilter = Array.from(filters.keys()).filter(
      filter => filter.id === 2
    )[0];
    const departmentOptions: Array<DropDownOptions> = [];
    schools
      .filter(school => school.schoolCode === selectedSchool)
      .forEach((school, index) => {
        school.subjectList.forEach(subject => {
          const option: DropDownOptions = {
            id: index,
            value: subject.subjectCode,
            text: subject.subjectName
          };
          departmentOptions.push(option);
        });
      });
    filters.set(departmentsFilter, departmentOptions);

    this.setState({ filters });
  }

  updateValue(id, data) {
    const { filters } = this.state;
    const filter = Array.from(filters.keys()).filter(
      filter => filter.id === id
    )[0];
    filter.attachedValue = data.value;
    this.setState({ filters }, () => {
      if (id === 1) {
        this.filterDepartment();
      }
    });
  }

  onClose() {
    this.setState({ open: false });
  }

  render() {
    const { filters, courses, start, stop, open, course } = this.state;
    return (
      <Container className="page">
        <CourseModal course={course} open={open} onClose={this.onClose} />
        <Navigation />
        <div className="search-page">
          <Sidebar
            filters={filters}
            updateValue={(id, data) => this.updateValue(id, data)}
            search={() => this.searchCourses(Array.from(filters.keys()))}
          />
          {courses.length > 0 && (
            <div className="search-experiences-wrapper">
              <div>
                {courses.slice(start, stop + 1).map(course => (
                  <CourseCard
                    key={course.courseIndex}
                    course={course}
                    selectCourse={course => this.selectCourse(course)}
                  />
                ))}
                <Paginator
                  start={start}
                  stop={stop}
                  total={courses.length}
                  onClick={add => this.updateRange(add)}
                />
              </div>
            </div>
          )}
        </div>
      </Container>
    );
  }
}

export default SearchCourses;
