
    const express = require('express');
    const bodyParser = require('body-parser');
    const ABI = require("./ABI.json");
    const { Web3 } = require("web3");
    const cors = require('cors');
    const e = require('express');
    const app = express();

    app.use(cors());
    app.use(express.json())
    app.use(bodyParser.json());

    const web3 = new Web3('https://sepolia.infura.io/v3/d4f4721751a047049719292e1d03f4e8')
    const contractAdd = "0xDaBB1B02cBdfc23e78b8efEA51aCe263c2155Da0";
    const contract = new web3.eth.Contract(ABI, contractAdd);




    app.post("/api/ethereum/addrecord", async (req, res) => {
        const { adharNum } = req.body;

        //   console.log(adharNum)
        try {
            if (!adharNum) {
                throw new Error('Adhar number is missing in the request body');
            }

            const task = await contract.methods.patientExists(adharNum).call();
            console.log(task)

            if (!task) {

                res.status(200).json({ status: 200, message: 'can be added' })
            } else {
                res.status(409).json({ status: 409, message: "can't be added" })
            }
        } catch (error) {
            console.error('Error processing request:', error.message);
            res.status(500).json({ status: 500, message: 'Internal server error', error: error.message });
        }
    });
    app.get("/api/ethereum/records/:adharNum", async (req, res) => {
        try {
            const { adharNum } = req.params;

            // Make sure adharNum is properly formatted as a number
            const adharNumber = parseInt(adharNum);

            // Call the contract method to get the record
            const record = await contract.methods.getRecord(adharNumber).call();
            // console.log(record)
            // Check if the record exists
            if (record) {
                // Destructure the record object
                const { '0': name, '1': diagnostics, '2': adharNumber, '3': age, '4': dob, '5': provider, '6': exist } = record;

                // Create a task object with the extracted data
                const taskObj = {
                    name,
                    diagnostics,
                    adharNumber: parseInt(adharNumber), // Parse adharNumber as an integer
                    age: parseInt(age), // Parse age as an integer
                    dob,
                    provider,
                    exist
                };

                // Send the task object in the response
                res.status(200).json({ status: 200, taskObj, message: "Data exists" });
            } else {
                // If record doesn't exist, send an appropriate message
                res.status(404).json({ status: 404, message: "Record not found" });
            }
        } catch (error) {
            // Handle any errors that occur during the process
            console.error(error);
            res.status(500).json({ status: 500, message: "Internal server error" });
        }
    });


    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });