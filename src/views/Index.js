import React, { useEffect, useState } from "react";

// Components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import DarkFooter from "components/Footers/DarkFooter.js";
import PrestataireCard from "./index-sections/PrestataireCard.js";
import Carousel from "./index-sections/Carousel.js";
import Examples from "./index-sections/Examples.js";
import Download from "./index-sections/Download.js";


function Index() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  

  useEffect(() => {
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    return () => {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);


  const handleSearch = async (keyword, location) => {
    setResults([]);       
    setHasSearched(true);
    setLoading(true);
    setError("");
  
    try {
      const res = await fetch(
        `http://localhost:3001/api/recherchePrestataires?keyword=${encodeURIComponent(
          keyword
        )}&location=${encodeURIComponent(location)}`
      );
      const data = await res.json();
  
      if (res.ok) {
        setResults(data);
      } else {
        setError(data.message || "Erreur lors de la recherche");
      }
    } catch (err) {
      setError("Erreur serveur ou réseau.");
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
      <IndexHeader onSearch={handleSearch} />
      <div className="main">
          {loading && <p style={{ textAlign: "center" }}>Chargement...</p>}
          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
          {!loading && hasSearched && results.length === 0 && (
            <p style={{ textAlign: "center" }}>Aucun résultat</p>
          )}


          <div style={{ display: "flex", flexDirection: "column", alignItems: "center",marginTop:"10%" }}>
            {results.map((prest, idx) => (
              <PrestataireCard
                key={idx}
                nom={prest.nom}
                prenom={prest.prenom}
                profil={prest.profil}
                description={prest.description}
              />
            ))}
          </div>

          <Carousel />
        </div>
        <DarkFooter />
      </div>
    </>
  );
}

export default Index;
