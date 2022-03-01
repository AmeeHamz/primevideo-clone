export const Footer = () => {
  return (
    <div
      style={{
        width: "60%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: "auto",
        marginTop: "20px",
        marginBottom: "10px",
      }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <img
          style={{ width: "100px", marginBottom: "5px" }}
          src="https://amazonuk.gcs-web.com/system/files-encrypted/nasdaq_kms/inline-images/Prime_Video_Logo.png"
          alt="prime_logo"
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}>
        <span style={{ color: "#7BBCDA", margin: "5px" }}>
          Terms and Privacy Notice
        </span>
        <span style={{ color: "#7BBCDA", margin: "5px" }}>
          Send us feedback
        </span>
        <span style={{ color: "#7BBCDA", margin: "5px" }}>Help</span>
        <span style={{ color: "#6397A4" }}>
          © 1996-2021, Amazon.com, Inc. or its affiliates
        </span>
      </div>
    </div>
  );
};
