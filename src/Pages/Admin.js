import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Admin = () => {
  const [instructors, setInstructors] = useState([]);
  const [courseInput, setCourseInput] = useState({
    name: "",
    level: "",
    description: "",
    image: "",
    instructor: "",
  });

  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [lectureInput, setLectureInput] = useState({
    date: "",
    topic: "",
    instructor: "",
  });

  // useEffect(() => {
  //   const fetchInstructors = async () => {
  //     try {
  //       const { data } = await axios.get("http://localhost:8080/instructor"); // Adjust endpoint if needed
  //       setInstructors(data.instructors);
  //     } catch (error) {
  //       console.error("Error fetching instructors:", error);
  //     }
  //   };

  //   fetchInstructors(); // Call the fetch function
  // }, []);

  const handleCourseChange = (e) => {
    setCourseInput({ ...courseInput, [e.target.name]: e.target.value });
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      console.log("Course Input:", courseInput);

      const { data } = await axios.post("http://localhost:8080/create", courseInput);

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Course added successfully",
        });
        // Optionally clear the course form or reset input state
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to add course",
          text: data.message || "Please try again.",
        });
      }
    } catch (error) {
      console.error("Error adding course:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while adding the course.",
      });
    }
  };

  // const handleLectureChange = (e) => {
  //   setLectureInput({ ...lectureInput, [e.target.name]: e.target.value });
  // };

  // const handleAddLecture = async (e, courseId) => {
  //   e.preventDefault()
  //   try {
  //     console.log("Adding lecture for course:", courseId); // Log the course ID
  //     console.log("Lecture Input:", lectureInput); // Log the lecture data
  
  //     const { data } = await axios.post(
  //       `http://localhost:8080/add/${courseId}`,
  //       lectureInput
  //     );

  //     if (data.success) {
  //       Swal.fire({
  //         icon: "success",
  //         title: "Lecture added successfully",
  //       });
  //       // Optionally reset lecture input state
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Failed to add lecture",
  //         text: data.message || "Please try again.",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error adding lecture:", error);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: "An error occurred while adding the lecture.",
  //     });
  //   }
  // };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <h3>Instructors</h3>
      <ul>
        {instructors.map((instructor) => (
          <li key={instructor._id}>{instructor.username}</li>
        ))}
      </ul>

      <h3>Add a Course</h3>
      <form onSubmit={handleAddCourse}>
        <div>
          <label>Course Name</label>
          <input
            type="text"
            name="name"
            value={courseInput.name}
            onChange={handleCourseChange}
            required
          />
        </div>
        <div>
          <label>Level</label>
          <input
            type="text"
            name="level"
            value={courseInput.level}
            onChange={handleCourseChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={courseInput.description}
            onChange={handleCourseChange}
            required
          />
        </div>
        <div>
          <label>Instructor</label>
         <select
  name="instructor"
  onChange={handleCourseChange}
  value={courseInput.instructor}
  required
>
  <option value="" disabled>
    Select Instructor
  </option>
  {/* {instructors.map((instructor) => (
    <option key={instructor._id} value={instructor._id}>
      {instructor.username}
    </option>
  ))} */}
  <option><li>mahesh</li></option>
</select>
        </div>
        <div>
          <label>Image</label>
          <input
            type="text"
            name="image"
            value={courseInput.image}
            onChange={handleCourseChange}
            required
          />
        </div>
        <button type="submit">Add Course</button>
      </form>

      {/* <h3>Add a Lecture</h3>
      <form onSubmit={(e) => handleAddLecture("courseId")}>
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
        <select>  <option><li>mahesh</li></option>
</select>
        <button type="submit">Add Lecture</button>
      </form> */}
    </div>
  );
};

export default Admin;
