import React from 'react';
import { Course } from '../helpers/types';
import { Card } from 'semantic-ui-react';
import './CourseCard.css';

interface Props {
  course: Course;
  selectCourse: Function;
}

export const CourseCard: React.FC<Props> = props => {
  const { course, selectCourse } = props;
  return (
    <Card className="my-card" onClick={() => selectCourse(course)}>
      <Card.Header>{course.title}</Card.Header>
      <Card.Meta>{course.alert}</Card.Meta>
    </Card>
  );
};
