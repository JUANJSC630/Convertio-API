
# **API de Conversión de Archivos (Word a PDF)**

## **Descripción General**

[Documentacion Api](https://app.swaggerhub.com/apis-docs/JUANJSC630/QuickConvoApi/1.0.0)

Esta API permite a los usuarios convertir documentos en formato **Word** (DOC, DOCX) a **PDF**. Los archivos subidos son procesados y enviados de vuelta como archivos PDF descargables. Utiliza **Express.js** como framework backend y **LibreOffice-convert** para la conversión de documentos.

---

## **Características**

- Conversión de archivos **Word** (DOC, DOCX) a **PDF**.
- Manejo de subidas mediante formularios **multipart/form-data** con **Multer**.
- Limpieza automática de archivos temporales después de la descarga.
- Configuración de CORS para aceptar solicitudes desde cualquier origen.

---

## **Tecnologías Utilizadas**

- **Node.js**: Entorno de ejecución de JavaScript en el servidor.
- **Express.js**: Framework web para manejar rutas y solicitudes HTTP.
- **Multer**: Middleware para gestionar subidas de archivos.
- **LibreOffice-convert**: Biblioteca que utiliza LibreOffice para convertir archivos.
- **File System (FS)**: Módulo nativo de Node.js para la manipulación de archivos locales.

---

## **Instalación**

1. Clona este repositorio:
   ```bash
   git clone https://github.com/usuario/repo.git
   cd repo
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor:
   ```bash
   npm start
   ```
   El servidor estará disponible en `http://localhost:3000`.

---

## **Uso de la API**

### **Endpoint: `/convert`**

Convierte un archivo **Word** (DOC/DOCX) a **PDF** y lo devuelve como archivo descargable.

- **URL de Producción**:  
  `https://convertio-fp4o.onrender.com/convert`

- **Método HTTP**:  
  `POST`

### **Parámetros de la Solicitud**

**Encabezados Requeridos**:  
- `Content-Type: multipart/form-data`

**Cuerpo (form-data)**:

| Parámetro | Tipo         | Descripción                                  | Requerido |
|-----------|--------------|----------------------------------------------|-----------|
| `file`    | Archivo (binario) | Archivo **Word** (DOC/DOCX) a convertir. | Sí         |

### **Respuestas**

| Código | Descripción                                                  |
|--------|--------------------------------------------------------------|
| `200`  | El archivo convertido es enviado como un archivo descargable. |
| `400`  | Error: No se subió ningún archivo en la solicitud.            |
| `500`  | Error: Falló la conversión del archivo.                      |

---

### **Ejemplo de Solicitud**

#### **Usando cURL**:
```bash
curl -X POST https://convertio-fp4o.onrender.com/convert   -F "file=@path/to/your/file.docx"
```

#### **Respuesta Exitosa (200)**:
```bash
HTTP/1.1 200 OK
Content-Type: application/pdf
Content-Disposition: attachment; filename="Daily Timesheet Module-converted.pdf"
```

---

## **Funcionamiento Interno**

1. **Subida del Archivo**:
   - El archivo se almacena temporalmente en el directorio `uploads/`.

2. **Conversión**:
   - El archivo se convierte a PDF utilizando **LibreOffice-convert**.

3. **Descarga**:
   - El archivo convertido se envía al cliente con el nombre `<nombre_original>-converted.pdf`.

4. **Limpieza**:
   - Los archivos temporales (original y PDF convertido) son eliminados automáticamente tras la descarga.

---

## **Notas Adicionales**

- **Compatibilidad**: Solo se admiten archivos en formato **DOC** o **DOCX**.
- **Tamaño Máximo de Archivo**: Configurable según los límites del servidor.
- **Seguridad**: Se recomienda usar HTTPS para proteger las solicitudes y transferencias de archivos.

---

## **Contribuciones**

1. Realiza un fork del repositorio.
2. Crea una nueva rama para tus cambios:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realiza tus cambios y súbelos:
   ```bash
   git commit -m "Añadir nueva funcionalidad"
   git push origin feature/nueva-funcionalidad
   ```
4. Abre un Pull Request en el repositorio principal.

---

## **Licencia**

Este proyecto está licenciado bajo la [MIT License](LICENSE).
