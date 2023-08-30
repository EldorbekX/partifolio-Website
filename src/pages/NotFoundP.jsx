import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotFoundP = () => {
  const navigate = useNavigate();

  return (
    <div className="notefaundflex">
      <div className="notefaund">
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Button onClick={() => navigate("/")} type="primary">
              Back Home
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default NotFoundP;
