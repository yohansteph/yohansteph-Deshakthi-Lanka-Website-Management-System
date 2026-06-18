require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');

// Models
const Job = require('./models/Job');
const User = require('./models/User');
const Inquiry = require('./models/Inquiry');
const Employer = require('./models/Employer'); 
const Assessment = require('./models/Assessment');
const Application = require('./models/Application');
const TestAttempt = require('./models/TestAttempt');

const app = express();

// --- MIDDLEWARE ---
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
})); 

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// --- FOLDER MANAGEMENT ---
const uploadDir = path.join(__dirname, 'public', 'uploads');
const cvUploadDir = path.join(__dirname, 'public', 'cvs');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
if (!fs.existsSync(cvUploadDir)) fs.mkdirSync(cvUploadDir, { recursive: true });

app.use('/public', express.static(path.join(__dirname, 'public')));

// --- MULTER CONFIGURATION ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'cvFile' || file.fieldname === 'cv') {
            cb(null, './public/cvs/');
        } else {
            cb(null, './public/uploads/');
        }
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname.replace(/\s+/g, '_'));
    }
});
const upload = multer({ storage: storage });

// --- DATABASE CONNECTION ---
const dbURI = process.env.MONGO_URI || "mongodb+srv://deshakthi_lanka_db:deshakthi%401234@deshakthi.falu5nt.mongodb.net/deshakthi_lanka?retryWrites=true&w=majority&appName=Deshakthi";

mongoose.connect(dbURI)
    .then(() => console.log("✅ Connected to MongoDB Atlas!"))
    .catch(err => console.error("❌ Connection failed:", err.message));

// --- EMAIL TRANSPORTER CONFIGURATION ---
// Store OTPs temporarily (in production, use Redis or database)
const otpStore = new Map();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'deshakthilanka.sl@gmail.com',  
        pass: 'xpli aikr vmei rfse'       // Gmail app password
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.error('❌ Email configuration error:', error);
    } else {
        console.log('📧 Email server is ready to send messages');
    }
});

// ============================================
// SKILL TEST QUESTIONS (Pre-defined)
// ============================================
const skillTests = {
    'IT': [
        { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"], correct: 0 },
        { question: "Which of the following is a JavaScript framework?", options: ["Django", "React", "Flask", "Laravel"], correct: 1 },
        { question: "What does SQL stand for?", options: ["Structured Query Language", "Simple Query Language", "Standard Question Language", "System Query Logic"], correct: 0 },
        { question: "Which company developed Java?", options: ["Microsoft", "Apple", "Sun Microsystems", "Google"], correct: 2 },
        { question: "What is the correct file extension for Python files?", options: [".pyth", ".pt", ".py", ".pyt"], correct: 2 },
        { question: "Which of the following is a NoSQL database?", options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"], correct: 2 },
        { question: "What does API stand for?", options: ["Application Programming Interface", "Application Program Integration", "Advanced Programming Interface", "Application Protocol Interface"], correct: 0 },
        { question: "Which HTTP method is used to retrieve data?", options: ["POST", "PUT", "GET", "DELETE"], correct: 2 },
        { question: "What is the purpose of Git?", options: ["Version Control", "Database Management", "Web Hosting", "Image Editing"], correct: 0 },
        { question: "Which CSS property changes the text color?", options: ["text-color", "font-color", "color", "bgcolor"], correct: 2 }
    ],
    'Healthcare': [
        { question: "What is the normal human body temperature in Celsius?", options: ["36.1°C", "37°C", "38.5°C", "39°C"], correct: 1 },
        { question: "Which organ pumps blood throughout the body?", options: ["Brain", "Liver", "Heart", "Lungs"], correct: 2 },
        { question: "What does CPR stand for?", options: ["Cardio Pulmonary Resuscitation", "Critical Patient Recovery", "Cardiac Pressure Response", "Clinical Procedure Review"], correct: 0 },
        { question: "Which vitamin is produced by sunlight exposure?", options: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"], correct: 3 },
        { question: "What is the main function of red blood cells?", options: ["Fight infection", "Carry oxygen", "Clot blood", "Digest food"], correct: 1 },
        { question: "Which of these is a contagious disease?", options: ["Diabetes", "Asthma", "Influenza", "Arthritis"], correct: 2 },
        { question: "What does a stethoscope measure?", options: ["Blood pressure", "Heartbeat", "Temperature", "Vision"], correct: 1 },
        { question: "Which organ filters waste from blood?", options: ["Stomach", "Kidneys", "Intestines", "Pancreas"], correct: 1 },
        { question: "What is the first aid for a minor burn?", options: ["Apply ice", "Apply butter", "Cool water", "Bandage tightly"], correct: 2 },
        { question: "What is the normal resting heart rate for adults?", options: ["40-50 bpm", "60-100 bpm", "110-130 bpm", "140-160 bpm"], correct: 1 }
    ],
    'Engineering': [
        { question: "What is the SI unit of force?", options: ["Joule", "Watt", "Newton", "Pascal"], correct: 2 },
        { question: "What does CAD stand for?", options: ["Computer Aided Design", "Computer Automated Drawing", "Control and Design", "Circuit Analysis Device"], correct: 0 },
        { question: "Which law states that current is proportional to voltage?", options: ["Faraday's Law", "Ohm's Law", "Newton's Law", "Boyle's Law"], correct: 1 },
        { question: "What is the unit of electrical resistance?", options: ["Ampere", "Volt", "Ohm", "Watt"], correct: 2 },
        { question: "Which material is commonly used as a conductor?", options: ["Rubber", "Copper", "Glass", "Wood"], correct: 1 },
        { question: "What does HVAC stand for?", options: ["Heating, Ventilation, Air Conditioning", "High Voltage AC", "Heavy Vehicle Air Control", "Hydraulic Valve Assembly Control"], correct: 0 },
        { question: "What is the formula for calculating force?", options: ["F = m × a", "F = m / a", "F = a / m", "F = m + a"], correct: 0 },
        { question: "What is the main component of concrete?", options: ["Sand", "Gravel", "Cement", "Water"], correct: 2 },
        { question: "What does RPM stand for?", options: ["Revolutions Per Minute", "Rounds Per Mile", "Rate Per Measurement", "Rotation Position Meter"], correct: 0 },
        { question: "Which tool is used to measure angles?", options: ["Ruler", "Protractor", "Compass", "Calipers"], correct: 1 }
    ],
    'Construction': [
        { question: "What is the most common material for foundations?", options: ["Wood", "Steel", "Concrete", "Plastic"], correct: 2 },
        { question: "What does a level measure?", options: ["Weight", "Horizontal alignment", "Temperature", "Pressure"], correct: 1 },
        { question: "What is scaffolding used for?", options: ["Support workers", "Mix concrete", "Measure distance", "Cut materials"], correct: 0 },
        { question: "Which of these is a type of foundation?", options: ["Slab", "Truss", "Rafter", "Stud"], correct: 0 },
        { question: "What is the purpose of rebar?", options: ["Reinforce concrete", "Bind wood", "Seal joints", "Paint surfaces"], correct: 0 },
        { question: "What does OSHA regulate?", options: ["Safety standards", "Building codes", "Material costs", "Construction speed"], correct: 0 },
        { question: "Which machine is used to dig foundations?", options: ["Crane", "Excavator", "Bulldozer", "Forklift"], correct: 1 },
        { question: "What is a blueprint?", options: ["Construction plan", "Safety manual", "Material list", "Payment schedule"], correct: 0 },
        { question: "What is the purpose of a retaining wall?", options: ["Hold back soil", "Support roof", "Divide rooms", "Decorate garden"], correct: 0 },
        { question: "Which of these is a power tool?", options: ["Hammer", "Screwdriver", "Circular saw", "Level"], correct: 2 }
    ],
    'Hospitality': [
        { question: "What does 'à la carte' mean?", options: ["Fixed price menu", "Ordered separately", "Buffet style", "Take away"], correct: 1 },
        { question: "What is the correct way to carry a knife?", options: ["Point up", "Point down", "Horizontal", "In pocket"], correct: 0 },
        { question: "What does 'Mise en place' mean?", options: ["Everything in place", "Clean kitchen", "Ready to serve", "After service"], correct: 0 },
        { question: "Which wine is typically served with fish?", options: ["Red wine", "White wine", "Rosé", "Sparkling"], correct: 1 },
        { question: "What is the proper way to greet a guest?", options: ["Smile and say hello", "Ignore them", "Ask for ID", "Point to table"], correct: 0 },
        { question: "What does 'F&B' stand for?", options: ["Food and Beverage", "Front and Back", "Fine and Basic", "Full and Balanced"], correct: 0 },
        { question: "Which of these is a table setting item?", options: ["Napkin", "Menu", "Check", "Receipt"], correct: 0 },
        { question: "What is the purpose of a tray?", options: ["Carry multiple items", "Decorate table", "Cover food", "Clean spills"], correct: 0 },
        { question: "What does 'POS' stand for in restaurants?", options: ["Point of Sale", "Piece of Service", "Position of Staff", "Price of Stock"], correct: 0 },
        { question: "Which of these is a common hotel department?", options: ["Housekeeping", "Engineering", "IT", "All of the above"], correct: 3 }
    ]
};

// ============================================
// 1. JOB APPLICATIONS ROUTES
// ============================================
app.post('/api/applications', upload.single('cvFile'), async (req, res) => {
    try {
        const appData = {
            jobId: req.body.jobId,
            jobTitle: req.body.jobTitle,
            applicantName: req.body.applicantName,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message || '',
            cvUrl: req.file ? `http://localhost:3000/public/cvs/${req.file.filename}` : null,
            status: 'Pending',
            createdAt: new Date()
        };
        const newApplication = new Application(appData);
        await newApplication.save();
        res.status(201).json({ message: "Application submitted successfully!", application: newApplication });
    } catch (err) { 
        res.status(500).json({ error: err.message }); 
    }
});

app.get('/api/admin/applications', async (req, res) => {
    try {
        const applications = await Application.find().sort({ createdAt: -1 });
        res.json(applications);
    } catch (err) { 
        res.status(500).json({ error: "Failed to fetch applications" }); 
    }
});

app.get('/api/admin/applications/:id', async (req, res) => {
    try {
        const app = await Application.findById(req.params.id);
        if (!app) return res.status(404).json({ error: "Application not found" });
        res.json(app);
    } catch (err) { 
        res.status(500).json({ error: "Application not found" }); 
    }
});

app.patch('/api/admin/applications/:id/status', async (req, res) => {
    try {
        const updated = await Application.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.json(updated);
    } catch (err) { 
        res.status(400).json({ error: "Update failed" }); 
    }
});

app.delete('/api/admin/applications/:id', async (req, res) => {
    try {
        await Application.findByIdAndDelete(req.params.id);
        res.json({ message: "Application deleted" });
    } catch (err) { 
        res.status(500).json({ error: "Delete failed" }); 
    }
});

app.get('/api/user/applications/:email', async (req, res) => {
    try {
        const apps = await Application.find({ email: req.params.email }).sort({ createdAt: -1 });
        res.json(apps);
    } catch (err) { 
        res.status(500).json({ error: "Failed to fetch applications" }); 
    }
});

app.put('/api/user/profile/:email', upload.single('cv'), async (req, res) => {
    try {
        const updateData = {
            fullName: req.body.fullName,
            phone: req.body.phone
        };
        if (req.file) {
            updateData.cvUrl = `http://localhost:3000/public/cvs/${req.file.filename}`;
        }
        const updatedUser = await User.findOneAndUpdate(
            { email: req.params.email },
            updateData,
            { new: true }
        ).select('-password');
        res.json({ message: "Profile updated", user: updatedUser });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// ============================================
// 2. SKILL TEST ROUTES
// ============================================
app.get('/api/skill-test/:category', async (req, res) => {
    const category = req.params.category;
    const test = skillTests[category];
    if (!test) {
        return res.status(404).json({ error: "No test available for this category" });
    }
    const safeQuestions = test.map(q => ({
        question: q.question,
        options: q.options
    }));
    res.json({ category, questions: safeQuestions, totalQuestions: test.length });
});

app.post('/api/skill-test/submit', async (req, res) => {
    const { email, category, answers, jobId } = req.body;
    
    // Check for recent failed attempt (24 hour lockout)
    const recentAttempt = await TestAttempt.findOne({ 
        email, 
        category,
        passed: false,
        attemptedAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    });
    
    if (recentAttempt) {
        return res.status(403).json({ 
            error: "You failed this test. Please try again after 24 hours.",
            lockoutUntil: new Date(recentAttempt.attemptedAt.getTime() + 24 * 60 * 60 * 1000)
        });
    }
    
    const test = skillTests[category];
    if (!test) return res.status(404).json({ error: "Test not found" });
    
    let score = 0;
    for (let i = 0; i < test.length && i < answers.length; i++) {
        if (answers[i] === test[i].correct) score++;
    }
    
    const percentage = (score / test.length) * 100;
    const passed = percentage >= 70; // Changed from 80 to 70
    
    const attempt = new TestAttempt({
        email,
        category,
        score,
        totalQuestions: test.length,
        percentage,
        passed,
        jobId: jobId || null
    });
    await attempt.save();
    
    res.json({
        passed,
        score,
        totalQuestions: test.length,
        percentage,
        message: passed ? "🎉 Congratulations! You passed the skill test!" : "❌ Sorry, you did not pass. Please try again after 24 hours."
    });
});

app.get('/api/skill-test/check/:email/:category', async (req, res) => {
    const { email, category } = req.params;
    const passedAttempt = await TestAttempt.findOne({ email, category, passed: true });
    res.json({ hasPassed: !!passedAttempt });
});

app.get('/api/admin/test-attempts', async (req, res) => {
    try {
        const attempts = await TestAttempt.find().sort({ attemptedAt: -1 });
        res.json(attempts);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch attempts" });
    }
});

// ============================================
// 3. ANALYTICS & STATS DASHBOARD
// ============================================
app.get('/api/admin/stats', async (req, res) => {
    try {
        const totalJobs = await Job.countDocuments();
        const totalUsers = await User.countDocuments();
        const totalApplications = await Application.countDocuments();
        const totalInquiries = await Inquiry.countDocuments();
        const totalEmployers = await Employer.countDocuments();
        const totalAssessments = await Assessment.countDocuments();
        
        const applicationsByCategory = await Application.aggregate([
            { $group: { _id: "$jobCategory", count: { $sum: 1 } } }
        ]);
        
        const applicationsByStatus = await Application.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);
        
        const jobsByCategory = await Job.aggregate([
            { $group: { _id: "$category", count: { $sum: 1 } } }
        ]);
        
        const testAttempts = await TestAttempt.aggregate([
            { $group: { 
                _id: "$category", 
                total: { $sum: 1 },
                passed: { $sum: { $cond: ["$passed", 1, 0] } }
            } }
        ]);
        
        res.json({
            totals: { totalJobs, totalUsers, totalApplications, totalInquiries, totalEmployers, totalAssessments },
            applicationsByCategory,
            applicationsByStatus,
            jobsByCategory,
            testAttempts
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ============================================
// 4. CURRENCY CONVERSION (Live API)
// ============================================
app.get('/api/currency/rates', async (req, res) => {
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        res.json({
            base: 'USD',
            rates: {
                LKR: data.rates.LKR,
                EUR: data.rates.EUR,
                GBP: data.rates.GBP,
                AED: data.rates.AED,
                QAR: data.rates.QAR,
                SAR: data.rates.SAR,
                AUD: data.rates.AUD,
                CAD: data.rates.CAD
            },
            lastUpdated: data.date
        });
    } catch (err) {
        // Fallback rates if API fails
        res.json({
            base: 'USD',
            rates: { 
                LKR: 320.50, EUR: 0.92, GBP: 0.79, AED: 3.67, 
                QAR: 3.64, SAR: 3.75, AUD: 1.52, CAD: 1.36 
            },
            lastUpdated: new Date().toISOString().split('T')[0]
        });
    }
});

// ============================================
// 5. CHATBOT API - ENHANCED
// ============================================
app.post('/api/chatbot', async (req, res) => {
    const message = typeof req.body.message === 'string' ? req.body.message.trim() : '';
    if (!message) {
        return res.status(400).json({ reply: 'Please send a message so I can assist you.' });
    }
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.match(/^(hello|hi|hey|greetings|good morning|good afternoon)/)) {
        res.json({ reply: "👋 Hello! Welcome to Deshakthi Lanka. I'm your recruitment assistant. How can I help you today? You can ask me about:\n• Available jobs\n• Application process\n• Office locations\n• Our services\n• Contact information" });
    } 
    else if (lowerMsg.includes('job') || lowerMsg.includes('vacancy') || lowerMsg.includes('work') || lowerMsg.includes('opportunity')) {
        try {
            const jobs = await Job.find({}).limit(5).sort({ postedDate: -1 });
            if (jobs.length > 0) {
                let jobList = "📋 Here are our current job opportunities:\n\n";
                jobs.forEach((job, i) => {
                    jobList += `${i+1}. *${job.jobTitle}*\n   📍 ${job.location}\n   💰 ${job.salary || 'Competitive'}\n   ${job.isUrgent ? '   🔥 URGENT HIRING\n' : '\n'}`;
                });
                jobList += "\n➡️ Visit our Find Jobs page to apply or ask me for more details about any specific position!";
                res.json({ reply: jobList });
            } else {
                res.json({ reply: "📭 We don't have any open positions right now. Please check back later or subscribe to our newsletter for updates!" });
            }
        } catch (err) {
            res.json({ reply: "I'm having trouble fetching jobs right now. Please visit our Find Jobs page directly or try again later." });
        }
    }
    else if (lowerMsg.includes('it job') || lowerMsg.includes('software') || lowerMsg.includes('developer') || lowerMsg.includes('programmer') || lowerMsg.includes('tech')) {
        try {
            const itJobs = await Job.find({ category: 'IT' });
            if (itJobs.length > 0) {
                let jobList = "💻 Here are our IT job openings:\n\n";
                itJobs.forEach((job, i) => {
                    jobList += `${i+1}. ${job.jobTitle} - ${job.location}\n`;
                });
                jobList += "\n➡️ Would you like to know more about any of these positions?";
                res.json({ reply: jobList });
            } else {
                res.json({ reply: "We don't have any IT openings right now. Would you like me to notify you when new positions become available?" });
            }
        } catch (err) {
            res.json({ reply: "Let me check our IT openings... Please visit our Find Jobs page for the latest listings." });
        }
    }
    else if (lowerMsg.includes('location') || lowerMsg.includes('office') || lowerMsg.includes('address') || lowerMsg.includes('where') || lowerMsg.includes('branch')) {
        res.json({ reply: "🏢 Our office locations:\n\n📍 *Head Office:*\nNo. 123, Tea Plantation Road, Kandy, Sri Lanka\n\n📍 *Colombo Branch:*\nNo. 45, Galle Road, Colombo 03\n\n📍 *International Hub:*\nOffice 402, Business Bay Tower, Dubai, UAE\n\nWould you like directions or contact numbers for any of these locations?" });
    }
    else if (lowerMsg.includes('apply') || lowerMsg.includes('application') || lowerMsg.includes('how to apply')) {
        res.json({ reply: "📝 *How to apply for jobs with Deshakthi Lanka:*\n\n1️⃣ Register/Login to your account on our website\n2️⃣ Browse our Find Jobs page for opportunities\n3️⃣ Click 'Apply Now' on your desired position\n4️⃣ Fill out the application form and upload your CV\n5️⃣ Our team will review and contact you within 3-5 business days\n\n✅ Pro tip: Make sure your profile is complete and CV is up-to-date for faster processing!\n\nWould you like me to help you find jobs matching your profile?" });
    }
    else if (lowerMsg.includes('contact') || lowerMsg.includes('call') || lowerMsg.includes('email') || lowerMsg.includes('phone') || lowerMsg.includes('reach')) {
        res.json({ reply: "📞 *Contact Deshakthi Lanka:*\n\n📧 Email: deshakthi@gmail.com\n📞 Hotline: +94 112 123 456\n💬 WhatsApp: +94 771 234 567\n\n🕒 *Working Hours:*\nMonday - Friday: 8:30 AM - 5:30 PM\nSaturday: 9:00 AM - 1:00 PM\n\n🌐 Website: www.deshakthilanka.com\n\nYou can also use our Contact Us form for detailed inquiries!" });
    }
    else if (lowerMsg.includes('service') || lowerMsg.includes('help') || lowerMsg.includes('what do you do') || lowerMsg.includes('company')) {
        res.json({ reply: "🌟 *About Deshakthi Lanka:*\n\nWe are a leading recruitment agency connecting Sri Lankan professionals with global employers. Our services include:\n\n✅ Overseas job placement\n✅ Visa processing assistance\n✅ Pre-departure training & orientation\n✅ Employer partnership programs\n✅ Qualification assessment & upskilling guidance\n\n🎯 Our mission: To bridge the gap between talented Sri Lankans and international career opportunities with transparency and integrity.\n\nHow can I assist you with your career journey today?" });
    }
    else if (lowerMsg.includes('salary') || lowerMsg.includes('pay') || lowerMsg.includes('wage') || lowerMsg.includes('compensation')) {
        res.json({ reply: "💰 *Salary Information:*\n\nSalaries vary by position, location, experience, and industry. For example:\n\n• IT professionals: $2,000 - $6,000/month\n• Healthcare workers: $1,500 - $4,500/month\n• Engineers: $2,500 - $7,000/month\n• Hospitality staff: $800 - $2,500/month\n\n💡 *Pro tip:* Use our Live Salary Converter on the Find Jobs page to see how international salaries compare in Sri Lankan Rupees with real-time exchange rates!\n\nWould you like me to help you find jobs in a specific salary range?" });
    }
    else if (lowerMsg.includes('qualification') || lowerMsg.includes('requirement') || lowerMsg.includes('need') || lowerMsg.includes('eligible')) {
        res.json({ reply: "📚 *Qualification Requirements:*\n\nQualifications vary by industry and destination country. Here's a quick guide:\n\n• *IT:* Bachelor's degree + relevant certifications\n• *Healthcare:* BSc in Nursing + SLMC registration\n• *Engineering:* BSc/BEng + professional certifications\n• *Hospitality:* Diploma/Certificate + experience\n• *Construction:* NVQ Level 3/4 + trade certifications\n\nVisit our Education page for detailed requirements or submit your profile for a free qualification assessment!\n\nWhat industry are you interested in?" });
    }
    else if (lowerMsg.includes('thank')) {
        res.json({ reply: "🙏 You're very welcome! I'm glad I could help. Feel free to reach out anytime you need assistance with your job search or have questions about working abroad. Have a great day! 🌟" });
    }
    else {
        res.json({ reply: "💬 Thank you for your message! I'm here to help with:\n\n• Finding job opportunities\n• Application process guidance\n• Office locations and contact info\n• Company services\n• Qualification requirements\n\nCould you please rephrase your question or choose from the topics above? You can also contact our support team directly at deshakthi@gmail.com for urgent inquiries." });
    }
});

// ============================================
// 6. JOB MANAGEMENT ROUTES
// ============================================
app.get('/api/admin/jobs', async (req, res) => {
    try {
        const jobs = await Job.find().sort({ postedDate: -1 });
        res.json(jobs);
    } catch (err) { 
        res.status(500).json({ error: "Failed to fetch jobs" }); 
    }
});

app.post('/api/admin/jobs', upload.single('jobImage'), async (req, res) => {
    try {
        const jobData = {
            jobTitle: req.body.jobTitle,
            location: req.body.location,
            salary: req.body.salary,
            category: req.body.category,
            description: req.body.description,
            isUrgent: req.body.isUrgent === 'true',
            imageUrl: req.file ? `http://localhost:3000/public/uploads/${req.file.filename}` : null,
            postedDate: new Date()
        };
        const newJob = new Job(jobData);
        await newJob.save();
        res.status(201).json({ message: "Job Posted Successfully", job: newJob });
    } catch (err) { 
        res.status(400).json({ error: err.message }); 
    }
});

app.put('/api/admin/jobs/:id', async (req, res) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedJob) return res.status(404).json({ error: "Job not found" });
        res.json({ message: "Update Success", job: updatedJob });
    } catch (err) { 
        res.status(400).json({ error: "Failed to update job" }); 
    }
});

app.delete('/api/admin/jobs/:id', async (req, res) => {
    try {
        await Job.findByIdAndDelete(req.params.id);
        res.json({ message: "Job Deleted Successfully" });
    } catch (err) { 
        res.status(404).json({ error: "Job not found" }); 
    }
});

// ============================================
// 7. USER MANAGEMENT
// ============================================
app.get('/api/admin/users', async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (err) { 
        res.status(500).json({ error: err.message }); 
    }
});

app.delete('/api/admin/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User removed" });
    } catch (err) { 
        res.status(500).json({ error: err.message }); 
    }
});

// ============================================
// 8. INQUIRY ROUTES
// ============================================
app.post('/api/contact', async (req, res) => {
    try {
        const newInquiry = new Inquiry({
            ...req.body,
            status: 'Pending',
            date: new Date()
        });
        await newInquiry.save();
        res.status(201).json({ message: "Inquiry sent successfully" });
    } catch (err) { 
        res.status(400).json({ error: "Failed to send message" }); 
    }
});

app.get('/api/admin/inquiries', async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ date: -1 });
        res.json(inquiries);
    } catch (err) { 
        res.status(500).json({ error: "Failed to fetch inquiries" }); 
    }
});

app.delete('/api/admin/inquiries/:id', async (req, res) => {
    try {
        await Inquiry.findByIdAndDelete(req.params.id);
        res.json({ message: "Inquiry removed" });
    } catch (err) { 
        res.status(500).json({ error: "Delete failed" }); 
    }
});

app.patch('/api/admin/inquiries/:id/status', async (req, res) => {
    try {
        const updated = await Inquiry.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.json(updated);
    } catch (err) { 
        res.status(400).json({ error: "Update failed" }); 
    }
});

// ============================================
// 9. EMPLOYER ROUTES
// ============================================
app.post('/api/employers', async (req, res) => {
    try {
        const newEmployer = new Employer({
            ...req.body,
            status: 'Pending',
            date: new Date()
        });
        await newEmployer.save();
        res.status(201).json({ message: "Inquiry saved successfully" });
    } catch (err) { 
        res.status(400).json({ error: err.message }); 
    }
});

app.get('/api/admin/employers', async (req, res) => {
    try {
        const employers = await Employer.find().sort({ date: -1 });
        res.json(employers);
    } catch (err) { 
        res.status(500).json({ error: "Failed to fetch employers" }); 
    }
});

app.delete('/api/admin/employers/:id', async (req, res) => {
    try {
        await Employer.findByIdAndDelete(req.params.id);
        res.json({ message: "Employer removed" });
    } catch (err) { 
        res.status(500).json({ error: "Delete failed" }); 
    }
});

app.patch('/api/admin/employers/:id/status', async (req, res) => {
    try {
        const updated = await Employer.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.json(updated);
    } catch (err) { 
        res.status(400).json({ error: "Update failed" }); 
    }
});

// ============================================
// 10. ASSESSMENT ROUTES
// ============================================
app.post('/api/assessments', async (req, res) => {
    try {
        const newEval = new Assessment({
            ...req.body,
            status: 'Pending',
            date: new Date()
        });
        await newEval.save();
        res.status(201).json({ message: "Assessment saved" });
    } catch (err) { 
        res.status(400).json({ error: err.message }); 
    }
});

app.get('/api/admin/assessments', async (req, res) => {
    try {
        const assessments = await Assessment.find().sort({ date: -1 });
        res.json(assessments);
    } catch (err) { 
        res.status(500).json({ error: "Failed to fetch assessments" }); 
    }
});

app.patch('/api/admin/assessments/:id/status', async (req, res) => {
    try {
        const updated = await Assessment.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.json(updated);
    } catch (err) { 
        res.status(400).json({ error: "Update failed" }); 
    }
});

app.delete('/api/admin/assessments/:id', async (req, res) => {
    try {
        await Assessment.findByIdAndDelete(req.params.id);
        res.json({ message: "Assessment deleted" });
    } catch (err) { 
        res.status(500).json({ error: "Delete failed" }); 
    }
});

// ============================================
// 11. AUTH ROUTES & OTP SYSTEM
// ============================================

// Register
app.post('/api/auth/register', async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            fullName: req.body.fullName,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPassword, // Store the hashed version
            createdAt: new Date()
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) { 
        res.status(400).json({ error: "Registration failed" }); 
    }
});

// Login
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // 1. Find user by email only
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // 2. Compare provided password with stored hash
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            res.json({ 
                message: "Login successful", 
                user: {
                    _id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    phone: user.phone,
                    createdAt: user.createdAt
                } 
            });
        } else {
            res.status(401).json({ error: "Invalid credentials" });
        }
    } catch (err) { 
        res.status(500).json({ error: "Server error" }); 
    }
});

// Check if user exists (For Forgot Password)
app.post('/api/auth/check-user', async (req, res) => {
    try {
        const { email } = req.body;
        // Uses the User model directly
        const user = await User.findOne({ email });
        res.json({ exists: !!user });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Send OTP via email
app.post('/api/otp/send-reset-otp', async (req, res) => {
    try {
        const { email } = req.body;
        
        // Generate 6-digit OTP
        const otp = otpGenerator.generate(6, { 
            digits: true, 
            upperCaseAlphabets: false, 
            lowerCaseAlphabets: false, 
            specialChars: false 
        });
        
        // Store OTP with expiration (10 minutes)
        otpStore.set(email, {
            otp: otp,
            expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes
        });
        
        // Email content
        const mailOptions = {
            from: '"Deshakthi Lanka" <deshakthilanka.sl@gmail.com>',
            to: email,
            subject: 'Password Reset OTP - Deshakthi Lanka',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2edde; border-radius: 12px;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h1 style="color: #1e4620;">Deshakthi Lanka</h1>
                        <p style="color: #5a6e5a;">Password Reset Request</p>
                    </div>
                    <div style="background: #f8faf5; padding: 20px; border-radius: 12px; text-align: center;">
                        <p style="color: #333;">Your OTP for password reset is:</p>
                        <h2 style="color: #2e6f40; font-size: 32px; letter-spacing: 5px; margin: 15px 0;">${otp}</h2>
                        <p style="color: #666; font-size: 14px;">This OTP is valid for 10 minutes.</p>
                        <p style="color: #666; font-size: 14px;">If you didn't request this, please ignore this email.</p>
                    </div>
                    <div style="text-align: center; margin-top: 20px; padding-top: 15px; border-top: 1px solid #e2edde;">
                        <p style="color: #999; font-size: 12px;">&copy; ${new Date().getFullYear()} Deshakthi Lanka. All rights reserved.</p>
                    </div>
                </div>
            `
        };
        
        await transporter.sendMail(mailOptions);
        console.log(`OTP sent to ${email}: ${otp}`);
        
        res.json({ success: true, message: 'OTP sent successfully', otp: otp }); // Note: you may want to remove 'otp: otp' from the response in production for security
    } catch (error) {
        console.error('Send OTP error:', error);
        res.status(500).json({ error: 'Failed to send OTP email. Check email configuration.' });
    }
});

// Verify OTP
app.post('/api/otp/verify-reset-otp', async (req, res) => {
    try {
        const { email, otp } = req.body;
        
        const storedData = otpStore.get(email);
        
        if (!storedData) {
            return res.status(400).json({ error: 'No OTP request found. Please request a new OTP.' });
        }
        
        if (Date.now() > storedData.expiresAt) {
            otpStore.delete(email);
            return res.status(400).json({ error: 'OTP has expired. Please request a new one.' });
        }
        
        if (storedData.otp !== otp) {
            return res.status(400).json({ error: 'Invalid OTP. Please try again.' });
        }
        
        // OTP verified - store verification status
        otpStore.set(email, { ...storedData, verified: true });
        
        res.json({ success: true, message: 'OTP verified successfully' });
    } catch (error) {
        console.error('Verify OTP error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Reset password
app.post('/api/auth/reset-password', async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        
        const storedData = otpStore.get(email);
        if (!storedData || !storedData.verified) {
            return res.status(400).json({ error: 'OTP not verified.' });
        }
        
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        // Use User model for update
        const result = await User.updateOne(
            { email: email },
            { $set: { password: hashedPassword, updatedAt: new Date() } }
        );
        
        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        otpStore.delete(email);
        res.json({ success: true, message: 'Password reset successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Send welcome email on registration
app.post('/api/auth/send-welcome-email', async (req, res) => {
    try {
        const { email, fullName } = req.body;
        
        const mailOptions = {
            from: '"Deshakthi Lanka" <deshakthilanka.sl@gmail.com>',
            to: email,
            subject: 'Welcome to Deshakthi Lanka!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2edde; border-radius: 12px;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h1 style="color: #1e4620;">Welcome to Deshakthi Lanka!</h1>
                    </div>
                    <div style="background: #f8faf5; padding: 20px; border-radius: 12px;">
                        <p style="color: #333; font-size: 16px;">Dear ${fullName},</p>
                        <p style="color: #333;">Thank you for registering with Deshakthi Lanka!</p>
                        <p style="color: #333;">You are now part of our community. Start exploring global career opportunities today.</p>
                        <div style="text-align: center; margin: 25px 0;">
                            <a href="http://localhost/PPA%20Project/public/FindJobs.html" style="background: #2e6f40; color: white; padding: 10px 25px; text-decoration: none; border-radius: 40px; display: inline-block;">Browse Jobs →</a>
                        </div>
                        <p style="color: #666; font-size: 14px;">If you have any questions, feel free to contact our support team.</p>
                    </div>
                    <div style="text-align: center; margin-top: 20px; padding-top: 15px; border-top: 1px solid #e2edde;">
                        <p style="color: #999; font-size: 12px;">&copy; ${new Date().getFullYear()} Deshakthi Lanka. All rights reserved.</p>
                    </div>
                </div>
            `
        };
        
        await transporter.sendMail(mailOptions);
        console.log(`Welcome email sent to ${email}`);
        
        res.json({ success: true, message: 'Welcome email sent' });
    } catch (error) {
        console.error('Send welcome email error:', error);
        // Don't fail the registration if email fails
        res.json({ success: false, message: 'Email not sent but account created' });
    }
});


// ============================================
// START SERVER (MUST ALWAYS BE AT THE BOTTOM)
// ============================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("=========================================");
    console.log(`🚀 Deshakthi Backend running on port ${PORT}`);
    console.log(`📡 API URL: http://localhost:${PORT}`);
    console.log(`💾 Database: MongoDB Atlas`);
    console.log("=========================================");
});