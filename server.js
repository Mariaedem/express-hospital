const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// Array of hospitals
let hospitals = [
    {
        id: 1,
        name: "University of Uyo Teaching Hospital",
        location: "Uyo",
        country: "Nigeria"
    },
    {
        id: 2,
        name: "Lagos University Teaching Hospital",
        location: "Lagos",
        country: "Nigeria"
    },
    {
        id: 3,
        name: "National Hospital",
        location: "Abuja",
        country: "Nigeria"
    }
];

// Get all hospitals
app.get("/api/hospitals", (req, res) => {
    res.status(200).json(hospitals);
});

// Get one hospital by ID
app.get("/api/hospitals/:id", (req, res) => {
    const hospital = hospitals.find(
        h => h.id === parseInt(req.params.id)
    );

    if (!hospital) {
        return res.status(404).json({
            message: "Hospital not found"
        });
    }

    res.status(200).json(hospital);
});

// Add a new hospital
app.post("/api/hospitals", (req, res) => {
    const newHospital = {
        id: hospitals.length > 0
            ? Math.max(...hospitals.map(h => h.id)) + 1
            : 1,
        name: req.body.name,
        location: req.body.location,
        country: req.body.country
    };

    hospitals.push(newHospital);

    res.status(201).json({
        message: "Hospital added successfully",
        hospital: newHospital
    });
});

// Update all hospital details
app.put("/api/hospitals/:id", (req, res) => {
    const hospital = hospitals.find(
        h => h.id === parseInt(req.params.id)
    );

    if (!hospital) {
        return res.status(404).json({
            message: "Hospital not found"
        });
    }

    hospital.name = req.body.name;
    hospital.location = req.body.location;
    hospital.country = req.body.country;

    res.status(200).json({
        message: "Hospital updated successfully",
        hospital: hospital
    });
});

// Update selected hospital details
app.patch("/api/hospitals/:id", (req, res) => {
    const hospital = hospitals.find(
        h => h.id === parseInt(req.params.id)
    );

    if (!hospital) {
        return res.status(404).json({
            message: "Hospital not found"
        });
    }

    if (req.body.name !== undefined) {
        hospital.name = req.body.name;
    }

    if (req.body.location !== undefined) {
        hospital.location = req.body.location;
    }

    if (req.body.country !== undefined) {
        hospital.country = req.body.country;
    }

    res.status(200).json({
        message: "Hospital details updated successfully",
        hospital: hospital
    });
});

// Delete a hospital
app.delete("/api/hospitals/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const hospital = hospitals.find(h => h.id === id);

    if (!hospital) {
        return res.status(404).json({
            message: "Hospital not found"
        });
    }

    hospitals = hospitals.filter(h => h.id !== id);

    res.status(200).json({
        message: "Hospital deleted successfully"
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Hospital server is running on port ${PORT}`);
});