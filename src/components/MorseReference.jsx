import React from "react";
import { morseList } from "../data/morseCode";
import { Link } from "react-router-dom";

function MorseReference() {
    return (
        <div className="reference-page">
            <h2>Morse Code Reference Page</h2>
            <Link to="/" className="back-link">
            ⬅ Back to Encoder
            </Link>

            <table>
                <thead>
                    <tr>
                        <th>Character</th>
                        <th>Morse Code</th>
                    </tr>
                </thead>

                <tbody>
                    {morseList.map((item,index)=>(
                        <tr key={index}>
                            <td>{item.char}</td>
                            <td>{item.code}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MorseReference;