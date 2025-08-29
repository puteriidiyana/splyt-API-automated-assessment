import { api } from "../utils/apiClient";

describe("GET /api/journeys/:journey_id", () => {
  let journeyId: string;

  beforeAll(async () => {
    const res = await api.post("/journeys").send({
      pickup: { latitude: 1.3521, longitude: 103.8198 },
      dropoff: { latitude: 1.2801, longitude: 103.85 },
      passenger: { name: "Ali", phone_number: "+60137511456" },
      departure_date: "2025-08-22T14:30:00Z",
    });
    expect(res.status).toBe(200);
    journeyId = res.body._id;
  });

  it("Fetch journey by id", async () => {
    const res = await api.get(`/journeys/${journeyId}`);

    expect(res.status).toBe(200);
    expect(res.body._id).toBe(journeyId);
    expect(res.body.passenger.name).toBe("Ali");
  });

  it("Return error if journey not found", async () => {
    const res = await api.get("/journeys/invalid-id");

    expect(res.status).toBe(400);
    expect(res.body.code).toBe("REQUEST_VALIDATION_FAILURE");
  });

  it("Retrieve without journey ID", async () => {
    // Send GET without journey_id
    const res = await api
      .get("/journeys") // intentionally no ?journey_id param
      .set("Accept", "application/json");

    expect(res.status).toBe(404);

    // Assert empty body
    expect(res.body).toEqual({});
  }, 10000);
});
