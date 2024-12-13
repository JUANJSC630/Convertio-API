const request = require("supertest");
const app = require("../app/server");

jest.setTimeout(20000);

describe("POST /convert", () => {
  it("should return a PDF file if a valid Word file is uploaded", async () => {
    const response = await request(app)
      .post("/api/format-to-pdf")
      .attach("file", "tests/files/sample.txt");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("application/pdf");
    expect(response.headers["content-disposition"]).toContain("converted.pdf");
  });

  it("should return an error if no file is uploaded", async () => {
    const response = await request(app).post("/api/format-to-pdf").send();

    expect(response.status).toBe(400);
    expect(response.text).toBe("No file uploaded");
  });

  it("should return an error if the file is not a supported document format", async () => {
    const response = await request(app)
      .post("/api/format-to-pdf")
      .attach("file", "tests/files/sample.zip");

    expect(response.status).toBe(500);
    expect(response.text).toContain(
      "Unsupported format: .zip. Allowed formats are: .docx, .xlsx, .pptx, .odt, .txt, .jpg, .png"
    );
  });
});
