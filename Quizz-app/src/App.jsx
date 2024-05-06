import React, { useState, useEffect } from "react";
import Quizz from "./components/quizz";
import Start from "./components/start";

function App() {
  const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [correctAns, setCorrectAnswers] = useState(0);
  const [error, setError] = useState(null);
  const [start, setStartNewGame] = useState(false);
  const [result, setShowResults] = useState(false);
  const [checked, setChecked] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [selectCategory, setSelectCategory] = useState({
    category: "all",
    difficulty: "any",
  });

  const [position, setPosition] = useState(0);
  //  const url = "https://opentdb.com/api.php?amount=5";
  const cacheKey = "cachedData";
  const controller = new AbortController();

  const correctA = data.map((answer) => {
    return answer.correct_answer;
  });
  console.log(correctA);

  const fetchData = async () => {
    let query = "";
    if (selectCategory.difficulty !== "any") {
      query += "&difficulty=" + selectCategory.difficulty;
    }
    if (selectCategory.category !== "all") {
      query;
    }
    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=5" + query,
        { signal: controller.signal }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const jsonData = await response.json();
      // modified correct/incorrct answers in an array
      const answerArray = jsonData.results.map((question) => {
        // set all of answers into one array with random order
        const allAnswers = question.incorrect_answers.toSpliced(
          Math.floor(Math.random() * (question.incorrect_answers.length - 1)),
          0,
          question.correct_answer
        );
        // find index of correct answer
        const correctAnswerIndex = allAnswers.findIndex((answer) => {
          return answer === question.correct_answer;
        });
        return {
          ...question,
          selected: "",
          all_answers: allAnswers,
          correctAnswerPosition: correctAnswerIndex,
        };
      });

      //setData(answerArray);
      //   localStorage.setItem("cachedData", JSON.stringify(answerArray));

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    //   const dataL = localStorage.getItem("cachedData");

    fetchData();
    return () => {
      controller.abort();
    };
  }, [start]);

  //console.log(data);

  const handleSelected = (selected, questionIndex) => {
    // console.log(answer);

    setData((preQ) =>
      preQ.map((question, index) => {
        if (index === questionIndex) {
          //console.log("True Condition");
          return {
            ...question,
            selected,
          };
        } else {
          // console.log("False Condition");
          return question;
        }
      })
    );
  };

  function checkAnswers() {
    setShowResults(true);
    setChecked(true);
    setShowCorrectAnswer(true);
    data.forEach((question) => {
      if (question.selected === question.correctAnswerPosition) {
        setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
      }
    });
  }

  function newGame() {
    setShowResults(false);
    setStartNewGame(true);
    setCorrectAnswers(0);
    setShowCorrectAnswer(false);
    setChecked(false);
    // localStorage.clear();
    // Reset selected answers for all questions
    setData(
      data.map((question) => ({
        ...question,
        selected: null,
      }))
    );
  }
  const handleStart = () => {
    setPosition((preState) => preState + 1);
  };

  const handleSelect = (event) => {
    setSelectCategory((preState) => ({
      ...preState,
      [event.target.name]: event.target.value,
    }));
  };

  const questionElements = data?.map((item, index) => {
    return (
      <Quizz
        question={item.question}
        allAnswers={item.all_answers}
        key={index}
        index={index}
        selected={item.selected}
        handleClick={handleSelected}
        correctAnswerPosition={item.correctAnswerPosition}
        checked={checked}
        start={start}
        showCorrectAnswer={showCorrectAnswer}
      />
    );
  });
  //<li key={nanoid()}>{item.question}</li>;

  return (
    <main>
      {position === 1 ? (
        <div className="main-2">
          {error ? (
            <p className="errorTag">{error}</p>
          ) : (
            <div className="quizzContainer">
              {questionElements}
              {error === null && (
                <div className="checkingDiv">
                  <p>{`Your Scored ${correctAns}/${data.length} correct answers`}</p>

                  {result ? (
                    <button className="btn_check" onClick={newGame}>
                      New Game
                    </button>
                  ) : (
                    <button className="btn_check" onClick={checkAnswers}>
                      Check
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <Start
          handleSelect={handleSelect}
          selectCategory={selectCategory}
          newGame={newGame}
          handleStart={handleStart}
        />
      )}
      <button onClick={() => setTesting(true)}>Click this</button>
    </main>
  );
}

export default App;
