import React, { useState } from "react";

const ShowScreen = ({ history }) => {
  const [miles, setMiles] = useState("");
  const [zipcode, setZipcode] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    localStorage.removeItem("zipcode");
    localStorage.removeItem("miles");

    if (zipcode && miles) {
      localStorage.setItem("zipcode", JSON.stringify(zipcode));
      localStorage.setItem("miles", JSON.stringify(miles));
      history.push("/bootcampsradius");
    }
  };

  return (
    <section className="showcase">
      <div className="dark-overlay">
        <div className="showcase-inner container">
          <h1 className="display-4">Find a Code Bootcamp</h1>
          <p className="lead">
            Find, rate and read reviews on coding bootcamps
          </p>
          <form onSubmit={onSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="miles"
                    placeholder="Miles From"
                    value={miles}
                    onChange={(e) => setMiles(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="zipcode"
                    placeholder="Enter Zipcode"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <input
              type="submit"
              value="Find Bootcamps"
              className="btn btn-primary btn-block"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default ShowScreen;
