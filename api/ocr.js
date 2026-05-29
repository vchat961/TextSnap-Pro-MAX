export default async function handler(req, res) {
    const API_KEY = 'K84549533588957';
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    try {
        const { imageBase64 } = req.body;
        const base64Data = imageBase64.split(',')[1];
        const formData = new FormData();
        formData.append('apikey', API_KEY);
        formData.append('base64Image', `data:image/jpeg;base64,${base64Data}`);
        formData.append('language', 'eng');
        formData.append('OCREngine', '2');
        const response = await fetch('https://api.ocr.space/parse/image', { method: 'POST', body: formData });
        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
                                             }
