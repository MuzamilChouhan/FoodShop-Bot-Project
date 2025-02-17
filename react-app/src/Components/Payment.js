import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Payment.css";

function Payment() {
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    connectWallet();
  }, []);

  // ✅ Connect to MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
      } catch (error) {
        alert("❌ MetaMask Connection Failed!");
      }
    } else {
      alert("❌ MetaMask is not installed!");
    }
  };

  // ✅ Handle Payment via MetaMask
  const handlePayment = async () => {
    if (!account) {
      alert("❌ Connect MetaMask first!");
      return;
    }

    setIsPaying(true);

    try {
      await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: account,
            to: "0x6Dc6377d2Ef09D32E8D5df72D7162148cA64F226", // ✅ Your wallet address
            value: "0x38D7EA4C68000", // 0.01 ETH in Wei
          },
        ],
      });

      alert("✅ Payment Successful!");
      navigate("/"); // Redirect to homepage after payment
    } catch (error) {
      alert("❌ Payment Failed! Try Again.");
    }

    setIsPaying(false);
  };

  return (
    <div className="payment-container">
      <div className="payment-box">
        <h1 className="payment-title">🛒 Checkout</h1>
        <p className="wallet-info">Connected Wallet: {account ? account : "Not Connected"}</p>

        <button className="connect-btn" onClick={connectWallet}>
          {account ? "Connected ✅" : "🔗 Connect MetaMask"}
        </button>

        <button className="pay-btn" onClick={handlePayment} disabled={isPaying}>
          {isPaying ? "Processing..." : "💳 Confirm Payment"}
        </button>

        <button className="cancel-btn" onClick={() => navigate("/")}>Cancel</button>
      </div>
    </div>
  );
}

export default Payment;
