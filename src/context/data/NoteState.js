import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "https://second-deploy-taxcalc.herokuapp.com";
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);

    const userInit = [];

    const [user, setUser] = useState(userInit);

    //Add a note
    const addNote = async (bas, lta, hra, fa, inv, med, rent) => {
        //API CALL
        const response = await fetch(`${host}/api/taxUser/addDetails`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ bas, lta, hra, fa, inv, med, rent }),
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    };


    //get user details for about page
    const getUser = async () => {
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        console.log(json);
        setUser(json);
        console.log(user);
    }
    return (
        <NoteContext.Provider value={{ notes, addNote,getUser,user }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;