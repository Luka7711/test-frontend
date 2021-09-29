import InputList from "../Inputs/InputList";
import { useState } from "react";

const ProductForm = ({ productCategory }) => {
  const itemInputs = [
    {
      title: "About This Item",
      header: "Help buyer know more about the item you're listing",
      inputs: [
        { type: "text", input: "Title" },
        { type: "number", input: "Price" },
        { type: "text", input: "Category" },
        { type: "text", input: "Condition" },
        { type: "text", input: "Description" },
      ],
    },
  ];

  const carInputs = [
    {
      title: "About This Vehicle",
      header: "Help buyer know more about the vehicle you're listing",
      inputs: [
        { type: "number", input: "zipcode" },
        { type: "number", input: "Year" },
        { type: "text", input: "Make" },
        { type: "text", input: "Model" },
      ],
    },
    {
      title: "Price",
      header: "Set price for your car",
      inputs: [{ type: "number", input: "Price" }],
    },
    {
      title: "Description",
      header:
        "Tell buyers anything that you haven't had chance to include yet about your vehicle",
      inputs: [{ type: "text", input: "Description" }],
    },
  ];

  const propertyInputs = [
    {
      title: "About this property",
      header: "Help buyer know more about the property you're listing",
      inputs: [
        { type: "number", input: "Number of bedrooms" },
        { type: "number", input: "Number of bathrooms" },
        { type: "number", input: "Price" },
        { type: "number", input: "zipcode" },
        { type: "string", input: "Property description" },
      ],
    },
    {
      title: "Property details",
      header: "Optional",
      inputs: [
        { type: "number", input: "Property square feet" },
        { type: "string", input: "Laundry type" },
        { type: "string", input: "Parking type" },
        { type: "string", input: "Heating type" },
      ],
    },
  ];

  const jobInputs = [
    {
      title: "Job details",
      header: "Help job seekers know more about the job.",
      inputs: [
        { type: "text", input: "Job Details" },
        { type: "text", input: "Job Type" },
        { type: "text", input: "Work Location" },
      ],
    },
    {
      title: "Salary Range",
      header: "Optional",
      inputs: [
        { type: "number", input: "Minimum Salary" },
        { type: "number", input: "Maximum Salary" },
        { type: "number", input: "Per hour" },
        { type: "number", input: "Hours per week" },
      ],
    },
  ];

  let currentInput;

  switch (productCategory) {
    case "product":
      currentInput = itemInputs;
      break;
    case "job":
      currentInput = jobInputs;
      break;
    case "car":
      currentInput = carInputs;
      break;
    case "property":
      currentInput = propertyInputs;
      break;
    default:
      console.log("out of choice");
  }

  return (
    <div className="main-sidebar">
      <InputList inputs={currentInput} />
    </div>
  );
};

export default ProductForm;
