import { Link } from "react-router-dom";
const NotFoundScreen = () => {
  return (
    <div className="text-center grid min-h-[50vh] items-center">
      <div>
        <h1 className="text-5xl text-secondary font-semibold">
          Oops page not found
        </h1>
        <br></br>
        <h2 className="text-2xl font-semibold text-primary">
          <Link to="/home">Return to homepage</Link>
        </h2>
      </div>
    </div>
  );
};

export default NotFoundScreen;
