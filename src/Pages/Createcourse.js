import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Createcourse = () => {
  const [courseData, setCourseData] = useState({
    name: "",
    level: "",
    description: "",
    image: "",
    instructor: "", 
  });

  const handleChange = (e) => {
    setCourseData({
      ...courseData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Course Input:", courseData);

      const { data } = await axios.post("http://localhost:8080/create", courseData);

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Course created successfully",
        });
        setCourseData({
          name: "",
          level: "",
          description: "",
          image: "",
          instructor: "",
        }); 
      } else {
        Swal.fire({
          icon: "error",
          title: "Course creation failed",
          text: data.message || "Please try again.",
        });
      }
    } catch (error) {
      console.error("Error creating course:", error);

      Swal.fire({
        icon: "error",
        title: "Error creating course",
        text: error.response?.data?.message || "An internal server error occurred.",
      });
    }
  };

  return (
    <div>
      <h2>Create a Course</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Course Name</label>
          <input
            type="text"
            name="name"
            value={courseData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Level</label>
          <input
            type="text"
            name="level"
            value={courseData.level}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={courseData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Instructor</label>
          <input
            type="text"
            name="instructor"
            value={courseData.instructor}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create Course</button>
      </form>
    </div>
  );
};

export default Createcourse;
