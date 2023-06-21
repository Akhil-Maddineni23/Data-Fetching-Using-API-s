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
  
  //const isMounted = useRef(false);
  const [teamsList, setTeamsList] = useState([]);
  const [team , setTeam] = useState({
    teamId : "",
    playerDetails : []
  });

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

  async function GetTeamData(teamId){
    try{
      console.log("Fetching Team Players of TeamId = " , teamId);
      const url = `https://cricbuzz-cricket.p.rapidapi.com/teams/v1/${teamId}/players`;
      const response = await fetch(url, options);
      const data = await response.json();
      const players = await data.player.filter((value) => {
        return Object.keys(value).length > 2;
      });

      for(let i =0; i<players.length ; i++){
        
        try{
          let url = `https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c${players[i].imageId}/i.jpg`;
          const response = await fetch(url , options);
          const img = await response.blob();
          const imgUrl = URL.createObjectURL(img);

          players[i]['imageUrl'] = imgUrl;
          const data = players[i];
          setTeam((prev) => ({
            ...prev,
            playerDetails : [...prev.playerDetails , data]
          }))
        }
        catch(err){
          console.log("Error while Fetching Player Photo" , err);
        }   
      }
    }
    catch(err){
      console.log("Error while Fetching Team Players:" , err);
    }  
  }

  const handleSelect = (e) => {
    console.log("Team Id = ", e);
    setTeam(() => ({
      teamId : e,
      playerDetails : []
    }))
    GetTeamData(e);
  };

  
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
          team.playerDetails.length>0 ? <Profile team = {team.playerDetails} /> : <p>Select Any Team Name</p>
        }
        </div>
      </div>   
    </div>
  );
}
export default App;

