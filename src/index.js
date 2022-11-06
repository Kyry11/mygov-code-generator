import "./styles.css";
const { base32, base64 } = require("rfc4648");

document.getElementById("app").innerHTML = `
<h1>My Gov No Decoder</h1>
<img src="./myGovCodeGeneratorLogo.652849cf.svg" />
<div>
  <label>Encoded value</label>
  <div id="secretInput" class="text" contenteditable="true"></div>
  <br />
  <br />
  <label>Decoded value</label>
  <div id="secretOutput" class="text" contenteditable="false"></div>
  <br />
  <br />
  <input id="getToken" type="button" value="Extract" />
</div>
`;

let secretInput = document.getElementById("secretInput");
let secretOutput = document.getElementById("secretOutput");
let getToken = document.getElementById("getToken");

if (getToken) {
  getToken.onclick = () => {
    try {
      let secret = "";
      if (secretInput && secretInput.innerText) {
        secret = secretInput.innerText;
      }

      if (secret) {
        let secret32 = base32.stringify(base64.parse(secret));
        secret32 = secret32.replace(/=+$/, "");
        let totp_uri =
          "otpauth://totp/myGov?secret=" + secret32 + "&algorithm=SHA512";
        debugger;
        secretOutput.innerText = totp_uri;
      }
    } catch (error) {
      secretOutput.innerText = `Error: ${error.message}`;
    }
  };
}
