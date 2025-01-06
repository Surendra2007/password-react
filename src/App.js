import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  // Function to generate the password
  const generatePassword = () => {
    const lowerChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let allChars = lowerChars;
    if (includeNumbers) allChars += numbers;
    if (includeSymbols) allChars += symbols;

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      generatedPassword += allChars[randomIndex];
    }

    setPassword(generatedPassword);
  };

  // Automatically generate password when dependencies change
  useEffect(() => {
    generatePassword();
  }, [length, includeNumbers, includeSymbols]);

  return (
    <div className="password-generator">
      <h1>Password Generator</h1>
      <div className="output">
        <input
          type="text"
          readOnly
          value={password}
          placeholder="Your password will appear here"
        />
        <button onClick={() => navigator.clipboard.writeText(password)}>
          Copy
        </button>
      </div>
      <div className="controls">
        <label>
          Password Length: {length}
          <input
            type="range"
            min="8"
            max="20"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </label>
        
        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
          Include Numbers
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
          Include Symbols
        </label>
      </div>
    </div>
  );
}

export default App;
