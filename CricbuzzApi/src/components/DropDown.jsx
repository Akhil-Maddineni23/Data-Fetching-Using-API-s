import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'

function DropDown(props) {
  return (
    <DropdownButton
    title = {props.itemName}
    onSelect={props.onSelect}
    >
      { props.teamNames.map((team , index) => {
          return (
              <Dropdown.Item key={index} eventKey={team.teamId} >{team.teamName}</Dropdown.Item>
          );   
        })
      }
    </DropdownButton>
  );
}

export default DropDown;
