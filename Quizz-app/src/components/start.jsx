import React from "react";

const Start = (props) => {
  const categories = [
    { value: "any", label: "Any Category" },
    { value: 9, label: "General Knowledge" },
    { value: 10, label: "Entertainment: Books" },
    { value: 11, label: "Entertainment: Film" },
    { value: 12, label: "Entertainment: Music" },
    { value: 13, label: "Entertainment: Musicals &amp; Theatres" },
    { value: 14, label: "Entertainment: Television" },
    { value: 15, label: "Entertainment: Video Games" },
    { value: 16, label: "Entertainment: Board Games" },
    { value: 17, label: "Science &amp; Nature" },
    { value: 18, label: "Science: Computers" },
    { value: 19, label: "Science: Mathematics" },
    { value: 20, label: "Mythology" },
    { value: 21, label: "Sports" },
    { value: 22, label: "Geography" },
    { value: 23, label: "History" },
    { value: 24, label: "Politics" },
    { value: 25, label: "Art" },
    { value: 26, label: "Celebrities" },
    { value: 27, label: "Animals" },
    { value: 28, label: "Vehicles" },
    { value: 29, label: "Entertainment: Comics" },
    { value: 30, label: "Science: Gadgets" },
    { value: 31, label: "Entertainment: Japanese Anime &amp; Manga" },
    { value: 32, label: "Entertainment: Cartoon &amp; Animations" },
  ];

  return (
    <div className="wrapper">
      <h1>Quizzical</h1>
      <p>Test your knowledge on this quick, general knowledge quiz</p>
      <select
        name="category"
        value={props.selectCategory.category}
        onChange={props.handleSelect}
        className="category_select"
      >
        {categories.map((category) => {
          return (
            <option
              className="category_option"
              key={category.value}
              value={category.value}
            >
              {category.label}
            </option>
          );
        })}
      </select>

      <select
        className="difficulty_select"
        name="difficulty"
        onChange={props.handleSelect}
      >
        <option name="any" value="any">
          Any
        </option>
        <option name="Easy" value="Easy">
          Easy
        </option>
        <option name="Medium" value="Medium">
          Medium
        </option>
        <option name="Hard" value="Hard">
          Hard
        </option>
      </select>

      <button onClick={props.handleStart} className="start_btn">
        Start Quizz
      </button>
    </div>
  );
};

export default Start;
