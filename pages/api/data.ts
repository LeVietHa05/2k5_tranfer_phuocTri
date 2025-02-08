import { NextApiRequest, NextApiResponse } from "next";
import db from "./db"; // Import the database

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { salinity, pH, turbidity, temperature } = req.body; // Extract data from the request body

    // Store the received data in the database
    const stmt = db.prepare(
      "INSERT INTO sensor_data (salinity, pH, turbidity, temperature) VALUES (?, ?, ?, ?)"
    );
    stmt.run(
      Number(salinity),
      Number(pH),
      Number(turbidity),
      Number(temperature)
    );

    // Here you can process the data as needed
    console.log("Received data:", { salinity, pH, turbidity, temperature });

    // Respond with a success message
    res.status(200).json({ message: "Data received successfully" });
  } else if (req.method === "GET") {
    //get the params to know how many data we need
    const { limit = 10 } = req.query; // Get the limit from the query string
    console.log(limit);
    const recentData = db
      .prepare(
        `SELECT * FROM sensor_data ORDER BY timestamp DESC LIMIT ?`
      )
      .all(limit);
    console.log(recentData);
    res.status(200).json(recentData); // Respond with the most recent sensor data
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
