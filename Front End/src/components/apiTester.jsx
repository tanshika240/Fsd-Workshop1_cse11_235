import { useState } from "react";

function ApiTester() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("http://localhost:3000/user");
  const [body, setBody] = useState(`{
  "name": "Rahul",
  "username": "rahul123",
  "email": "rahul@example.com"
}`);

  const [response, setResponse] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const sendRequest = async () => {
    setLoading(true);
    setResponse(null);
    setStatus("");

    try {
      const options = {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Send body only for methods that support it
      if (method === "POST" || method === "PUT" || method === "PATCH") {
        options.body = body;
      }

      const res = await fetch(url, options);

      setStatus(`${res.status} ${res.statusText}`);

      const data = await res.json();

      setResponse(data);
    } catch (error) {
      setStatus("Error");
      setResponse({
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>API Testing Dashboard</h1>

      <p style={styles.subtitle}>Test your Express REST API without Postman</p>

      {/* API Request Section */}
      <div style={styles.form}>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          style={styles.method}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="PATCH">PATCH</option>
          <option value="DELETE">DELETE</option>
        </select>

        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter API URL"
          style={styles.input}
        />

        <button
          onClick={sendRequest}
          disabled={loading}
          style={styles.sendButton}
        >
          {loading ? "Sending..." : "Send Request"}
        </button>
      </div>

      {/* Request Body */}
      {(method === "POST" || method === "PUT" || method === "PATCH") && (
        <div style={styles.section}>
          <h3>Request Body</h3>

          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows="8"
            style={styles.textarea}
          />
        </div>
      )}

      {/* Response Section */}
      <div style={styles.section}>
        <div style={styles.responseHeader}>
          <h3>Response</h3>

          {status && (
            <span
              style={{
                ...styles.status,
                backgroundColor: status.startsWith("2") ? "#d1fae5" : "#fee2e2",
                color: status.startsWith("2") ? "#065f46" : "#991b1b",
              }}
            >
              Status: {status}
            </span>
          )}
        </div>

        <pre style={styles.responseBox}>
          {response
            ? JSON.stringify(response, null, 2)
            : "Response will appear here..."}
        </pre>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "40px auto",
    padding: "30px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },

  subtitle: {
    color: "#666",
    marginBottom: "30px",
  },

  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "25px",
  },

  method: {
    padding: "12px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    cursor: "pointer",
  },

  input: {
    flex: 1,
    padding: "12px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },

  sendButton: {
    padding: "12px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  section: {
    marginTop: "25px",
  },

  textarea: {
    width: "100%",
    padding: "15px",
    fontSize: "14px",
    fontFamily: "monospace",
    border: "1px solid #ccc",
    borderRadius: "6px",
    boxSizing: "border-box",
    resize: "vertical",
  },

  responseHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  status: {
    padding: "8px 12px",
    borderRadius: "15px",
    fontSize: "13px",
    fontWeight: "bold",
  },

  responseBox: {
    backgroundColor: "#1e1e1e",
    color: "#d4d4d4",
    padding: "20px",
    borderRadius: "8px",
    minHeight: "200px",
    overflowX: "auto",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
};

export default ApiTester;
