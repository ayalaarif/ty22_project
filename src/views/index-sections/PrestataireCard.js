import React from "react";
import "../../assets/css/PrestataireCard.css";

const PrestataireCard = ({ profil, nom, prenom, description }) => {
  return (
    <div className="prestataire-card">
      <img src={`/${profil || "Profils/default.jpg"}`} alt={`Profil de ${prenom} ${nom}`} />
      <div className="prestataire-info">
        <h2>{prenom} {nom}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default PrestataireCard;
