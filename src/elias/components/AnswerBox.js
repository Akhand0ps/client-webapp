const AnswerBox = ({ answer, loading }) => {
  return (
    <div className="answer-box">
      {loading ? (
        <p>Loading...</p>
      ) : answer ? (
        <p>{answer}</p>
      ) : (
        <p>Ask a question to get started</p>
      )}
    </div>
  );
};

export default AnswerBox;