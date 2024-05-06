import React from "react";
import { decode } from "html-entities";
const Quizz = (props) => {
  const {
    checked,
    start,
    allAnswers,
    correctAnswerPosition,
    showCorrectAnswer,
  } = props;

  const [selectedAnswer, setSelectedAnswer] = React.useState({});
  const handleClick = (index) => {
    setSelectedAnswer(index);
    props.handleClick(index, props.index);
  };
  React.useEffect(() => {
    setSelectedAnswer(null);
    console.log("invloved");
  }, [start]);

  return (
    <div className="quizzDiv">
      <p className="question" key={props.index}>
        {decode(props.question)}
      </p>
      <div className="answersDiv">
        {allAnswers?.map((answer, index) => {
          const isSelected = index === selectedAnswer; // check if index the same with the answer I selected
          const isCorrect = index === correctAnswerPosition; // check if index and the correct answer index true or not
          const styles = {
            // set the color determine on what u selected and the correct answer
            backgroundColor: isSelected
              ? isCorrect
                ? "#EDB88B"
                : "#FF0400"
              : showCorrectAnswer && isCorrect
              ? "#1AE87A "
              : "white",
          };
          return (
            <button
              key={index}
              style={checked ? styles : null}
              className={isSelected ? "btn_selected" : ""}
              // selected={props.selected === answer ? true : false}
              onClick={() => handleClick(index)}
            >
              {decode(answer)}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Quizz;
