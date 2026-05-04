const jwt = require('jsonwebtoken');

// token JWT
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2MDk5NDM4Nn0.i_OruEltTGOpA-xrj1ZcRdJ3i513pTBCNg0OUcoG2Dk";

// secreto usado para firmar el token
const secret = "4f6b9f9c2a7e4d1b8c3a6f0d2e5b7a9c1d3f2e4b6a8c0d1e2f3a4b5c6d7e8f9"; 

try {
  const decoded = jwt.verify(token, secret);
  console.log("Token válido. Payload:", decoded);
} catch (err) {
  console.error("Token inválido:", err.message);
}
