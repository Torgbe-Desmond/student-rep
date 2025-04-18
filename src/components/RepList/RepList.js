import RepCard from "../RepCard/RepCard";
import "./RepList.css"
const RepList = ({ searchTerm }) => {
  const reps = [
    {
      name: "Desmond Torgbe",
      image: "https://via.placeholder.com/300x200",
      school: "University of Cape Coast",
      repTitle: "Computer Science Level 200 Rep",
    },
    {
      name: "Ama Boateng",
      image: "https://via.placeholder.com/300x200",
      school: "University of Ghana",
      repTitle: "Information Studies Level 100 Rep",
    },
    {
      name: "Kwame Mensah",
      image: "https://via.placeholder.com/300x200",
      school: "KNUST",
      repTitle: "Computer Engineering Level 300 Rep",
    },
    {
        name: "Desmond Torgbe",
        image: "https://via.placeholder.com/300x200",
        school: "University of Cape Coast",
        repTitle: "Computer Science Level 200 Rep",
      },
      {
        name: "Ama Boateng",
        image: "https://via.placeholder.com/300x200",
        school: "University of Ghana",
        repTitle: "Information Studies Level 100 Rep",
      },
      {
        name: "Kwame Mensah",
        image: "https://via.placeholder.com/300x200",
        school: "KNUST",
        repTitle: "Computer Engineering Level 300 Rep",
      },
  ];

  const filteredReps = reps.filter((rep) =>
    rep.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="rep-container" >
      {reps.map((rep, index) => (
        <div className="rep-items">
          <RepCard {...rep} />
        </div>
      ))}
    </div>
  );
};


export default RepList