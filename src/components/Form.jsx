import React, { useCallback, useEffect, useState, useRef } from "react";

const Form = () => {
  const [passwordLength, setPasswordLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeChars, setIncludeChars] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);
  const copyToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current?.select();
      window.navigator.clipboard.writeText(password);
    }
  }, [password]);

  const generatePassword = useCallback(() => {

    const lowerCase = "abcdefghijklmnopqrstuvwxyz";
    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";

    let characters = lowerCase + upperCase;

    if (includeNumbers) characters += numbers;
    if (includeChars) characters += specialChars;

    let generatedPassword = "";

    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters.charAt(randomIndex);
    }

    setPassword(generatedPassword);
  }, [passwordLength, includeNumbers, includeChars])


  useEffect(() => {
    generatePassword();
  }, [passwordLength, includeNumbers, includeChars]);



  return (
    <div className="w-full max-w-md mx-auto shadow-xl rounded-lg px-6 py-6 my-8 bg-gray-800 text-white">
      <h1 className="text-2xl font-semibold text-center text-blue-400 mb-4">
        Password Generator
      </h1>

      <div className="flex shadow-md rounded-lg overflow-hidden mb-6">
        <input
          type="text"
          placeholder="Password"
          value={password}
          readOnly
          ref={passwordRef}
          className="outline-none w-full py-3 px-4 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={copyToClipboard}
          className="outline-none bg-blue-700 text-white px-4 py-2 hover:bg-blue-600 transition duration-300"
        >
          Copy
        </button>
      </div>

      <div className="flex text-sm gap-x-4 mb-4">
        <div className="flex items-center gap-x-2">
          <label htmlFor="lengthRange" className="text-sm">Length: {passwordLength}</label>
          <input
            type="range"
            min={6}
            max={32}
            value={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
            className="cursor-pointer bg-gray-600 rounded-full w-full"
          />
        </div>

        <div className="flex items-center gap-x-2">
          <label htmlFor="numberInput" className="text-sm">Numbers</label>
          <input
            type="checkbox"
            id="numberInput"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers((prev) => !prev)}
            className="h-4 w-4 text-blue-600"
          />
        </div>

        <div className="flex items-center gap-x-2">
          <label htmlFor="characterInput" className="text-sm">Characters</label>
          <input
            type="checkbox"
            id="characterInput"
            checked={includeChars}
            onChange={(e) => setIncludeChars((prev) => !prev)}
            className="h-4 w-4 text-blue-600"
          />
        </div>
      </div>

      <p className="text-center text-gray-400 text-sm">
        Adjust the length slider to customize your password length. Choose options below for additional character sets.
      </p>
      {/* <button
        onClick={generatePassword}
        className="w-full bg-blue-600 text-white py-2 mt-4 rounded-lg hover:bg-blue-500 transition duration-300"
      >Generate
      </button>  */}
    </div>
  );
};

export default Form;
