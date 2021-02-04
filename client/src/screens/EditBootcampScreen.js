import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { updateBootcamp, getBootcamp } from "../actions/bootcampActions";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
// import Select from "react-select";
// import makeAnimated from "react-select/animated";

import { BOOTCAMP_UPDATE_RESET } from "../constants/bootcampConstants";

// const animatedComponents = makeAnimated();

const EditBootcampScreen = ({ match, history }) => {
  const bootcampId = match.params.id;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [careers, setCareers] = useState([]);
  const [housing, setHousing] = useState(true);
  const [jobAssistance, setJobAssistance] = useState(true);
  const [jobGuarantee, setJobGuarantee] = useState(true);
  const [acceptGi, setAcceptGi] = useState(true);

  const dispatch = useDispatch();

  const myBootcamp = useSelector((state) => state.getBootcamp);
  const { loading, error, bootcamp } = myBootcamp;

  const bootcampUpdate = useSelector((state) => state.updateBootcamp);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = bootcampUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: BOOTCAMP_UPDATE_RESET });
      history.push("/manage-bootcamp");
    } else {
      if (!bootcamp || !bootcamp.name) {
        dispatch(getBootcamp(bootcampId));
      } else {
        setName(bootcamp.name);
        setDescription(bootcamp.description);
        setPhone(bootcamp.phone);
        setEmail(bootcamp.email);
        setAddress(bootcamp.location ? bootcamp.location.formattedAddress : "");
        setWebsite(bootcamp.website);
        setCareers(bootcamp.careers);
        setHousing(bootcamp.housing);
        setJobAssistance(bootcamp.jobAssistance);
        setJobGuarantee(bootcamp.jobGuarantee);
        setAcceptGi(bootcamp.acceptGi);
      }
    }
  }, [dispatch, bootcamp, successUpdate, history]);

  const onCheckBox = (e, item) => {
    if (careers.indexOf(e.target.value) < 1 && e.target.checked) {
      setCareers((careers) => [...careers, item.value]);
    }

    careers.forEach((career, i) => {
      if (!e.target.checked) {
        return e.target.value === career ? careers.splice(i, 1) : careers;
      }
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateBootcamp({
        _id: bootcampId,
        name,
        description,
        website,
        phone,
        email,
        address,
        careers,
        housing,
        jobAssistance,
        jobGuarantee,
        acceptGi,
      })
    );
  };

  const optionsCareers = [
    { value: "Mobile Development", label: "Mobile Development" },
    { value: "Web Development", label: "Web Development" },
    { value: "Data Science", label: "Data Science" },
    { value: "Business", label: "Business" },
    { value: "UI/UX", label: "UI/UX" },
    { value: "Other", label: "Other" },
  ];

  return (
    <section className="container mt-6">
      <h1 className="mb-2">Edit Bootcamp</h1>

      {loadingUpdate && <Spinner />}
      {errorUpdate && (
        <Message variant="danger" delay="3000">
          {errorUpdate}
        </Message>
      )}

      {loading || loading === undefined ? (
        <Spinner />
      ) : (
        error && (
          <Message variant="danger" delay="3000">
            {error}
          </Message>
        )
      )}

      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="card bg-white py-2 px-4">
              <div className="card-body">
                <h3>Location & Contact</h3>
                <p className="text-muted">
                  If multiple locations, use the main or largest
                </p>

                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Bootcamp Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    placeholder="Full Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                  <small className="form-text text-muted">
                    Street, city, state, etc
                  </small>
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    placeholder="Contact Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Website</label>
                  <input
                    type="text"
                    name="website"
                    className="form-control"
                    placeholder="Website URL"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card bg-white py-2 px-4">
              <div className="card-body">
                <h3>Other Info</h3>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    rows="5"
                    className="form-control"
                    placeholder="Description (What you offer, etc)"
                    maxLength="500"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  <small className="form-text text-muted">
                    No more than 500 characters
                  </small>
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="Careers" className="form-check-label mb-2">
                    <strong>Careers</strong>
                  </label>
                  <br />

                  {optionsCareers.map((item, index) => {
                    return (
                      <div
                        className="form-check form-check-inline dynamic-checkbox"
                        key={index}
                      >
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={item.label}
                          value={item.value}
                          onChange={(e) => onCheckBox(e, item)}
                          name="careers"
                          // checked={getCheckStatus(item, "careers")}
                          checked={careers.includes(item.value)}
                        />
                        <label
                          className="form-check-label dynamic-checkbox-label ml-2"
                          htmlFor={item.label}
                        >
                          {item.label}
                        </label>
                      </div>
                    );
                  })}
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="housing"
                    id="housing"
                    checked={housing}
                    // value={housing}
                    onChange={(e) =>
                      setHousing(
                        e.target.type === "checkbox"
                          ? e.target.checked
                          : e.target.value
                      )
                    }
                  />
                  <label className="form-check-label" htmlFor="housing">
                    Housing
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="jobAssistance"
                    id="jobAssistance"
                    checked={jobAssistance}
                    // value={jobAssistance}
                    onChange={(e) =>
                      setJobAssistance(
                        e.target.type === "checkbox"
                          ? e.target.checked
                          : e.target.value
                      )
                    }
                  />
                  <label className="form-check-label" htmlFor="jobAssistance">
                    Job Assistance
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="jobGuarantee"
                    id="jobGuarantee"
                    checked={jobGuarantee}
                    // value={jobGuarantee}
                    onChange={(e) =>
                      setJobGuarantee(
                        e.target.type === "checkbox"
                          ? e.target.checked
                          : e.target.value
                      )
                    }
                  />
                  <label className="form-check-label" htmlFor="jobGuarantee">
                    Job Guarantee
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="acceptGi"
                    id="acceptGi"
                    checked={acceptGi}
                    // value={acceptGi}
                    onChange={(e) =>
                      setAcceptGi(
                        e.target.type === "checkbox"
                          ? e.target.checked
                          : e.target.value
                      )
                    }
                  />
                  <label className="form-check-label" htmlFor="acceptGi">
                    Accepts GI Bill
                  </label>
                </div>
                <p className="text-muted my-4">
                  *After you add the bootcamp, you can add the specific courses
                  offered
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Submit Bootcamp"
            className="btn btn-success btn-block my-4"
          />
          {/* <a href="manage-bootcamp.html" className="btn btn-danger btn-block mb-4"
    				>Cancel</a
    			>  */}
        </div>
      </form>
    </section>
  );
};

export default EditBootcampScreen;
