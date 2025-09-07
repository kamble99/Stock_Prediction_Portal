import { useEffect, useState } from "react";
import React from "react";
import api from "../../axioInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const [ticker, setTicker] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [plots, setPlots] = useState({
    plot: "",
    ma100: "",
    ma200: "",
    prediction: "",
  });
  const [metrics, setMetrics] = useState({
    mse: "",
    r2: "",
    rmse: "",
  });

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await api.get("/protected-view");
        console.log("success", response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchProtectedData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("predict/", { ticker: ticker });

      if (response.data.error) {
        setError(response.data.error);
      } else {
        const backendRoot = import.meta.env.VITE_BACKEND_ROOT;

        setPlots({
          plot: `${backendRoot}${response.data.plot_image}`,
          ma100: `${backendRoot}${response.data.plot_100_DMA}`,
          ma200: `${backendRoot}${response.data.plot_200_DMA}`,
          prediction: `${backendRoot}${response.data.plot_prediction}`,
        });

        setMetrics({
          mse: response.data.mse,
          r2: response.data.r2,
          rmse: response.data.rmse,
        });
      }
    } catch (err) {
      console.error("API request error:", err);
      setError("Something went wrong while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container ">
      <div className="row">
        <div className="col-md-8 mx-auto">
          {/* Form */}
          <form onSubmit={handleSubmit} className="mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter stock ticker"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              required
            />
            {error && <small className="text-danger">{error}</small>}
            <button type="submit" className="btn btn-dark mt-3 ">
              {loading ? (
                <span>
                  <FontAwesomeIcon icon={faSpinner} spin /> Please wait
                </span>
              ) : (
                "See Prediction"
              )}
            </button>
          </form>

          {/* Plots */}
          {plots.prediction && (
            <div className="prediction">
              {Object.entries(plots).map(([key, url]) => (
                <div key={key} className="p-3 mb-3 bg-light rounded shadow-sm">
                  <img
                    src={url}
                    alt={key}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              ))}

              {/* Model Evaluation */}
              <div className="p-4 bg-dark text-light rounded shadow-sm">
                <h4
                  className="mb-3 text-center"
                  style={{
                    borderBottom: "2px solid #4caf50",
                    paddingBottom: "8px",
                  }}
                >
                  Model Evaluation
                </h4>

                <div className="d-flex justify-content-around flex-wrap mt-3">
                  <div
                    className="p-3 m-2 bg-secondary rounded text-center"
                    style={{ minWidth: "150px", flex: "1" }}
                  >
                    <h5 className="text-warning">MSE</h5>
                    <p className="mb-0 fs-5">{metrics.mse}</p>
                  </div>
{/* 
                  <div
                    className="p-3 m-2 bg-secondary rounded text-center"
                    style={{ minWidth: "150px", flex: "1" }}
                  >
                    <h5 className="text-info">R²</h5>
                    <p className="mb-0 fs-5">{metrics.r2}</p>
                  </div> */}

                  <div
                    className="p-3 m-2 bg-secondary rounded text-center"
                    style={{ minWidth: "150px", flex: "1" }}
                  >
                    <h5 className="text-Light">RMSE</h5>
                    <p className="mb-0 fs-5">{metrics.rmse}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
