import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
const Lecture = () => {
    const { courseId } = useParams();
        console.log('courseId:', courseId); 

  const [lectureInput, setLectureInput] = useState({
    date: "",
    topic: "",
    instructor: "",
  });

  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    // Fetch list of instructors for the dropdown
    const fetchInstructors = async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/instructor");
        setInstructors(data.instructors);
      } catch (error) {
        console.error("Error fetching instructors:", error);
      }
    };

    fetchInstructors();
  }, []);

  const handleLectureChange = (e) => {
    setLectureInput({ ...lectureInput, [e.target.name]: e.target.value });
  };

  const handleAddLecture = async (e) => {
    e.preventDefault(); 
    console.log("Adding lecture to course:", courseId); 
    console.log("Lecture Input:", lectureInput); 

    try {

      const { data } = await axios.post(
        `http://localhost:8080/add/${courseId}`, 
        lectureInput
      );

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Lecture added successfully",
        });
        setLectureInput({
          date: "",
          topic: "",
          instructor: "",
        }); 
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to add lecture",
          text: data.message || "Please try again.",
        });
      }
    } catch (error) {
      console.error("Error adding lecture:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while adding the lecture.",
      });
    }
  };

  return (
    <div>
      <h3>Add a Lecture</h3>
      <form onSubmit={handleAddLecture}>
        <div>
          <label>Lecture Date</label>
          <input
            type="date"
            name="date"
            value={lectureInput.date}
            onChange={handleLectureChange}
            required
          />
        </div>
        <div>
          <label>Topic</label>
          <input
            type="text"
            name="topic"
            value={lectureInput.topic}
            onChange={handleLectureChange}
            required
          />
        </div>
        <div>
          <label>Instructor</label>
          <select
            name="instructor"
            value={lectureInput.instructor}
            onChange={handleLectureChange}
            required
          >
            <option value="" disabled>
              Select Instructor
            </option>
            {instructors.map((instructor) => (
              <option key={instructor._id} value={instructor.username}>
                {instructor.username}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add Lecture</button>
      </form>
    </div>
  );
};

export default Lecture;
