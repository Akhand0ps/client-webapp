const FeedbackButtons = ({ onFeedback }) => {
  return (
    <div>
      <button onClick={() => onFeedback(true)}>👍</button>
      <button onClick={() => onFeedback(false)}>👎</button>
    </div>
  );
};

export default FeedbackButtons;