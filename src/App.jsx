import React, { useState } from "react";
import ReactDOM from "react-dom";
import FeedbackOptions from "./components/FeedbackOptions";
import Statistics from "./components/Statistics";
import Section from "./components/Section";
import Notification from "./components/Notification";
import "./App.css";

const App = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  const handleFeedback = (type) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [type]: prevFeedback[type] + 1,
    }));
  };

  const countTotalFeedback = () => {
    const { good, neutral, bad } = feedback;
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const { good } = feedback;
    const total = countTotalFeedback();
    const percentage = total ? ((good / total) * 100).toFixed(2) : 0;
    return percentage;
  };

  const { good, neutral, bad } = feedback;
  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();

  return (
    <div className="app">
      <h1>Cafe Feedback</h1>
      <Section title="Please leave feedback">
        <FeedbackOptions
          onLeaveFeedback={handleFeedback}
          options={["good", "neutral", "bad"]}
        />
      </Section>
      <Section title="Statistics">
        {total > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
export default App;
