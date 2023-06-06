import React, { useEffect, useState } from "react";
import MainScreen from "../components/MainScreen";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const About = () => {
    const [sectors, setSector] = useState([]);
    const [sectorName, setSectorName] = useState([]);

    const fetchSector = async () => {
        const data = await axios.get("http://localhost:5000/sector");
        setSector(data.data);
    };

    const addSector = async () => {
        const body = { sectorName: sectorName };
        await axios.post("http://localhost:5000/sector", body);
        setSectorName("");
        fetchSector();
    };

    // useEffect will call everytime our page is loaded
    useEffect(() => {
        fetchSector();
    }, []);

    return (
        <div className="about">
            <MainScreen title="About Us">
                <h2>children</h2>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Rem maiores eveniet nisi doloribus, autem rerum deleniti
                    nemo, quisquam omnis odit expedita! Obcaecati saepe tempore
                    temporibus nesciunt eos doloremque dolor aspernatur.
                </p>
                <Form.Group className="mb-3">
                    <Form.Label>Enter sector name</Form.Label>
                    <Form.Control
                        placeholder="Enter sector name"
                        value={sectorName}
                        onChange={(e) => setSectorName(e.target.value)}
                        size="md"
                    />
                    <br />
                    <Button
                        variant="outline-dark"
                        size="md"
                        className="addSector"
                        onClick={addSector}
                    >
                        Add Sector
                    </Button>
                </Form.Group>
                <div>
                    {sectors.map((sector) => (
                        <li key={sector._id}>{sector.sectorName}</li>
                    ))}
                </div>
            </MainScreen>
        </div>
    );
};

export default About;
