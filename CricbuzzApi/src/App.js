import React, { useState, useEffect , useRef} from "react";
import "./App.css";
import DropDown from "./components/DropDown";
import Profile from "./components/Profile";

function App() {
  
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "ad4d32ed5dmshe8f41e56ec22bcdp13585ejsn8bef1415eded",
      "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
    },
  };

  const [teamsList, setTeamsList] = useState([]);
  const [teamId, setTeamId] = useState("");
  const [players , setPlayers] = useState([]);
  const isMounted = useRef(false);
  const isMounted1 = useRef(false);

  const handleSelect = (e) => {
    console.log("Team Id = ", e);
    setTeamId(e);
  };

  useEffect(() => {
    const url = "https://cricbuzz-cricket.p.rapidapi.com/teams/v1/international";

    fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTeamsList(data.list.slice(1, 13));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if(isMounted.current && teamId.length !== 0){
      const url = `https://cricbuzz-cricket.p.rapidapi.com/teams/v1/${teamId}/players`;
      fetch(url, options)
        .then((response) => {
          return response.json();
        })
        .then(async (data) => {
          const filtered = data.player.filter((value) => {
            return Object.keys(value).length > 2;
          });
          setPlayers(filtered);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else{
      isMounted.current = true;
    }  
  }, [teamId])



  useEffect(async () => {

    let Urls = []
    if(isMounted1.current && players.length !==0)
    {
      for(let i=0 ; i< players.length ; i++)
      {
        let url = `https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c${players[i].imageId}/i.jpg`;
        Urls.push(fetch(url , options));
      }


    }else{
      isMounted1.current = true;
    }
    
  }, [players])

  return (
    <div className="App">
      <div className="map">
       <DropDown
          teamNames={teamsList}
          itemName="Team Names"
          onSelect={handleSelect}
        />
        <div className="container">
        {
          players.length>0 ? <Profile team = {players} /> : <p>Select Any Team Name</p>
        }
        </div>
      </div>   
    </div>
  );
}
export default App;


/*
<Button onClick={handleClick} variant="primary">
  Submit
</Button>;

  useEffect(() => {
    if(isMounted1.current && players.length !==0){
      for(let i=0 ; i< players.length ; i++){
        const url = `https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c${players[i].imageId}/i.jpg`;
        fetch(url, options)
          .then((response) => {
            return response.blob();
          })
          .then((image) => {
            const imgUrl = URL.createObjectURL(image);
            players[i]['imageUrl'] = imgUrl;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
    else{
      isMounted1.current = true;
    }
  }, [players])

  */