// Production-Ready Email & Phone Validation Utilities
// ATS-Compliant, RFC 5322 Standard

/**
 * Email Validation - Production Grade
 * Handles: Format, Length, ATS compatibility, Common mistakes
 */
export const validateEmail = (email) => {
    if (!email || typeof email !== 'string') {
        return { valid: false, error: 'Email is required' };
    }

    const trimmed = email.trim();

    // Length checks (RFC 5322)
    if (trimmed.length > 254) {
        return { valid: false, error: 'Email too long (max 254 characters)' };
    }

    // RFC 5322 compliant regex
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!emailRegex.test(trimmed)) {
        return { valid: false, error: 'Invalid email format' };
    }

    // Split local and domain parts
    const [local, domain] = trimmed.split('@');

    // Local part (before @) validation
    if (local.length > 64) {
        return { valid: false, error: 'Email username too long (max 64 characters)' };
    }

    // ATS-unsafe patterns check
    // Some ATS systems fail on certain special characters
    if (local.includes('..')) {
        return { valid: false, error: 'Email cannot have consecutive dots' };
    }

    if (local.startsWith('.') || local.endsWith('.')) {
        return { valid: false, error: 'Email cannot start or end with a dot' };
    }

    // Domain validation
    if (!domain || domain.length < 3) {
        return { valid: false, error: 'Invalid email domain' };
    }

    if (!domain.includes('.')) {
        return { valid: false, error: 'Email domain must have a TLD (e.g., .com)' };
    }

    // Common typos detection
    const commonDomainTypos = {
        'gmial.com': 'gmail.com',
        'gmai.com': 'gmail.com',
        'yahooo.com': 'yahoo.com',
        'outlok.com': 'outlook.com',
        'hotmial.com': 'hotmail.com'
    };

    const suggestion = commonDomainTypos[domain.toLowerCase()];
    if (suggestion) {
        return {
            valid: true,
            warning: `Did you mean ${local}@${suggestion}?`,
            normalized: trimmed.toLowerCase(),
            suggested: `${local}@${suggestion}`
        };
    }

    // All checks passed
    return {
        valid: true,
        normalized: trimmed.toLowerCase(), // Normalize to lowercase
        atsFormatted: trimmed.toLowerCase() // Same for ATS
    };
};

/**
 * Phone Validation - International & ATS Compatible
 * Supports: +1 234 567 8900, 234 567 8900, (234) 567-8900
 * Normalizes to: ATS-safe format
 */
export const validatePhone = (phone) => {
    if (!phone || typeof phone !== 'string') {
        return { valid: false, error: 'Phone number is required' };
    }

    const trimmed = phone.trim();

    // Remove all non-digit chars except +
    const cleaned = trimmed.replace(/[^\d+]/g, '');

    // Length validation
    if (cleaned.length < 10) {
        return { valid: false, error: 'Phone number too short (minimum 10 digits)' };
    }

    if (cleaned.length > 15) {
        return { valid: false, error: 'Phone number too long (maximum 15 digits)' };
    }

    // Check for extensions (ATS systems often fail on these)
    if (trimmed.match(/ext|x\d+/i)) {
        return {
            valid: false,
            error: 'Remove extension (use main number only for better ATS compatibility)'
        };
    }

    // Format for display and ATS
    let formatted;
    if (cleaned.startsWith('+')) {
        // International format: +1 234 567 8900
        const countryCode = cleaned.substring(0, cleaned.length - 10);
        const number = cleaned.substring(cleaned.length - 10);
        formatted = `${countryCode} ${number.substring(0, 3)} ${number.substring(3, 6)} ${number.substring(6)}`;
    } else {
        // Domestic format: 234 567 8900
        if (cleaned.length === 10) {
            formatted = `${cleaned.substring(0, 3)} ${cleaned.substring(3, 6)} ${cleaned.substring(6)}`;
        } else if (cleaned.length === 11) {
            // Handle 1-234-567-8900
            formatted = `+1 ${cleaned.substring(1, 4)} ${cleaned.substring(4, 7)} ${cleaned.substring(7)}`;
        } else {
            formatted = cleaned;
        }
    }

    return {
        valid: true,
        normalized: cleaned, // Digits only (for backend storage)
        display: formatted, // Human-readable format
        atsFormatted: formatted // ATS-safe format (spaces, no special chars)
    };
};

/**
 * Date Range Validation
 * Ensures: start < end, no future dates, reasonable duration
 */
export const validateDateRange = (startDate, endDate, isCurrent = false) => {
    const parseDate = (dateStr) => {
        if (!dateStr) return null;

        // Support multiple formats
        const patterns = [
            { regex: /^(\d{2})\/(\d{4})$/, handler: (m) => new Date(m[2], m[1] - 1) }, // MM/YYYY
            { regex: /^(\d{4})$/, handler: (m) => new Date(m[1], 0) }, // YYYY
            {
                regex: /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{4})$/i,
                handler: (m) => {
                    const months = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
                    return new Date(m[2], months[m[1].toLowerCase()]);
                }
            }
        ];

        for (const pattern of patterns) {
            const match = dateStr.match(pattern.regex);
            if (match) return pattern.handler(match);
        }

        return null;
    };

    const start = parseDate(startDate);
    const end = isCurrent ? new Date() : parseDate(endDate);
    const now = new Date();

    // Validation checks
    if (!start) {
        return { valid: false, error: 'Invalid start date format. Use MM/YYYY or YYYY' };
    }

    if (!isCurrent && !end) {
        return { valid: false, error: 'Invalid end date format. Use MM/YYYY or YYYY' };
    }

    if (start > now) {
        return { valid: false, error: 'Start date cannot be in the future' };
    }

    if (!isCurrent && end > now) {
        return { valid: false, error: 'End date cannot be in the future' };
    }

    if (end < start) {
        return { valid: false, error: 'End date must be after start date' };
    }

    // Calculate duration
    const durationYears = (end - start) / (1000 * 60 * 60 * 24 * 365.25);

    if (durationYears > 50) {
        return {
            valid: false,
            error: 'Duration exceeds 50 years. Please verify your dates.'
        };
    }

    if (durationYears < 0.08) {
        // Less than 1 month
        return {
            valid: true,
            warning: 'Duration less than 1 month. Consider combining short roles or describe as project work.',
            duration: durationYears
        };
    }

    return {
        valid: true,
        duration: Math.round(durationYears * 10) / 10,
        durationDisplay: formatDuration(durationYears)
    };
};

const formatDuration = (years) => {
    if (years < 1) {
        const months = Math.round(years * 12);
        return `${months} month${months !== 1 ? 's' : ''}`;
    } else {
        const wholeYears = Math.floor(years);
        const months = Math.round((years - wholeYears) * 12);
        if (months === 0) {
            return `${wholeYears} year${wholeYears !== 1 ? 's' : ''}`;
        }
        return `${wholeYears} year${wholeYears !== 1 ? 's' : ''}, ${months} month${months !== 1 ? 's' : ''}`;
    }
};

/**
 * Character Limits for ATS Compatibility
 * Based on common ATS system constraints
 */
export const CHARACTER_LIMITS = {
    fullName: 50,
    jobTitle: 60,
    location: 100,
    email: 254,
    phone: 20,
    summary: 600, // ~100 words
    experienceRole: 80,
    experienceCompany: 80,
    experienceDescription: 800, // ~4-6 bullet points
    educationDegree: 100,
    educationInstitution: 100,
    skillCategory: 30,
    skillItem: 30,
    projectTitle: 80,
    projectDescription: 400
};

/**
 * Quality Score Calculator
 * Evaluates resume sections for completeness and best practices
 */
export const calculateSectionQuality = (section, data) => {
    switch (section) {
        case 'personalDetails':
            return scorePersonalDetails(data);
        case 'summary':
            return scoreSummary(data);
        case 'experience':
            return scoreExperience(data);
        case 'education':
            return scoreEducation(data);
        case 'skills':
            return scoreSkills(data);
        default:
            return { score: 0, feedback: [] };
    }
};

const scorePersonalDetails = (data) => {
    let score = 0;
    const feedback = [];

    if (data.fullName) score += 20;
    else feedback.push('Add your full name');

    if (data.jobTitle) score += 15;
    else feedback.push('Add your job title');

    const emailValidation = validateEmail(data.email);
    if (emailValidation.valid) score += 25;
    else feedback.push(emailValidation.error || 'Add valid email');

    const phoneValidation = validatePhone(data.phone);
    if (phoneValidation.valid) score += 20;
    else feedback.push(phoneValidation.error || 'Add valid phone');

    if (data.location) score += 10;
    else feedback.push('Add your location');

    if (data.linkedin || data.github || data.website) score += 10;
    else feedback.push('Consider adding LinkedIn or portfolio link');

    return { score, feedback, maxScore: 100 };
};

const scoreSummary = (data) => {
    let score = 0;
    const feedback = [];

    if (!data.content) {
        feedback.push('Write a professional summary');
        return { score: 0, feedback, maxScore: 100 };
    }

    score += 40; // Has content

    const wordCount = data.content.split(/\s+/).filter(Boolean).length;

    if (wordCount >= 30 && wordCount <= 80) {
        score += 30;
    } else if (wordCount < 30) {
        feedback.push(`Summary too short (${wordCount} words, aim for 30-80)`);
        score += 15;
    } else {
        feedback.push(`Summary too long (${wordCount} words, aim for 30-80)`);
        score += 15;
    }

    // Check for numbers/metrics
    if (data.content.match(/\d+/)) {
        score += 15;
    } else {
        feedback.push('Consider adding years of experience or key metrics');
    }

    // Check for keywords: skills, experience, achievements
    const hasSkills = /skill|expertise|proficient|experience/i.test(data.content);
    if (hasSkills) score += 15;
    else feedback.push('Mention your key skills or expertise');

    return { score, feedback, maxScore: 100 };
};

const scoreExperience = (entry) => {
    let score = 0;
    const feedback = [];

    if (entry.role) score += 15;
    else feedback.push('Add job title');

    if (entry.company) score += 15;
    else feedback.push('Add company name');

    if (entry.startDate && entry.endDate) score += 10;
    else feedback.push('Add complete dates');

    if (!entry.description) {
        feedback.push('Add job description with bullet points');
        return { score, feedback, maxScore: 100 };
    }

    score += 20; // Has description

    const bullets = entry.description.split('\n').filter((l) => l.trim());

    if (bullets.length >= 2 && bullets.length <= 5) {
        score += 20;
    } else if (bullets.length < 2) {
        feedback.push('Add at least 2-3 bullet points');
        score += 10;
    } else {
        feedback.push('Too many bullets (max 5 for readability)');
        score += 10;
    }

    // Check for metrics/numbers
    const hasMetrics = bullets.some((b) => /\d+%|\d+\s(users|customers|clients)|\$\d+/i.test(b));
    if (hasMetrics) {
        score += 20;
    } else {
        feedback.push('Add metrics or numbers to show impact');
    }

    return { score, feedback, maxScore: 100 };
};

const scoreEducation = (entry) => {
    let score = 0;
    const feedback = [];

    if (entry.institution) score += 40;
    else feedback.push('Add institution name');

    if (entry.degree) score += 40;
    else feedback.push('Add degree/qualification');

    if (entry.startDate && entry.endDate) score += 20;
    else feedback.push('Add dates');

    return { score, feedback, maxScore: 100 };
};

const scoreSkills = (data) => {
    let score = 0;
    const feedback = [];

    if (!data || data.length === 0) {
        feedback.push('Add your technical and professional skills');
        return { score: 0, feedback, maxScore: 100 };
    }

    if (data.length >= 3) score += 50;
    else feedback.push('Add at least 3 skill categories');

    const totalSkills = data.reduce((sum, cat) => sum + (cat.items?.length || 0), 0);
    if (totalSkills >= 8) score += 50;
    else feedback.push('Add more skills (aim for 8-12 total)');

    return { score, feedback, maxScore: 100 };
};
