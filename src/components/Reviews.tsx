import React from 'react';
import reviews from './reviewSample';
import './Reviews.css';
import { Button, Card, TextArea } from 'semantic-ui-react';

export default () => {
  const reviewCards = reviews.map(review => (
    <Card className="review-card" key={review.id}>
      <Card.Header className="review-header">{review.title}</Card.Header>
      <Card.Meta>By {review.postedBy}</Card.Meta>
      <Card.Content>{review.body}</Card.Content>
    </Card>
  ));
  return (
    <div className="review-wrapper">
      {reviewCards}
      <TextArea className="review-input" placeholder="Enter your review here" />
      <Button>Post</Button>
    </div>
  );
};
