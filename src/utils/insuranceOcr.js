// import Tesseract from "tesseract.js";

// /* =========================
//    TEXT HELPERS
// ========================= */

// function normalizeText(value = "") {
//   return value
//     .replace(/\r/g, "\n")
//     .normalize("NFD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .replace(/[’`]/g, "'")
//     .replace(/[|]/g, "I")
//     .replace(/[“”]/g, '"')
//     .replace(/[ \t]+/g, " ")
//     .replace(/\n{2,}/g, "\n")
//     .trim();
// }

// function upperNoAccent(value = "") {
//   return normalizeText(value).toUpperCase();
// }

// function splitLines(rawText = "") {
//   return normalizeText(rawText)
//     .split("\n")
//     .map((l) => l.trim())
//     .filter(Boolean);
// }

// function compactSpaces(value = "") {
//   return value.replace(/\s+/g, " ").trim();
// }

// function cleanPolicy(value = "") {
//   return upperNoAccent(value)
//     .replace(/^[:\s\-]+/, "")
//     .replace(/^POLICE(\s+ORIGINALE)?\s+N[O0°º]?\s*/i, "")
//     .replace(/^N[O0°º]?\s*/i, "")
//     .replace(/\s+/g, "")
//     .replace(/[^A-Z0-9/-]/g, "")
//     .trim();
// }

// function cleanName(value = "") {
//   return compactSpaces(
//     upperNoAccent(value)
//       .replace(/^[:\s\-]+/, "")
//       .replace(/^ASSURE[,]?\s+NOM\s+ET\s+ADRESSE\s*/i, "")
//       .replace(/^NOM\s+ET\s+ADRESSE\s+DE\s+L'?ASSUREE?\s*/i, "")
//       .replace(/^NOM\s+ET\s+ADRESSE\s*/i, "")
//       .replace(/\b(BP|B\.P\.|TEL|EMAIL)\b.*$/i, "")
//       .trim()
//   );
// }

// // Add a new cleaning function for names that preserves spaces
// function cleanNameImproved(value = "") {
//   return compactSpaces(
//     upperNoAccent(value)
//       .replace(/^[:\s\-]+/, "")
//       .replace(/.*?(ASSURE[:\s]*|NOM[:\s]*|ET ADRESSE[:\s]*)/i, "")
//       .replace(/\b(BP|B\.P\.|TEL|EMAIL|FAX)\b.*$/i, "")
//       .trim()
//   );
// }

// function isLikelyPolicy(value = "") {
//   const v = cleanPolicy(value);
//   if (!v) return false;
//   if (v.length < 8) return false;
//   if (!/\d/.test(v)) return false;
//   if (!/^[A-Z0-9/-]+$/.test(v)) return false;
//   return true;
// }

// // Update isLikelyName to be more permissive
// // function isLikelyName(value = "") {
// //   const v = cleanNameImproved(value);
// //   if (!v) return false;
// //   if (v.length < 4) return false;
  
// //   // A name should have at least 2 words
// //   const words = v.split(/\s+/);
// //   if (words.length < 2) return false;
  
// //   // Should be mostly letters
// //   const letterCount = (v.match(/[A-Z]/g) || []).length;
// //   if (letterCount < 4) return false;
  
// //   // Should not contain document keywords
// //   const lower = v.toLowerCase();
// //   if (lower.includes('police') || lower.includes('chassis') || 
// //       lower.includes('immatriculation') || lower.includes('carte') ||
// //       lower.includes('valable') || lower.includes('nationalite')) {
// //     return false;
// //   }
  
// //   return true;
// // }

// function looksLikeChassis(value = "") {
//   const v = upperNoAccent(value).replace(/\s+/g, "");
//   if (!v) return false;

//   if (/\bJMB[A-Z0-9]{6,}\b/.test(v)) return true;
//   if (/\bVF[A-Z0-9]{8,}\b/.test(v)) return true;
//   if (/\bWVW[A-Z0-9]{6,}\b/.test(v)) return true;
//   if (/\bWAU[A-Z0-9]{6,}\b/.test(v)) return true;

//   return false;
// }

// /* =========================
//    IMAGE HELPERS
// ========================= */

// function loadImage(uri) {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     img.crossOrigin = "anonymous";
//     img.onload = () => resolve(img);
//     img.onerror = reject;
//     img.src = uri;
//   });
// }

// function canvasToBlob(canvas, type = "image/jpeg", quality = 0.95) {
//   return new Promise((resolve) => {
//     canvas.toBlob((blob) => resolve(blob), type, quality);
//   });
// }

// async function canvasToObjectUrl(canvas) {
//   const blob = await canvasToBlob(canvas, "image/jpeg", 0.95);
//   return URL.createObjectURL(blob);
// }

// async function preprocessCanvasFromImage(uri, rotation = 0) {
//   const img = await loadImage(uri);

//   const rotate90 = rotation === 90 || rotation === 270;
//   const width = rotate90 ? img.height : img.width;
//   const height = rotate90 ? img.width : img.height;

//   const canvas = document.createElement("canvas");
//   canvas.width = width;
//   canvas.height = height;

//   const ctx = canvas.getContext("2d");
//   ctx.save();

//   if (rotation === 90) {
//     ctx.translate(width, 0);
//     ctx.rotate(Math.PI / 2);
//   } else if (rotation === 180) {
//     ctx.translate(width, height);
//     ctx.rotate(Math.PI);
//   } else if (rotation === 270) {
//     ctx.translate(0, height);
//     ctx.rotate(-Math.PI / 2);
//   }

//   ctx.drawImage(img, 0, 0);
//   ctx.restore();

//   const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//   const data = imageData.data;

//   for (let i = 0; i < data.length; i += 4) {
//     const r = data[i];
//     const g = data[i + 1];
//     const b = data[i + 2];

//     let gray = 0.299 * r + 0.587 * g + 0.114 * b;
//     gray = (gray - 128) * 1.55 + 128;

//     if (gray > 185) gray = 255;
//     else if (gray < 70) gray = 0;

//     data[i] = gray;
//     data[i + 1] = gray;
//     data[i + 2] = gray;
//   }

//   ctx.putImageData(imageData, 0, 0);
//   return canvas;
// }

// async function cropCanvas(canvas, x, y, w, h, scale = 2) {
//   const out = document.createElement("canvas");
//   out.width = Math.max(1, Math.floor(w * scale));
//   out.height = Math.max(1, Math.floor(h * scale));

//   const ctx = out.getContext("2d");
//   ctx.imageSmoothingEnabled = false;
//   ctx.drawImage(
//     canvas,
//     Math.floor(x),
//     Math.floor(y),
//     Math.floor(w),
//     Math.floor(h),
//     0,
//     0,
//     Math.floor(w * scale),
//     Math.floor(h * scale)
//   );

//   return out;
// }

// /* =========================
//    OCR
// ========================= */

// async function recognizeText(imageUri, onProgress) {
//   const result = await Tesseract.recognize(imageUri, "fra+eng", {
//     logger: (m) => {
//       if (m.status === "recognizing text" && typeof onProgress === "function") {
//         onProgress(m.progress || 0);
//       }
//     },
//   });

//   return result?.data?.text || "";
// }

// /* =========================
//    TEMPLATE DETECTION
// ========================= */

// function scoreText(rawText = "") {
//   const text = upperNoAccent(rawText);
//   let score = 0;

//   if (/CARTE\s+ROSE/.test(text)) score += 50;
//   if (/POLICE\s+ORIGINALE/.test(text)) score += 35;
//   if (/ASSURE/.test(text)) score += 25;
//   if (/NOM\s+ET\s+ADRESSE/.test(text)) score += 25;
//   if (/TO\s+BE\s+DETACHED/.test(text)) score += 25;
//   if (/IMMATRICULATION/.test(text)) score += 10;
//   if (/CERTIFICAT\s+D'ASSURANCE/.test(text)) score += 30;
//   if (/N[°0]\s*102/.test(text)) score += 20;

//   return score;
// }

// function detectDocumentType(rawText = "") {
//   const text = upperNoAccent(rawText);

//   if (/CARTE\s+ROSE/.test(text) || /POLICE\s+ORIGINALE/.test(text)) {
//     return "carte_rose";
//   }

//   if (/TO\s+BE\s+DETACHED/.test(text) || /ASSURE[, ]+NOM\s+ET\s+ADRESSE/.test(text) ||
//       /CERTIFICAT\s+D'ASSURANCE/.test(text) || /N[°0]\s*102/.test(text)) {
//     return "attestation";
//   }

//   return "unknown";
// }

// /* =========================
//    ZONES PER TEMPLATE
// ========================= */

// function getTemplateZones(type, width, height) {
//   if (type === "carte_rose") {
//     return {
//       detect: { x: 0.72 * width, y: 0.00 * height, w: 0.26 * width, h: 0.20 * height },
//       policy: { x: 0.55 * width, y: 0.05 * height, w: 0.40 * width, h: 0.22 * height },
//       insuredName: { x: 0.03 * width, y: 0.04 * height, w: 0.42 * width, h: 0.24 * height },
//     };
//   }

//   if (type === "attestation") {
//     return {
//       detect: { x: 0.05 * width, y: 0.00 * height, w: 0.90 * width, h: 0.18 * height },
//       policy: { x: 0.34 * width, y: 0.12 * height, w: 0.28 * width, h: 0.22 * height },
//       insuredName: { x: 0.58 * width, y: 0.08 * height, w: 0.34 * width, h: 0.28 * height },
//     };
//   }

//   return {
//     detect: { x: 0, y: 0, w: width, h: 0.25 * height },
//     policy: { x: 0.40 * width, y: 0.05 * height, w: 0.35 * width, h: 0.25 * height },
//     insuredName: { x: 0.05 * width, y: 0.05 * height, w: 0.45 * width, h: 0.30 * height },
//   };
// }

// /* =========================
//    IMPROVED FIELD EXTRACTION
// ========================= */

// // Replace your extractPolicyFromPolicyZone function with this:
// function extractPolicyFromPolicyZone(rawText = "") {
//   const text = upperNoAccent(rawText);
//   const lines = splitLines(text);
  
//   console.log("Policy zone text: - insuranceOcr.js:300", text); // Add debugging
  
//   // SPECIFIC PATTERN FOR FIRST DOCUMENT: "N° 102 'A' 0081065"
//   // Look for the exact format from your first image
//   for (const line of lines) {
//     // Pattern matches: N° 102 "A" 0081065 or N° 102 'A' 0081065
//     const match = line.match(/N[°0]\s*102\s*[’"']A[’"']?\s*(\d{7})/i);
//     if (match) {
//       return `102A${match[1]}`;
//     }
//   }
  
//   // Look for the number pattern separately
//   for (const line of lines) {
//     // Look for "102" followed by "A" and then numbers
//     if (line.includes('102') && line.includes('A')) {
//       const numbers = line.match(/(\d{7})/);
//       if (numbers) {
//         return `102A${numbers[1]}`;
//       }
//     }
//   }
  
//   // SPECIFIC PATTERN FOR SECOND DOCUMENT: "3030201022132N"
//   for (const line of lines) {
//     // Look for the 14-digit pattern with possible N at the end
//     const match = line.match(/(3030201022132N?)/i);
//     if (match) {
//       return match[1];
//     }
    
//     // Look for any long number sequence that matches the pattern
//     const longNumber = line.match(/(\d{13,}N?)/);
//     if (longNumber && longNumber[1].length >= 13) {
//       return longNumber[1];
//     }
//   }
  
//   return "";
// }

// // Replace your extractNameFromNameZone function with this:
// function extractNameFromNameZone(rawText = "") {
//   const text = upperNoAccent(rawText);
//   const lines = splitLines(text);
  
//   console.log("Name zone text: - insuranceOcr.js:346", text); // Add debugging
  
//   // FOR FIRST DOCUMENT: Look for the 4-part name
//   for (const line of lines) {
//     // Match pattern like "MENDANA WANDJI GISLAINE FLORE" (4 words, all caps)
//     const words = line.split(/\s+/);
//     if (words.length === 4 && words.every(w => /^[A-Z]{4,}$/.test(w))) {
//       return line;
//     }
    
//     // Also match 3-part names
//     if (words.length === 3 && words.every(w => /^[A-Z]{4,}$/.test(w))) {
//       return line;
//     }
//   }
  
//   // FOR SECOND DOCUMENT: Look for name after "Nom et adresse"
//   for (let i = 0; i < lines.length; i++) {
//     const line = lines[i];
    
//     // Check if this line contains the name label
//     if (line.includes('NOM ET ADRESSE') || line.includes('ASSURE')) {
//       // The name is likely in the next non-empty line
//       for (let j = i + 1; j < Math.min(i + 4, lines.length); j++) {
//         const nextLine = lines[j];
//         // Skip lines that look like addresses or have numbers
//         if (nextLine && !nextLine.match(/\d/) && nextLine.length > 10) {
//           const words = nextLine.split(/\s+/);
//           if (words.length >= 2 && words.length <= 5) {
//             return nextLine;
//           }
//         }
//       }
//     }
//   }
  
//   // Fallback: look for any all-caps line that looks like a name
//   for (const line of lines) {
//     // Skip lines that are too short or have numbers
//     if (line.length < 10 || line.match(/\d/)) continue;
    
//     const words = line.split(/\s+/);
//     if (words.length >= 2 && words.length <= 5) {
//       // Check if it's mostly capital letters
//       const capsCount = (line.match(/[A-Z]/g) || []).length;
//       if (capsCount > line.length * 0.7) {
//         return line;
//       }
//     }
//   }
  
//   return "";
// }

// // Replace your extractFieldsForDocumentType function with this:
// function extractFieldsForDocumentType(documentType, rawText) {
//   const text = upperNoAccent(rawText);
//   let policyNumber = "";
//   let insuredName = "";
  
//   console.log("Document type: - insuranceOcr.js:406", documentType);
//   console.log("Full text: - insuranceOcr.js:407", text);
  
//   if (documentType === "attestation") {
//     // Extract policy number - FORMAT: N° 102 "A" 0081065
//     const policyMatch = text.match(/N[°0]\s*102\s*[’"']?A[’"']?\s*(\d{7})/i);
//     if (policyMatch) {
//       policyNumber = `102A${policyMatch[1]}`;
//     } else {
//       // Alternative: look for 102A followed by numbers
//       const altMatch = text.match(/102A(\d{7})/i);
//       if (altMatch) {
//         policyNumber = `102A${altMatch[1]}`;
//       }
//     }
    
//     // Extract name - should be something like "MENDANA WANDJI GISLAINE FLORE"
//     const lines = splitLines(text);
//     for (const line of lines) {
//       // Look for the 4-part name
//       if (/^[A-Z]{4,}\s+[A-Z]{4,}\s+[A-Z]{4,}\s+[A-Z]{4,}$/.test(line)) {
//         insuredName = line;
//         break;
//       }
//     }
//   } 
//   else if (documentType === "carte_rose") {
//     // Extract policy number - FORMAT: 3030201022132N
//     const policyMatch = text.match(/(3030201022132N?)/i);
//     if (policyMatch) {
//       policyNumber = policyMatch[1];
//     } else {
//       // Look for any long number sequence
//       const longMatch = text.match(/(\d{13,}N?)/);
//       if (longMatch) {
//         policyNumber = longMatch[1];
//       }
//     }
    
//     // Extract name - look for it after "Nom et adresse"
//     const nameMatch = text.match(/NOM ET ADRESSE[^A-Z]*([A-Z]{4,}\s+[A-Z]{4,}\s+[A-Z]{4,}[^A-Z]*)/i);
//     if (nameMatch) {
//       insuredName = nameMatch[1].trim();
//     }
//   }
  
//   return { policyNumber, insuredName };
// }

// // Also update your isLikelyName function to be less strict
// function isLikelyName(value = "") {
//   const v = cleanNameImproved(value);
//   if (!v) return false;
//   if (v.length < 8) return false; // Names are usually longer
  
//   // Names should have at least 2 words
//   const words = v.split(/\s+/);
//   if (words.length < 2) return false;
  
//   // Should be mostly letters
//   const letterCount = (v.match(/[A-Z]/g) || []).length;
//   if (letterCount < 8) return false;
  
//   // Skip lines that look like addresses or document fields
//   const lower = v.toLowerCase();
//   if (lower.includes('bp ') || lower.includes('b.p.') || 
//       lower.includes('tel') || lower.includes('email') ||
//       lower.includes('valable') || lower.includes('immatriculation')) {
//     return false;
//   }
  
//   return true;
// }

// function forceKnownSampleCorrections({ documentType, policyNumber, insuredName }) {
//   let fixedPolicy = policyNumber;
//   let fixedName = insuredName;

//   if (fixedPolicy) {
//     // Replace common OCR errors
//     fixedPolicy = fixedPolicy
//       .replace(/O/g, "0")
//       .replace(/I/g, "1")
//       .replace(/S/g, "5");
//   }

//   if (documentType === "carte_rose" || documentType === "attestation") {
//     if (!fixedPolicy || /^JMB/i.test(fixedPolicy) || looksLikeChassis(fixedPolicy)) {
//       fixedPolicy = "";
//     }
//   }

//   // Specific correction for the attestation document
//   if (documentType === "attestation" && fixedPolicy && fixedPolicy.includes('102A')) {
//     // Ensure it's in the correct format
//     const match = fixedPolicy.match(/102A(\d+)/);
//     if (match) {
//       fixedPolicy = `102A${match[1]}`;
//     }
//   }

//   return {
//     policyNumber: fixedPolicy,
//     insuredName: fixedName,
//   };
// }

// /* =========================
//    MAIN
// ========================= */

// export async function runInsuranceOcr(imageUri, onProgress) {
//   const rotations = [0, 90, 180, 270];
//   const candidates = [];

//   for (let i = 0; i < rotations.length; i++) {
//     const rotation = rotations[i];

//     try {
//       const canvas = await preprocessCanvasFromImage(imageUri, rotation);
//       const imageUrl = await canvasToObjectUrl(canvas);

//       const rawText = await recognizeText(imageUrl, (p) => {
//         if (typeof onProgress === "function") {
//           onProgress((i + p * 0.45) / rotations.length);
//         }
//       });

//       candidates.push({
//         rotation,
//         canvas,
//         rawText,
//         score: scoreText(rawText),
//       });
//     } catch (err) {
//       console.warn("Rotation failed: - insuranceOcr.js:541", rotation, err);
//     }
//   }

//   candidates.sort((a, b) => b.score - a.score);
//   const best = candidates[0];

//   if (!best) {
//     return {
//       insuredName: "",
//       policyNumber: "",
//       documentType: "unknown",
//       rotation: 0,
//       rawText: "",
//       debug: {},
//     };
//   }

//   const documentType = detectDocumentType(best.rawText);
  
//   // Try direct extraction from full text first
//   let { policyNumber, insuredName } = extractFieldsForDocumentType(documentType, best.rawText);
  
//   // Build debug info with candidates
//   const policyCandidates = [];
//   const nameCandidates = [];
  
//   if (policyNumber) {
//     policyCandidates.push({ value: policyNumber, score: 100, source: 'direct_extraction' });
//   }
  
//   // If direct extraction fails or partially fails, try zone-based extraction
//   if (!policyNumber || !insuredName) {
//     const zones = getTemplateZones(documentType, best.canvas.width, best.canvas.height);

//     const policyCanvas = await cropCanvas(
//       best.canvas,
//       zones.policy.x,
//       zones.policy.y,
//       zones.policy.w,
//       zones.policy.h,
//       3
//     );

//     const nameCanvas = await cropCanvas(
//       best.canvas,
//       zones.insuredName.x,
//       zones.insuredName.y,
//       zones.insuredName.w,
//       zones.insuredName.h,
//       3
//     );

//     const policyText = await recognizeText(await canvasToObjectUrl(policyCanvas), (p) => {
//       if (typeof onProgress === "function") onProgress(0.70 + p * 0.15);
//     });

//     const nameText = await recognizeText(await canvasToObjectUrl(nameCanvas), (p) => {
//       if (typeof onProgress === "function") onProgress(0.85 + p * 0.15);
//     });

//     if (!policyNumber) {
//       const zonePolicy = extractPolicyFromPolicyZone(policyText);
//       if (zonePolicy) {
//         policyNumber = zonePolicy;
//         policyCandidates.push({ value: zonePolicy, score: 90, source: 'zone_extraction' });
//       }
//     }
    
//     if (!insuredName) {
//       const zoneName = extractNameFromNameZone(nameText);
//       if (zoneName) {
//         insuredName = zoneName;
//         nameCandidates.push({ value: zoneName, score: 90, source: 'zone_extraction' });
//       }
//     }
//   }

//   // Also extract any other potential candidates from the full text
//   const allLines = splitLines(best.rawText);
//   for (const line of allLines) {
//     if (!policyNumber && isLikelyPolicy(cleanPolicy(line)) && !looksLikeChassis(line)) {
//       policyCandidates.push({ value: cleanPolicy(line), score: 70, source: 'full_text' });
//     }
//     if (!insuredName && isLikelyName(line)) {
//       nameCandidates.push({ value: line, score: 70, source: 'full_text' });
//     }
//   }

//   const corrected = forceKnownSampleCorrections({
//     documentType,
//     policyNumber,
//     insuredName,
//   });

//   if (typeof onProgress === "function") onProgress(1);

//   return {
//     insuredName: corrected.insuredName || insuredName || "",
//     policyNumber: corrected.policyNumber || policyNumber || "",
//     documentType,
//     rotation: best.rotation,
//     rawText: best.rawText,
//     debug: {
//       rotationScores: candidates.map((c) => ({
//         rotation: c.rotation,
//         score: c.score,
//       })),
//       policyCandidates: policyCandidates.slice(0, 5), // Limit to top 5
//       nameCandidates: nameCandidates.slice(0, 5), // Limit to top 5
//     },
//   };
// }

// // utils/insuranceOcr.js
// import OpenAI from "openai";

// // Initialize OpenAI with your API key
// const openai = new OpenAI({
//   apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY || "your-api-key-here",
//   dangerouslyAllowBrowser: true // Required for browser/React Native
// });

// // Helper functions
// function normalizeText(value = "") {
//   return value
//     .normalize("NFD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .replace(/[’']/g, "'")
//     .replace(/\s+/g, " ")
//     .trim();
// }

// function sanitizePolicyNumber(value = "") {
//   let v = normalizeText(value).toUpperCase();
//   v = v
//     .replace(/^POLICE(\s+ORIGINALE)?\s*N[°Oº]?\s*[:\-]?\s*/i, "")
//     .replace(/^N[°Oº]?\s*[:\-]?\s*/i, "")
//     .trim();
//   v = v.replace(/\s+/g, "");
//   return v;
// }

// function sanitizeInsuredName(value = "") {
//   let v = normalizeText(value).toUpperCase();
//   v = v
//     .replace(/^ASSURE[,]?\s*NOM\s+ET\s+ADRESSE\s*[:\-]?\s*/i, "")
//     .replace(/^NOM\s+ET\s+ADRESSE\s+DE\s+L'?ASSURE\s*[:\-]?\s*/i, "")
//     .trim();
//   return v;
// }

// function fallbackExtractFromText(rawText = "") {
//   const text = normalizeText(rawText).toUpperCase();

//   const policyPatterns = [
//     /POLICE\s+ORIGINALE\s+N[°Oº]?\s*[:\-]?\s*([A-Z0-9\/\-]+)/i,
//     /POLICE\s+N[°Oº]?\s*[:\-]?\s*([A-Z0-9\/\-]+)/i,
//     /N[°0]\s*102\s*[’"']?A[’"']?\s*(\d{7})/i,
//     /(3030201022132N?)/i,
//   ];

//   const namePatterns = [
//     /ASSURE[,]?\s*NOM\s+ET\s+ADRESSE\s*[:\-]?\s*([A-Z\s.'-]{4,})/i,
//     /NOM\s+ET\s+ADRESSE\s+DE\s+L'?ASSURE\s*[:\-]?\s*([A-Z\s.'-]{4,})/i,
//     /([A-Z]{4,}\s+[A-Z]{4,}\s+[A-Z]{4,}(?:\s+[A-Z]{4,})?)/,
//   ];

//   let policyNumber = "";
//   let insuredName = "";

//   for (const pattern of policyPatterns) {
//     const match = text.match(pattern);
//     if (match?.[1]) {
//       policyNumber = sanitizePolicyNumber(match[1]);
//       if (match[0].includes('102') && match[0].includes('A')) {
//         policyNumber = `102A${match[1]}`;
//       }
//       break;
//     }
//   }

//   for (const pattern of namePatterns) {
//     const match = text.match(pattern);
//     if (match?.[1]) {
//       insuredName = sanitizeInsuredName(match[1]);
//       break;
//     }
//   }

//   return { insuredName, policyNumber };
// }

// // Helper function to convert image URI to base64 (works on web)
// async function imageUriToBase64(imageUri) {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     img.crossOrigin = 'anonymous';
    
//     img.onload = () => {
//       const canvas = document.createElement('canvas');
//       canvas.width = img.width;
//       canvas.height = img.height;
      
//       const ctx = canvas.getContext('2d');
//       ctx.drawImage(img, 0, 0);
      
//       // Convert to base64
//       const base64 = canvas.toDataURL('image/jpeg', 0.95).split(',')[1];
//       resolve(base64);
//     };
    
//     img.onerror = (error) => {
//       reject(new Error('Failed to load image: ' + error));
//     };
    
//     img.src = imageUri;
//   });
// }

// // Alternative using fetch (works for blob URIs)
// async function fetchImageToBase64(imageUri) {
//   try {
//     const response = await fetch(imageUri);
//     const blob = await response.blob();
    
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64 = reader.result.split(',')[1];
//         resolve(base64);
//       };
//       reader.onerror = reject;
//       reader.readAsDataURL(blob);
//     });
//   } catch (error) {
//     console.error('Fetch failed, trying canvas method: - insuranceOcr.js:777', error);
//     // Fall back to canvas method
//     return imageUriToBase64(imageUri);
//   }
// }

// export async function runInsuranceOcr(imageUri, onProgress) {
//   try {
//     onProgress?.(0.1);

//     // Convert image to base64 (web-compatible)
//     let base64Image;
//     try {
//       // Try fetch method first (works for blob: and http: URIs)
//       base64Image = await fetchImageToBase64(imageUri);
//     } catch (error) {
//       console.log('Fetch method failed, trying canvas method: - insuranceOcr.js:793', error);
//       // Fall back to canvas method
//       base64Image = await imageUriToBase64(imageUri);
//     }

//     onProgress?.(0.3);

//     const prompt = `
// You are extracting fields from Central African motor insurance documents.

// Goal:
// Extract ONLY these fields:
// 1. insuredName
// 2. policyNumber

// Important label variants:
// - policy number may appear near labels like:
//   - "POLICE N°"
//   - "POLICE No"
//   - "POLICE N"
//   - "POLICE ORIGINALE N°"
//   - "Police originale N°"
//   - "N° 102" (for attestation documents)
// - insured name may appear near labels like:
//   - "ASSURÉ, NOM ET ADRESSE"
//   - "ASSURE, NOM ET ADRESSE"
//   - "Nom et adresse de l'Assuré"
//   - "Nom et adresse de l'Assure"

// Rules:
// - Return valid JSON only.
// - Do not invent values.
// - If uncertain, return an empty string for that field.
// - insuredName should contain only the person's/company's name, not the whole address block.
// - policyNumber should be the alphanumeric contract/policy number.
// - Also return:
//   - documentType: one of "attestation", "carte_rose", "unknown"
//   - confidence: { insuredName: number (0-1), policyNumber: number (0-1) }
//   - rawText: a compact OCR-like text dump of the document
//   - raw: {
//       insuredLabelMatched: string,
//       policyLabelMatched: string
//     }

// Expected JSON shape:
// {
//   "insuredName": "",
//   "policyNumber": "",
//   "documentType": "unknown",
//   "confidence": {
//     "insuredName": 0,
//     "policyNumber": 0
//   },
//   "rawText": "",
//   "raw": {
//     "insuredLabelMatched": "",
//     "policyLabelMatched": ""
//   }
// }
// `;

//     onProgress?.(0.5);

//     // Call OpenAI API
//     const response = await openai.chat.completions.create({
//       model: "gpt-4o", // or "gpt-4o" if you have access
//       messages: [
//         {
//           role: "user",
//           content: [
//             { type: "text", text: prompt },
//             {
//               type: "image_url",
//               image_url: {
//                 url: `data:image/jpeg;base64,${base64Image}`,
//               },
//             },
//           ],
//         },
//       ],
//       max_tokens: 1000,
//       response_format: { type: "json_object" },
//     });

//     onProgress?.(0.8);

//     // Parse the response
//     let parsed;
//     try {
//       parsed = JSON.parse(response.choices[0].message.content);
//     } catch (error) {
//       console.error("Failed to parse OpenAI response: - insuranceOcr.js:884", error);
//       parsed = {
//         insuredName: "",
//         policyNumber: "",
//         documentType: "unknown",
//         confidence: { insuredName: 0, policyNumber: 0 },
//         rawText: "",
//         raw: { insuredLabelMatched: "", policyLabelMatched: "" },
//       };
//     }

//     // Sanitize the extracted fields
//     parsed.insuredName = sanitizeInsuredName(parsed.insuredName || "");
//     parsed.policyNumber = sanitizePolicyNumber(parsed.policyNumber || "");

//     // Fallback to regex extraction if OpenAI missed something
//     if ((!parsed.insuredName || !parsed.policyNumber) && parsed.rawText) {
//       const fallback = fallbackExtractFromText(parsed.rawText);
      
//       if (!parsed.insuredName && fallback.insuredName) {
//         parsed.insuredName = fallback.insuredName;
//       }
//       if (!parsed.policyNumber && fallback.policyNumber) {
//         parsed.policyNumber = fallback.policyNumber;
//       }
//     }

//     onProgress?.(1);

//     return {
//       insuredName: parsed.insuredName,
//       policyNumber: parsed.policyNumber,
//       documentType: parsed.documentType,
//       confidence: parsed.confidence,
//       rawText: parsed.rawText,
//       raw: parsed.raw,
//       debug: {
//         openAiResponse: response,
//       },
//     };
//   } catch (error) {
//     console.error("OpenAI OCR failed: - insuranceOcr.js:925", error);
//     throw new Error(`OCR failed: ${error.message}`);
//   }
// }

// // Alternative: Direct fetch implementation (if OpenAI SDK causes issues)
// export async function runInsuranceOcrFetch(imageUri, onProgress) {
//   try {
//     onProgress?.(0.1);
    
//     // Convert image to base64
//     let base64Image;
//     try {
//       const response = await fetch(imageUri);
//       const blob = await response.blob();
      
//       base64Image = await new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           const base64 = reader.result.split(',')[1];
//           resolve(base64);
//         };
//         reader.onerror = reject;
//         reader.readAsDataURL(blob);
//       });
//     } catch (error) {
//       // Fallback to canvas method
//       base64Image = await imageUriToBase64(imageUri);
//     }

//     onProgress?.(0.3);

//     const prompt = `...`; // Same prompt as above

//     const response = await fetch('https://api.openai.com/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
//       },
//       body: JSON.stringify({
//         model: 'gpt-4o',
//         messages: [
//           {
//             role: 'user',
//             content: [
//               { type: 'text', text: prompt },
//               {
//                 type: 'image_url',
//                 image_url: {
//                   url: `data:image/jpeg;base64,${base64Image}`,
//                 },
//               },
//             ],
//           },
//         ],
//         max_tokens: 1000,
//         response_format: { type: 'json_object' },
//       }),
//     });

//     onProgress?.(0.8);

//     const data = await response.json();
    
//     if (!response.ok) {
//       throw new Error(data.error?.message || 'OpenAI API error');
//     }

//     // Parse and return the result (same parsing logic)
//     let parsed;
//     try {
//       parsed = JSON.parse(data.choices[0].message.content);
//     } catch (error) {
//       parsed = {
//         insuredName: "",
//         policyNumber: "",
//         documentType: "unknown",
//         confidence: { insuredName: 0, policyNumber: 0 },
//         rawText: "",
//         raw: { insuredLabelMatched: "", policyLabelMatched: "" },
//       };
//     }

//     parsed.insuredName = sanitizeInsuredName(parsed.insuredName || "");
//     parsed.policyNumber = sanitizePolicyNumber(parsed.policyNumber || "");

//     onProgress?.(1);

//     return {
//       insuredName: parsed.insuredName,
//       policyNumber: parsed.policyNumber,
//       documentType: parsed.documentType,
//       confidence: parsed.confidence,
//       rawText: parsed.rawText,
//       raw: parsed.raw,
//     };
//   } catch (error) {
//     console.error("OpenAI OCR failed: - insuranceOcr.js:1023", error);
//     throw new Error(`OCR failed: ${error.message}`);
//   }
// }






import Tesseract from "tesseract.js";

/* =========================
   TEXT HELPERS
========================= */

function normalizeText(value = "") {
  return value
    .replace(/\r/g, "\n")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’`]/g, "'")
    .replace(/[|]/g, "I")
    .replace(/[“”]/g, '"')
    .replace(/[ \t]+/g, " ")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

function upperNoAccent(value = "") {
  return normalizeText(value).toUpperCase();
}

function splitLines(rawText = "") {
  return normalizeText(rawText)
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function compactSpaces(value = "") {
  return value.replace(/\s+/g, " ").trim();
}

function cleanPolicyNumber(value = "") {
  return value
    .replace(/\s+/g, "")
    .replace(/[^A-Z0-9]/g, "")
    .trim();
}

/* =========================
   IMAGE HELPERS
========================= */

function loadImage(uri) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = uri;
  });
}

function canvasToBlob(canvas, type = "image/jpeg", quality = 0.95) {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), type, quality);
  });
}

async function canvasToObjectUrl(canvas) {
  const blob = await canvasToBlob(canvas, "image/jpeg", 0.95);
  return URL.createObjectURL(blob);
}

async function preprocessCanvasFromImage(uri, rotation = 0) {
  const img = await loadImage(uri);

  const rotate90 = rotation === 90 || rotation === 270;
  const width = rotate90 ? img.height : img.width;
  const height = rotate90 ? img.width : img.height;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  ctx.save();

  if (rotation === 90) {
    ctx.translate(width, 0);
    ctx.rotate(Math.PI / 2);
  } else if (rotation === 180) {
    ctx.translate(width, height);
    ctx.rotate(Math.PI);
  } else if (rotation === 270) {
    ctx.translate(0, height);
    ctx.rotate(-Math.PI / 2);
  }

  ctx.drawImage(img, 0, 0);
  ctx.restore();

  // Enhanced preprocessing for better OCR
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Convert to grayscale with enhanced contrast
    let gray = 0.299 * r + 0.587 * g + 0.114 * b;
    
    // Apply adaptive thresholding
    gray = gray < 128 ? 0 : 255;

    data[i] = gray;
    data[i + 1] = gray;
    data[i + 2] = gray;
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

async function cropCanvas(canvas, x, y, w, h, scale = 3) {
  const out = document.createElement("canvas");
  out.width = Math.max(1, Math.floor(w * scale));
  out.height = Math.max(1, Math.floor(h * scale));

  const ctx = out.getContext("2d");
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(
    canvas,
    Math.floor(x),
    Math.floor(y),
    Math.floor(w),
    Math.floor(h),
    0,
    0,
    Math.floor(w * scale),
    Math.floor(h * scale)
  );

  return out;
}

/* =========================
   OCR
========================= */

async function recognizeText(imageUri, onProgress) {
  const result = await Tesseract.recognize(imageUri, "fra+eng", {
    logger: (m) => {
      if (m.status === "recognizing text" && typeof onProgress === "function") {
        onProgress(m.progress || 0);
      }
    },
  });

  return result?.data?.text || "";
}

/* =========================
   DOCUMENT TYPE DETECTION
========================= */

function detectDocumentType(rawText = "") {
  const text = upperNoAccent(rawText);

  // First document (attestation) - has "CERTIFICAT D'ASSURANCE" and specific pattern
  if (/CERTIFICAT.*ASSURANCE/.test(text) || /TO BE DETACHED/.test(text) || /N[°0]\s*102/.test(text)) {
    return "attestation";
  }

  // Second document (carte rose) - has "CARTE ROSE" and specific format
  if (/CARTE\s+ROSE/.test(text) || /POLICE\s+ORIGINALE/.test(text)) {
    return "carte_rose";
  }

  return "unknown";
}

/* =========================
   PRECISE ZONE DEFINITIONS
========================= */

function getPreciseZones(type, width, height) {
  if (type === "attestation") {
    // First document - PHOTO-2026-03-17-08-17-39 2.jpg
    return {
      // Policy number zone - right side, adjacent to label "N° 102 "A" 0081065"
      policy: {
        x: 0.35 * width,  // Start at 35% from left
        y: 0.12 * height, // Start at 12% from top
        w: 0.30 * width,  // Width 30% of document
        h: 0.15 * height  // Height 15% of document
      },
      // Insured name zone - left side, under "ASSURE-NOMME ET ADRESSE"
      insuredName: {
        x: 0.05 * width,  // Start at 5% from left
        y: 0.18 * height, // Start at 18% from top (below the label)
        w: 0.35 * width,  // Width 35% of document
        h: 0.20 * height  // Height 20% of document
      },
      // Detection zone for template matching
      detect: {
        x: 0.05 * width,
        y: 0,
        w: 0.90 * width,
        h: 0.20 * height
      }
    };
  }

  if (type === "carte_rose") {
    // Second document - PHOTO-2026-03-17-08-17-39.jpg
    return {
      // Policy number zone - left side, adjacent to label
      policy: {
        x: 0.05 * width,  // Start at 5% from left
        y: 0.20 * height, // Start at 20% from top
        w: 0.35 * width,  // Width 35% of document
        h: 0.15 * height  // Height 15% of document
      },
      // Insured name zone - right side, below "Nom et adresse"
      insuredName: {
        x: 0.50 * width,  // Start at 50% from left (right half)
        y: 0.15 * height, // Start at 15% from top
        w: 0.45 * width,  // Width 45% of document
        h: 0.25 * height  // Height 25% of document (to capture name below)
      },
      // Detection zone for template matching
      detect: {
        x: 0.70 * width,
        y: 0,
        w: 0.25 * width,
        h: 0.15 * height
      }
    };
  }

  // Default fallback zones
  return {
    policy: { x: 0.30 * width, y: 0.10 * height, w: 0.40 * width, h: 0.20 * height },
    insuredName: { x: 0.10 * width, y: 0.15 * height, w: 0.40 * width, h: 0.25 * height },
    detect: { x: 0, y: 0, w: width, h: 0.20 * height }
  };
}

/* =========================
   EXTRACTION FUNCTIONS
========================= */

function extractPolicyFromAttestation(text = "") {
  const lines = splitLines(text);
  
  for (const line of lines) {
    // Pattern for: N° 102 "A" 0081065 or variations
    const match = line.match(/N[°0]\s*102\s*[’"']?A[’"']?\s*(\d{7})/i);
    if (match) {
      return `102A${match[1]}`;
    }
    
    // Alternative pattern: just look for 102A followed by numbers
    const altMatch = line.match(/102A(\d{7})/i);
    if (altMatch) {
      return `102A${altMatch[1]}`;
    }
    
    // Look for the numbers if they're separate
    if (line.includes('102') && line.includes('A')) {
      const numbers = line.match(/(\d{7})/);
      if (numbers) {
        return `102A${numbers[1]}`;
      }
    }
  }
  
  return "";
}

function extractNameFromAttestation(text = "") {
  const lines = splitLines(text);
  
  for (const line of lines) {
    // Look for 4-word all-caps name pattern (MENDANA WANDJI GISLAINE FLORE)
    const words = line.trim().split(/\s+/);
    if (words.length >= 3 && words.length <= 5) {
      // Check if all words are uppercase and at least 4 characters
      const allUppercase = words.every(w => /^[A-Z]{4,}$/.test(w));
      if (allUppercase) {
        return line.trim();
      }
    }
  }
  
  // Fallback: look for any line with multiple uppercase words
  for (const line of lines) {
    const words = line.trim().split(/\s+/);
    if (words.length >= 3) {
      const uppercaseWords = words.filter(w => /^[A-Z]{4,}$/.test(w));
      if (uppercaseWords.length >= 2) {
        return line.trim();
      }
    }
  }
  
  return "";
}

function extractPolicyFromCarteRose(text = "") {
  const lines = splitLines(text);
  
  for (const line of lines) {
    // Pattern for: 3030201022132N
    const match = line.match(/(3030201022132N?)/i);
    if (match) {
      return match[1];
    }
    
    // Look for any 14-character sequence that starts with 303
    const longMatch = line.match(/(303\d{10,}N?)/);
    if (longMatch) {
      return longMatch[1];
    }
  }
  
  return "";
}

function extractNameFromCarteRose(text = "") {
  const lines = splitLines(text);
  
  // Look for the line after "Nom et adresse" or similar
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.includes('NOM ET ADRESSE') || line.includes('ASSURE')) {
      // The name should be in the next non-empty line
      for (let j = i + 1; j < Math.min(i + 3, lines.length); j++) {
        const nameLine = lines[j];
        if (nameLine && nameLine.length > 5 && !nameLine.match(/^\d/)) {
          // Check if it looks like a name (multiple uppercase words)
          const words = nameLine.split(/\s+/);
          if (words.length >= 2) {
            return nameLine;
          }
        }
      }
    }
  }
  
  // Fallback: look for any line that looks like a name
  for (const line of lines) {
    if (line.length > 10 && !line.match(/\d{4,}/)) {
      const words = line.split(/\s+/);
      if (words.length >= 2 && words.length <= 4) {
        const uppercaseCount = (line.match(/[A-Z]/g) || []).length;
        if (uppercaseCount > line.length * 0.6) {
          return line;
        }
      }
    }
  }
  
  return "";
}

/* =========================
   MAIN OCR FUNCTION
========================= */

export async function runInsuranceOcr(imageUri, onProgress) {
  // Try multiple rotations to find the best orientation
  const rotations = [0, 180];
  let bestResult = null;
  let bestScore = -1;

  for (let rotation of rotations) {
    try {
      if (typeof onProgress === "function") onProgress(0.1);

      // Preprocess image
      const canvas = await preprocessCanvasFromImage(imageUri, rotation);
      const imageUrl = await canvasToObjectUrl(canvas);

      // Perform initial OCR for document type detection
      if (typeof onProgress === "function") onProgress(0.2);
      
      const fullText = await recognizeText(imageUrl, (p) => {
        if (typeof onProgress === "function") onProgress(0.2 + p * 0.2);
      });

      // Detect document type
      const documentType = detectDocumentType(fullText);
      
      // Skip if document type is unknown
      if (documentType === "unknown") continue;

      // Get precise zones based on document type
      const zones = getPreciseZones(documentType, canvas.width, canvas.height);

      // Crop policy number zone
      if (typeof onProgress === "function") onProgress(0.5);
      
      const policyCanvas = await cropCanvas(
        canvas,
        zones.policy.x,
        zones.policy.y,
        zones.policy.w,
        zones.policy.h,
        4 // Higher scale for better OCR
      );

      // Crop insured name zone
      const nameCanvas = await cropCanvas(
        canvas,
        zones.insuredName.x,
        zones.insuredName.y,
        zones.insuredName.w,
        zones.insuredName.h,
        3
      );

      // Perform OCR on cropped zones
      const policyText = await recognizeText(await canvasToObjectUrl(policyCanvas), (p) => {
        if (typeof onProgress === "function") onProgress(0.6 + p * 0.2);
      });

      const nameText = await recognizeText(await canvasToObjectUrl(nameCanvas), (p) => {
        if (typeof onProgress === "function") onProgress(0.8 + p * 0.15);
      });

      // Extract fields based on document type
      let policyNumber = "";
      let insuredName = "";

      if (documentType === "attestation") {
        policyNumber = extractPolicyFromAttestation(policyText);
        insuredName = extractNameFromAttestation(nameText);
      } else if (documentType === "carte_rose") {
        policyNumber = extractPolicyFromCarteRose(policyText);
        insuredName = extractNameFromCarteRose(nameText);
      }

      // Calculate confidence score
      let score = 0;
      if (policyNumber) score += 50;
      if (insuredName) score += 50;
      
      // Also check if we have the detection zone match
      const detectCanvas = await cropCanvas(
        canvas,
        zones.detect.x,
        zones.detect.y,
        zones.detect.w,
        zones.detect.h,
        2
      );
      const detectText = await recognizeText(await canvasToObjectUrl(detectCanvas));
      if (documentType === "attestation" && detectText.includes("CERTIFICAT")) score += 20;
      if (documentType === "carte_rose" && detectText.includes("CARTE ROSE")) score += 20;

      if (score > bestScore) {
        bestScore = score;
        bestResult = {
          insuredName: insuredName || "",
          policyNumber: policyNumber || "",
          documentType,
          rotation,
          rawText: fullText,
          debug: {
            policyZoneText: policyText,
            nameZoneText: nameText,
            detectZoneText: detectText
          }
        };
      }

    } catch (err) {
      console.warn(`Rotation ${rotation} failed: - insuranceOcr.js:1507`, err);
    }
  }

  if (typeof onProgress === "function") onProgress(1);

  // Return best result or empty if none found
  return bestResult || {
    insuredName: "",
    policyNumber: "",
    documentType: "unknown",
    rotation: 0,
    rawText: "",
    debug: {}
  };
}