import { api } from "../utils/apiClient";

describe("POST /api/journeys", () => {
  it("Create a journey with valid data", async () => {
    const res = await api.post("/journeys").send({
      pickup: { latitude: 1.3521, longitude: 103.8198 },
      dropoff: { latitude: 1.2801, longitude: 103.85 },
      passenger: {
        name: "John",
        surname: "Doe",
        phone_number: "+60198765432",
      },
      departure_date: "2025-08-15T14:30:00Z",
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("_id");
  });

  it("Fail when required field is missing", async () => {
    const res = await api.post("/journeys").send({
      pickup: { latitude: 1.3521 }, // longitude missing
      dropoff: { latitude: 1.2801, longitude: 103.85 },
      passenger: { name: "John", phoneNumber: "+60198765432" },
      departure_date: "2025-08-15T14:30:00Z",
    });

    expect(res.status).toBe(400);
    expect(res.body.code).toBe("REQUEST_VALIDATION_FAILURE");
  });

  it("Invalid passenger phone number", async () => {
    const res = await api.post("/journeys").send({
      pickup: { latitude: 1.3521, longitude: 103.8198 },
      dropoff: { latitude: 1.3, longitude: 103.8 },
      passenger: { name: "John", phone_number: "abc123" },
      departure_date: "2025-08-30T10:00:00Z",
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("_id");
  });

  it("Invalid departure date format", async () => {
    const res = await api.post("/journeys").send({
      pickup: { latitude: 1.3521, longitude: 103.8198 },
      dropoff: { latitude: 1.3, longitude: 103.8 },
      passenger: { name: "John", phone_number: "+60198765432" },
      departure_date: "31-08-2025", // wrong format
    });

    console.log("Response status:", res.status);
    console.log("Response body:", res.body);

    expect(res.status).toBe(400);
    expect(res.body.code).toBe("REQUEST_VALIDATION_FAILURE");
  });
});
