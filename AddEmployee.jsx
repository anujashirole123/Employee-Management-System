import React, { useState, useEffect } from "react";

function AddEmployee() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState([]);
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [dob, setDob] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [skillLevel, setSkillLevel] = useState({});
  const [status, setStatus] = useState("Active");
  const [profilePic, setProfilePic] = useState(null);
  const [errors, setErrors] = useState({});
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [stars, setStars] = useState([]);

  const predefinedSkills = ["JavaScript","React","Node","HTML","CSS","Python","Java","C++","SQL"];
  const departments = ["Frontend", "Backend", "QA", "HR", "DevOps"];

  // Medium number of stars
  useEffect(() => {
    const tempStars = [];
    for (let i = 0; i < 60; i++) { // medium density
      tempStars.push({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 20 + 10,
        delay: Math.random() * 5
      });
    }
    setStars(tempStars);
  }, []);

  const addSkill = (skillName) => {
    const trimmed = (skillName || skillInput).trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setSkillInput("");
      setShowSuggestions(false);
      setSkillLevel({...skillLevel, [trimmed]:1});
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
    const newLevels = {...skillLevel};
    delete newLevels[skill];
    setSkillLevel(newLevels);
  };

  const toggleGender = (g) => {
    if (gender.includes(g)) setGender(gender.filter((x)=>x!==g));
    else setGender([...gender, g]);
  };

  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    if(file) setProfilePic(URL.createObjectURL(file));
  }

  const validate = () => {
    const newErrors = {};
    if(!name.trim()) newErrors.name = "Name is required";
    if(!email.trim()) newErrors.email = "Email is required";
    if(!gender.length) newErrors.gender = "Select at least one gender";
    if(!skills.length) newErrors.skills = "Add at least one skill";
    setErrors(newErrors);
    return Object.keys(newErrors).length===0;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!validate()) return;
    const employee = {name,email,gender,role,department,dob,joiningDate,skills,skillLevel,status,profilePic};
    console.log("Employee Added:",employee);
    alert(`Employee ${name} added successfully!`);
    setName(""); setEmail(""); setGender([]); setRole(""); setDepartment(""); 
    setDob(""); setJoiningDate(""); setSkills([]); setSkillLevel({}); setStatus("Active"); setProfilePic(null);
  }

  return (
    <>
      <style>{`
        html, body, #root {
          margin:0; height:100%; font-family:'Segoe UI', sans-serif;
          background:#0d1b2a; overflow:hidden;
        }

        .star {
          position: fixed;
          background: white;
          border-radius: 50%;
          opacity: 0.7;
          animation-name: starMove, twinkle;
          animation-timing-function: linear, ease-in-out;
          animation-iteration-count: infinite;
        }

        @keyframes starMove {
          0% { transform: translateY(-10px); }
          100% { transform: translateY(110vh); }
        }

        @keyframes twinkle {
          0%,100% { opacity:0.2; }
          50% { opacity:1; }
        }

        .centered-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 90%;
          max-width: 900px; /* medium size */
          display: flex;
          flex-direction: column;
          gap: 30px;
          background: rgba(255,255,255,0.95);
          border-radius: 15px;
          padding: 30px 40px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.25);
          z-index:1;
          max-height: 90vh;
          overflow-y: auto;
        }

        .header {
          font-size:28px;
          text-align:center;
          margin-bottom:20px;
          background:linear-gradient(90deg,#3b82f6,#2563eb);
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
        }

        .form-card, .preview-card { display:flex; flex-direction:column; gap:12px; }

        input, select, textarea {
          padding:10px; border-radius:6px; border:1px solid #ccc;
          width:100%; font-size:14px; transition: all 0.3s ease;
        }

        input:focus, select:focus, textarea:focus {
          border-color:#3b82f6;
          box-shadow:0 0 8px rgba(59,130,246,0.3);
          outline:none;
        }

        button {
          border:none; padding:10px; font-size:14px; font-weight:600;
          border-radius:6px; cursor:pointer; transition: all 0.3s ease;
        }

        .submit-btn { background:#3b82f6; color:#fff; }
        .submit-btn:hover { background:#2563eb; transform:translateY(-1px); box-shadow:0 6px 15px rgba(59,130,246,0.3); }

        .skills-container { display:flex; flex-wrap:wrap; gap:6px; margin-top:5px; }

        .skill-tag { background:#f3f4f6; padding:4px 8px; border-radius:15px; display:flex; align-items:center; gap:5px; font-size:12px; }
        .skill-tag button { background:#ef4444; color:white; border:none; border-radius:50%; width:16px; height:16px; cursor:pointer; }
        .skill-tag button:hover { transform:scale(1.2); }

        .preview-card { background:#f9fafb; padding:15px; border-radius:10px; box-shadow:0 6px 15px rgba(0,0,0,0.08); }
        .preview-card h2 { text-align:center; margin-bottom:12px; }
      `}</style>

      {stars.map(star => (
        <div
          key={star.id}
          className="star"
          style={{
            top:`${star.top}%`,
            left:`${star.left}%`,
            width:`${star.size}px`,
            height:`${star.size}px`,
            animationDuration:`${star.speed}s, ${Math.random()*5 + 3}s`,
            animationDelay:`${star.delay}s, ${Math.random()*5}s`
          }}
        />
      ))}

      <div className="centered-container">
        <div className="header">Add Employee</div>

        {/* Form */}
        <div className="form-card">
          <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap:'12px'}}>
            <label>Name:</label><input type="text" value={name} onChange={e=>setName(e.target.value)} />
            {errors.name && <div style={{color:'#dc2626'}}>{errors.name}</div>}

            <label>Email:</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} />
            {errors.email && <div style={{color:'#dc2626'}}>{errors.email}</div>}

            <label>Gender:</label>
            <div style={{display:'flex', gap:'10px'}}>
              {["Male","Female","Other"].map(g=>(<label key={g}><input type="checkbox" checked={gender.includes(g)} onChange={()=>toggleGender(g)} /> {g}</label>))}
            </div>
            {errors.gender && <div style={{color:'#dc2626'}}>{errors.gender}</div>}

            <label>Role:</label><input type="text" value={role} onChange={e=>setRole(e.target.value)} />

            <label>Department:</label>
            <select value={department} onChange={e=>setDepartment(e.target.value)}>
              <option value="">Select Department</option>
              {departments.map(d=><option key={d} value={d}>{d}</option>)}
            </select>

            <label>DOB:</label><input type="date" value={dob} onChange={e=>setDob(e.target.value)} />

            <label>Joining Date:</label><input type="date" value={joiningDate} onChange={e=>setJoiningDate(e.target.value)} />

            <label>Status:</label>
            <select value={status} onChange={e=>setStatus(e.target.value)}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <label>Profile Picture:</label>
            <input type="file" accept="image/*" onChange={handleProfileUpload} />

            <label>Skills:</label>
            <div style={{position:'relative'}}>
              <div style={{display:'flex', gap:'8px'}}>
                <input type="text" value={skillInput} onChange={e=>{setSkillInput(e.target.value); setShowSuggestions(true);}}
                  placeholder="Enter skill" 
                  onKeyDown={e=>{ if(e.key==="Enter"){e.preventDefault(); addSkill();}}}
                />
                <button type="button" onClick={()=>addSkill()} style={{background:'#10b981', color:'#fff'}}>Add</button>
              </div>
              {showSuggestions && skillInput && (
                <div style={{position:'absolute', top:'35px', left:0, right:0, background:'#fff', border:'1px solid #ccc', maxHeight:'120px', overflowY:'auto'}}>
                  {predefinedSkills.filter(s=>s.toLowerCase().includes(skillInput.toLowerCase()) && !skills.includes(s))
                    .map(s=><div key={s} onMouseDown={e=>{e.preventDefault(); addSkill(s);}} style={{padding:'6px', cursor:'pointer'}}>{s}</div>)}
                </div>
              )}
            </div>

            <div className="skills-container">
              {skills.map(s=>(<div className="skill-tag" key={s}>
                {s} <input type="range" min="1" max="5" value={skillLevel[s]} onChange={e=>setSkillLevel({...skillLevel,[s]:e.target.value})} />
                <button type="button" onClick={()=>removeSkill(s)}>×</button>
              </div>))}
            </div>

            <button type="submit" className="submit-btn">Add Employee</button>
          </form>
        </div>

        {/* Preview */}
        <div className="preview-card">
          <h2>Live Preview</h2>
          {profilePic && <img src={profilePic} alt="Profile" style={{width:'100px', borderRadius:'50%'}} />}
          <p><b>Name:</b> {name}</p>
          <p><b>Email:</b> {email}</p>
          <p><b>Gender:</b> {gender.join(", ")}</p>
          <p><b>Role:</b> {role}</p>
          <p><b>Department:</b> {department}</p>
          <p><b>DOB:</b> {dob}</p>
          <p><b>Joining:</b> {joiningDate}</p>
          <p><b>Status:</b> {status}</p>
          <p><b>Skills:</b></p>
          <ul>{skills.map(s=><li key={s}>{s} - Level {skillLevel[s]}</li>)}</ul>
        </div>
      </div>
    </>
  );
}

export default AddEmployee;