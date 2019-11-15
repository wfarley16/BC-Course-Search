import React from 'react';
import './App.css';
import SearchCourses from './pages/SearchCourses';

class App extends React.Component {
  render() {
    return (
      <div className="full">
        <SearchCourses />
      </div>
    );
  }
}

export default App;
