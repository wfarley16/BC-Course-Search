import React from 'react';
import { Modal, Grid, Header, HeaderSubheader } from 'semantic-ui-react';
import Reviews from './Reviews';
import { Course } from '../helpers/types';
import './CourseModal.css';

interface Props {
  course: Course;
  open: boolean;
  onClose: Function;
}

export const CourseModal: React.FC<Props> = props => {
  const { course, open, onClose } = props;
  return (
    <Modal
      className="my-modal"
      open={open}
      closeIcon
      dimmer="blurring"
      onClose={() => onClose()}
    >
      <Modal.Header>{course.title}</Modal.Header>
      <Modal.Content>
        {course.alert && <Header>Course {course.alert}</Header>}
        <Grid rows={3} columns={3} stackable className="modal-grid">
          <Grid.Row>
            <Grid.Column>Department {course.department}</Grid.Column>
            <Grid.Column>
              Professor {course.faculties && course.faculties.toString()}
            </Grid.Column>
            <Grid.Column>Credits {course.credits}</Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              {course.corequisites && `Corequisites ${course.corequisites}`}
            </Grid.Column>
            <Grid.Column>
              {course.crossListings &&
                `Cross Offerings ${course.crossListings}`}
            </Grid.Column>
            <Grid.Column>
              Time and Day {course.time && course.time.toString()}{' '}
              {course.day && course.day.toString()}
            </Grid.Column>
          </Grid.Row>
          <HeaderSubheader>{course.description}</HeaderSubheader>
        </Grid>
        <Header>Reviews</Header>
        <Reviews />
      </Modal.Content>
    </Modal>
  );
};
