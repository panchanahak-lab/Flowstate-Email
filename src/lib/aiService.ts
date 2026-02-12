export interface AISuggestion {
    id: string;
    type: 'subject' | 'starter' | 'signoff' | 'rewrite';
    content: string;
}

const MOCK_DELAY = 800;

export const aiService = {
    // Generate suggestions based on context overrides
    generateSuggestions: async (context: 'empty_subject' | 'empty_body' | 'general'): Promise<AISuggestion[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                switch (context) {
                    case 'empty_subject':
                        resolve([
                            { id: '1', type: 'subject', content: 'Updates regarding [Project]' },
                            { id: '2', type: 'subject', content: 'Meeting request: [Topic]' },
                            { id: '3', type: 'subject', content: 'Question about [Subject]' },
                        ]);
                        break;
                    case 'empty_body':
                        resolve([
                            { id: '4', type: 'starter', content: 'I hope this email finds you well.' },
                            { id: '5', type: 'starter', content: 'Just wanted to follow up on...' },
                            { id: '6', type: 'starter', content: 'Regarding our conversation earlier...' },
                        ]);
                        break;
                    default:
                        resolve([]);
                }
            }, MOCK_DELAY);
        });
    },

    rewriteText: async (_text: string, tone: number): Promise<string> => {
        // tone: -1 (Friendly) to 1 (Assertive)
        return new Promise((resolve) => {
            setTimeout(() => {
                if (tone < -0.3) return resolve("Hey there! Just wanted to quickly touch base on this. Let me know what you think!");
                if (tone > 0.3) return resolve("Please review the attached immediately. I expect feedback by EOD. Regards.");
                resolve("I am writing to share an update regarding the project. Please let me know your thoughts.");
            }, MOCK_DELAY);
        });
    },

    // New: Generate Draft Variants from Prompt
    generateDraft: async (prompt: string, options?: { subject?: string; tone?: string; priority?: string }): Promise<string[]> => {
        const { subject = '', tone = 'Professional', priority = 'Normal' } = options || {};

        return new Promise((resolve) => {
            setTimeout(() => {
                const variants = [
                    // Variant 1: Direct & Concise
                    `Subject: ${subject || `Regarding ${prompt}`}\n\nHi,\n\nI'm writing to briefly discuss ${prompt}.\n\nPlease let me know if you have a moment to chat.\n\nBest,\n[Your Name]`,

                    // Variant 2: Detailed & Formal
                    `Subject: ${subject || `Inquiry: ${prompt}`}\n\nDear [Recipient],\n\nI hope this email finds you well.\n\nI am writing to formally address ${prompt}. Given the ${priority.toLowerCase()} priority of this matter, I would appreciate your attention to the details provided below.\n\n[Detailed expansion on ${prompt}]\n\nThank you for your time and consideration.\n\nSincerely,\n[Your Name]`,

                    // Variant 3: Friendly & Casual
                    `Subject: ${subject || `Quick question about ${prompt}`}\n\nHey there,\n\nJust wanted to reach out regarding ${prompt}! \n\nLet me know what you think when you get a chance.\n\nCheers,\n[Your Name]`
                ];

                // Shuffle or select based on tone if we had real AI, for now return all 3
                resolve(variants);
            }, MOCK_DELAY * 2);
        });
    }
};
