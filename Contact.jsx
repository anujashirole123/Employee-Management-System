import React, { useState, useEffect } from "react";

function Contact() {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [activeFAQ, setActiveFAQ] = useState(null);

  useEffect(() => setVisible(true), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${name}! Your message has been received.`);
    setName(""); setEmail(""); setMessage("");
  };

  const toggleFAQ = (index) => setActiveFAQ(activeFAQ === index ? null : index);

  const faqList = [
    { question: "What is your response time?", answer: "We typically respond within 24 hours." },
    { question: "Do you offer support for mobile apps?", answer: "Yes, we provide support for both Android and iOS apps." },
    { question: "Can I request a custom solution?", answer: "Absolutely! Contact us with your requirements and we will discuss." },
  ];

  return (
    <>
      <style>{`
        html, body, #root {
          margin:0; min-height:100%; font-family: Arial, sans-serif;
          background: linear-gradient(135deg, #191827, #17071a);
          display: flex; justify-content: center; align-items: flex-start;
          overflow-x: hidden;
          padding: 20px 0;
        }

        .contact-card {
          width: 90%;
          max-width: 700px;
          background: rgba(17,17,59,0.95);
          padding: 30px 35px;
          border-radius: 15px;
          box-shadow: 0 12px 25px rgba(0,0,0,0.5);
          color: #fff;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .contact-card.visible { opacity:1; transform:translateY(0); }

        h1,h2 { text-align:center; margin-bottom:15px; }
        h1 { font-size:28px; background: linear-gradient(90deg,#3b82f6,#2563eb);
             -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
        h2 { font-size:22px; color:#f1eaf1; }

        input, textarea {
          padding: 12px; border-radius:5px; border:1px solid #fff;
          font-size:16px; background: rgba(255,255,255,0.05); color:#fff;
          transition: all 0.3s ease;
        }
        input::placeholder, textarea::placeholder { color:#ccc; }
        input:focus, textarea:focus {
          border-color:#ff69b4;
          box-shadow:0 0 6px rgba(255,105,180,0.5);
          outline:none;
        }

        button {
          background:#ff1493; color:#fff; font-weight:600;
          border:none; padding:12px; border-radius:5px;
          cursor:pointer; transition: all 0.3s ease;
        }
        button:hover { background:#ff69b4; transform: translateY(-2px); box-shadow:0 6px 15px rgba(255,105,180,0.5); }

        .faq-item { overflow:hidden; border-radius:5px; margin-bottom:10px; }
        .faq-question {
          cursor:pointer; padding:10px 15px;
          background: #1f1b3a; border-radius:5px; font-weight:bold;
          transition: background 0.3s ease;
        }
        .faq-question:hover { background: #2c2750; }
        .faq-answer {
          padding:10px 15px; border-left:3px solid #ff1493;
          background: rgba(255,255,255,0.05); margin-top:5px;
          animation: fadeSlide 0.4s ease forwards; color:#e0e0e0;
        }

        @keyframes fadeSlide {
          from { opacity:0; transform:translateY(-10px); }
          to { opacity:1; transform:translateY(0); }
        }

        a { color:#ff69b4; margin:0 10px; font-weight:600; transition: all 0.3s ease; }
        a:hover { color:#ff1493; transform:scale(1.1); }

        .map-container {
          width: 100%;
          margin-top: 30px;
          border-radius: 10px;
          overflow: hidden;
        }
        .map-container iframe {
          width: 100%;
          height: 300px;
          border:0;
        }
      `}</style>

      <div className={`contact-card ${visible ? "visible" : ""}`}>
        <h1>Contact Us</h1>
        <p style={{textAlign:'center', color:'#ccc'}}>Reach out to us for any questions or support!</p>

        <form style={{display:'flex', flexDirection:'column', gap:'15px', marginTop:'20px'}} onSubmit={handleSubmit}>
          <input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Your Name" required />
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Your Email" required />
          <textarea value={message} onChange={e=>setMessage(e.target.value)} rows="5" placeholder="Your Message" required />
          <button type="submit">Send Message</button>
        </form>

        <div className="map-container">
          <iframe
            title="Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.8000000000006!2d73.8567!3d18.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c0f5d0000001%3A0x123456789abcdef!2sPune%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sin!4v1670000000000!5m2!1sen!2sin"
            allowFullScreen
            loading="lazy"
          />
        </div>

        <h2>Follow Us</h2>
        <div style={{textAlign:'center'}}>
          {["Facebook","Twitter","Instagram","LinkedIn"].map((site,i)=>(
            <a key={i} href={`https://${site.toLowerCase()}.com`} target="_blank" rel="noopener noreferrer">{site}</a>
          ))}
        </div>

        <h2>FAQ</h2>
        {faqList.map((faq,index)=>(
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={()=>toggleFAQ(index)}>{faq.question}</div>
            {activeFAQ===index && <div className="faq-answer">{faq.answer}</div>}
          </div>
        ))}
      </div>
    </>
  );
}

export default Contact;