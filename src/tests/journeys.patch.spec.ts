import { api } from "../utils/apiClient";

describe("PATCH /api/journeys", () => {
  let journeyId: string;

  beforeAll(async () => {
    const res = await api.post("/journeys").send({
      pickup: { latitude: 1.3521, longitude: 103.8198 },
      dropoff: { latitude: 1.2801, longitude: 103.85 },
      passenger: { name: "Jane", phone_number: "+60198765433" },
      departure_date: "2025-08-20T14:30:00Z",
    });

    expect(res.status).toBe(200);
    journeyId = res.body._id;
  });

  it("Update passenger phone number", async () => {
    const newPhone = "+60123456781";
    console.log("Journey ID to PATCH:", journeyId);

    const payload = {
      journey_id: journeyId,
      passenger: {
        name: "Jane",
        phone_number: newPhone,
      },
    };
    console.log("PATCH request payload:", payload);

    const res = await api.patch("/journeys").send(payload);
    console.log("PATCH response status:", res.status);
    console.log("PATCH response body:", res.body);

    expect(res.status).toBe(200);

    // 🔍 Confirm with GET after patch
    const getRes = await api.get(`/journeys/${journeyId}`);
    console.log("GET after PATCH response body:", getRes.body);

    expect(getRes.status).toBe(200);

    const updatedPhone = getRes.body.passenger?.phone_number;
    expect(updatedPhone).toBe(newPhone);

    if (updatedPhone !== newPhone) {
      console.warn(
        "⚠️ PATCH responded with 200, but phone_number was not updated"
      );
      console.warn("- Expected:", newPhone);
      console.warn("- Received:", updatedPhone);
      console.warn(
        "- Backend may not support updating 'passenger.phone_number'. Might need to check with developer"
      );
    }
  });

  it("Fail with invalid journey_id", async () => {
    const res = await api.patch("/journeys").send({
      journey_id: "INVALID_ID_123",
      passenger: { phone_number: "+60141234568" },
    });

    expect(res.status).toBe(500);
    expect(res.body.code).toBe("INTERNAL_SERVER_ERROR");
  });

  it("Missing journey ID", async () => {
    const res = await api.patch("/journeys").send({
      pickup: { latitude: 1.36, longitude: 103.82 },
    });

    expect(res.status).toBe(400);
    expect(res.body.code).toBe("REQUEST_VALIDATION_FAILURE");
  });

  it("Update the pickup location", async () => {
    const res = await api.patch("/journeys").send({
      journey_id: journeyId,
      pickup: {
        latitude: 1.36,
        longitude: 103.82,
      },
    });

    expect(res.status).toBe(200);
    expect(res.body.pickup.latitude).toBe(1.36);
    expect(res.body.pickup.longitude).toBe(103.82);
  });
});
