const ErrorValification = ({ error }) => {
  if (error) {
    return (
      <div>
        {error.map((error) => (
          <p>Error: {error.msg}</p>
        ))}
      </div>
    );
  }
};

export default ErrorValification;
