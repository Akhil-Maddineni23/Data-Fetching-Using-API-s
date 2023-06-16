import React from "react";

function Profile(props) {
  
  console.log("Final Props Before Rendering = " , props.team);
  return (
    <div className="print">
      {
        props.team.map((player, index) => {
            return (
            <div className="secondary" key = {index}>
                <img src={player.imageUrl} alt="ImageNotFound" />
                <p>{player.id}</p>
                <p>{player.name}</p>
                <p>{player.battingStyle}</p>
                <p>{player.bowlingStyle}</p>
            </div>
            );
        })
      }
    </div>
  );
}

export default Profile;
