import React, { useState, useEffect } from "react";
import axios from "axios";

const Form = ({ close }) => {
  const [email, setEmail] = useState("");
  const [job, setJob] = useState("");
  const [response, setResponse] = useState(null);

  useEffect(() => {
    console.log("mount");
    return () => {
      console.log("unmount");
    };
  }, []);

  useEffect(() => {
    console.log("response mount =>", response);
    if (response) {
      close();
    }
    return () => {
      console.log(`component unmount - ${email} - ${job}`);
    };
  }, [response, close, email, job]);

  const submitForm = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("https://reqres.in/api/users", { email, job });
    setResponse(data);
  };

  return (
    <div>
      <form>
        <label htmlFor="fname">Email:</label>
        <br />
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="lname">Job:</label>
        <br />
        <input
          type="text"
          id="email"
          name="email"
          value={job}
          onChange={(e) => setJob(e.target.value)}
        />
        <br />
        <br />
        <input type="submit" value="Submit" onClick={submitForm} />
      </form>
    </div>
  );
};

export default Form;
