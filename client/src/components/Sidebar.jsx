import React, { useEffect, useState } from "react";
import PasteDetails from "./PasteDetails";
import { usePasteContext } from "../hooks/usePasteContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Sidebar = () => {
  const { pastes, dispatch } = usePasteContext();

  useEffect(() => {
    const fetchPaste = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/pastes/`
      );
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_PASTES", payload: json });
      }
    };

    fetchPaste();
  }, []);

  return (
    <>
      <h2>Public Tasks</h2>
      <div className="pastedetails">
        <div className="pastes">
          {pastes &&
            pastes.map((paste) => (
              <PasteDetails key={paste._id} paste={paste} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
