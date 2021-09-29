import { useEffect, useState } from "react";

const Test = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    console.log(title);
  });
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
  const update = [setTitle, setPrice, setCategory, setDescription];
  const inputs = itemInputs.map((element, index) => {
    let forms = element.inputs.map((input, k) => {
      return (
        <div>
          <input
            placeholder={input.input}
            onChange={(e) => update[0](e.target.value)}
          />
        </div>
      );
    });
    return (
      <div key={index}>
        <h3>{element.title}</h3>
        <h5>{element.header}</h5>
      </div>
    );
  });

  return <div>Hello</div>;
};

export default Test;
