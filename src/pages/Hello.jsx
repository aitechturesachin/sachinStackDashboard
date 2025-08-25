export default function Hello({ title = "Hello" }) {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>{title}</h1>
      <p style={{ opacity: 0.8 }}>Hello from the {title} page.</p>
    </div>
  );
}
