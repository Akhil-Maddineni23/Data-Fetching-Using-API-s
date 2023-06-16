import React, { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
  const [endPoint, setEndPoint] = useState("");
  const [finalPoint, setFinalPoint] = useState("");
  const [container, setContainer] = useState([]);

  const url = `https://online-movie-database.p.rapidapi.com/auto-complete?q=+${endPoint}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "ad4d32ed5dmshe8f41e56ec22bcdp13585ejsn8bef1415eded",
      "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
    },
  };

  useEffect(() => {
    fetchMe();
  }, [finalPoint]);

  const fetchMe = () => {
    fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setContainer(data.d);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setEndPoint(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setFinalPoint(endPoint);
  };

  return (
    <div className="App">
      <div className="map">
        <form onSubmit={submitHandler} className="form">
          <input type="text" value={endPoint} onChange={handleChange} />
          <button type="submit">Submit</button>
        </form>

        <div className="print">
          {container.map((item, index) => {
            return (
              <Card 
                key = {index}
                id = {index}
                title = {item.l}
                image = {item.i.imageUrl}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;

/*
<div key={index} className="container">
<div className="secondary">
  <img src={item.i.imageUrl} alt="ImageNotFound" />
  <p>{item.l}</p>
</div>
</div>
*/