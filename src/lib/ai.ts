import OpenAI from 'openai';

// Check if OpenAI is properly configured
const isOpenAIConfigured = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  return apiKey && apiKey !== 'your-actual-openai-api-key-here-sk-proj-xxxx' && apiKey.startsWith('sk-');
};

// Initialize OpenAI client only if configured
let openai: OpenAI | null = null;
if (isOpenAIConfigured()) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

export interface ProductData {
  name: string;
  category?: string;
  brand?: string;
  specifications?: Record<string, any>;
  price?: number;
  type?: string;
  tags?: string[];
  existingDescription?: string;
}

export interface AIDescriptionOptions {
  type: 'short' | 'detailed' | 'seo' | 'luxury';
  tone: 'professional' | 'luxury' | 'technical' | 'friendly';
  length: 'brief' | 'medium' | 'detailed';
  includeFeatures: boolean;
  includeBenefits: boolean;
  seoKeywords?: string[];
}

// Generate fallback description when AI is not available
function generateFallbackDescription(productData: ProductData): {
  description: string;
  seoTitle: string;
  seoDescription: string;
  quality_score: number;
  word_count: number;
} {
  const { name, category, brand, price, specifications } = productData;
  
  let description = `Experience the luxury of ${name}`;
  
  if (brand) {
    description += ` by ${brand}`;
  }
  
  if (category) {
    description += `, a premium ${category.toLowerCase()}`;
  }
  
  description += '. ';
  
  // Add specifications if available
  if (specifications && Object.keys(specifications).length > 0) {
    description += 'Features include ';
    const features = Object.entries(specifications)
      .slice(0, 3)
      .map(([key, value]) => `${key.toLowerCase()}: ${value}`)
      .join(', ');
    description += features + '. ';
  }
  
  description += 'Crafted with exceptional attention to detail, this piece brings sophistication and functionality to your space. Perfect for discerning homeowners who appreciate quality and style.';
  
  if (price) {
    description += ` Available in our ${formatPriceRange(price)} collection.`;
  }
  
  const seoTitle = `${name}${brand ? ` - ${brand}` : ''} | North Bay Kitchen & Bath`;
  const seoDescription = `Discover ${name}${category ? ` - premium ${category.toLowerCase()}` : ''} at North Bay Kitchen & Bath. Luxury design meets exceptional craftsmanship.`;
  
  return {
    description,
    seoTitle: seoTitle.length > 60 ? seoTitle.substring(0, 57) + '...' : seoTitle,
    seoDescription: seoDescription.length > 160 ? seoDescription.substring(0, 157) + '...' : seoDescription,
    quality_score: 65, // Fallback quality score
    word_count: description.split(' ').length
  };
}

// Generate luxury-focused product description
export async function generateProductDescription(
  productData: ProductData,
  options: AIDescriptionOptions = {
    type: 'luxury',
    tone: 'luxury',
    length: 'medium',
    includeFeatures: true,
    includeBenefits: true
  }
): Promise<{
  description: string;
  seoTitle?: string;
  seoDescription?: string;
  quality_score: number;
  word_count: number;
}> {
  // Check if OpenAI is configured
  if (!isOpenAIConfigured() || !openai) {
    console.warn('⚠️ OpenAI not configured, using fallback description generation');
    return generateFallbackDescription(productData);
  }

  try {
    const prompt = buildPrompt(productData, options);
    
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a luxury home design copywriter specializing in high-end kitchen and bath products. You write compelling, sophisticated product descriptions that capture the essence of luxury while being informative and SEO-friendly. Your tone is elegant, professional, and aspirational.

BRAND VOICE for North Bay Kitchen & Bath:
- Sophisticated and refined
- Focus on craftsmanship and quality
- Emphasize luxury lifestyle
- Technical accuracy with elegant language
- Aspirational but accessible

Always return valid JSON with this exact structure:
{
  "description": "The main product description",
  "seoTitle": "SEO-optimized title (60 chars or less)",
  "seoDescription": "Meta description (150-160 chars)",
  "quality_score": 85,
  "word_count": 120
}`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content returned from OpenAI');
    }

    // Parse the JSON response
    const parsed = JSON.parse(content);
    
    return {
      description: parsed.description,
      seoTitle: parsed.seoTitle,
      seoDescription: parsed.seoDescription,
      quality_score: parsed.quality_score || 75,
      word_count: parsed.word_count || content.split(' ').length
    };

  } catch (error) {
    console.error('AI Description Generation Error:', error);
    
    // If OpenAI fails, provide fallback
    if (error instanceof Error && (
      error.message.includes('API key') || 
      error.message.includes('authentication') ||
      error.message.includes('quota')
    )) {
      console.warn('🔄 OpenAI API issue, using fallback description');
      return generateFallbackDescription(productData);
    }
    
    throw new Error(`Failed to generate description: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Check AI configuration status
export function getAIStatus(): {
  configured: boolean;
  available: boolean;
  model: string;
  message: string;
} {
  const configured = Boolean(isOpenAIConfigured());
  
  return {
    configured,
    available: configured && !!openai,
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    message: configured 
      ? 'AI features are enabled and ready to use'
      : 'OpenAI API key not configured. AI features will use fallback descriptions.'
  };
}

// Build the prompt based on product data and options
function buildPrompt(productData: ProductData, options: AIDescriptionOptions): string {
  const { name, category, brand, specifications, price, type, tags, existingDescription } = productData;
  
  let prompt = `Create a ${options.type} product description for this luxury ${category || 'home design'} product:\n\n`;
  
  prompt += `PRODUCT DETAILS:\n`;
  prompt += `- Name: ${name}\n`;
  if (brand) prompt += `- Brand: ${brand}\n`;
  if (category) prompt += `- Category: ${category}\n`;
  if (type) prompt += `- Type: ${type}\n`;
  if (price) prompt += `- Price Range: ${formatPriceRange(price)}\n`;
  
  if (specifications && Object.keys(specifications).length > 0) {
    prompt += `\nSPECIFICATIONS:\n`;
    Object.entries(specifications).forEach(([key, value]) => {
      prompt += `- ${key}: ${value}\n`;
    });
  }
  
  if (tags && tags.length > 0) {
    prompt += `\nTAGS: ${tags.join(', ')}\n`;
  }
  
  if (existingDescription) {
    prompt += `\nEXISTING DESCRIPTION (for reference): ${existingDescription}\n`;
  }
  
  prompt += `\nREQUIREMENTS:\n`;
  prompt += `- Tone: ${options.tone}\n`;
  prompt += `- Length: ${options.length} (${getLengthGuidance(options.length)})\n`;
  prompt += `- Include features: ${options.includeFeatures ? 'Yes' : 'No'}\n`;
  prompt += `- Include benefits: ${options.includeBenefits ? 'Yes' : 'No'}\n`;
  
  if (options.seoKeywords && options.seoKeywords.length > 0) {
    prompt += `- SEO Keywords to include: ${options.seoKeywords.join(', ')}\n`;
  }
  
  prompt += `\nFocus on the luxury lifestyle this product enables, the craftsmanship quality, and why it's perfect for discerning homeowners who value both beauty and functionality.`;
  
  return prompt;
}

// Helper function to format price ranges
function formatPriceRange(price: number): string {
  if (price < 500) return 'Premium';
  if (price < 1500) return 'Luxury'; 
  if (price < 5000) return 'Ultra-Luxury';
  return 'Exclusive Collection';
}

// Helper function to get length guidance
function getLengthGuidance(length: string): string {
  switch (length) {
    case 'brief': return '50-100 words, concise and impactful';
    case 'medium': return '100-200 words, detailed but scannable';
    case 'detailed': return '200-300 words, comprehensive and rich';
    default: return '100-200 words';
  }
}

// Batch generate descriptions for multiple products
export async function generateBatchDescriptions(
  products: ProductData[],
  options: AIDescriptionOptions = {
    type: 'luxury',
    tone: 'luxury', 
    length: 'medium',
    includeFeatures: true,
    includeBenefits: true
  },
  onProgress?: (completed: number, total: number) => void
): Promise<Array<{
  productName: string;
  success: boolean;
  result?: Awaited<ReturnType<typeof generateProductDescription>>;
  error?: string;
}>> {
  const results = [];
  
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    
    try {
      const result = await generateProductDescription(product, options);
      results.push({
        productName: product.name,
        success: true,
        result
      });
    } catch (error) {
      results.push({
        productName: product.name,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
    
    // Call progress callback if provided
    if (onProgress) {
      onProgress(i + 1, products.length);
    }
    
    // Add small delay to respect rate limits
    if (i < products.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  return results;
}

// Quality scoring for generated descriptions
export function scoreDescriptionQuality(description: string, productData: ProductData): number {
  let score = 50; // Base score
  
  // Length scoring
  const wordCount = description.split(' ').length;
  if (wordCount >= 50 && wordCount <= 300) score += 15;
  
  // Keyword presence
  if (productData.name && description.toLowerCase().includes(productData.name.toLowerCase())) score += 10;
  if (productData.brand && description.toLowerCase().includes(productData.brand.toLowerCase())) score += 5;
  if (productData.category && description.toLowerCase().includes(productData.category.toLowerCase())) score += 5;
  
  // Luxury language indicators
  const luxuryWords = ['premium', 'luxury', 'elegant', 'sophisticated', 'craftsmanship', 'exceptional', 'exquisite'];
  const luxuryWordCount = luxuryWords.filter(word => 
    description.toLowerCase().includes(word)
  ).length;
  score += Math.min(luxuryWordCount * 3, 15);
  
  return Math.min(score, 100);
} 