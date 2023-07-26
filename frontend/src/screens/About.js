import React, { useEffect, useState } from "react";
import MainScreen from "../components/MainScreen";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip, Legend);

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

    const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
    let dataSet = [5, 7, 45, 3, 4, 67, 8, 99, 32, 33, 44, 1];
    var coloR = [];
    const randomRGB = () =>
        `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;
    for (let index = 0; index < dataSet.length; index++) {
        coloR[index] = randomRGB();
    }
    const data = {
        labels: dataSet,
        datasets: [
            {
                label: "poll",
                data: dataSet,
                backgroundColor: coloR,
            },
        ],
    };
    const options = {
        plugins: {
            title: {
                display: true,
                text: "Test title",
            },
        },
    };

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
                <div style={{ width: "50%", height: "50%" }}>
                    <Doughnut data={data} options={options}></Doughnut>
                </div>
            </MainScreen>
        </div>
    );
};

export default About;
