const request = require("supertest");
const app = require("../app/server"); // Ruta al archivo de tu servidor

jest.setTimeout(20000); // Establecer tiempo máximo de espera para las pruebas

describe("POST /convert", () => {
  it("debería devolver un archivo PDF si se sube un archivo Word válido", async () => {
    const response = await request(app)
      .post("/api/word-to-pdf")
      .attach("file", "tests/files/sample.docx"); // Ruta al archivo de prueba .docx

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("application/pdf");
    expect(response.headers["content-disposition"]).toContain("converted.pdf");
  });

  it("debería devolver un error si no se sube ningún archivo", async () => {
    const response = await request(app)
      .post("/api/word-to-pdf")
      .send(); // No se adjunta ningún archivo

    expect(response.status).toBe(400);
    expect(response.text).toBe("No file uploaded");
  });

  it("debería devolver un error si el archivo no es Word", async () => {
    const response = await request(app)
      .post("/api/word-to-pdf")
      .attach("file", "tests/files/sample.txt");

    expect(response.status).toBe(500);
    expect(response.text).toContain("Only Word documents are allowed");
  });
});
