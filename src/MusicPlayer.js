import { useState, useEffect } from "react";
import { projectFirestore } from "./firebase/config";

import App from "./App";
import Spinner from "./components/Spinner";

const MusicPlayer = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const unsub = projectFirestore
      .collection("data")
      .orderBy("createdAt", "asc")
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          documents.push({ ...doc.data() });
        });
        setSongs(documents);
      });

    return () => unsub();
  }, []);

  return (
    <>
      {!!songs.length ? <App songs={songs} setSongs={setSongs} /> : <Spinner />}
    </>
  );
};

export default MusicPlayer;
