import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const InstructorPanel = ({ instructorId }) => {
  const [lectures, setLectures] = useState([]);
   instructorId = localStorage.getItem('userId'); 

  if (!instructorId) {
    console.error('userId not found in localStorage.'); 
  }
  
  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8080/Allcourse/${instructorId}`); 

        if (data.success) {
          console.log(data)
          setLectures(data.lectures); 
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Failed to retrieve lectures',
            text: data.message || 'Please try again.',
          });
        }
      } catch (error) {
        console.error('Error fetching lectures:', error);

        Swal.fire({
          icon: 'error',
          title: 'Error fetching lectures',
          text: 'An error occurred. Please try again later.',
        });
      }
    };

    fetchLectures(); 
  }, [instructorId]);

  return (
    <div>
      <h2>Lectures Assigned to You</h2>
      {lectures.length ? (
        <ul>
          {lectures.map((lecture, index) => (
            <li key={index}>
              <strong>Course:</strong> {lecture.courseName}
              <br />
              <strong>Date:</strong> {new Date(lecture.date).toLocaleDateString()}
              <br />
              <strong>Topic:</strong> {lecture.topic}
            </li>
          ))}
        </ul>
      ) : (
        <p>No lectures assigned to you.</p>
      )}
    </div>
  );
};

export default InstructorPanel;
