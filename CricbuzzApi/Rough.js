const teamId = 2;
const url = `https://cricbuzz-cricket.p.rapidapi.com/teams/v1/${teamId}/players`;
console.log(url);

const arr = [
    {
        name : "Akhil",
        jersy : 5,
        role : "batsman"
    },
    {
        name : "Manoj",
        jersey : 12,
        role: " bowler"
    },
    {
        name : "Surya",
        jersey : 9
    },
    {
        name : "Singi",
        jersey : 47,
        role:"batsman"
    }
]

const filtered = arr.filter((value) => {
    return Object.keys(value).length > 2;
  });

  console.log(filtered)